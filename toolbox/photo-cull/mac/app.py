#!/usr/bin/env python3
"""Photo Cull — local gallery for naming shots and videos, and trashing rejects."""

from __future__ import annotations

import errno
import hashlib
import json
import mimetypes
import os
import socket
import subprocess
import threading
import urllib.parse
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from shutil import move

PHOTOS_ROOT = Path.home() / "Desktop" / "Photos"
STATIC_DIR = Path(__file__).resolve().parent / "static"
SOURCE_DIR = Path(__file__).resolve().parent
TRASH_DIR = Path.home() / ".Trash"
CACHE_DIR = Path.home() / "Library" / "Caches" / "photo-cull"
TRANSCODER_SOURCE = SOURCE_DIR / "avi_to_mp4.swift"
PORT = 8787
IMAGE_EXTS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".heic",
    ".heif",
    ".tif",
    ".tiff",
    ".bmp",
}
VIDEO_EXTS = {
    ".avi",
    ".mp4",
    ".m4v",
    ".mov",
    ".webm",
    ".mkv",
    ".mpg",
    ".mpeg",
}
TRANSCODE_EXTS = {".avi"}
MEDIA_EXTS = IMAGE_EXTS | VIDEO_EXTS

mimetypes.add_type("image/heic", ".heic")
mimetypes.add_type("image/heif", ".heif")
mimetypes.add_type("video/mp4", ".m4v")
mimetypes.add_type("video/quicktime", ".mov")
mimetypes.add_type("video/x-msvideo", ".avi")

_transcoder_ready = threading.Event()
_transcoder_lock = threading.Lock()
_file_locks_guard = threading.Lock()
_file_locks: dict[str, threading.Lock] = {}
TRANSCODER: Path | None = None
TRANSCODER_ERROR: str | None = None


def json_bytes(data: object, status: int = 200) -> tuple[int, bytes, str]:
    return status, json.dumps(data).encode("utf-8"), "application/json; charset=utf-8"


def inside(path: Path, root: Path) -> bool:
    try:
        path.resolve().relative_to(root.resolve())
        return True
    except ValueError:
        return False


def list_folders() -> list[str]:
    if not PHOTOS_ROOT.is_dir():
        return []
    names = [
        p.name
        for p in PHOTOS_ROOT.iterdir()
        if p.is_dir() and not p.name.startswith(".")
    ]
    names.sort(key=str.lower)
    return names


def folder_path(name: str) -> Path:
    if not name or name.startswith(".") or "/" in name or "\\" in name:
        raise ValueError("Invalid folder")
    path = (PHOTOS_ROOT / name).resolve()
    if not inside(path, PHOTOS_ROOT) or not path.is_dir():
        raise ValueError("Unknown folder")
    return path


def media_kind(path: Path) -> str:
    return "video" if path.suffix.lower() in VIDEO_EXTS else "image"


def media_in(folder: Path) -> list[dict[str, str]]:
    files = [
        p
        for p in folder.iterdir()
        if p.is_file() and not p.name.startswith(".") and p.suffix.lower() in MEDIA_EXTS
    ]
    files.sort(key=lambda p: p.name.lower())
    return [
        {"name": p.name, "stem": p.stem, "ext": p.suffix, "kind": media_kind(p)}
        for p in files
    ]


def file_in_folder(folder: Path, name: str) -> Path:
    if not name or "/" in name or "\\" in name or name in {".", ".."}:
        raise ValueError("Invalid file")
    path = (folder / name).resolve()
    if not inside(path, folder) or not path.is_file():
        raise ValueError("Unknown file")
    return path


def clean_stem(new_name: str, original_suffix: str) -> str:
    name = new_name.strip().replace("/", "").replace("\\", "").replace("\0", "")
    lower = name.lower()
    for ext in sorted(MEDIA_EXTS, key=len, reverse=True):
        if lower.endswith(ext):
            name = name[: -len(ext)]
            lower = name.lower()
            break
    name = name.strip(" .")
    if not name:
        raise ValueError("Name cannot be empty")
    return name


def unique_dest(folder: Path, stem: str, suffix: str, current: Path) -> Path:
    dest = folder / f"{stem}{suffix}"
    if dest.resolve() == current.resolve() or not dest.exists():
        return dest
    n = 2
    while True:
        dest = folder / f"{stem} {n}{suffix}"
        if dest.resolve() == current.resolve() or not dest.exists():
            return dest
        n += 1


def move_to_trash(path: Path) -> None:
    posix = str(path.resolve())
    script = f'tell application "Finder" to delete POSIX file {json.dumps(posix)}'
    try:
        subprocess.run(
            ["osascript", "-e", script],
            check=True,
            capture_output=True,
            text=True,
        )
        if not path.exists():
            return
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass

    TRASH_DIR.mkdir(exist_ok=True)
    dest = TRASH_DIR / path.name
    if dest.exists():
        dest = unique_dest(TRASH_DIR, path.stem, path.suffix, path)
    move(str(path), str(dest))


def read_json(handler: BaseHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length") or "0")
    raw = handler.rfile.read(length) if length else b"{}"
    if not raw:
        return {}
    data = json.loads(raw.decode("utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Expected an object")
    return data


def find_port(start: int = PORT) -> int:
    for port in range(start, start + 20):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                sock.bind(("127.0.0.1", port))
            except OSError:
                continue
            return port
    raise RuntimeError("No free port found")


def lock_for(key: str) -> threading.Lock:
    with _file_locks_guard:
        lock = _file_locks.get(key)
        if lock is None:
            lock = threading.Lock()
            _file_locks[key] = lock
        return lock


def prepare_transcoder() -> None:
    global TRANSCODER, TRANSCODER_ERROR
    try:
        if not TRANSCODER_SOURCE.is_file():
            raise FileNotFoundError(f"Missing {TRANSCODER_SOURCE.name}")
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        binary = CACHE_DIR / "avi-to-mp4"
        source_mtime = TRANSCODER_SOURCE.stat().st_mtime
        if not binary.is_file() or binary.stat().st_mtime < source_mtime:
            subprocess.run(
                ["swiftc", "-o", str(binary), str(TRANSCODER_SOURCE)],
                check=True,
                capture_output=True,
                text=True,
            )
        TRANSCODER = binary
    except subprocess.CalledProcessError as exc:
        detail = (exc.stderr or exc.stdout or "").strip()
        TRANSCODER_ERROR = detail.splitlines()[-1] if detail else "Could not build AVI converter"
        print(f"AVI playback unavailable: {TRANSCODER_ERROR}")
    except Exception as exc:
        TRANSCODER_ERROR = str(exc)
        print(f"AVI playback unavailable: {exc}")
    finally:
        _transcoder_ready.set()


def transcoded_mp4(path: Path) -> Path:
    if not _transcoder_ready.wait(timeout=180):
        raise RuntimeError("AVI converter is still starting")
    if TRANSCODER is None:
        raise RuntimeError(TRANSCODER_ERROR or "AVI playback is unavailable")

    stat = path.stat()
    key = hashlib.sha1(
        f"{path.resolve()}|{stat.st_mtime_ns}|{stat.st_size}".encode()
    ).hexdigest()[:20]
    dest = CACHE_DIR / f"{key}.mp4"
    with lock_for(key):
        if dest.is_file() and dest.stat().st_size > 0:
            return dest
        tmp = CACHE_DIR / f"{key}.{os.getpid()}.{threading.get_ident()}.part.mp4"
        if tmp.exists():
            tmp.unlink()
        try:
            subprocess.run(
                [str(TRANSCODER), str(path), str(tmp)],
                check=True,
                capture_output=True,
                text=True,
            )
            if not tmp.is_file() or tmp.stat().st_size == 0:
                raise RuntimeError("Could not prepare video")
            os.replace(tmp, dest)
        except subprocess.CalledProcessError as exc:
            detail = (exc.stderr or exc.stdout or "").strip()
            message = detail.splitlines()[-1] if detail else "Could not prepare video"
            print(f"AVI convert failed for {path.name}: {message}")
            raise RuntimeError(message) from exc
        finally:
            if tmp.exists():
                tmp.unlink(missing_ok=True)
    return dest


def playable_file(path: Path) -> tuple[Path, str]:
    if path.suffix.lower() in TRANSCODE_EXTS:
        return transcoded_mp4(path), "video/mp4"
    ctype = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return path, ctype


def parse_byte_range(header: str, size: int) -> tuple[int, int] | None:
    if not header.startswith("bytes="):
        return None
    spec = header.split("=", 1)[1].split(",", 1)[0].strip()
    if "-" not in spec:
        return None
    start_s, end_s = spec.split("-", 1)
    try:
        if start_s == "":
            length = int(end_s)
            if length <= 0:
                return None
            start = max(size - length, 0)
            end = size - 1
        else:
            start = int(start_s)
            end = int(end_s) if end_s else size - 1
    except ValueError:
        return None
    if start < 0 or start >= size or end < start:
        return None
    return start, min(end, size - 1)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, format: str, *args) -> None:
        return

    def send_payload(self, status: int, body: bytes, content_type: str, cache: str = "no-store") -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", cache)
        self.end_headers()
        self.wfile.write(body)

    def send_file(self, path: Path, content_type: str) -> None:
        size = path.stat().st_size
        start, end, status = 0, max(size - 1, 0), 200
        if size == 0:
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", "0")
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Cache-Control", "private, max-age=120")
            self.end_headers()
            return

        range_header = self.headers.get("Range")
        if range_header:
            parsed = parse_byte_range(range_header, size)
            if parsed is None:
                self.send_response(416)
                self.send_header("Content-Range", f"bytes */{size}")
                self.send_header("Content-Length", "0")
                self.end_headers()
                return
            start, end = parsed
            status = 206

        length = end - start + 1
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(length))
        self.send_header("Cache-Control", "private, max-age=120")
        if status == 206:
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.end_headers()

        try:
            with path.open("rb") as handle:
                handle.seek(start)
                remaining = length
                while remaining:
                    chunk = handle.read(min(256 * 1024, remaining))
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    remaining -= len(chunk)
        except OSError as exc:
            if exc.errno not in (errno.EPIPE, errno.ECONNRESET, errno.ECONNABORTED):
                raise

    def send_error_json(self, status: int, message: str) -> None:
        status, body, ctype = json_bytes({"error": message}, status)
        self.send_payload(status, body, ctype)

    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        try:
            if path == "/":
                html = (STATIC_DIR / "index.html").read_bytes()
                self.send_payload(200, html, "text/html; charset=utf-8")
                return
            if path.startswith("/static/"):
                rel = path[len("/static/") :]
                file_path = (STATIC_DIR / rel).resolve()
                if not inside(file_path, STATIC_DIR) or not file_path.is_file():
                    self.send_error_json(404, "Not found")
                    return
                ctype = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
                self.send_payload(200, file_path.read_bytes(), ctype, "public, max-age=60")
                return
            if path == "/api/folders":
                status, body, ctype = json_bytes({"root": str(PHOTOS_ROOT), "folders": list_folders()})
                self.send_payload(status, body, ctype)
                return
            if path == "/api/photos":
                folder = folder_path((query.get("folder") or [""])[0])
                status, body, ctype = json_bytes({"photos": media_in(folder)})
                self.send_payload(status, body, ctype)
                return
            if path == "/file":
                folder = folder_path((query.get("folder") or [""])[0])
                file_path = file_in_folder(folder, (query.get("name") or [""])[0])
                play_path, ctype = playable_file(file_path)
                self.send_file(play_path, ctype)
                return
            self.send_error_json(404, "Not found")
        except ValueError as exc:
            self.send_error_json(400, str(exc))
        except FileNotFoundError:
            self.send_error_json(404, "Not found")
        except Exception as exc:
            self.send_error_json(500, str(exc))

    def do_POST(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        try:
            payload = read_json(self)
            folder = folder_path(str(payload.get("folder") or ""))
            current = file_in_folder(folder, str(payload.get("name") or ""))

            if parsed.path == "/api/rename":
                stem = clean_stem(str(payload.get("newName") or ""), current.suffix)
                dest = unique_dest(folder, stem, current.suffix, current)
                if dest.resolve() != current.resolve():
                    current.rename(dest)
                status, body, ctype = json_bytes(
                    {
                        "name": dest.name,
                        "stem": dest.stem,
                        "ext": dest.suffix,
                        "kind": media_kind(dest),
                    }
                )
                self.send_payload(status, body, ctype)
                return

            if parsed.path == "/api/delete":
                move_to_trash(current)
                status, body, ctype = json_bytes({"ok": True})
                self.send_payload(status, body, ctype)
                return

            self.send_error_json(404, "Not found")
        except ValueError as exc:
            self.send_error_json(400, str(exc))
        except json.JSONDecodeError:
            self.send_error_json(400, "Invalid JSON")
        except Exception as exc:
            self.send_error_json(500, str(exc))


def main() -> None:
    if not STATIC_DIR.is_dir():
        raise SystemExit(f"Missing static folder: {STATIC_DIR}")
    threading.Thread(target=prepare_transcoder, name="avi-transcoder", daemon=True).start()
    port = find_port()
    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    url = f"http://127.0.0.1:{port}"
    print(f"Photo Cull  {url}")
    print(f"Folders in  {PHOTOS_ROOT}")
    webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
        server.server_close()


if __name__ == "__main__":
    main()

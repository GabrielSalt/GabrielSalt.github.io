const pickBtn = document.getElementById("pick");
const fallbackInput = document.getElementById("fallback");
const nameInput = document.getElementById("name");
const extLabel = document.getElementById("ext");
const counter = document.getElementById("counter");
const stage = document.getElementById("stage");
const empty = document.getElementById("empty");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const prevImg = document.getElementById("prevImg");
const nextImg = document.getElementById("nextImg");
const prevFilm = document.getElementById("prevFilm");
const nextFilm = document.getElementById("nextFilm");
const currentImg = document.getElementById("currentImg");
const currentVideo = document.getElementById("currentVideo");
const preparing = document.getElementById("preparing");
const currentWrap = document.getElementById("currentWrap");
const trashBtn = document.getElementById("trash");
const toastEl = document.getElementById("toast");

const IMAGE_EXTS = new Set([
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
]);
const VIDEO_EXTS = new Set([
  ".avi",
  ".mp4",
  ".m4v",
  ".mov",
  ".webm",
  ".mkv",
  ".mpg",
  ".mpeg",
]);
const MEDIA_EXTS = new Set([...IMAGE_EXTS, ...VIDEO_EXTS]);

const EMPTY_WAITING =
  "Choose a folder of photos or videos. Chrome and Edge can rename and delete. The Mac app moves rejects to Trash and plays AVI.";
const EMPTY_FOLDER = "This folder has no photos or videos.";
const READ_ONLY =
  "This browser can look, not change files. Use Chrome or Edge, or download the Mac app.";

let photos = [];
let index = 0;
let opened = false;
let toastTimer = 0;
let saving = false;
let preparingTimer = 0;
let renderGen = 0;
let deleteWarned = false;
const urls = new Map();

function toast(message) {
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2800);
}

function extension(name) {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

function stemOf(name, ext) {
  return ext ? name.slice(0, -ext.length) : name;
}

function kindOf(ext) {
  return VIDEO_EXTS.has(ext) ? "video" : "image";
}

function itemFromName(name, extra) {
  const ext = extension(name);
  return {
    name,
    stem: stemOf(name, ext),
    ext,
    kind: kindOf(ext),
    ...extra,
  };
}

function canChange(item) {
  return Boolean(item && item.handle && typeof item.handle.move === "function" && typeof item.handle.remove === "function");
}

function revokeAll() {
  for (const url of urls.values()) URL.revokeObjectURL(url);
  urls.clear();
}

function dropUrl(name) {
  const url = urls.get(name);
  if (!url) return;
  URL.revokeObjectURL(url);
  urls.delete(name);
}

async function fileUrl(item) {
  const cached = urls.get(item.name);
  if (cached) return cached;
  const file = item.file || (await item.handle.getFile());
  const url = URL.createObjectURL(file);
  urls.set(item.name, url);
  return url;
}

function currentPhoto() {
  return photos[index] || null;
}

function isVideo(item) {
  return Boolean(item) && item.kind === "video";
}

function stopVideo() {
  clearTimeout(preparingTimer);
  preparing.hidden = true;
  currentVideo.pause();
  currentVideo.classList.remove("ready");
  currentVideo.hidden = true;
  if (currentVideo.getAttribute("src")) {
    currentVideo.removeAttribute("src");
    currentVideo.load();
  }
}

async function showVideo(photo, gen) {
  currentImg.hidden = true;
  currentImg.removeAttribute("src");
  currentVideo.classList.remove("ready");
  currentVideo.hidden = false;
  currentVideo.muted = false;
  preparing.hidden = true;
  clearTimeout(preparingTimer);
  preparingTimer = setTimeout(() => {
    if (!currentVideo.classList.contains("ready")) preparing.hidden = false;
  }, 350);
  const url = await fileUrl(photo);
  if (gen !== renderGen) return;
  currentVideo.src = url;
  try {
    await currentVideo.play();
  } catch {
    currentVideo.muted = true;
    try {
      await currentVideo.play();
    } catch {
      if (gen !== renderGen) return;
      clearTimeout(preparingTimer);
      preparing.hidden = true;
      toast(playError(photo));
    }
  }
}

function playError(photo) {
  if (photo && photo.ext === ".avi") {
    return "This browser can't play AVI. The Mac app can.";
  }
  return "Couldn't play video";
}

function nameDirty() {
  const photo = currentPhoto();
  return Boolean(photo) && nameInput.value.trim() !== photo.stem;
}

function allNameSelected() {
  return (
    document.activeElement === nameInput &&
    nameInput.selectionStart === 0 &&
    nameInput.selectionEnd === nameInput.value.length
  );
}

async function setSide(img, film, btn, photo, gen) {
  if (!photo) {
    img.removeAttribute("src");
    img.hidden = true;
    film.hidden = true;
    btn.disabled = true;
    return;
  }
  btn.disabled = false;
  if (isVideo(photo)) {
    img.removeAttribute("src");
    img.hidden = true;
    film.hidden = false;
    return;
  }
  film.hidden = true;
  const url = await fileUrl(photo);
  if (gen !== renderGen) return;
  img.hidden = false;
  img.src = url;
}

async function render(direction = 0) {
  const gen = ++renderGen;
  const photo = currentPhoto();
  const hasPhotos = photos.length > 0;

  stage.classList.toggle("empty-state", !hasPhotos);
  nameInput.disabled = !hasPhotos;
  trashBtn.disabled = !hasPhotos;

  if (!hasPhotos) {
    currentImg.hidden = true;
    currentImg.removeAttribute("src");
    stopVideo();
    await setSide(prevImg, prevFilm, prevBtn, null, gen);
    await setSide(nextImg, nextFilm, nextBtn, null, gen);
    nameInput.value = "";
    nameInput.placeholder = "Name this";
    extLabel.textContent = "";
    counter.textContent = opened ? "Empty" : "—";
    empty.textContent = opened ? EMPTY_FOLDER : EMPTY_WAITING;
    return;
  }

  if (direction) {
    currentWrap.style.setProperty("--slide", direction > 0 ? "18px" : "-18px");
    currentWrap.classList.remove("flash");
    void currentWrap.offsetWidth;
    currentWrap.classList.add("flash");
  }

  if (isVideo(photo)) {
    await showVideo(photo, gen);
  } else {
    stopVideo();
    const url = await fileUrl(photo);
    if (gen !== renderGen) return;
    currentImg.hidden = false;
    currentImg.src = url;
  }
  if (gen !== renderGen) return;

  nameInput.value = photo.stem;
  nameInput.placeholder = isVideo(photo) ? "Name this video" : "Name this photo";
  extLabel.textContent = photo.ext;
  counter.textContent = `${index + 1} / ${photos.length}`;
  await setSide(prevImg, prevFilm, prevBtn, photos[index - 1], gen);
  await setSide(nextImg, nextFilm, nextBtn, photos[index + 1], gen);
  if (gen !== renderGen) return;
  nameInput.focus();
  nameInput.select();
}

function cleanStem(newName) {
  let name = newName.trim().replace(/[/\\\0]/g, "");
  let lower = name.toLowerCase();
  const exts = [...MEDIA_EXTS].sort((a, b) => b.length - a.length);
  for (const ext of exts) {
    if (lower.endsWith(ext)) {
      name = name.slice(0, -ext.length);
      lower = name.toLowerCase();
      break;
    }
  }
  name = name.replace(/^[ .]+|[ .]+$/g, "");
  if (!name) throw new Error("Name cannot be empty");
  return name;
}

function uniqueName(stem, suffix, currentName) {
  const taken = (candidate) => photos.some((item) => item.name === candidate && item.name !== currentName);
  let dest = `${stem}${suffix}`;
  if (!taken(dest)) return dest;
  let n = 2;
  while (taken(`${stem} ${n}${suffix}`)) n += 1;
  return `${stem} ${n}${suffix}`;
}

async function saveRename() {
  const photo = currentPhoto();
  if (!photo || saving) return photo;
  const nextStem = cleanStem(nameInput.value);
  if (nextStem === photo.stem) return photo;
  if (!canChange(photo)) throw new Error(READ_ONLY);

  const destName = uniqueName(nextStem, photo.ext, photo.name);
  if (destName === photo.name) return photo;

  saving = true;
  try {
    await photo.handle.move(destName);
    const url = urls.get(photo.name);
    if (url) {
      urls.delete(photo.name);
      urls.set(destName, url);
    }
    photo.name = destName;
    photo.stem = stemOf(destName, photo.ext);
    nameInput.value = photo.stem;
    extLabel.textContent = photo.ext;
    return photo;
  } finally {
    saving = false;
  }
}

async function go(delta) {
  if (!photos.length) return;
  if (nameDirty()) {
    if (!canChange(currentPhoto())) {
      nameInput.value = currentPhoto().stem;
      toast(READ_ONLY);
    } else {
      try {
        await saveRename();
      } catch (err) {
        toast(err.message);
        return;
      }
    }
  }
  const next = index + delta;
  if (next < 0 || next >= photos.length) return;
  index = next;
  await render(delta);
}

async function saveAndNext() {
  try {
    await saveRename();
    if (index < photos.length - 1) {
      index += 1;
      await render(1);
    } else {
      await render();
      toast("Last one");
    }
  } catch (err) {
    toast(err.message);
  }
}

async function trashCurrent() {
  const photo = currentPhoto();
  if (!photo || saving) return;
  if (!canChange(photo)) {
    toast(READ_ONLY);
    return;
  }
  if (!deleteWarned) {
    const ok = confirm(
      "Delete this file permanently? The Mac app moves files to Trash instead. Later deletes in this visit won't ask again."
    );
    if (!ok) return;
    deleteWarned = true;
  }

  saving = true;
  try {
    await photo.handle.remove();
    dropUrl(photo.name);
    const nextIndex = Math.min(index, photos.length - 2);
    photos.splice(index, 1);
    index = Math.max(0, nextIndex);
    toast("Deleted");
    await render(1);
  } catch (err) {
    toast(err.message || "Couldn't delete that file");
  } finally {
    saving = false;
  }
}

function openList(items, label, writableNote) {
  revokeAll();
  opened = true;
  photos = items;
  index = 0;
  pickBtn.textContent = label || "Folder";
  render();
  if (writableNote) toast(writableNote);
}

async function entriesFromDir(dirHandle) {
  const items = [];
  for await (const [name, handle] of dirHandle.entries()) {
    if (handle.kind !== "file" || name.startsWith(".")) continue;
    const ext = extension(name);
    if (!MEDIA_EXTS.has(ext)) continue;
    items.push(itemFromName(name, { handle }));
  }
  items.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  return items;
}

pickBtn.addEventListener("click", async () => {
  if (typeof window.showDirectoryPicker !== "function") {
    fallbackInput.click();
    return;
  }
  try {
    const dir = await window.showDirectoryPicker({ mode: "readwrite" });
    const items = await entriesFromDir(dir);
    const writable = items.length === 0 || canChange(items[0]);
    openList(items, dir.name, writable ? "" : READ_ONLY);
  } catch (err) {
    if (err && err.name === "AbortError") return;
    toast(err.message || "Couldn't open that folder");
  }
});

fallbackInput.addEventListener("change", () => {
  const files = [...fallbackInput.files].filter((file) => {
    if (!file.name || file.name.startsWith(".")) return false;
    const parts = (file.webkitRelativePath || file.name).split("/");
    if (parts.length > 2) return false;
    return MEDIA_EXTS.has(extension(file.name));
  });
  files.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  const relative = (files[0] && files[0].webkitRelativePath) || "";
  const label = relative.split("/")[0] || "Folder";
  openList(
    files.map((file) => itemFromName(file.name, { file })),
    label,
    READ_ONLY
  );
  fallbackInput.value = "";
});

currentVideo.addEventListener("playing", () => {
  clearTimeout(preparingTimer);
  preparing.hidden = true;
  currentVideo.classList.add("ready");
});

currentVideo.addEventListener("error", () => {
  if (currentVideo.hidden || !currentVideo.getAttribute("src")) return;
  if (currentVideo.error && currentVideo.error.code === 1) return;
  clearTimeout(preparingTimer);
  preparing.hidden = true;
  toast(playError(currentPhoto()));
});

currentImg.addEventListener("error", () => {
  if (currentImg.hidden || !currentImg.getAttribute("src")) return;
  toast("Couldn't show this photo");
});

currentVideo.addEventListener("click", () => {
  if (currentVideo.hidden || !currentVideo.muted) return;
  currentVideo.muted = false;
  currentVideo.play().catch(() => {
    currentVideo.muted = true;
  });
});

prevBtn.addEventListener("click", () => go(-1));
nextBtn.addEventListener("click", () => go(1));
trashBtn.addEventListener("click", () => trashCurrent());

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    saveAndNext();
  }
});

document.addEventListener("keydown", (event) => {
  const inName = document.activeElement === nameInput;
  if (event.key === "ArrowLeft" && (!inName || allNameSelected())) {
    event.preventDefault();
    go(-1);
  } else if (event.key === "ArrowRight" && (!inName || allNameSelected())) {
    event.preventDefault();
    go(1);
  } else if ((event.key === "Backspace" || event.key === "Delete") && event.shiftKey) {
    event.preventDefault();
    trashCurrent();
  }
});

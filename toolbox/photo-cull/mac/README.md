# Photo Cull

Name the photos and videos you want to keep. Trash the rest.

## Run

On a Mac, put each shoot in its own folder inside `Desktop/Photos`. Then, from this folder:

```bash
python3 app.py
```

A browser tab opens on your machine. Nothing is uploaded.

- Left and right arrows move between files
- Type a name and press Enter to save it and go to the next file
- Shift+Delete moves the file to Trash

Videos play on their own, including AVI from cameras. The first AVI is converted with the included Swift helper, which needs the Xcode command line tools (`swiftc`).

If port 8787 is taken, it picks the next free port.

# Photo Cull

On a Mac, put each shoot in its own folder inside `Desktop/Photos` OR change "PHOTOS_ROOT" in app.py (Line 20 / first line after imports). 

Then, from this folder:


```bash
python3 app.py
```

This opens up a tab on your browser (localhost:8787)

- Left and right arrows move between files
- Type a name and press Enter to save it and go to the next file
- Shift+Delete moves the file to Trash

Videos play on their own, including AVI from cameras. The first AVI is converted with the included Swift helper, which needs the Xcode command line tools (`swiftc`).

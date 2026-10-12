const folderSelect = document.getElementById("folder");
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

const LAST_FOLDER_KEY = "photo-cull-folder";

let folders = [];
let photos = [];
let index = 0;
let toastTimer = 0;
let saving = false;
let preparingTimer = 0;

function toast(message) {
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2200);
}

async function api(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || res.statusText);
  }
  return data;
}

function fileUrl(name) {
  const folder = folderSelect.value;
  return `/file?folder=${encodeURIComponent(folder)}&name=${encodeURIComponent(name)}`;
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

function showVideo(photo) {
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
  currentVideo.src = fileUrl(photo.name);
  currentVideo.play().catch(() => {
    currentVideo.muted = true;
    return currentVideo.play();
  }).catch(() => {
    clearTimeout(preparingTimer);
    preparing.hidden = true;
    toast("Couldn't play video");
  });
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

function setSide(img, film, btn, photo) {
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
  img.hidden = false;
  img.src = fileUrl(photo.name);
}

function render(direction = 0) {
  const photo = currentPhoto();
  const hasPhotos = photos.length > 0;

  stage.classList.toggle("empty-state", !hasPhotos);
  nameInput.disabled = !hasPhotos;
  trashBtn.disabled = !hasPhotos;

  if (!hasPhotos) {
    currentImg.hidden = true;
    currentImg.removeAttribute("src");
    stopVideo();
    setSide(prevImg, prevFilm, prevBtn, null);
    setSide(nextImg, nextFilm, nextBtn, null);
    nameInput.value = "";
    nameInput.placeholder = "Name this";
    extLabel.textContent = "";
    counter.textContent = folders.length ? "Empty" : "—";
    empty.textContent = folders.length
      ? "This folder is empty. Drop photos or videos in, then click the folder menu again."
      : "Make a folder in Desktop/Photos, drop shots in, then pick it above.";
    return;
  }

  if (direction) {
    currentWrap.style.setProperty("--slide", direction > 0 ? "18px" : "-18px");
    currentWrap.classList.remove("flash");
    void currentWrap.offsetWidth;
    currentWrap.classList.add("flash");
  }

  if (isVideo(photo)) {
    showVideo(photo);
  } else {
    stopVideo();
    currentImg.hidden = false;
    currentImg.src = fileUrl(photo.name);
  }
  nameInput.value = photo.stem;
  nameInput.placeholder = isVideo(photo) ? "Name this video" : "Name this photo";
  extLabel.textContent = photo.ext;
  counter.textContent = `${index + 1} / ${photos.length}`;
  setSide(prevImg, prevFilm, prevBtn, photos[index - 1]);
  setSide(nextImg, nextFilm, nextBtn, photos[index + 1]);
  nameInput.focus();
  nameInput.select();
}

async function loadFolders() {
  const data = await api("/api/folders");
  folders = data.folders || [];
  const previous = folderSelect.value || localStorage.getItem(LAST_FOLDER_KEY) || "";
  folderSelect.innerHTML = "";

  if (!folders.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No folders yet";
    folderSelect.append(opt);
    photos = [];
    index = 0;
    render();
    return;
  }

  for (const name of folders) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    folderSelect.append(opt);
  }

  folderSelect.value = folders.includes(previous) ? previous : folders[0];
  localStorage.setItem(LAST_FOLDER_KEY, folderSelect.value);
  await loadPhotos();
}

async function loadPhotos(keepName) {
  const folder = folderSelect.value;
  if (!folder) {
    photos = [];
    index = 0;
    render();
    return;
  }
  const data = await api(`/api/photos?folder=${encodeURIComponent(folder)}`);
  photos = data.photos || [];
  if (keepName) {
    const nextIndex = photos.findIndex((photo) => photo.name === keepName);
    index = nextIndex >= 0 ? nextIndex : Math.min(index, Math.max(photos.length - 1, 0));
  } else {
    index = 0;
  }
  render();
}

async function saveRename() {
  const photo = currentPhoto();
  if (!photo || saving) return photo;
  const nextName = nameInput.value.trim();
  if (!nextName || nextName === photo.stem) return photo;

  saving = true;
  try {
    const updated = await api("/api/rename", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folder: folderSelect.value,
        name: photo.name,
        newName: nextName,
      }),
    });
    photos[index] = updated;
    nameInput.value = updated.stem;
    extLabel.textContent = updated.ext;
    return updated;
  } finally {
    saving = false;
  }
}

async function go(delta) {
  if (!photos.length) return;
  if (nameDirty()) {
    try {
      await saveRename();
    } catch (err) {
      toast(err.message);
      return;
    }
  }
  const next = index + delta;
  if (next < 0 || next >= photos.length) return;
  index = next;
  render(delta);
}

async function saveAndNext() {
  try {
    await saveRename();
    if (index < photos.length - 1) {
      index += 1;
      render(1);
    } else {
      render();
      toast("Last one");
    }
  } catch (err) {
    toast(err.message);
  }
}

async function trashCurrent() {
  const photo = currentPhoto();
  if (!photo || saving) return;
  saving = true;
  try {
    await api("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folder: folderSelect.value,
        name: photo.name,
      }),
    });
    const nextIndex = Math.min(index, photos.length - 2);
    photos.splice(index, 1);
    index = Math.max(0, nextIndex);
    toast("Moved to Trash");
    render(1);
  } catch (err) {
    toast(err.message);
  } finally {
    saving = false;
  }
}

folderSelect.addEventListener("change", async () => {
  localStorage.setItem(LAST_FOLDER_KEY, folderSelect.value);
  await loadPhotos();
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
  toast("Couldn't play video");
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
  } else if (
    (event.key === "Backspace" || event.key === "Delete") &&
    event.shiftKey
  ) {
    event.preventDefault();
    trashCurrent();
  }
});

loadFolders().catch((err) => toast(err.message));

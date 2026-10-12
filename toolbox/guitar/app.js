const STRING_NAMES = ["E", "A", "D", "G", "B", "e"];
const TEMPOS = [60, 66, 72, 80, 88, 96, 108];
const KEY = "chord-drill-v1";

const SETS = [
  { id: 1, name: "First shapes", blurb: "Open chords. Thumb on the back of the neck." },
  { id: 2, name: "Sevens and sus", blurb: "The same shapes with one finger moved." },
  { id: 3, name: "Stretches", blurb: "A longer reach, still no full barre." },
  { id: 4, name: "Barre chords", blurb: "Index finger pressed across the strings." },
];

// frets and fingers run low E → high e. -1 is muted, 0 is open.
const CHORDS = [
  { id: "Em", name: "Em", set: 1, frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  { id: "E", name: "E", set: 1, frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  { id: "Am", name: "Am", set: 1, frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  { id: "A", name: "A", set: 1, frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  { id: "D", name: "D", set: 1, frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  { id: "G", name: "G", set: 1, frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
  { id: "C", name: "C", set: 1, frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },

  { id: "Em7", name: "Em7", set: 2, frets: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0] },
  { id: "E7", name: "E7", set: 2, frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
  { id: "Am7", name: "Am7", set: 2, frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0] },
  { id: "A7", name: "A7", set: 2, frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0] },
  { id: "D7", name: "D7", set: 2, frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3] },
  { id: "G7", name: "G7", set: 2, frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
  { id: "Cmaj7", name: "Cmaj7", set: 2, frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0] },
  { id: "Esus4", name: "Esus4", set: 2, frets: [0, 2, 2, 2, 0, 0], fingers: [0, 2, 3, 4, 0, 0] },
  { id: "Asus2", name: "Asus2", set: 2, frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0] },
  { id: "Asus4", name: "Asus4", set: 2, frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0] },
  { id: "Dsus2", name: "Dsus2", set: 2, frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0] },
  { id: "Dsus4", name: "Dsus4", set: 2, frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4] },

  { id: "Dm", name: "Dm", set: 3, frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
  { id: "B7", name: "B7", set: 3, frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] },
  { id: "C7", name: "C7", set: 3, frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0] },
  { id: "Fmaj7", name: "Fmaj7", set: 3, frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0] },
  { id: "Cadd9", name: "Cadd9", set: 3, frets: [-1, 3, 2, 0, 3, 0], fingers: [0, 3, 2, 0, 4, 0] },
  {
    id: "Em7w",
    name: "Em7",
    menu: "Em7 (Wonderwall)",
    set: 3,
    pool: false,
    frets: [0, 2, 2, 0, 3, 3],
    fingers: [0, 1, 2, 0, 3, 4],
  },
  {
    id: "Gw",
    name: "G",
    menu: "G (Wonderwall)",
    set: 3,
    pool: false,
    frets: [3, -1, 0, 0, 3, 3],
    fingers: [2, 0, 0, 0, 3, 4],
  },
  { id: "A7sus4", name: "A7sus4", set: 3, frets: [-1, 0, 2, 2, 3, 3], fingers: [0, 0, 1, 2, 3, 4] },

  {
    id: "F",
    name: "F",
    set: 4,
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barres: [{ fret: 1, from: 0, to: 5, finger: 1 }],
  },
  {
    id: "Bb",
    name: "Bb",
    set: 4,
    frets: [-1, 1, 3, 3, 3, 1],
    fingers: [0, 1, 3, 3, 3, 1],
    barres: [
      { fret: 1, from: 1, to: 5, finger: 1 },
      { fret: 3, from: 2, to: 4, finger: 3 },
    ],
  },
  {
    id: "B",
    name: "B",
    set: 4,
    frets: [-1, 2, 4, 4, 4, 2],
    fingers: [0, 1, 3, 3, 3, 1],
    barres: [
      { fret: 2, from: 1, to: 5, finger: 1 },
      { fret: 4, from: 2, to: 4, finger: 3 },
    ],
  },
  {
    id: "Bm",
    name: "Bm",
    set: 4,
    frets: [-1, 2, 4, 4, 3, 2],
    fingers: [0, 1, 3, 4, 2, 1],
    barres: [{ fret: 2, from: 1, to: 5, finger: 1 }],
  },
  {
    id: "Fsharp",
    name: "F#",
    set: 4,
    frets: [2, 4, 4, 3, 2, 2],
    fingers: [1, 3, 4, 2, 1, 1],
    barres: [{ fret: 2, from: 0, to: 5, finger: 1 }],
  },
  {
    id: "Fsharpm",
    name: "F#m",
    set: 4,
    frets: [2, 4, 4, 2, 2, 2],
    fingers: [1, 3, 4, 1, 1, 1],
    barres: [{ fret: 2, from: 0, to: 5, finger: 1 }],
  },
  {
    id: "Csharpm",
    name: "C#m",
    set: 4,
    frets: [-1, 4, 6, 6, 5, 4],
    fingers: [0, 1, 3, 4, 2, 1],
    barres: [{ fret: 4, from: 1, to: 5, finger: 1 }],
  },
  {
    id: "Cm",
    name: "Cm",
    set: 4,
    frets: [-1, 3, 5, 5, 4, 3],
    fingers: [0, 1, 3, 4, 2, 1],
    barres: [{ fret: 3, from: 1, to: 5, finger: 1 }],
  },
];

const SONGS = [
  { id: "four", title: "Four-chord pop", chords: ["G", "D", "Em", "C"], detail: "Same loop as Wagon Wheel, I'm Yours, Don't Stop Believin'." },
  { id: "heaven", title: "Knockin' on Heaven's Door", chords: ["G", "D", "Am"] },
  { id: "alabama", title: "Sweet Home Alabama", chords: ["D", "C", "G"] },
  { id: "badmoon", title: "Bad Moon Rising", chords: ["D", "A", "G"] },
  { id: "birds", title: "Three Little Birds", chords: ["A", "D", "A", "E"] },
  { id: "ring", title: "Ring of Fire", chords: ["G", "C", "D"] },
  { id: "brown", title: "Brown Eyed Girl", chords: ["G", "C", "G", "D"] },
  { id: "roads", title: "Take Me Home, Country Roads", chords: ["G", "Em", "D", "C"] },
  { id: "zombie", title: "Zombie", chords: ["Em", "C", "G", "D"] },
  { id: "riptide", title: "Riptide", chords: ["Am", "G", "C"], detail: "Capo 1 shapes." },
  { id: "hallelujah", title: "Hallelujah", chords: ["G", "Em", "G", "Em", "C", "D", "G", "D"], detail: "Open shapes in G." },
  { id: "stand", title: "Stand By Me", chords: ["G", "Em", "C", "D"], detail: "Moved to G so the shapes stay open." },
  { id: "wonder-easy", title: "Wonderwall", chords: ["Em", "G", "D", "A"], detail: "Simple open shapes.", hideWhen: "wonder" },
  { id: "horse", title: "Horse with No Name", chords: ["Em", "D"], detail: "The two-chord version." },
  { id: "wild", title: "Wild Thing", chords: ["A", "D", "E"] },
  { id: "twist", title: "Twist and Shout", chords: ["D", "G", "A"] },
  { id: "freefall", title: "Free Fallin'", chords: ["D", "G", "D", "A"], detail: "Capo 2 shapes.", hideWhen: "freefall2" },
  { id: "blues", title: "12-bar blues in A", chords: ["A", "A", "A", "A", "D", "D", "A", "A", "E", "D", "A", "E"], hideWhen: "blues7" },

  { id: "freefall2", title: "Free Fallin'", chords: ["D", "Dsus4", "G", "A"], detail: "Capo 2 shapes. Dsus4 stands in for the hammer-on." },
  { id: "blues7", title: "12-bar blues in A", chords: ["A7", "A7", "A7", "A7", "D7", "D7", "A7", "A7", "E7", "D7", "A7", "E7"], detail: "Dominant sevens, the usual blues color." },

  { id: "wonder", title: "Wonderwall", chords: ["Em7w", "Gw", "Dsus4", "A7sus4"], detail: "Capo 2. Ring and pinky stay on the top two strings." },
  { id: "riddance", title: "Good Riddance", chords: ["G", "Cadd9", "D"] },
  { id: "let-easy", title: "Let It Be", chords: ["C", "G", "Am", "Fmaj7"], detail: "Fmaj7 instead of a barre F.", hideWhen: "letitbe" },
  { id: "rising-easy", title: "House of the Rising Sun", chords: ["Am", "C", "D", "Fmaj7", "Am", "C", "E", "E"], detail: "Fmaj7 instead of a barre F.", hideWhen: "rising" },
  { id: "falling-easy", title: "Can't Help Falling in Love", chords: ["C", "Em", "Am", "Fmaj7"], detail: "Fmaj7 instead of a barre F.", hideWhen: "falling" },

  { id: "letitbe", title: "Let It Be", chords: ["C", "G", "Am", "F"] },
  { id: "nowoman", title: "No Woman, No Cry", chords: ["C", "G", "Am", "F"] },
  { id: "rising", title: "House of the Rising Sun", chords: ["Am", "C", "D", "F", "Am", "C", "E", "E"] },
  { id: "falling", title: "Can't Help Falling in Love", chords: ["C", "Em", "Am", "F"] },
  { id: "creep", title: "Creep", chords: ["G", "B", "C", "Cm"] },
  { id: "hotel", title: "Hotel California", chords: ["Bm", "Fsharp", "A", "E", "G", "D", "Em", "Fsharp"] },
  { id: "labamba", title: "La Bamba", chords: ["C", "F", "G"] },
  { id: "barres", title: "Minor barre cycle", chords: ["Bm", "Fsharpm", "Csharpm"], detail: "Bm, F#m, C#m, then back to Bm." },
];

const PATTERNS = [
  {
    id: "downs",
    name: "All downs",
    steps: [
      { dir: "D", beats: 1 },
      { dir: "D", beats: 1 },
      { dir: "D", beats: 1 },
      { dir: "D", beats: 1 },
    ],
  },
  {
    id: "eighths",
    name: "Down-up",
    steps: [
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
    ],
  },
  {
    id: "campfire",
    name: "Campfire",
    steps: [
      { dir: "D", beats: 0.5 }, { dir: "-", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "-", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
    ],
  },
  {
    id: "pop",
    name: "Pop",
    steps: [
      { dir: "D", beats: 0.5 }, { dir: "-", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "U", beats: 0.5 }, { dir: "-", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
    ],
  },
  {
    id: "ballad",
    name: "Ballad",
    steps: [
      { dir: "D", beats: 0.5 }, { dir: "-", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "-", beats: 0.5 },
      { dir: "D", beats: 0.5 }, { dir: "U", beats: 0.5 },
    ],
  },
  {
    id: "offbeat",
    name: "Offbeats",
    steps: [
      { dir: "-", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "-", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "-", beats: 0.5 }, { dir: "U", beats: 0.5 },
      { dir: "-", beats: 0.5 }, { dir: "U", beats: 0.5 },
    ],
  },
];

const byId = Object.fromEntries(CHORDS.map((c) => [c.id, c]));
const songById = Object.fromEntries(SONGS.map((s) => [s.id, s]));
const patternById = Object.fromEntries(PATTERNS.map((p) => [p.id, p]));

function validate() {
  const ids = new Set();
  for (const c of CHORDS) {
    if (ids.has(c.id)) throw new Error("duplicate chord " + c.id);
    ids.add(c.id);
    if (c.frets.length !== 6 || c.fingers.length !== 6) throw new Error("length " + c.id);
    for (let i = 0; i < 6; i++) {
      const fret = c.frets[i];
      const finger = c.fingers[i];
      if (fret < -1 || fret > 12) throw new Error("fret " + c.id);
      if (fret <= 0 && finger !== 0) throw new Error("open finger " + c.id);
      if (fret > 0 && (finger < 1 || finger > 4)) throw new Error("finger " + c.id);
    }
    const fretted = c.frets.filter((f) => f > 0);
    if (fretted.length) {
      const max = Math.max(...fretted);
      const min = Math.min(...fretted);
      const start = max <= 4 ? 1 : min;
      if (max > start + 3) throw new Error("window " + c.id);
    }
    for (const b of c.barres || []) {
      if (b.from < 0 || b.to > 5 || b.from > b.to) throw new Error("barre " + c.id);
      for (let s = b.from; s <= b.to; s++) {
        if (c.frets[s] < b.fret) throw new Error("barre under " + c.id);
        if (c.frets[s] === b.fret && c.fingers[s] !== b.finger) throw new Error("barre finger " + c.id);
      }
    }
  }
  const songIds = new Set();
  for (const s of SONGS) {
    if (songIds.has(s.id)) throw new Error("duplicate song " + s.id);
    songIds.add(s.id);
    if (!s.chords.length) throw new Error("empty " + s.id);
    for (const id of s.chords) if (!ids.has(id)) throw new Error(s.id + " missing " + id);
  }
  for (const s of SONGS) {
    if (s.hideWhen && !songIds.has(s.hideWhen)) throw new Error("hideWhen " + s.id);
  }
  for (const p of PATTERNS) {
    const sum = p.steps.reduce((a, st) => a + st.beats, 0);
    if (Math.abs(sum - 4) > 1e-6) throw new Error("beats " + p.id + " " + sum);
    for (const st of p.steps) {
      if (!["D", "U", "-"].includes(st.dir) || !(st.beats > 0)) throw new Error("step " + p.id);
    }
  }
}

const state = {
  difficulty: 1,
  bpm: 72,
  varyTempo: true,
  barsPerChord: 2,
  patternMode: "rotate",
  patternId: "campfire",
  activePattern: "campfire",
  pool: PATTERNS.map((p) => p.id),
  mode: "mix",
  songId: "four",
  mixSongId: null,
  chordId: "Em",
  every: 2,
  randomLength: 3,
  randomIds: [],
  nextRandomIds: [],
  custom: ["G", "D", "Em"],
  sound: true,
  countIn: true,
  leftHanded: false,
};

const cursor = { step: 0, bar: 0, chord: 0, loops: 0, countLeft: 0, nextTime: 0 };
let mixOrder = [];
let mixPos = 0;
let audioCtx = null;
let timer = 0;
let raf = 0;
let uiEvents = [];
let liveNodes = [];
let resumed = false;
let shownChord = "";
let shownNext = "";
let shownLeft = null;
let lastName = "";
let lastView = null;

function $(id) {
  return document.getElementById(id);
}

function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}

function shuffle(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function songPlayable(song) {
  if (!song.chords.every((id) => byId[id] && byId[id].set <= state.difficulty)) return false;
  if (song.hideWhen) {
    const other = songById[song.hideWhen];
    if (other && other.chords.every((id) => byId[id] && byId[id].set <= state.difficulty)) return false;
  }
  return true;
}

function playableSongs() {
  return SONGS.filter(songPlayable);
}

function poolChords() {
  return CHORDS.filter((c) => c.set <= state.difficulty && c.pool !== false);
}

function menuChords() {
  return CHORDS.filter((c) => c.set <= state.difficulty);
}

function currentSong() {
  if (state.mode === "mix") return songById[state.mixSongId] || null;
  if (state.mode === "song") return songById[state.songId] || null;
  return null;
}

function progression() {
  if (state.mode === "one") {
    const c = byId[state.chordId];
    return c && c.set <= state.difficulty ? [c] : [];
  }
  if (state.mode === "custom") return state.custom.map((id) => byId[id]).filter(Boolean);
  if (state.mode === "random") return state.randomIds.map((id) => byId[id]).filter(Boolean);
  const song = currentSong();
  return song ? song.chords.map((id) => byId[id]).filter(Boolean) : [];
}

function stretchLimit() {
  if (state.mode === "mix" || state.mode === "random") return state.every;
  if (state.patternMode === "rotate") return state.every;
  return Infinity;
}

function currentPattern() {
  if (state.patternMode === "one") return patternById[state.patternId] || PATTERNS[0];
  return patternById[state.activePattern] || PATTERNS[0];
}

function kickerNow() {
  if (state.mode === "mix" || state.mode === "song") return currentSong()?.title || "No song at this difficulty";
  if (state.mode === "one") return "One chord";
  if (state.mode === "random") return "Random cycle";
  return "My cycle";
}

function detailNow() {
  if (state.mode === "mix" || state.mode === "song") return currentSong()?.detail || "";
  if (state.mode === "one") return "Stay on this shape and keep the strum going.";
  if (state.mode === "random") return "These chords loop, then a new batch.";
  const hard = state.custom.some((id) => byId[id] && byId[id].set > state.difficulty);
  return hard ? "Includes chords above your difficulty." : "Your loop, in this order.";
}

function peekNextId() {
  const chords = progression();
  if (!chords.length) return null;
  if (cursor.chord < chords.length - 1) return chords[cursor.chord + 1].id;
  const limit = stretchLimit();
  const finishing = limit !== Infinity && cursor.loops + 1 >= limit;
  if (finishing && state.mode === "mix" && mixOrder.length > 1) {
    const song = songById[mixOrder[(mixPos + 1) % mixOrder.length]];
    return song ? song.chords[0] : chords[0].id;
  }
  if (finishing && state.mode === "random" && state.nextRandomIds.length) return state.nextRandomIds[0];
  return chords[0].id;
}

function makeCycle(n) {
  const pool = poolChords();
  const out = [];
  let guard = 0;
  while (out.length < n && pool.length && guard++ < 80) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (out.length && out[out.length - 1].id === pick.id && pool.length > 1) continue;
    out.push(pick);
  }
  return out.map((c) => c.id);
}

function pickPattern(avoidSame) {
  const pool = PATTERNS.filter((p) => state.pool.includes(p.id));
  if (!pool.length) return;
  let choices = pool;
  if (avoidSame && pool.length > 1) choices = pool.filter((p) => p.id !== state.activePattern);
  state.activePattern = choices[Math.floor(Math.random() * choices.length)].id;
}

function randomTempo() {
  const choices = TEMPOS.filter((t) => t !== state.bpm);
  state.bpm = (choices.length ? choices : TEMPOS)[Math.floor(Math.random() * (choices.length || TEMPOS.length))];
}

function rebuildMix(keepCurrent) {
  const ids = playableSongs().map((s) => s.id);
  if (!ids.length) {
    mixOrder = [];
    mixPos = 0;
    state.mixSongId = null;
    return;
  }
  const current = keepCurrent && ids.includes(state.mixSongId) ? state.mixSongId : null;
  mixOrder = current ? [current, ...shuffle(ids.filter((id) => id !== current))] : shuffle(ids);
  mixPos = 0;
  state.mixSongId = mixOrder[0];
}

function sanitizeRandom() {
  const allowed = new Set(poolChords().map((c) => c.id));
  const ok = (ids) => ids.length && ids.every((id) => allowed.has(id));
  if (!ok(state.randomIds)) state.randomIds = makeCycle(state.randomLength);
  if (!ok(state.nextRandomIds)) state.nextRandomIds = makeCycle(state.randomLength);
}

function clampCursor() {
  const n = progression().length;
  if (!n) {
    cursor.chord = 0;
    return;
  }
  if (cursor.chord >= n) cursor.chord = 0;
}

function onStretchChanged() {
  if (state.patternMode === "rotate") pickPattern(true);
  if (state.varyTempo && (state.mode === "mix" || state.mode === "random")) randomTempo();
  cursor.chord = 0;
  cursor.bar = 0;
  cursor.step = 0;
  cursor.loops = 0;
}

function advanceMix() {
  if (!mixOrder.length) return;
  mixPos = (mixPos + 1) % mixOrder.length;
  state.mixSongId = mixOrder[mixPos];
  onStretchChanged();
}

function onBarEnd() {
  cursor.bar += 1;
  if (cursor.bar < state.barsPerChord) return;
  cursor.bar = 0;
  const chords = progression();
  if (!chords.length) return;
  cursor.chord += 1;
  if (cursor.chord < chords.length) return;
  cursor.chord = 0;
  cursor.loops += 1;
  const limit = stretchLimit();
  if (limit === Infinity || cursor.loops < limit) {
    if (limit === Infinity) cursor.loops = 0;
    return;
  }
  cursor.loops = 0;
  if (state.mode === "mix") advanceMix();
  else if (state.mode === "random") {
    state.randomIds = state.nextRandomIds.length ? state.nextRandomIds : makeCycle(state.randomLength);
    state.nextRandomIds = makeCycle(state.randomLength);
    onStretchChanged();
  } else if (state.patternMode === "rotate") {
    pickPattern(true);
  }
}

function holdSeconds() {
  const seconds = (state.barsPerChord * 4 * 60) / state.bpm;
  const rounded = seconds >= 10 ? Math.round(seconds) : Math.round(seconds * 10) / 10;
  return "About " + rounded + " seconds on each chord.";
}

function load() {
  let raw = null;
  try {
    raw = JSON.parse(localStorage.getItem(KEY) || "null");
  } catch (e) {
    raw = null;
  }
  if (!raw || typeof raw !== "object") return;
  if ([1, 2, 3, 4].includes(raw.difficulty)) state.difficulty = raw.difficulty;
  if (Number.isFinite(raw.bpm)) state.bpm = clamp(Math.round(raw.bpm), 52, 120);
  if (typeof raw.varyTempo === "boolean") state.varyTempo = raw.varyTempo;
  if ([1, 2, 4].includes(raw.barsPerChord)) state.barsPerChord = raw.barsPerChord;
  if (raw.patternMode === "one" || raw.patternMode === "rotate") state.patternMode = raw.patternMode;
  if (patternById[raw.patternId]) state.patternId = raw.patternId;
  if (Array.isArray(raw.pool)) {
    const pool = raw.pool.filter((id) => patternById[id]);
    if (pool.length) state.pool = pool;
  }
  if (["mix", "song", "one", "random", "custom"].includes(raw.mode)) state.mode = raw.mode;
  if (songById[raw.songId]) state.songId = raw.songId;
  if (songById[raw.mixSongId]) state.mixSongId = raw.mixSongId;
  if (byId[raw.chordId]) state.chordId = raw.chordId;
  if ([1, 2, 4, 8].includes(raw.every)) state.every = raw.every;
  if ([2, 3, 4].includes(raw.randomLength)) state.randomLength = raw.randomLength;
  if (Array.isArray(raw.custom)) {
    const custom = raw.custom.filter((id) => byId[id]);
    if (custom.length) state.custom = custom;
  }
  if (typeof raw.sound === "boolean") state.sound = raw.sound;
  if (typeof raw.countIn === "boolean") state.countIn = raw.countIn;
  if (typeof raw.leftHanded === "boolean") state.leftHanded = raw.leftHanded;
}

function save() {
  const data = {
    difficulty: state.difficulty,
    bpm: state.bpm,
    varyTempo: state.varyTempo,
    barsPerChord: state.barsPerChord,
    patternMode: state.patternMode,
    patternId: state.patternId,
    pool: state.pool,
    mode: state.mode,
    songId: state.songId,
    mixSongId: state.mixSongId,
    chordId: state.chordId,
    every: state.every,
    randomLength: state.randomLength,
    custom: state.custom,
    sound: state.sound,
    countIn: state.countIn,
    leftHanded: state.leftHanded,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    /* private mode */
  }
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function fretWindow(chord) {
  const fretted = chord.frets.filter((f) => f > 0);
  if (!fretted.length) return 1;
  const max = Math.max(...fretted);
  const min = Math.min(...fretted);
  return max <= 4 ? 1 : min;
}

function describe(chord) {
  const bits = chord.frets.map((fret, i) => {
    if (fret < 0) return STRING_NAMES[i] + " skipped";
    if (fret === 0) return STRING_NAMES[i] + " open";
    return STRING_NAMES[i] + " fret " + fret + " finger " + chord.fingers[i];
  });
  return chord.name + ". " + bits.join(", ") + ".";
}

function barreCovers(chord, stringIndex) {
  return (chord.barres || []).some(
    (b) =>
      stringIndex >= b.from &&
      stringIndex <= b.to &&
      b.fret === chord.frets[stringIndex] &&
      b.finger === chord.fingers[stringIndex]
  );
}

function diagramSvg(chord, left) {
  const start = fretWindow(chord);
  const fretsShown = 4;
  const W = 260;
  const leftPad = 46;
  const rightPad = 18;
  const nutY = 44;
  const fretH = 46;
  const bottom = 28;
  const H = nutY + fretsShown * fretH + bottom;
  const gap = (W - leftPad - rightPad) / 5;
  const xOf = (stringIndex) => leftPad + (left ? 5 - stringIndex : stringIndex) * gap;
  const parts = [];
  parts.push(
    `<rect x="${leftPad}" y="${nutY}" width="${5 * gap}" height="${fretsShown * fretH}" fill="#f3ead4"/>`
  );
  for (const fret of [3, 5, 7, 9]) {
    if (fret < start || fret >= start + fretsShown) continue;
    const y = nutY + (fret - start) * fretH + fretH / 2;
    const x = leftPad + 2.5 * gap;
    parts.push(`<circle cx="${x}" cy="${y}" r="4" fill="rgba(6,57,73,0.18)"/>`);
  }
  for (let s = 0; s < 6; s++) {
    const x = xOf(s);
    const width = (2.6 - s * 0.28).toFixed(2);
    const mute = chord.frets[s] < 0 ? ' opacity="0.28"' : "";
    parts.push(
      `<line x1="${x}" y1="${nutY}" x2="${x}" y2="${nutY + fretsShown * fretH}" stroke="#063949" stroke-width="${width}"${mute}/>`
    );
  }
  for (let i = 0; i <= fretsShown; i++) {
    const y = nutY + i * fretH;
    const thick = i === 0 && start === 1;
    parts.push(
      `<line x1="${leftPad}" y1="${y}" x2="${leftPad + 5 * gap}" y2="${y}" stroke="#063949" stroke-width="${thick ? 6 : 2}"/>`
    );
  }
  if (start > 1) {
    parts.push(
      `<text x="8" y="${nutY + fretH / 2}" fill="#063949" font-size="13" font-weight="700" dominant-baseline="middle">${start}fr</text>`
    );
  }
  for (const b of chord.barres || []) {
    if (b.fret < start || b.fret >= start + fretsShown) continue;
    const x1 = xOf(b.from);
    const x2 = xOf(b.to);
    const y = nutY + (b.fret - start) * fretH + fretH / 2;
    const h = 20;
    const leftX = Math.min(x1, x2);
    const width = Math.abs(x2 - x1);
    parts.push(
      `<rect x="${leftX}" y="${y - h / 2}" width="${width}" height="${h}" rx="10" fill="#10242c"/>`
    );
    parts.push(
      `<text x="${(x1 + x2) / 2}" y="${y}" fill="#f5f0e6" font-size="13" font-weight="800" text-anchor="middle" dominant-baseline="middle">${b.finger}</text>`
    );
  }
  for (let s = 0; s < 6; s++) {
    const fret = chord.frets[s];
    const finger = chord.fingers[s];
    const x = xOf(s);
    if (fret < 0) {
      parts.push(
        `<text x="${x}" y="22" fill="#b42318" font-size="16" font-weight="800" text-anchor="middle">×</text>`
      );
    } else if (fret === 0) {
      parts.push(
        `<circle cx="${x}" cy="20" r="7" fill="none" stroke="#063949" stroke-width="2"/>`
      );
    } else if (!barreCovers(chord, s)) {
      const y = nutY + (fret - start) * fretH + fretH / 2;
      parts.push(`<circle cx="${x}" cy="${y}" r="12" fill="#10242c"/>`);
      parts.push(
        `<text x="${x}" y="${y}" fill="#f5f0e6" font-size="13" font-weight="800" text-anchor="middle" dominant-baseline="middle">${finger}</text>`
      );
    }
    parts.push(
      `<text x="${x}" y="${H - 10}" fill="#063949" font-size="12" font-weight="700" text-anchor="middle">${STRING_NAMES[s]}</text>`
    );
  }
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(describe(chord))}" data-frets="${chord.frets.join(",")}">${parts.join("")}</svg>`;
}

function viewFromCursor() {
  const chords = progression();
  clampCursor();
  const chord = chords[cursor.chord] || null;
  return {
    sequence: chords.map((c) => c.name),
    index: chord ? cursor.chord : -1,
    chordId: chord ? chord.id : null,
    nextId: chord ? peekNextId() : null,
    patternId: currentPattern().id,
    title: kickerNow(),
    detail: detailNow(),
    pass: cursor.loops + 1,
    bar: cursor.bar + 1,
    step: -1,
    dir: null,
    count: 0,
  };
}

function paint(view) {
  lastView = view;
  const chord = view.chordId ? byId[view.chordId] : null;
  const next = view.nextId ? byId[view.nextId] : null;
  const pattern = patternById[view.patternId] || currentPattern();
  $("kicker").textContent = view.title || "";
  $("detail").textContent = view.detail || "";
  const limit = stretchLimit();
  const bits = [];
  if (view.count) bits.push("Count-in");
  else {
    if (limit !== Infinity) bits.push("Pass " + view.pass + " of " + limit);
    if (chord) bits.push("Bar " + view.bar + " of " + state.barsPerChord);
  }
  $("status").textContent = bits.join(" · ");

  const prog = $("prog");
  prog.replaceChildren();
  view.sequence.forEach((name, i) => {
    if (i) prog.append(" · ");
    const span = document.createElement("span");
    span.textContent = name;
    if (i === view.index) span.className = "is-on";
    prog.append(span);
  });

  const empty = $("empty");
  const leftChanged = shownLeft !== state.leftHanded;
  if (!chord) {
    empty.hidden = false;
    empty.textContent =
      state.mode === "custom" ? "Add at least one chord to your cycle." : "Nothing to play at this difficulty.";
    $("chord-name").textContent = "—";
    $("diagram").innerHTML = "";
    $("next-block").hidden = true;
    shownChord = "";
    shownNext = "";
  } else {
    empty.hidden = true;
    const nameEl = $("chord-name");
    nameEl.textContent = chord.name;
    nameEl.classList.toggle("long", chord.name.length > 4);
    const nameKey = chord.id + ":" + view.index;
    if (lastName && lastName !== nameKey) {
      nameEl.classList.remove("hit");
      void nameEl.offsetWidth;
      nameEl.classList.add("hit");
    }
    lastName = nameKey;
    if (shownChord !== chord.id || leftChanged) {
      $("diagram").innerHTML = diagramSvg(chord, state.leftHanded);
      shownChord = chord.id;
    }
    const showNext = next && view.sequence.length > 1;
    $("next-block").hidden = !showNext;
    if (showNext) {
      $("next-name").textContent = next.name;
      const same = next.id === chord.id;
      $("next-diagram").hidden = same;
      if (!same && (shownNext !== next.id || leftChanged)) {
        $("next-diagram").innerHTML = diagramSvg(next, state.leftHanded);
        shownNext = next.id;
      }
      const lastBar = !view.count && view.bar === state.barsPerChord;
      $("next-block").classList.toggle("imminent", lastBar);
    }
  }
  shownLeft = state.leftHanded;

  const strum = $("strum-now");
  strum.classList.remove("down", "up", "rest", "wait", "count");
  if (view.count) {
    strum.classList.add("count");
    $("strum-arrow").textContent = String(view.count);
    $("strum-word").textContent = "Count";
  } else if (view.dir === "D" || view.dir === "U") {
    strum.classList.add(view.dir === "D" ? "down" : "up");
    $("strum-arrow").textContent = view.dir === "D" ? "↓" : "↑";
    $("strum-word").textContent = view.dir === "D" ? "Down" : "Up";
  } else if (view.dir === "-") {
    strum.classList.add("rest");
    $("strum-arrow").textContent = "·";
    $("strum-word").textContent = "Rest";
  } else {
    strum.classList.add("wait");
    $("strum-arrow").textContent = "↓";
    $("strum-word").textContent = state.playing ? "…" : "Ready";
  }

  $("pattern-name").textContent = pattern.name;
  const strip = $("strip");
  strip.replaceChildren();
  pattern.steps.forEach((step, i) => {
    const el = document.createElement("span");
    el.className = "step " + (step.dir === "D" ? "down" : step.dir === "U" ? "up" : "rest");
    if (i === view.step) el.classList.add("is-on");
    el.style.flex = String(step.beats);
    el.textContent = step.dir === "D" ? "↓" : step.dir === "U" ? "↑" : "·";
    strip.append(el);
  });

  if (document.activeElement !== $("bpm")) $("bpm").value = String(state.bpm);
  $("bpm-out").textContent = String(state.bpm);
  $("hold-hint").textContent = holdSeconds();
  const songs = playableSongs();
  const songIndex = songs.findIndex((s) => s.id === state.mixSongId);
  const after = songs.length > 1 && state.mode === "mix" ? mixOrder[(mixPos + 1) % mixOrder.length] : null;
  $("up-next").textContent = after && songById[after] ? "After this: " + songById[after].title : "";
  if (songIndex < 0 && state.mode === "mix") $("up-next").textContent = "";
}

function setPressed(container, attr, value) {
  container.querySelectorAll("button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset[attr] === String(value)));
  });
}

function fillGrouped(select, chords, current) {
  select.replaceChildren();
  for (const set of SETS) {
    const group = chords.filter((c) => c.set === set.id);
    if (!group.length) continue;
    const og = document.createElement("optgroup");
    og.label = "Set " + set.id + " · " + set.name;
    for (const c of group) {
      const o = document.createElement("option");
      o.value = c.id;
      o.textContent = c.menu || c.name;
      og.append(o);
    }
    select.append(og);
  }
  const values = [...select.options].map((o) => o.value);
  if (values.includes(current)) select.value = current;
  else if (values[0]) select.value = values[0];
}

function renderCustom() {
  const list = $("custom-list");
  list.replaceChildren();
  state.custom.forEach((id, i) => {
    const chord = byId[id];
    if (!chord) return;
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.className = "name";
    name.textContent = chord.menu || chord.name;
    li.append(name);
    for (const [act, label] of [["up", "↑"], ["down", "↓"], ["x", "×"]]) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.act = act;
      btn.dataset.i = String(i);
      btn.textContent = label;
      btn.setAttribute("aria-label", act + " " + chord.name);
      li.append(btn);
    }
    list.append(li);
  });
  $("custom-empty").hidden = state.custom.length > 0;
}

function renderControls() {
  $("play").textContent = state.playing ? "Pause" : "Play";
  $("play").setAttribute("aria-pressed", String(state.playing));
  $("play").disabled = progression().length === 0;
  $("next-chord").disabled = progression().length < 2;
  $("next-song").hidden = state.mode !== "mix";
  $("next-song").disabled = mixOrder.length < 2;

  setPressed($("bars"), "bars", state.barsPerChord);
  setPressed($("pattern-mode"), "patternMode", state.patternMode);
  setPressed($("difficulty"), "diff", state.difficulty);

  const pool = $("pool");
  pool.hidden = state.patternMode !== "rotate";
  pool.replaceChildren();
  for (const pattern of PATTERNS) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = pattern.id;
    input.checked = state.pool.includes(pattern.id);
    label.append(input, document.createTextNode(pattern.name));
    pool.append(label);
  }
  $("one-pattern-wrap").hidden = state.patternMode !== "one";
  const onePattern = $("one-pattern");
  if (!onePattern.options.length) {
    for (const pattern of PATTERNS) {
      const o = document.createElement("option");
      o.value = pattern.id;
      o.textContent = pattern.name;
      onePattern.append(o);
    }
  }
  onePattern.value = state.patternId;

  $("mode").value = state.mode;
  $("every").value = String(state.every);
  const showEvery =
    state.mode === "mix" ||
    state.mode === "random" ||
    ((state.mode === "song" || state.mode === "custom" || state.mode === "one") && state.patternMode === "rotate");
  $("every-wrap").hidden = !showEvery;
  $("every-label").textContent =
    state.mode === "mix" ? "Next song every" : state.mode === "random" ? "New chords every" : "New strum every";

  $("mode-song").hidden = state.mode !== "song";
  $("mode-one").hidden = state.mode !== "one";
  $("mode-random").hidden = state.mode !== "random";
  $("mode-custom").hidden = state.mode !== "custom";

  const songSelect = $("song");
  const songs = playableSongs();
  songSelect.replaceChildren();
  for (const song of songs) {
    const o = document.createElement("option");
    o.value = song.id;
    o.textContent = song.title;
    songSelect.append(o);
  }
  if (songs.some((s) => s.id === state.songId)) songSelect.value = state.songId;

  fillGrouped($("one-chord"), menuChords(), state.chordId);
  if ($("one-chord").value) state.chordId = $("one-chord").value;
  fillGrouped($("custom-chord"), menuChords(), $("custom-chord").value);
  $("random-length").value = String(state.randomLength);
  renderCustom();

  const setList = $("set-list");
  setList.replaceChildren();
  for (const set of SETS) {
    const li = document.createElement("li");
    li.className = set.id <= state.difficulty ? "on" : "off";
    const title = document.createElement("strong");
    title.textContent = "Set " + set.id + " · " + set.name;
    const names = document.createElement("span");
    names.textContent = CHORDS.filter((c) => c.set === set.id).map((c) => c.menu || c.name).join("  ");
    const blurb = document.createElement("small");
    blurb.textContent = set.blurb;
    li.append(title, names, blurb);
    setList.append(li);
  }

  $("vary-tempo").checked = state.varyTempo;
  $("vary-tempo").disabled = !(state.mode === "mix" || state.mode === "random");
  $("sound").checked = state.sound;
  $("count-in").checked = state.countIn;
  $("lefty").checked = state.leftHanded;
  $("bpm").value = String(state.bpm);
  $("bpm-out").textContent = String(state.bpm);
  $("hold-hint").textContent = holdSeconds();
}

function resetTransport() {
  cursor.chord = 0;
  cursor.bar = 0;
  cursor.step = 0;
  cursor.loops = 0;
  cursor.countLeft = 0;
  uiEvents = [];
  silence();
  shownChord = "";
  shownNext = "";
  if (state.playing && audioCtx) cursor.nextTime = audioCtx.currentTime + 0.08;
}

function scheduleClick(time, dir) {
  if (!state.sound || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const accent = dir === "D" || dir === "count";
  osc.frequency.value = dir === "U" ? 660 : dir === "-" ? 300 : dir === "count" ? 520 : 880;
  gain.gain.setValueAtTime(dir === "-" ? 0.025 : accent ? 0.12 : 0.07, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  osc.start(time);
  osc.stop(time + 0.06);
  liveNodes.push(osc);
  osc.onended = () => {
    const i = liveNodes.indexOf(osc);
    if (i >= 0) liveNodes.splice(i, 1);
  };
}

function silence() {
  for (const node of liveNodes) {
    try { node.stop(); } catch (e) { /* already stopped */ }
  }
  liveNodes = [];
}

function pushEvent(extra) {
  const chords = progression();
  const index = chords.length ? Math.min(cursor.chord, chords.length - 1) : -1;
  const chord = index >= 0 ? chords[index] : null;
  uiEvents.push({
    sequence: chords.map((c) => c.name),
    index,
    chordId: chord ? chord.id : null,
    nextId: chord ? peekNextId() : null,
    patternId: currentPattern().id,
    title: kickerNow(),
    detail: detailNow(),
    pass: cursor.loops + 1,
    bar: cursor.bar + 1,
    step: -1,
    dir: null,
    count: 0,
    time: cursor.nextTime,
    ...extra,
  });
}

function fireStep() {
  if (cursor.countLeft > 0) {
    const count = 5 - cursor.countLeft;
    pushEvent({ count, dir: "count", step: -1 });
    scheduleClick(cursor.nextTime, "count");
    cursor.nextTime += 60 / state.bpm;
    cursor.countLeft -= 1;
    return;
  }
  const pattern = currentPattern();
  if (cursor.step >= pattern.steps.length) cursor.step = 0;
  const step = pattern.steps[cursor.step];
  pushEvent({ step: cursor.step, dir: step.dir, count: 0 });
  scheduleClick(cursor.nextTime, step.dir);
  cursor.nextTime += step.beats * (60 / state.bpm);
  cursor.step += 1;
  if (cursor.step >= pattern.steps.length) {
    cursor.step = 0;
    onBarEnd();
  }
}

function scheduler() {
  if (!state.playing || !audioCtx) return;
  const now = audioCtx.currentTime;
  if (cursor.nextTime < now - 0.25) cursor.nextTime = now + 0.05;
  let guard = 0;
  while (cursor.nextTime < now + 0.15 && guard++ < 6) fireStep();
  timer = setTimeout(scheduler, 25);
}

function frame() {
  if (!state.playing || !audioCtx) return;
  const now = audioCtx.currentTime;
  let latest = null;
  while (uiEvents.length && uiEvents[0].time <= now) latest = uiEvents.shift();
  if (latest) paint(latest);
  raf = requestAnimationFrame(frame);
}

async function ensureAudio() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") await audioCtx.resume();
}

let starting = false;
async function play() {
  if (state.playing || starting || !progression().length) return;
  starting = true;
  await ensureAudio();
  starting = false;
  if (state.playing) return;
  state.playing = true;
  cursor.countLeft = !resumed && state.countIn ? 4 : 0;
  resumed = true;
  if (cursor.nextTime < audioCtx.currentTime + 0.05) cursor.nextTime = audioCtx.currentTime + 0.08;
  $("play").textContent = "Pause";
  $("play").setAttribute("aria-pressed", "true");
  scheduler();
  raf = requestAnimationFrame(frame);
}

function pause() {
  state.playing = false;
  clearTimeout(timer);
  cancelAnimationFrame(raf);
  silence();
  if (audioCtx && audioCtx.state === "running") audioCtx.suspend();
  const now = audioCtx ? audioCtx.currentTime : 0;
  uiEvents = uiEvents.filter((ev) => ev.time <= now);
  $("play").textContent = "Play";
  $("play").setAttribute("aria-pressed", "false");
}

function togglePlay() {
  if (state.playing) pause();
  else play();
}

function restart() {
  const was = state.playing;
  pause();
  resumed = false;
  resetTransport();
  paint(viewFromCursor());
  if (was) play();
}

function jumpChord(delta) {
  const chords = progression();
  if (chords.length < 2) return;
  cursor.chord = (cursor.chord + delta + chords.length) % chords.length;
  cursor.bar = 0;
  cursor.step = 0;
  uiEvents = [];
  silence();
  if (state.playing && audioCtx) cursor.nextTime = audioCtx.currentTime + 0.06;
  paint(viewFromCursor());
}

function jumpSong() {
  if (state.mode !== "mix" || mixOrder.length < 2) return;
  advanceMix();
  uiEvents = [];
  silence();
  if (state.playing && audioCtx) cursor.nextTime = audioCtx.currentTime + 0.06;
  paint(viewFromCursor());
  save();
}

function bind() {
  $("play").addEventListener("click", togglePlay);
  $("restart").addEventListener("click", restart);
  $("next-chord").addEventListener("click", () => jumpChord(1));
  $("next-song").addEventListener("click", jumpSong);

  $("bpm").addEventListener("input", () => {
    state.bpm = Number($("bpm").value);
    $("bpm-out").textContent = String(state.bpm);
    $("hold-hint").textContent = holdSeconds();
    save();
  });
  $("vary-tempo").addEventListener("change", () => {
    state.varyTempo = $("vary-tempo").checked;
    save();
  });
  $("bars").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    state.barsPerChord = Number(btn.dataset.bars);
    save();
    renderControls();
    if (!state.playing) paint(viewFromCursor());
  });
  $("pattern-mode").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    state.patternMode = btn.dataset.patternMode;
    if (state.patternMode === "one") state.patternId = state.activePattern;
    else if (!state.pool.includes(state.activePattern)) pickPattern(false);
    save();
    renderControls();
    if (!state.playing) paint(viewFromCursor());
  });
  $("pool").addEventListener("change", (e) => {
    const box = e.target;
    if (!box.value) return;
    if (box.checked) {
      if (!state.pool.includes(box.value)) state.pool.push(box.value);
    } else if (state.pool.length > 1) {
      state.pool = state.pool.filter((id) => id !== box.value);
      if (state.activePattern === box.value) pickPattern(false);
    } else {
      box.checked = true;
    }
    save();
  });
  $("one-pattern").addEventListener("change", () => {
    state.patternId = $("one-pattern").value;
    state.activePattern = state.patternId;
    save();
    if (!state.playing) paint(viewFromCursor());
  });
  $("mode").addEventListener("change", () => {
    state.mode = $("mode").value;
    if (state.mode === "random") sanitizeRandom();
    resetTransport();
    resumed = false;
    save();
    renderControls();
    paint(viewFromCursor());
  });
  $("every").addEventListener("change", () => {
    state.every = Number($("every").value);
    save();
    if (!state.playing) paint(viewFromCursor());
  });
  $("song").addEventListener("change", () => {
    state.songId = $("song").value;
    resetTransport();
    resumed = false;
    save();
    paint(viewFromCursor());
  });
  $("one-chord").addEventListener("change", () => {
    state.chordId = $("one-chord").value;
    resetTransport();
    resumed = false;
    save();
    paint(viewFromCursor());
  });
  $("random-length").addEventListener("change", () => {
    state.randomLength = Number($("random-length").value);
    state.randomIds = makeCycle(state.randomLength);
    state.nextRandomIds = makeCycle(state.randomLength);
    resetTransport();
    resumed = false;
    save();
    renderControls();
    paint(viewFromCursor());
  });
  $("reshuffle").addEventListener("click", () => {
    state.randomIds = makeCycle(state.randomLength);
    state.nextRandomIds = makeCycle(state.randomLength);
    if (state.patternMode === "rotate") pickPattern(true);
    if (state.varyTempo) randomTempo();
    resetTransport();
    resumed = false;
    save();
    renderControls();
    paint(viewFromCursor());
  });
  $("custom-add").addEventListener("click", () => {
    const id = $("custom-chord").value;
    if (!id) return;
    state.custom.push(id);
    uiEvents = [];
    silence();
    if (state.playing && audioCtx) cursor.nextTime = audioCtx.currentTime + 0.06;
    save();
    renderControls();
    paint(viewFromCursor());
  });
  $("custom-clear").addEventListener("click", () => {
    state.custom = [];
    resetTransport();
    resumed = false;
    save();
    renderControls();
    paint(viewFromCursor());
  });
  $("custom-list").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const i = Number(btn.dataset.i);
    const act = btn.dataset.act;
    if (act === "up" && i > 0) [state.custom[i - 1], state.custom[i]] = [state.custom[i], state.custom[i - 1]];
    if (act === "down" && i < state.custom.length - 1) {
      [state.custom[i + 1], state.custom[i]] = [state.custom[i], state.custom[i + 1]];
    }
    if (act === "x") state.custom.splice(i, 1);
    clampCursor();
    uiEvents = [];
    silence();
    if (state.playing && audioCtx) cursor.nextTime = audioCtx.currentTime + 0.06;
    save();
    renderControls();
    paint(viewFromCursor());
  });
  $("difficulty").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const prevSong = state.mode === "mix" ? state.mixSongId : state.songId;
    state.difficulty = Number(btn.dataset.diff);
    rebuildMix(true);
    const songs = playableSongs();
    if (!songs.some((s) => s.id === state.songId)) state.songId = songs[0] ? songs[0].id : "";
    const allowed = menuChords();
    if (!allowed.some((c) => c.id === state.chordId) && allowed[0]) state.chordId = allowed[0].id;
    sanitizeRandom();
    const songChanged =
      (state.mode === "mix" && state.mixSongId !== prevSong) ||
      (state.mode === "song" && state.songId !== prevSong);
    if (songChanged) {
      resetTransport();
      resumed = false;
    } else {
      clampCursor();
    }
    save();
    renderControls();
    if (!state.playing || songChanged) paint(viewFromCursor());
  });
  $("sound").addEventListener("change", () => {
    state.sound = $("sound").checked;
    save();
  });
  $("count-in").addEventListener("change", () => {
    state.countIn = $("count-in").checked;
    save();
  });
  $("lefty").addEventListener("change", () => {
    state.leftHanded = $("lefty").checked;
    shownChord = "";
    shownNext = "";
    save();
    paint(lastView || viewFromCursor());
  });

  document.addEventListener("keydown", (e) => {
    if (e.code !== "Space" && e.key !== " ") return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || tag === "BUTTON" || tag === "A") return;
    e.preventDefault();
    togglePlay();
  });
}

function renderDifficultyButtons() {
  const wrap = $("difficulty");
  for (const set of SETS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.diff = String(set.id);
    btn.textContent = String(set.id);
    btn.title = set.name;
    wrap.append(btn);
  }
}

function init() {
  validate();
  load();
  renderDifficultyButtons();
  rebuildMix(true);
  sanitizeRandom();
  if (state.patternMode === "rotate") pickPattern(false);
  else state.activePattern = state.patternId;
  const songs = playableSongs();
  if (state.songId && !songs.some((s) => s.id === state.songId) && songs[0]) state.songId = songs[0].id;
  bind();
  renderControls();
  paint(viewFromCursor());
}

if (typeof document === "undefined") {
  validate();
  const saved = state.difficulty;
  for (const d of [1, 2, 3, 4]) {
    state.difficulty = d;
    console.log(d, playableSongs().map((s) => s.title).join(" | "));
  }
  state.difficulty = saved;
  state.mode = "song";
  state.songId = "heaven";
  state.difficulty = 1;
  state.barsPerChord = 2;
  state.patternMode = "one";
  cursor.chord = 0;
  cursor.bar = 0;
  cursor.loops = 0;
  const seen = [];
  for (let i = 0; i < 8; i++) {
    seen.push(progression()[cursor.chord].id);
    onBarEnd();
  }
  const expect = ["G", "G", "D", "D", "Am", "Am", "G", "G"];
  if (seen.join() !== expect.join()) throw new Error("cycle " + seen.join(" "));
  console.log("ok", CHORDS.length, "chords", SONGS.length, "songs");
} else {
  init();
}

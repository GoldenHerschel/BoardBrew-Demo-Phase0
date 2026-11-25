// Automated tests for the player filter and booking times (QA 1).
// Run from the repo folder:  node --test
// Needs only Node 18+. No installs.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Load the site's own scripts the way the browser does.
const ctx = vm.createContext({});
for (const f of ["public/config.js", "public/data.js", "public/rules.js"]) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", f), "utf8"), ctx, { filename: f });
}
const get = (name) => vm.runInContext(name, ctx);
const GAMES = get("GAMES");
const R = get("CONFIG").reservations;
const fitsPlayers = get("fitsPlayers");
const bookingProblem = get("bookingProblem");
const at = (s) => { const [d, t] = s.split("T"); const [y, mo, da] = d.split("-").map(Number); const [h, mi] = t.split(":").map(Number); return new Date(y, mo - 1, da, h, mi); };
const count = (n) => GAMES.filter((g) => fitsPlayers(g, n)).length;

/* ---------- Player filter ---------- */
test("TC-PF-01: 'Any' shows every game", () => {
  assert.equal(count(0), GAMES.length);
});
test("TC-PF-02: a game fits at its minimum and maximum player count", () => {
  assert.ok(fitsPlayers(["Catan", 3, 4], 3));
  assert.ok(fitsPlayers(["Catan", 3, 4], 4));
});
test("TC-PF-03: a game doesn't fit below its minimum or above its maximum", () => {
  assert.ok(!fitsPlayers(["Catan", 3, 4], 2));
  assert.ok(!fitsPlayers(["Catan", 3, 4], 5));
});
test("TC-PF-04: '12+' only shows games for 12 or more players", () => {
  const big = GAMES.filter((g) => fitsPlayers(g, 12));
  assert.ok(big.length > 0);
  assert.ok(big.every((g) => g[2] >= 12));
});
test("TC-PF-05: solo games show for 1 player (e.g. Rubik's Cubes)", () => {
  assert.ok(GAMES.filter((g) => fitsPlayers(g, 1)).some((g) => g[0] === "Rubik's Cubes"));
});
test("TC-PF-06: every game has a sensible player range", () => {
  for (const g of GAMES) assert.ok(g[1] >= 1 && g[2] >= g[1], `${g[0]}: ${g[1]}–${g[2]}`);
});

/* ---------- Booking times ---------- */
test("TC-BT-01: exactly 2 hours ahead is allowed (9:00 → 11:00)", () => {
  assert.equal(bookingProblem("2026-11-25", 11 * 60, at("2026-11-25T09:00"), R), "");
});
test("TC-BT-02: exactly 2 hours ahead still works a few seconds into the minute", () => {
  const now = at("2026-11-25T09:00"); now.setSeconds(45);
  assert.equal(bookingProblem("2026-11-25", 11 * 60, now, R), "");
});
test("TC-BT-03: less than 2 hours ahead is refused (9:01 → 11:00)", () => {
  assert.equal(bookingProblem("2026-11-25", 11 * 60, at("2026-11-25T09:01"), R), "too-soon");
});
test("TC-BT-04: earliest slot is 8:00 AM, latest is 12:00 midnight", () => {
  const now = at("2026-11-24T08:00");
  assert.equal(bookingProblem("2026-11-25", 8 * 60, now, R), "");
  assert.equal(bookingProblem("2026-11-25", 24 * 60, now, R), "");
  assert.equal(bookingProblem("2026-11-25", 7 * 60 + 30, now, R), "outside-hours");
});
test("TC-BT-05: at 10:00 PM, midnight is exactly 2 hours away and allowed", () => {
  assert.equal(bookingProblem("2026-11-25", 24 * 60, at("2026-11-25T22:00"), R), "");
});
test("TC-BT-06: at 10:30 PM nothing is left today", () => {
  assert.equal(bookingProblem("2026-11-25", 24 * 60, at("2026-11-25T22:30"), R), "too-soon");
});
test("TC-BT-07: a past date is refused", () => {
  assert.equal(bookingProblem("2026-11-24", 12 * 60, at("2026-11-25T09:00"), R), "too-soon");
});

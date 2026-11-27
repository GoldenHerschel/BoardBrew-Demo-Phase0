/* =====================================================================
   Booking and game-filter rules, kept free of page code so they can be
   tested on their own (see tests/rules.test.js).
   ===================================================================== */

// Does a game [name, min, max] fit a group of n players? 0 = any. 12 means "12 or more".
function fitsPlayers(game, n) {
  if (!n) return true;
  if (n >= 12) return game[2] >= 12;
  return game[1] <= n && game[2] >= n;
}

// Earliest moment a table can be booked for: now + lead hours, with seconds dropped.
// Dropping seconds is what lets a slot exactly 2 hours away count (9:00 → 11:00).
function earliestBookable(now, leadHours) {
  const t = new Date(now);
  t.setSeconds(0, 0);
  return new Date(t.getTime() + leadHours * 3600e3);
}

// Date + minutes after midnight → Date (minutes can be 1440 for 12:00 midnight).
function slotToDate(dateStr, min) {
  const [y, mo, d] = dateStr.split("-").map(Number);
  return new Date(y, mo - 1, d, 0, min);
}

// Can someone book this date and time right now? Returns "" if yes, or the reason if not.
function bookingProblem(dateStr, min, now, rules) {
  const first = toMinutes(rules.firstSlot), last = toMinutes(rules.lastSlot);
  if (min < first || min > last) return "outside-hours";
  if (slotToDate(dateStr, min) < earliestBookable(now, rules.leadHours)) return "too-soon";
  return "";
}

function toMinutes(hm) {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

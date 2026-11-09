/* =====================================================================
   BoardBrew site behaviour. Settings live in config.js, content in data.js.
   ===================================================================== */

/* ===== Helpers ===== */
const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const toMin = (hm) => { const [h, m] = hm.split(":").map(Number); return h * 60 + m; };
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function fmtMin(min) {
  const m = ((min % 1440) + 1440) % 1440, h = Math.floor(m / 60), mm = m % 60;
  if (m === 0) return "12:00 midnight";
  return `${h % 12 || 12}:${pad(mm)} ${h < 12 ? "AM" : "PM"}`;
}

/* ===== Clock =====
   All times use BoardBrew's local time (config.js timeZone), whatever the visitor's device is set to.
   QA test clock: add ?now=2026-11-09T23:30 to the page address to pretend it's that time. */
function storeClock(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: CONFIG.timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(d);
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
  return new Date(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
}
const TEST_NOW = (() => {
  const q = new URLSearchParams(location.search).get("now");
  const m = q && q.match(/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)$/);
  return m ? new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5]) : null;
})();
const loadedAt = Date.now();
const now = () => (TEST_NOW ? new Date(TEST_NOW.getTime() + (Date.now() - loadedAt)) : storeClock());
if (TEST_NOW) {
  const bar = document.createElement("div");
  bar.className = "test-clock";
  bar.textContent = `Test clock on: pretending it's ${TEST_NOW.toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}. Remove ?now= from the address to turn it off.`;
  document.body.prepend(bar);
}

/* ===== Links from config (empty link = hidden button) ===== */
document.querySelectorAll("[data-link]").forEach((a) => {
  const url = CONFIG.links[a.dataset.link];
  if (url) a.href = url; else a.hidden = true;
});

/* ===== Feedback labels ===== */
const fb = $("fb");
if (fb) {
  const setReview = (on) => {
    document.body.classList.toggle("review-mode", on);
    fb.setAttribute("aria-pressed", on);
    fb.textContent = on ? "Hide feedback labels" : "Show feedback labels";
    try { localStorage.setItem("bb-review", on ? "1" : "0"); } catch (e) {}
  };
  fb.addEventListener("click", () => setReview(!document.body.classList.contains("review-mode")));
  try { if (localStorage.getItem("bb-review") === "1") setReview(true); } catch (e) {}
}

/* ===== Counts that update themselves ===== */
document.querySelectorAll('[data-count="games"]').forEach((el) => (el.textContent = GAMES.length));

/* ===== Games ===== */
const fits = (g, n) => !n || (n >= 12 ? g[2] >= 12 : g[1] <= n && g[2] >= n);
const gq = $("g-q"), gn = $("g-n"), gs = $("g-sort"), gl = $("g-list"), gm = $("g-meta"), gMore = $("g-more");
let showAllGames = false;
gn.innerHTML = '<option value="0">Any</option>' + Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1}${i === 11 ? "+" : ""} player${i ? "s" : ""}</option>`).join("");
function renderGames() {
  const q = gq.value.trim().toLowerCase(), n = +gn.value, s = gs.value;
  let list = GAMES.filter((g) => fits(g, n) && (!q || g[0].toLowerCase().includes(q)));
  list.sort(s === "min" ? (a, b) => a[1] - b[1] || a[0].localeCompare(b[0])
          : s === "max" ? (a, b) => b[2] - a[2] || a[0].localeCompare(b[0])
          : (a, b) => a[0].localeCompare(b[0]));
  gm.textContent = `${list.length} of ${GAMES.length} games` + (n ? ` for ${n}${n >= 12 ? "+" : ""} player${n > 1 ? "s" : ""}` : "");
  const total = list.length;
  if (!showAllGames && total > 24) list = list.slice(0, 24);
  gMore.hidden = showAllGames || total <= 24;
  gMore.textContent = `Show all ${total} games`;
  gl.innerHTML = list.length
    ? list.map((g) => `<div class="game"><span>${esc(g[0])}</span><span class="pill">${g[1] === g[2] ? g[1] : g[1] + "–" + g[2]} ${g[2] === 1 ? "player" : "players"}</span></div>`).join("")
    : `<div class="empty">No games match. Try another name or group size.</div>`;
}
gMore.addEventListener("click", () => { showAllGames = true; renderGames(); });
[gq, gn, gs].forEach((el) => el.addEventListener("input", () => { showAllGames = false; renderGames(); }));

/* Hero game finder */
let fN = 4;
function renderFinder() {
  $("f-n").textContent = fN + (fN >= 12 ? "+" : "");
  const c = GAMES.filter((g) => fits(g, fN)).length;
  $("f-count").textContent = `${c} games on our shelf fit ${fN}${fN >= 12 ? "+" : ""} player${fN > 1 ? "s" : ""}.`;
}
$("f-minus").onclick = () => { fN = Math.max(1, fN - 1); renderFinder(); };
$("f-plus").onclick = () => { fN = Math.min(12, fN + 1); renderFinder(); };
$("f-go").addEventListener("click", () => { gn.value = String(fN); gq.value = ""; showAllGames = false; renderGames(); });

/* ===== Menu ===== */
const peso = (p) => (p < 0 ? "—" : `₱${p}`);
function groupBy(items) {
  const out = new Map();
  items.forEach((i) => { if (!out.has(i[1])) out.set(i[1], []); out.get(i[1]).push(i); });
  return [...out];
}
const sizedGroup = ([title, items]) => `<div class="m-group"><div class="m-row m-head"><h3>${esc(title)}</h3><span>Pawn</span><span>Queen</span></div>${items.map((i) => `<div class="m-row"><span>${esc(i[0])}</span><span>${peso(i[2])}</span><span>${peso(i[3])}</span></div>`).join("")}</div>`;
const plainGroup = ([title, items]) => `<div class="m-group"><div class="m-row m-head one"><h3>${esc(title)}</h3><span>Price</span></div>${items.map((i) => `<div class="m-row one"><span>${esc(i[0])}</span><span>${peso(i[2])}</span></div>`).join("")}</div>`;
$("m-drinks").innerHTML = groupBy(DRINKS).map(sizedGroup).join("") + groupBy(SHARING).map(plainGroup).join("") + groupBy(DRINK_ADDONS).map(plainGroup).join("");
$("m-food").innerHTML = groupBy(BITES).map(plainGroup).join("") + groupBy(BITE_ADDONS).map(plainGroup).join("");
document.querySelectorAll("[data-tab]").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll("[data-tab]").forEach((t) => {
    const on = t === tab;
    t.setAttribute("aria-selected", on);
    $(t.getAttribute("aria-controls")).hidden = !on;
  });
}));

/* ===== Reservations ===== */
const R = CONFIG.reservations;
const rDate = $("r-date"), rTime = $("r-time"), rPax = $("r-pax"), rHint = $("r-time-hint"), rErr = $("r-err");
const FIRST = toMin(R.firstSlot), LAST = toMin(R.lastSlot);
const SLOTS = []; for (let m = FIRST; m <= LAST; m += R.slotMinutes) SLOTS.push(m);
const slotDate = (dateStr, min) => { const [y, mo, d] = dateStr.split("-").map(Number); return new Date(y, mo - 1, d, 0, min); };
const earliest = () => new Date(now().getTime() + R.leadHours * 3600e3);
$("r-lead").textContent = `${R.leadHours}h`;
$("r-lead-text").textContent = `${R.leadHours} hours`;
$("r-window").textContent = `${fmtMin(FIRST)} to ${fmtMin(LAST)}`;
rPax.innerHTML = Array.from({ length: R.maxGroup }, (_, i) => `<option value="${i + 1}${i === R.maxGroup - 1 ? "+" : ""}" ${i === 3 ? "selected" : ""}>${i + 1}${i === R.maxGroup - 1 ? "+" : ""}</option>`).join("");

function fillTimes() {
  const prev = rTime.value, e = earliest();
  let first = null;
  rTime.innerHTML = SLOTS.map((m) => {
    const ok = !!rDate.value && slotDate(rDate.value, m) >= e;
    if (ok && first === null) first = String(m);
    return `<option value="${m}" ${ok ? "" : "disabled"}>${fmtMin(m)}${ok ? "" : " (too soon)"}</option>`;
  }).join("");
  const prevOk = [...rTime.options].some((o) => o.value === prev && !o.disabled);
  rTime.value = prevOk ? prev : first ?? "";
  rHint.textContent = first === null ? "No times left on this date. Pick another date." : "";
}
(function initDate() {
  const today = new Date(now()); today.setHours(0, 0, 0, 0);
  rDate.min = iso(today);
  const lastToday = slotDate(iso(today), LAST);
  const start = lastToday >= earliest() ? today : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  rDate.value = iso(start);
  fillTimes();
})();
rDate.addEventListener("change", fillTimes);

function bookingFromForm() {
  const name = $("r-name").value.trim(), phone = $("r-phone").value.trim(), notes = $("r-note").value.trim();
  if (!name) throw "Add your name so we know who the table is for.";
  if (!rDate.value || rTime.value === "") throw "Pick a date and time.";
  const min = +rTime.value, when = slotDate(rDate.value, min);
  if (min < FIRST || min > LAST) throw `Reservations are from ${fmtMin(FIRST)} to ${fmtMin(LAST)}.`;
  if (when < earliest()) throw `Reservations need at least ${R.leadHours} hours' notice. Pick a later time, or walk in.`;
  if (!/^(\+?63|0)9\d{9}$/.test(phone.replace(/[\s-]/g, ""))) throw "Add a valid PH mobile number, like 0917 123 4567.";
  return { name, phone, notes, date: rDate.value, time: min === 1440 ? "24:00" : `${pad(Math.floor(min / 60))}:${pad(min % 60)}`, startsAt: `${iso(when)}T${pad(when.getHours())}:${pad(when.getMinutes())}`, groupSize: rPax.value };
}
function bookingMessage(b) {
  const d = slotDate(b.date, 0).toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" });
  const t = b.time === "24:00" ? "12:00 midnight (end of the day)" : fmtMin(toMin(b.time));
  return `Hi BoardBrew! I'd like to reserve a table.\nName: ${b.name}\nDate: ${d}\nTime: ${t}\nGroup size: ${b.groupSize}\nMobile: ${b.phone}` + (b.notes ? `\nNotes: ${b.notes}` : "");
}
function showMessenger(b, intro) {
  $("r-intro").textContent = intro;
  $("r-msg").textContent = bookingMessage(b);
  $("r-messenger").href = R.messengerUrl;
  $("r-result").hidden = false;
  $("r-done").hidden = true;
}
async function sendToApi(b) {
  const res = await fetch(R.apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Server said ${res.status}`);
  return data;
}
$("rform").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  rErr.textContent = ""; $("r-result").hidden = true; $("r-done").hidden = true;
  let b;
  try { b = bookingFromForm(); } catch (msg) { rErr.textContent = msg; return; }
  if (R.mode === "api") {
    const btn = ev.submitter; if (btn) btn.disabled = true;
    try {
      const data = await sendToApi(b);
      $("r-done").textContent = `Request sent${data.id ? ` (ref ${data.id})` : ""}. BoardBrew will confirm your table by text or Messenger.`;
      $("r-done").hidden = false;
    } catch (e) {
      showMessenger(b, `We couldn't send it online (${e.message}). Send this message to BoardBrew on Messenger instead:`);
    } finally { if (btn) btn.disabled = false; }
  } else {
    showMessenger(b, "Almost done. Send this message to BoardBrew:");
  }
});
$("r-copy").addEventListener("click", (e) => copyText($("r-msg"), e.currentTarget, "Copied", "Selected, press copy"));

/* ===== Events calendar ===== */
const today0 = new Date(now()); today0.setHours(0, 0, 0, 0);
function nthWeekday(y, m, wd, n) { const d = new Date(y, m, 1); d.setDate(1 + ((wd - d.getDay() + 7) % 7) + 7 * (n - 1)); return d; }
function sampleEvents() {
  const out = [], y = today0.getFullYear(), m = today0.getMonth();
  for (const mm of [m - 1, m, m + 1, m + 2]) {
    const base = new Date(y, mm, 1), Y = base.getFullYear(), M = base.getMonth();
    for (const n of [1, 2, 3, 4]) out.push([iso(nthWeekday(Y, M, 5, n)), "7:00 PM", "Friday game night", "Open tables all night. Staff teach new games.", true]);
    out.push([iso(nthWeekday(Y, M, 6, 2)), "2:00 PM", "Codenames tournament", "Teams of four. Prizes for the top table.", true]);
    out.push([iso(nthWeekday(Y, M, 0, 4)), "12:00 NN", "Artist & vendor market", "Local artists, tarot readers and non-food concessionaires.", true]);
  }
  return out;
}
const EVENTS = [...EVENTS_REAL, ...(EVENTS_REAL.length ? [] : sampleEvents())]
  .map(([date, time, title, desc, sample]) => ({ date, time, title, desc, sample: !!sample }));
let cY = today0.getFullYear(), cM = today0.getMonth(), cSel = null;
function renderCal() {
  $("c-title").textContent = `${MONTHS[cM]} ${cY}`;
  const first = new Date(cY, cM, 1).getDay(), days = new Date(cY, cM + 1, 0).getDate(), prefix = `${cY}-${pad(cM + 1)}`;
  const monthEv = EVENTS.filter((e) => e.date.startsWith(prefix)).sort((a, b) => a.date.localeCompare(b.date));
  const has = new Set(monthEv.map((e) => e.date));
  let html = DAYS.map((d) => `<div class="dow">${d}</div>`).join("");
  for (let i = 0; i < first; i++) html += `<div class="day blank"></div>`;
  for (let d = 1; d <= days; d++) {
    const k = `${prefix}-${pad(d)}`;
    const cls = ["day", has.has(k) ? "has" : "", k === iso(today0) ? "today" : "", k === cSel ? "sel" : ""].join(" ");
    html += has.has(k) ? `<button type="button" class="${cls}" data-d="${k}" aria-label="${MONTHS[cM]} ${d}, has events">${d}</button>` : `<div class="${cls}">${d}</div>`;
  }
  const g = $("c-grid"); g.innerHTML = html;
  g.querySelectorAll("button.day").forEach((b) => (b.onclick = () => { cSel = cSel === b.dataset.d ? null : b.dataset.d; renderCal(); }));
  const shown = cSel ? monthEv.filter((e) => e.date === cSel) : monthEv;
  $("c-list").innerHTML = shown.length ? shown.map((e) => {
    const d = new Date(e.date + "T00:00");
    return `<article class="ev ${cSel ? "hl" : ""}"><div class="date"><small>${MONTHS[d.getMonth()].slice(0, 3)}</small><b>${d.getDate()}</b></div><div><span class="time">${DAYS[d.getDay()]} · ${esc(e.time)}</span>${e.sample ? ' <span class="tag">Sample</span>' : ""}<h3>${esc(e.title)}</h3><p>${esc(e.desc)}</p></div></article>`;
  }).join("") : `<div class="empty">No events posted for ${MONTHS[cM]} yet.</div>`;
  $("c-note").hidden = !EVENTS.some((e) => e.sample);
}
$("c-prev").onclick = () => { cM--; if (cM < 0) { cM = 11; cY--; } cSel = null; renderCal(); };
$("c-next").onclick = () => { cM++; if (cM > 11) { cM = 0; cY++; } cSel = null; renderCal(); };

/* ===== Visit ===== */
const C = CONFIG.contact, OPEN = toMin(CONFIG.hours.open), CLOSE = toMin(CONFIG.hours.close);
$("v-address").innerHTML = C.address.map(esc).join("<br>");
$("v-hours").textContent = CONFIG.hours.label;
$("ph").textContent = C.phone;
$("em").textContent = C.email;
function renderOpenNow() {
  const n = now(), t = n.getHours() * 60 + n.getMinutes();
  const open = CLOSE > 1440 ? t >= OPEN || t < CLOSE - 1440 : t >= OPEN && t < CLOSE;
  const el = $("v-status");
  el.textContent = open ? `Open now · closes ${fmtMin(CLOSE)}` : `Closed · opens ${fmtMin(OPEN)}`;
  el.className = "status " + (open ? "open" : "closed");
}
setInterval(renderOpenNow, 60e3);

/* ===== Copy buttons ===== */
function copyText(el, btn, ok, fallback) {
  navigator.clipboard.writeText(el.textContent).then(() => (btn.textContent = ok)).catch(() => {
    const r = document.createRange(); r.selectNodeContents(el);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    btn.textContent = fallback;
  });
}
document.querySelectorAll(".copy").forEach((b) => b.addEventListener("click", () => copyText($(b.dataset.copy), b, "Copied", "Selected")));

renderGames(); renderFinder(); renderCal(); renderOpenNow();

// OPTIONAL backend for when BoardBrew wants bookings stored online instead of sent on Messenger.
// Not needed for GitHub Pages. To use it:
//   1. In public/config.js set reservations.mode to "api".
//   2. Run: ADMIN_KEY=pick-a-secret node server.js   (needs Node 18+, no installs)
//   3. Open http://localhost:3000
// Staff can list bookings at /api/reservations?key=pick-a-secret
// Bookings are saved to data/reservations.json. On free hosts that file can reset on redeploy,
// so swap in a real database before relying on it.
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || "";
const DB = path.join(ROOT, "data", "reservations.json");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon" };

// Same rules as the page (public/config.js). The server checks them again so nobody can skip them.
const LEAD_HOURS = 2, FIRST = 8 * 60, LAST = 24 * 60;

const load = () => { try { return JSON.parse(fs.readFileSync(DB, "utf8")); } catch { return []; } };
const save = (list) => { fs.mkdirSync(path.dirname(DB), { recursive: true }); fs.writeFileSync(DB, JSON.stringify(list, null, 2)); };
const send = (res, code, body) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(body)); };

function manilaNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute);
}
function validate(b) {
  if (!b || typeof b !== "object") return "Missing booking.";
  if (!String(b.name || "").trim()) return "Name is required.";
  if (!/^(\+?63|0)9\d{9}$/.test(String(b.phone || "").replace(/[\s-]/g, ""))) return "A valid PH mobile number is required.";
  const d = /^(\d{4})-(\d\d)-(\d\d)$/.exec(b.date || ""), t = /^(\d\d):(\d\d)$/.exec(b.time || "");
  if (!d || !t) return "Date and time are required.";
  const min = +t[1] * 60 + +t[2];
  if (min < FIRST || min > LAST) return "Reservations are from 8:00 AM to 12:00 midnight.";
  const when = Date.UTC(+d[1], d[2] - 1, +d[3], 0, min);
  if (when < manilaNow() + LEAD_HOURS * 3600e3) return `Reservations need at least ${LEAD_HOURS} hours' notice.`;
  return null;
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/api/reservations" && req.method === "POST") {
    let raw = "";
    req.on("data", (c) => { raw += c; if (raw.length > 1e4) req.destroy(); });
    req.on("end", () => {
      let b; try { b = JSON.parse(raw); } catch { return send(res, 400, { error: "Bad request." }); }
      const err = validate(b);
      if (err) return send(res, 422, { error: err });
      const list = load();
      const id = crypto.randomBytes(3).toString("hex").toUpperCase();
      list.push({ id, name: b.name.trim(), phone: b.phone, date: b.date, time: b.time, groupSize: String(b.groupSize || ""), notes: String(b.notes || "").slice(0, 300), status: "pending", createdAt: new Date().toISOString() });
      save(list);
      send(res, 201, { id });
    });
    return;
  }
  if (url.pathname === "/api/reservations" && req.method === "GET") {
    if (!ADMIN_KEY || url.searchParams.get("key") !== ADMIN_KEY) return send(res, 401, { error: "Not allowed." });
    return send(res, 200, load());
  }
  // Static files
  const file = path.normalize(path.join(ROOT, url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname)));
  if (!file.startsWith(ROOT) || file.includes(`${path.sep}data${path.sep}`) || path.basename(file) === "server.js") { res.writeHead(404); return res.end(); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(buf);
  });
}).listen(PORT, () => console.log(`BoardBrew running on http://localhost:${PORT}`));

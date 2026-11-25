// Automated site checks (QA 1). Run from the repo folder:  node --test
// No installs: uses Node's built-in test runner.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

/* ---------- The built pages match views/ (catches "forgot to run node build.js") ---------- */
function buildInMemory(file) {
  const views = path.join(root, "views");
  const include = (html) => html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, name) =>
    include(fs.readFileSync(path.join(views, `${name}.html`), "utf8").trim()));
  const home = file === "index.html" ? "" : "index.html";
  return "<!-- Built by build.js. Edit views/ and run: node build.js -->\n" +
    include(fs.readFileSync(path.join(views, "layouts", file), "utf8")).replaceAll("{{home}}", home);
}
for (const file of ["index.html", "policies.html"]) {
  test(`TC-SM-02: ${file} is up to date with views/ (run node build.js if this fails)`, () => {
    assert.equal(read(file), buildInMemory(file));
  });
}

/* ---------- The page script runs start to finish (catches crashes like calling a deleted function) ---------- */
// A stand-in for the browser page: every element, list and value quietly accepts anything.
function fakeThing() {
  const fn = function () {};
  return new Proxy(fn, {
    get(_, key) {
      if (key === Symbol.iterator) return function* () {};
      if (key === Symbol.toPrimitive) return () => "";
      if (typeof key === "symbol") return undefined; // e.g. Symbol.match: don't pretend to be a regex
      if (key === "length") return 0;
      return fakeThing();
    },
    set: () => true,
    apply: () => fakeThing(),
    construct: () => fakeThing(),
  });
}
test("TC-SM-01: functions.js runs with no errors", () => {
  const ctx = vm.createContext({
    document: fakeThing(),
    location: { search: "?now=2026-11-26T09:00" },
    navigator: fakeThing(),
    localStorage: { getItem: () => null, setItem() {} },
    setInterval() {}, setTimeout() {},
    fetch: fakeThing(),
    getSelection: fakeThing(),
    URLSearchParams, Intl, Date, Math, JSON,
    console,
  });
  for (const f of ["public/config.js", "public/data.js", "public/rules.js", "public/functions.js"]) {
    vm.runInContext(read(f), ctx, { filename: f }); // throws, failing the test, on any script error
  }
});

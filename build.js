// Builds the pages at the repo root from views/layouts/*.html and the section files in views/.
// Run from this folder:  node build.js
const fs = require("fs");
const path = require("path");

const root = __dirname;
const views = path.join(root, "views");
const include = (html) => html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, name) =>
  include(fs.readFileSync(path.join(views, `${name}.html`), "utf8").trim())
);

for (const file of fs.readdirSync(path.join(views, "layouts")).filter((f) => f.endsWith(".html"))) {
  const home = file === "index.html" ? "" : "index.html"; // nav links jump within the home page, or back to it
  const html = include(fs.readFileSync(path.join(views, "layouts", file), "utf8")).replaceAll("{{home}}", home);
  fs.writeFileSync(path.join(root, file), "<!-- Built by build.js. Edit views/ and run: node build.js -->\n" + html);
  console.log(`Built ${file}`);
}

// Builds index.html from views/layouts/index.html and the section files in views/.
// Run from this folder:  node build.js
const fs = require("fs");
const path = require("path");

const root = __dirname;
const layout = fs.readFileSync(path.join(root, "views/layouts/index.html"), "utf8");
const html = layout.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, name) =>
  fs.readFileSync(path.join(root, "views", `${name}.html`), "utf8").trim()
);
fs.writeFileSync(path.join(root, "index.html"), "<!-- Built by build.js. Edit views/ and run: node build.js -->\n" + html);
console.log("Built index.html");

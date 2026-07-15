import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = fs.readdirSync(root).filter((name) => name.endsWith(".html"));
const missing = [];

for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (
      href.includes("{{") ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("http") ||
      href.startsWith("data:")
    ) {
      continue;
    }
    const target = href.split("#")[0].split("?")[0];
    if (target && !fs.existsSync(path.join(root, target))) {
      missing.push(`${file} -> ${href}`);
    }
  }
}

if (missing.length) {
  console.error(missing.join("\n"));
  process.exit(1);
}

console.log(`Checked ${files.length} HTML files: no missing local href targets.`);

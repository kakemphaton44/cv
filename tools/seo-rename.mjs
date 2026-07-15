import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const archiveDir = path.join(root, "_archive");

const pageMap = new Map([
  ["Product Management Big Picture.dc.html", "product-management-big-picture.html"],
  ["Kakemphaton Etude de Cas.dc.html", "kakemphaton-etude-de-cas.html"],
  ["Kakemphaton User Research.dc.html", "kakemphaton-user-research.html"],
  ["Kakemphaton Market Sizing.dc.html", "kakemphaton-market-sizing.html"],
  ["Kakemphaton Parties Prenantes.dc.html", "kakemphaton-parties-prenantes.html"],
  ["Kakemphaton Product Canvas.dc.html", "kakemphaton-product-canvas.html"],
  ["Kakemphaton Go To Market.dc.html", "kakemphaton-go-to-market.html"],
  ["Kakemphaton OKR.dc.html", "kakemphaton-okr.html"],
  ["Kakemphaton Roadmap.dc.html", "kakemphaton-roadmap.html"],
  ["Kakemphaton User Story Mapping.dc.html", "kakemphaton-user-story-mapping.html"],
  ["Kakemphaton Scrum Kanban.dc.html", "kakemphaton-scrum-kanban.html"],
  ["Kakemphaton Tableau de Bord.dc.html", "kakemphaton-tableau-de-bord.html"],
  ["Kakemphaton App - Refonte.dc.html", "kakemphaton-app-refonte.html"],
]);

const linkMap = new Map([
  ["CV Olivier Guitton.dc.html", "index.html"],
  ...pageMap,
]);

const seo = {
  "index.html": {
    title: "Olivier Guitton - Product Manager senior",
    description:
      "CV et portfolio d'Olivier Guitton, Product Manager senior a Nantes, specialise en SaaS B2B, discovery, delivery et impact business mesurable.",
    image: "assets/portrait.png",
  },
  "product-management-big-picture.html": {
    title: "Product Management Big Picture - Olivier Guitton, Product Manager",
    description:
      "Framework visuel du Product Management, de la discovery a l'impact mesure : phases, acteurs, outils, Scrum/Kanban et boucles de valeur.",
    image: "assets/thumb-roadmap.png",
  },
  "kakemphaton-etude-de-cas.html": {
    title: "Kakemphaton - Etude de cas produit fictif - Olivier Guitton, Product Manager",
    description:
      "Etude de cas fictive Kakemphaton : 11 livrables et 4 phases pour demontrer une demarche Product Management complete.",
    image: "assets/kakemphaton-hero.png",
  },
  "kakemphaton-user-research.html": {
    title: "Kakemphaton - User research - Olivier Guitton, Product Manager",
    description:
      "Recherche utilisateur Kakemphaton : persona, empathy map, problem statements, user journey et cadrage des besoins.",
    image: "assets/thumb-research.png",
  },
  "kakemphaton-market-sizing.html": {
    title: "Kakemphaton - Market sizing - Olivier Guitton, Product Manager",
    description:
      "Dimensionnement marche Kakemphaton : potentiel, segments, hypotheses de pricing et revenus pour une solution MedTech fictive.",
    image: "assets/thumb-market.png",
  },
  "kakemphaton-parties-prenantes.html": {
    title: "Kakemphaton - Parties prenantes - Olivier Guitton, Product Manager",
    description:
      "Cartographie des parties prenantes Kakemphaton : influence, interet, confiance, RACI et strategie d'engagement.",
    image: "assets/thumb-stakeholders.png",
  },
  "kakemphaton-product-canvas.html": {
    title: "Kakemphaton - Product Canvas - Olivier Guitton, Product Manager",
    description:
      "Product Canvas Kakemphaton : probleme, cible, proposition de valeur, canaux, revenus et risques produit.",
    image: "assets/thumb-canvas.png",
  },
  "kakemphaton-go-to-market.html": {
    title: "Kakemphaton - Go to Market - Olivier Guitton, Product Manager",
    description:
      "Plan Go to Market Kakemphaton : cible, acquisition, expansion, adoption et pilotage commercial d'un produit fictif.",
    image: "assets/thumb-gtm.png",
  },
  "kakemphaton-okr.html": {
    title: "Kakemphaton - OKR produit - Olivier Guitton, Product Manager",
    description:
      "OKR Kakemphaton : objectifs produit, resultats cles et alignement entre valeur utilisateur, adoption et impact business.",
    image: "assets/thumb-okr.png",
  },
  "kakemphaton-roadmap.html": {
    title: "Kakemphaton - Roadmap - Olivier Guitton, Product Manager",
    description:
      "Roadmap Kakemphaton : trajectoire Now Next Later, objectifs produit, priorites et apprentissages attendus.",
    image: "assets/thumb-roadmap.png",
  },
  "kakemphaton-user-story-mapping.html": {
    title: "Kakemphaton - User story mapping - Olivier Guitton, Product Manager",
    description:
      "User story mapping Kakemphaton : activites, parcours, stories, releases et decoupage de la valeur.",
    image: "assets/thumb-storymap.png",
  },
  "kakemphaton-scrum-kanban.html": {
    title: "Kakemphaton - Scrum Kanban - Olivier Guitton, Product Manager",
    description:
      "Sprint board Kakemphaton : Scrum avec Kanban, WIP, objectifs, flux de delivery et metriques operationnelles.",
    image: "assets/thumb-scrum.png",
  },
  "kakemphaton-tableau-de-bord.html": {
    title: "Kakemphaton - Tableau de bord - Olivier Guitton, Product Manager",
    description:
      "Tableau de bord Kakemphaton : KPIs produit, satisfaction, revenus, churn et suivi d'impact.",
    image: "assets/thumb-dashboard.png",
  },
  "kakemphaton-app-refonte.html": {
    title: "Kakemphaton - Refonte applicative - Olivier Guitton, Product Manager",
    description:
      "Refonte UI Kakemphaton : ecrans dashboard et analyses IA, hierarchie d'information et data visualisation.",
    image: "assets/thumb-app.png",
  },
};

function esc(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function replaceAllLiteral(input, from, to) {
  return input.split(from).join(to);
}

function pageFiles() {
  return fs.readdirSync(root).filter((name) => name.endsWith(".html"));
}

for (const [oldName, newName] of pageMap) {
  const oldPath = path.join(root, oldName);
  const newPath = path.join(root, newName);
  if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
    fs.renameSync(oldPath, newPath);
  }
}

for (const name of pageFiles()) {
  const filePath = path.join(root, name);
  let html = fs.readFileSync(filePath, "utf8");

  for (const [oldName, newName] of linkMap) {
    html = replaceAllLiteral(html, oldName, newName);
  }

  const meta = seo[name];
  if (meta) {
    html = html.replace(/^<html>/m, '<html lang="fr">');
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
    html = html.replace(
      /\n<meta name="description"[\s\S]*?(?=\n<link|\n<meta|\n<title|\n<style|\n<\/helmet>)/g,
      "",
    );
    html = html.replace(/\n<meta name="robots"[\s\S]*?(?=\n<link|\n<meta|\n<title|\n<style|\n<\/helmet>)/g, "");
    html = html.replace(/\n<meta property="og:[\s\S]*?(?=\n<link|\n<meta|\n<title|\n<style|\n<\/helmet>)/g, "");
    html = html.replace(/\n<meta name="twitter:[\s\S]*?(?=\n<link|\n<meta|\n<title|\n<style|\n<\/helmet>)/g, "");
    html = html.replace(/\n<link rel="canonical"[\s\S]*?(?=\n<link|\n<meta|\n<title|\n<style|\n<\/helmet>)/g, "");

    const block = [
      `<meta name="description" content="${esc(meta.description)}">`,
      '<meta name="robots" content="index,follow">',
      `<link rel="canonical" href="${esc(name)}">`,
      '<meta property="og:type" content="website">',
      `<meta property="og:title" content="${esc(meta.title)}">`,
      `<meta property="og:description" content="${esc(meta.description)}">`,
      `<meta property="og:image" content="${esc(meta.image)}">`,
      '<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${esc(meta.title)}">`,
      `<meta name="twitter:description" content="${esc(meta.description)}">`,
      `<meta name="twitter:image" content="${esc(meta.image)}">`,
    ].join("\n");
    html = html.replace(/(<title>[\s\S]*?<\/title>)/, `$1\n${block}`);
  }

  fs.writeFileSync(filePath, html, "utf8");
}

if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir);
}

for (const [from, to] of [
  ["CV Olivier Guitton.dc.html", "cv-olivier-guitton-dc.html"],
  ["index.optimized-simple.html", "index-optimized-simple.html"],
]) {
  const source = path.join(root, from);
  const target = path.join(archiveDir, to);
  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.renameSync(source, target);
  }
}

const urls = ["index.html", ...pageMap.values()];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <priority>${url === "index.html" ? "1.0" : "0.7"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");

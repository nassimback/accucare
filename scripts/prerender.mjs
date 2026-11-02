import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { renderPages } from "../.ssr/entry-server.js";

const output = resolve("dist");
const template = await readFile(join(output, "index.html"), "utf8");
const pages = renderPages();
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const page of pages) {
  const url = `https://accucare.co.uk${page.path}`;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(page.description)}" />`,
    )
    .replace('<div id="root"></div>', `<div id="root">${page.html}</div>`)
    .replace(
      "</head>",
      `<link rel="canonical" href="${url}" /><meta property="og:title" content="${escape(page.title)}" /><meta property="og:description" content="${escape(page.description)}" /><meta property="og:type" content="website" /><meta property="og:url" content="${url}" /><meta property="og:image" content="https://accucare.co.uk/images/home-care.webp" /><script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "AccuCare", url: "https://accucare.co.uk", telephone: "+442038770929", email: "info@accucare.co.uk", logo: "https://accucare.co.uk/images/logo-mark.webp" })}</script></head>`,
    );
  if (page.path !== "/")
    html = html.replace(
      '<link rel="preload" as="image" href="/images/home-care.webp" />',
      "",
    );
  if (page.path.startsWith("/design-")) {
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex,nofollow" /></head>',
    );
  }
  const directory = join(output, page.path);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), html);
}
await writeFile(
  join(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
    .filter((page) => !page.path.startsWith("/design-"))
    .map((page) => `<url><loc>https://accucare.co.uk${page.path}</loc></url>`)
    .join("")}</urlset>`,
);
await writeFile(
  join(output, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: https://accucare.co.uk/sitemap.xml\n",
);
await writeFile(join(output, "404.html"), template);
console.log(
  `Pre-rendered ${pages.length} pages with titles, metadata and sitemap.`,
);

// GitHub Pages serves this showcase from a repository subdirectory.
const basePath = process.env.VITE_BASE_PATH || "/";
if (basePath !== "/") {
  const { readdir } = await import("node:fs/promises");
  async function prefixAssets(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await prefixAssets(path);
      else if (/\.(html|css|js)$/.test(entry.name)) {
        let content = await readFile(path, "utf8");
        content = content.replaceAll(basePath + "images/", "/images/").replaceAll("/images/", basePath + "images/");
        if (entry.name === "designs.html") content = content.replaceAll('href="/design-', 'href="' + basePath + 'design-');
        await writeFile(path, content);
      }
    }
  }
  await prefixAssets(output);
}

// The client enters through the design selector; each concept has its own URL.
await writeFile(join(output, "index.html"), await readFile(join(output, "designs.html"), "utf8"));

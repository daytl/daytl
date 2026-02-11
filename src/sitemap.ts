import * as fs from "node:fs";

const locales = ["cs", "en", "sk", "de", "pl"];
const tools = [
  "birthnumber",
  "birthnumbervalidator",
  "remover",
  "base64-encode-decode",
  "passwordgenerator",
  "jwt-decode",
  "color-picker",
  "json-viewer",
];

interface Sitemap {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

const printItem = (item: Sitemap) => {
  let data = "<url>";
  data += `<loc>${item.url}</loc>`;
  data += `<lastmod>${item.lastModified}</lastmod>`;
  data += `<changefreq>${item.changeFrequency}</changefreq>`;
  data += `<priority>${item.priority}</priority>`;
  data += "</url>";
  return data;
};

const createUrl = (path = "") => `https://www.daytl.com${path}`;

export default function sitemap() {
  const now = new Date().toISOString();
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  sitemap += printItem({
    url: createUrl(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  });

  locales.forEach((locale) => {
    sitemap += printItem({
      url: createUrl(`/${locale}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    });

    tools.forEach((tool) => {
      sitemap += printItem({
        url: createUrl(`/${locale}/${tool}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  sitemap += "</urlset>";

  return sitemap;
}

const data = sitemap();
fs.writeFileSync("out/sitemap.xml", data);

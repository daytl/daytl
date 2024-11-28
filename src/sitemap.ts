import * as fs from "node:fs"
import { i18nConfig } from "../i18n"

const tools = ["birthnumber"]

interface Sitemap {
  url: string
  lastModified: string
  changeFrequency: string
  priority: number
}

const printItem = (item: Sitemap) => {
  let data = "<url>"
  data += `<loc>${item.url}</loc>`
  data += `<lastmod>${item.lastModified}</lastmod>`
  data += `<changefreq>${item.changeFrequency}</changefreq>`
  data += `<priority>${item.priority}</priority>`
  data += "</url>"
  return data
}


export default function sitemap() {
  let sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
  sitemap += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"
  sitemap += printItem(
    {
      url: "https://www.daytl.com",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    })

  i18nConfig.locales.forEach((locale) => {
    sitemap += printItem({
      url: `https://www.daytl.com/${locale}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    })

    tools.forEach((tool) => {
      sitemap += printItem({
        url: `https://www.daytl.com/${locale}/${tool}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 1,
      })
    })
  })

  sitemap += "</urlset>"

  return sitemap
}

const data = sitemap()
fs.writeFileSync("out/sitemap.xml", data)

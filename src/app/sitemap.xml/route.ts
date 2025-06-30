import { getAppRoutes, getBlogRoutes } from "@/utils/getAppRoutes";
import { routing } from "@/i18n/routing";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adoptium.net";

  const staticRoutes = getAppRoutes().filter(
    (route) => !route.includes("[...slug]") && !route.startsWith("/news")
  );

  const blogRoutes = getBlogRoutes();

  const allRoutesSet = new Set<string>();

  for (const route of staticRoutes) {
    allRoutesSet.add(route === "/" ? "" : route);
  }

  for (const blog of blogRoutes) {
    const slugPath = blog.loc.replace(/^\/en/, "");
    allRoutesSet.add(slugPath);
  }

  const allRoutes = Array.from(allRoutesSet);

  // Builds grouped XML
  const urlEntries = allRoutes.map((path) => {
    const alternates = routing.locales
      .map((locale) => {
        const localizedPath = path === "" ? "" : path;
        const href = `${baseUrl}/${locale}${localizedPath}`;
        return `<xhtml:link rel="alternate" hreflang="${locale}" href="${href}" />`;
      })
      .join("\n");

    // Chooses the default locale
    const defaultHref = `${baseUrl}/${routing.defaultLocale}${path}`;
    const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${defaultHref}" />`;

    const loc = `${baseUrl}/${routing.defaultLocale}${path}`;

    return `<url>
  <loc>${loc}</loc>
  ${alternates}
  ${xDefault}
</url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

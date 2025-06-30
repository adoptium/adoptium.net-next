import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";

vi.mock("@/utils/getAppRoutes");
vi.mock("@/utils/getBlogRoutes");
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "de"],
    defaultLocale: "en",
  },
}));

import { GET } from "../route";
import { getAppRoutes, getBlogRoutes } from "@/utils/getAppRoutes";

describe("sitemap GET", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.NEXT_PUBLIC_SITE_URL = "https://adoptium.net";
  });

  it("returns correct grouped XML with static and blog routes", async () => {
    (getAppRoutes as Mock).mockReturnValue([
      "/",
      "/about",
      "[...slug]",
      "/news",
      "/contact",
    ]);

    (getBlogRoutes as Mock).mockReturnValue([
      { loc: "/en/my-blog", lastmod: "2024-06-26" },
    ]);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/xml");

    const text = await response.text();

    expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(text).toContain("<urlset");
    expect(text).toContain("<loc>https://adoptium.net/en</loc>");
    expect(text).toContain("<loc>https://adoptium.net/en/about</loc>");
    expect(text).toContain("<loc>https://adoptium.net/en/contact</loc>");

    expect(text).toContain(
      'hreflang="en" href="https://adoptium.net/en/about"'
    );
    expect(text).toContain(
      'hreflang="de" href="https://adoptium.net/de/about"'
    );

    expect(text).toContain(
      'hreflang="x-default" href="https://adoptium.net/en/about"'
    );

    expect(text).not.toContain("[...slug]");
    expect(text).not.toContain("/news");
  });
});

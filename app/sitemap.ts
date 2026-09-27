import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects-data";
import { SITE_URL } from "@/lib/seo";

const routes = [
  "",
  "/about",
  "/projects",
  "/services",
  "/impact",
  "/homi-bhabha",
  "/ganit-prabhutwa-pariksha",
  "/resources",
  "/annual-report",
  "/gallery",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((r) => ({
      url: `${SITE_URL}${r}`,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

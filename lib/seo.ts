import type { Metadata } from "next";

export const SITE_URL = "https://earc.jnanaprabodhini.org";
export const SITE_NAME = "EARC - Jnana Prabodhini";

// Page-level openGraph replaces the layout's wholesale, so every page builds its own here.
export function pageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  // Title template doesn't apply to og/twitter titles, so brand them here.
  const shareTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      url: path,
      title: shareTitle,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 628,
          alt: "Educational Activity Research Centre, Jnana Prabodhini, Pune",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

import { getAppName } from "@/api";

import { CategoryView } from "@/sections/category/view";

// ----------------------------------------------------------------------

export async function generateMetadata() {
  const { appName } = await getAppName();

  return {
    metadataBase: new URL("https://xtepnepal.com"),
    title: `${appName} | Categories`,
    description:
      "Browse all product categories and find exactly what you're looking for. Shop by category for a better shopping experience.",
    keywords: ["categories", "product categories", "shop by category", appName],
    alternates: {
      canonical: "/category",
    },
    openGraph: {
      title: `${appName} | Categories`,
      description:
        "Browse all product categories and find exactly what you're looking for.",
      url: "https://xtepnepal.com/category",
      siteName: appName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Categories",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${appName} | Categories`,
      description:
        "Browse all product categories and find exactly what you're looking for.",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ----------------------------------------------------------------------

export default async function Page() {
  return <CategoryView />;
}

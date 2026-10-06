import { getAppName } from "@/api";

import { ProductView } from "@/sections/product/view";

// ----------------------------------------------------------------------

export async function generateMetadata() {
  const { appName } = await getAppName();

  return {
    metadataBase: new URL("https://xtepnepal.com"),
    title: `Products - Shop Online | ${appName}`,
    description:
      "Browse our extensive collection of quality products. Find the best deals on electronics, fashion, home essentials, and more. ",
    keywords: [
      "online shopping",
      "buy products online",
      "ecommerce store",
      "shop products",
      "best deals",
      "product catalog",
      appName,
    ],
    openGraph: {
      title: `Shop All Products | ${appName}`,
      description:
        "Discover amazing products at great prices. Browse our complete product catalog.",
      url: "/product",
      siteName: appName,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${appName} Products`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Products - Shop Online | ${appName}`,
      description:
        "Browse our extensive collection of quality products with fast shipping.",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: "/product",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page() {
  return <ProductView />;
}

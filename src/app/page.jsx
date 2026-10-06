import { CONFIG } from "@/global-config";

import { getAppName, getVendorDetails } from "@/api";

import { HomeView } from "@/sections/home/view";

// ----------------------------------------------------------------------

export async function generateMetadata() {
  const { appName } = await getAppName();

  return {
    metadataBase: new URL("https://xtepnepal.com"),
    title: `${appName}`,
    description:
      "Experience a modern and feature-rich ecommerce platform offering smooth navigation, fast performance and secure payments",
    keywords: [
      "ecommerce",
      "online shopping",
      "buy products",
      "modern ecommerce app",
      appName,
    ],
    authors: [{ name: appName }],
    creator: appName,
    publisher: appName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // icons: {
    //   icon: vendorDetails?.logo ? `${vendorDetails.logo}` : "/api/favicon.ico",
    // },
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/",
      },
    },
    verification: {
      google: "your-google-site-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
    category: "ecommerce",
    openGraph: {
      title: `${appName}`,
      description:
        "Experience a powerful and user-friendly ecommerce platform.",
      url: "/",
      siteName: appName,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ecommerce App Preview",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${appName}`,
      description: "Shop smarter with our ecommerce solution.",
      images: ["/og-image.png"],
      creator: "@your-twitter-handle",
      site: "@your-twitter-handle",
    },
  };
}

// ----------------------------------------------------------------------

export default async function Page() {
  return <HomeView />;
}

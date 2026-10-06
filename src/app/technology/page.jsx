import { CONFIG } from "@/global-config";

import { getAppName } from "@/api";
import { ServiceView } from "@/sections/technology";

// ----------------------------------------------------------------------

export async function generateMetadata() {
  const { appName } = await getAppName();

  return {
    metadataBase: new URL("https://xtepnepal.com"),
    title: `Our Technologies | ${appName}`,
    description:
      "Discover our comprehensive ecommerce services including fast delivery, secure payments, 24/7 support, and hassle-free returns.",
    keywords: [
      "ecommerce services",
      "online shopping",
      "delivery",
      "customer support",
      "secure payments",
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
    //   icon: "/api/favicon.ico",
    // },
    alternates: {
      canonical: "/technology",
      languages: {
        "en-US": "/technology",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://xtepnepal.com/technology",
      title: `XTEP Technologies | ${appName}`,
      description:
        "Discover our comprehensive ecommerce technologies including fast delivery, secure payments, 24/7 support, and hassle-free returns.",
      siteName: appName,
    },
  };
}

export default function ServicePage() {
  return <ServiceView />;
}

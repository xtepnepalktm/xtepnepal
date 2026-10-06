import { CONFIG } from "@/global-config";

import { getAppName } from "@/api";
import { getServiceDetails } from "@/api/service.server";
import { ServiceDetailView } from "@/sections/technology";

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [service, { appName }] = await Promise.all([
    getServiceDetails(slug),
    getAppName(),
  ]);

  if (!service) {
    return {
      title: "Technology Not Found",
    };
  }

  const serviceTitle = service.title || "Technology";
  const serviceDescription =
    service.short_description ||
    service.description ||
    "Explore our premium technologies.";

  return {
    metadataBase: new URL("https://xtepnepal.com"),
    title: `${serviceTitle} | ${appName}`,
    description: serviceDescription.replace(/<[^>]*>/g, "").substring(0, 155),
    keywords: [serviceTitle.toLowerCase(), "ecommerce services", appName],
    authors: [{ name: appName }],
    creator: appName,
    publisher: appName,
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
      canonical: `/technology/${slug}`,
      languages: {
        "en-US": `/technology/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `https://xtepnepal.com/technology/${slug}`,
      title: `${serviceTitle} | ${appName}`,
      description: serviceDescription.replace(/<[^>]*>/g, "").substring(0, 155),
      siteName: appName,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;

  return <ServiceDetailView slug={slug} />;
}

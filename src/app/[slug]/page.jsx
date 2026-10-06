import { DynamicView } from "@/sections/dynamic/view";

import { getPageDetails, getAppName } from "@/api";

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const [pageDetails, { appName }] = await Promise.all([
      getPageDetails(slug),
      getAppName(),
    ]);

    const pageTitle = pageDetails?.title || pageDetails?.name || "Page";
    const rawDescription =
      pageDetails?.description ||
      pageDetails?.content ||
      "Discover more information on this page.";

    // Strip HTML tags and limit to 155 characters for optimal SEO
    const pageDescription = rawDescription
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim()
      .substring(0, 155)
      .concat(rawDescription.length > 155 ? "..." : "");

    const pageImage = pageDetails?.image
      ? `${pageDetails.image}`
      : "/og-image.png";

    return {
      metadataBase: new URL("https://xtepnepal.com"),
      title: pageTitle,
      description: pageDescription,
      keywords: [pageTitle, "information", "details", appName],
      alternates: {
        canonical: `/${slug}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `https://xtepnepal.com/${slug}`,
        siteName: appName,
        type: "website",
        locale: "en_US",
        images: [
          {
            url: pageImage,
            width: 1200,
            height: 630,
            alt: pageTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        images: [pageImage],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for [slug] page:", error);
    return {
      metadataBase: new URL("https://xtepnepal.com"),
      title: "Page",
      description: "Discover more information on this page.",
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

// ----------------------------------------------------------------------

export default async function Page({ params }) {
  const { slug } = await params;

  const pageDetails = await getPageDetails(slug);

  return <DynamicView content={pageDetails} />;
}

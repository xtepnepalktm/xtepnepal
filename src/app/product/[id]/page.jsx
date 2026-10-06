import { CONFIG } from "@/global-config";

import { ProductDetailsView } from "@/sections/product/view";

import { getProductDetails, getRelatedProducts, getAppName } from "@/api";

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { id } = await params;
  const [product, { appName }] = await Promise.all([
    getProductDetails(id),
    getAppName(),
  ]);

  const productName = product?.name || "Product";
  const rawDescription =
    product?.description || "View detailed information about this product";
  // Strip HTML tags and limit to 155 characters for optimal SEO
  const productDescription = rawDescription
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim()
    .substring(0, 155)
    .concat(rawDescription.length > 155 ? "..." : "");
  const productImage = product?.featured_image
    ? `${product.featured_image}`
    : "/og-image.png";

  return {
    metadataBase: new URL("https://xtepnepal.com"),
    title: productName,
    description: productDescription,
    keywords: [productName, "buy online", "product details", "shop", appName],
    openGraph: {
      title: productName,
      description: productDescription,
      url: `/product/${id}`,
      siteName: appName,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: productName,
      description: productDescription,
      images: [productImage],
    },
    alternates: {
      canonical: `/product/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;

  const product = await getProductDetails(id);

  const relatedProducts = await getRelatedProducts(id);

  // Generate JSON-LD structured data for better SEO
  const jsonLd = product
    ? {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description
        ?.replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim(),
      image: product.featured_image
        ? `${product.featured_image}`
        : undefined,
      sku: product.sku || product.id,
      brand: product.brand?.name
        ? {
          "@type": "Brand",
          name: product.brand.name,
        }
        : undefined,
      offers: {
        "@type": "Offer",
        url: `https://xtepnepal.com/product/${id}`,
        priceCurrency: "NPR",
        price: product.price?.flashSalePrice || product.price?.regularPrice,
        availability:
          product.stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        priceValidUntil: product.price?.flashSaleEndDate,
      },
      aggregateRating: product.rating
        ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0,
        }
        : undefined,
    }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailsView product={product} relatedProducts={relatedProducts} />
    </>
  );
}

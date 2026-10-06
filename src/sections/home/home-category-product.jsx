
"use client";

import Link from "next/link";
import { paths } from "@/routes/paths";
import { ProductItem } from "../product/product-item";

// ----------------------------------------------------------------------
// Inline SVG icons (replaces Iconify)
// ----------------------------------------------------------------------

function ArrowRightIcon({ className = "", size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7 7a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H4a.75.75 0 0 1 0-1.5h14.69l-5.72-5.72a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
    </svg>
  );
}

// Category icons as inline SVGs
function CategoryIcon({ index, className = "", size = 28 }) {
  const icons = [
    // laptop
    <svg key="laptop" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path opacity={0.5} d="M2 14.902C2 12.966 2 12 2.674 11.5S4.44 11 8 11h8c3.56 0 5.346 0 6.026.5C22.7 12 22.7 12.965 22.7 14.9v.198c0 1.937 0 2.902-.674 3.402S19.56 19 16 19H8c-3.56 0-5.346 0-6.026-.5C1.3 18 1.3 17.035 1.3 15.1l.7-.198z" /><path d="M9.447 5.5C8.252 5.5 7.5 6.35 7.5 7.545V11h9V7.545C16.5 6.35 15.748 5.5 14.553 5.5H9.447zM5 19l-1.5 2h17L19 19H5z" /></svg>,
    // smartphone
    <svg key="phone" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path opacity={0.5} d="M7.077 3C5.377 3 4 4.343 4 5.997v12.006C4 19.657 5.377 21 7.077 21h9.846C18.623 21 20 19.657 20 18.003V5.997C20 4.343 18.623 3 16.923 3H7.077z" /><path d="M10.5 6.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3zM12 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>,
    // headphones
    <svg key="head" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path opacity={0.5} d="M12 3a9 9 0 0 0-9 9v1.5A2.5 2.5 0 0 1 5.5 11H6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3v-3a10 10 0 0 1 20 0v3a3 3 0 0 1-3 3h-1a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h.5A2.5 2.5 0 0 1 21 13.5V12a9 9 0 0 0-9-9z" /></svg>,
    // gamepad
    <svg key="game" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path opacity={0.5} d="M2.6 15.376C2 13.693 2 11.795 2 10c0-3.771 0-5.657 1.172-6.828C4.343 2 6.229 2 10 2h4c3.771 0 5.657 0 6.828 1.172C22 4.343 22 6.229 22 10c0 1.795 0 3.693-.6 5.376l-.041.117c-.867 2.41-1.3 3.615-2.305 4.06C18.05 20 16.796 20 14.287 20H9.713c-2.509 0-3.763 0-4.767-.447-1.005-.445-1.438-1.65-2.305-4.06L2.6 15.376z" /><path d="M9.75 9.75A.75.75 0 0 1 9 10.5H7.5a.75.75 0 0 1 0-1.5H9a.75.75 0 0 1 .75.75zM15 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM8.25 7.5a.75.75 0 0 0-1.5 0V9H5.25a.75.75 0 0 0 0 1.5H6.75v1.5a.75.75 0 0 0 1.5 0V10.5h1.5a.75.75 0 0 0 0-1.5H8.25V7.5zM17 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" /></svg>,
    // tv
    <svg key="tv" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path opacity={0.5} d="M2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12z" /><path d="M8 20v1M16 20v1M9 21h6" /></svg>,
    // camera
    <svg key="cam" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path opacity={0.5} d="M2 13c0-3.3 0-4.95 1.025-5.975C4.05 6 5.7 6 9 6h6c3.3 0 4.95 0 5.975 1.025C22 8.05 22 9.7 22 13c0 3.3 0 4.95-1.025 5.975C19.95 20 18.3 20 15 20H9c-3.3 0-4.95 0-5.975-1.025C2 17.95 2 16.3 2 13z" /><path d="M9 6l.318-1.27C9.5 4.086 9.572 4 9.736 4h4.528c.164 0 .236.086.418.73L15 6M12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /></svg>,
  ];

  return icons[index % icons.length];
}

// ----------------------------------------------------------------------
// Icon background + text colors per category index (replaces MUI palette)
// ----------------------------------------------------------------------

const COLOR_VARIANTS = [
  { bg: "bg-blue-100", text: "text-blue-600" }, // primary
  { bg: "bg-purple-100", text: "text-purple-600" }, // secondary
  { bg: "bg-cyan-100", text: "text-cyan-600" }, // info
  { bg: "bg-green-100", text: "text-green-600" }, // success
  { bg: "bg-amber-100", text: "text-amber-600" }, // warning
  { bg: "bg-red-100", text: "text-red-600" }, // error
];

// ----------------------------------------------------------------------

export function HomeCategoryProduct({ categoryProducts }) {
  return categoryProducts?.map((categoryProduct, index) => (
    <HomeCategoryProductItem
      key={categoryProduct.category_id}
      categoryProduct={categoryProduct}
      index={index}
    />
  ));
}

function HomeCategoryProductItem({ categoryProduct, index }) {
  const { name, products } = categoryProduct;
  const { bg, text } = COLOR_VARIANTS[index % COLOR_VARIANTS.length];

  if (!products.length) return null;

  return (
    <section
      className="flex flex-col gap-8 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: icon + title */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center  p-3 ${bg}`}>
            <CategoryIcon index={index} className={text} size={28} />
          </div>

          <h2 className="text-[1.1rem] sm:text-[1.25rem] md:text-[1.5rem] font-bold text-gray-900 leading-tight">
            {name}
          </h2>
        </div>

        {/* Right: View All link */}
        <Link
          href={paths.category}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:translate-x-1 hover:text-gray-900"
        >
          View All
          <ArrowRightIcon size={16} />
        </Link>
      </div>

      {/* ── Product grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {products.map((product, productIndex) => (
          <div
            key={product.product_id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${productIndex * 0.05}s`,
              animationFillMode: "both",
            }}
          >
            <ProductItem
              product={product}
              detailsHref={paths.product.details(product.slug)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
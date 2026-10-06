
"use client";

import { useRef, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { fCurrency } from "@/utils";
import { paths } from "@/routes/paths";

// ---------------------------------------------------------------------------
// Icon – inline SVG replacements for Iconify icons used in this component
// ---------------------------------------------------------------------------

function StarIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// BestSellerItem
// ---------------------------------------------------------------------------

function BestSellerItem({ product, rank }) {
  const { slug, name, featured_image, price } = product;
  return (
    <Link
      href={paths.product.details(slug)}
      className="group flex flex-col gap-3 cursor-pointer mb-4"
    >
      {/* Image wrapper */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        {/* Rank badge */}
        <span className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center  bg-yellow-400 text-xs font-bold text-yellow-900 shadow-sm">
          {rank}
        </span>

        {featured_image ? (
          <img
            src={featured_image}
            alt={name}
            title={name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-yellow-50 to-amber-100" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-yellow-600 transition-colors">
          {name}
        </p>
        <p className="text-sm font-bold text-gray-900">{fCurrency(price)}</p>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// HomeBestSellers
// ---------------------------------------------------------------------------

export function HomeBestSellers({ products }) {
  const autoplayPlugin = useRef(
    Autoplay({ playOnInit: true, delay: 4000, stopOnInteraction: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [autoplayPlugin.current]
  );

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setPrevEnabled(emblaApi.canScrollPrev());
      setNextEnabled(emblaApi.canScrollNext());
    };

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  if (!products?.length) return null;

  return (
    <section className="my-20 container mx-auto lg:px-6 px-2">
      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center  bg-yellow-100 text-yellow-500">
            <StarIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Top-rated products loved by customers
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Prev */}
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!prevEnabled}
            aria-label="Previous slide"
            className="hidden sm:flex h-9 w-9 items-center justify-center  border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!nextEnabled}
            aria-label="Next slide"
            className="hidden sm:flex h-9 w-9 items-center justify-center  border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>

          <Link
            href="/product"
            className="text-sm font-semibold text-gray-700 hover:underline flex items-center gap-1"
          >
            View All <span className="sm:hidden">→</span>
          </Link>
        </div>
      </div>

      {/* ── CAROUSEL ── */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4 sm:-ml-5">
          {products.map((product, index) => (
            <div
              key={product.product_id}
              className="min-w-0 shrink-0 grow-0 pl-4 sm:pl-5 basis-[55%] sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <BestSellerItem product={product} rank={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
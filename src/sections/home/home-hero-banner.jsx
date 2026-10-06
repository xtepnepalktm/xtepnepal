"use client";

import { useAppSelector } from "@/redux/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { paths } from "@/routes/paths";

export function HomeHeroBanner({ sliders }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color;

  const slidesData = sliders?.length > 0 ? sliders : [];
  if (!slidesData.length) return null;

  return (
    <section className="mt-2 w-full md:mt-3">
      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.5);
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #ffffff;
          width: 24px;
          border-radius: 4px;
        }
        .hero-swiper .swiper-pagination {
          bottom: 12px;
        }
      `}</style>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full hero-swiper"
      >
        {sliders.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* ── MOBILE layout (< md) ── */}
            <div className="block md:hidden relative w-full overflow-hidden bg-black"
              style={{ minHeight: "56vw" }}>
              {/* Full background image */}
              <img
                src={slide.featured_image}
                alt={slide.title ?? "Banner"}
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover object-center"
                aria-hidden="true"
              />
              {/* Dark gradient at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/10 to-transparent" />

              {/* Text content at bottom */}
              <div className="relative z-10 flex flex-col justify-end h-full px-4 pb-10 pt-32">
                {slide.label && (
                  <span
                    className="text-xs font-bold mb-1 block tracking-[0.2em] uppercase"
                    style={{ color: primaryColor ?? "#a3e635" }}
                  >
                    {slide.label}
                  </span>
                )}

                <h2
                  className="text-white text-base font-extrabold uppercase leading-tight mb-3"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />

                {slide.description && (
                  <p
                    className="text-white/75 text-xs mb-4 max-w-xs line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  />
                )}

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={slide.product_url ?? "#"}
                    className="px-4 py-2 text-xs font-semibold uppercase text-white  transition-all active:scale-95 hover:brightness-110"
                    style={{ backgroundColor: primaryColor ?? "#1a1a1a" }}
                  >
                    Shop Now →
                  </Link>

                  <Link
                    href={paths.category}
                    className="border border-white text-white px-4 py-2 text-xs font-semibold uppercase  hover:bg-white hover:text-black transition-all"
                  >
                    View Categories
                  </Link>
                </div>
              </div>
            </div>

            {/* ── DESKTOP layout (md+) ── */}
            <header className="hidden md:flex relative w-full h-[85vh] overflow-hidden items-center bg-black">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.featured_image}
                  alt=""
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-right lg:object-center opacity-70"
                  aria-hidden="true"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-y-0 left-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-r from-black via-black/20 to-transparent" />
              </div>

              {/* Text content */}
              <div className="relative z-10 px-6 md:px-12 lg:px-10 max-w-[1440px] mx-auto w-full">
                <div className="max-w-5xl p-8 ">
                  {/* Eyebrow label */}
                  {slide.label && (
                    <span
                      className="text-sm font-bold mb-4 block tracking-[0.2em] uppercase"
                      style={{ color: primaryColor ?? "#a3e635" }}
                    >
                      {slide.label}
                    </span>
                  )}

                  {/* Headline */}
                  <h2
                    className="text-white text-xl md:text-2xl lg:text-6xl font-extrabold uppercase leading-tight mb-6"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />

                  {/* Description */}
                  {slide.description && (
                    <p
                      className="text-white/80 lg:text-xl mb-10 max-w-xl"
                      dangerouslySetInnerHTML={{ __html: slide.description }}
                    />
                  )}

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={slide.product_url ?? "#"}
                      className="px-5 py-2.5 text-sm font-semibold  text-white  transition-all active:scale-95 hover:brightness-110"
                      style={{ backgroundColor: primaryColor ?? "#1a1a1a" }}
                    >
                      Shop Now →
                    </Link>

                    <Link
                      href={paths.category}
                      className="border border-white text-white px-5 py-2.5 text-sm font-semibold   hover:bg-white hover:text-black transition-all"
                    >
                      View Categories
                    </Link>
                  </div>
                </div>
              </div>
            </header>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

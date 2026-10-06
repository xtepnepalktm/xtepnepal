"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { ProductItem } from "../product/product-item";

// ----------------------------------------------------------------------

export function HomeTrendingProducts({ products }) {
  const { vendor } = useAppSelector((state) => state.vendor);
  const primaryColor = vendor?.primary_color || "#000";
  const swiperRef = useRef(null);

  if (!products?.length) return null;

  return (
    <section className="bg-[#f5f3f3]">
      <div className="py-12 md:py-16 px-3 sm:px-4 md:px-5 container mx-auto overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-gray-900">
            Top Sellers in Nepal
          </h2>

          {/* Navigation buttons for desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 md:w-11 md:h-11 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="Previous"
            >
              <Iconify icon="solar:arrow-left-bold" width={18} />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 md:w-11 md:h-11 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="Next"
            >
              <Iconify icon="solar:arrow-right-bold" width={18} />
            </button>
          </div>
        </div>

        {/* Mobile View: 2-column Grid (No scrollable slider) */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:hidden">
          {products.map((product, index) => (
            <div key={product.product_id} className="w-full">
              <ProductItem
                product={product}
                detailsHref={paths.product.details(product.slug)}
                isTrending={index < 3}
              />
            </div>
          ))}
        </div>

        {/* Desktop View: Swiper Carousel */}
        <div className="hidden md:block">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            grabCursor
            slidesPerView="auto"
            spaceBetween={16}
            className="!overflow-visible"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.product_id} style={{ width: "auto" }}>
                <div className="w-[300px] md:w-[340px] lg:w-[380px]">
                  <ProductItem
                    product={product}
                    detailsHref={paths.product.details(product.slug)}
                    isTrending={index < 3}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
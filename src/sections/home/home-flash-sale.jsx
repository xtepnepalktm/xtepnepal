import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay as SwiperAutoplay } from "swiper/modules";
import "swiper/css";

import { useAppSelector } from "@/redux/hooks";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { Image } from "@/components/image";
import { Iconify } from "@/components/iconify";
import { Carousel, useCarousel } from "@/components/carousel";
import Link from "next/link";

// ----------------------------------------------------------------------

export function HomeFlashSale({ flashSale }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#FF5630";
  const secondaryColor = vendor?.secondary_color || "#FFAB00";
  if (!flashSale?.length) return null;

  return (
    <section className=" container mx-auto lg:px-6 px-2 flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-3  bg-red-500/10 flex items-center justify-center animate-pulse">
          <Iconify icon="solar:bolt-bold-duotone" width={28} className="text-red-500" />
        </div>
        <div>
          <h4 className="font-bold text-xl md:text-2xl">Flash Sale</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Limited time deals - Don't miss out!
          </p>
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="w-full">
        <Swiper
          modules={[SwiperAutoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={800}
          loop={true}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full pb-6"
        >
          {flashSale?.map((sale) => (
            <SwiperSlide key={sale.id} className="h-auto">
              <HomeFlashSaleItem
                sale={sale}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------

function HomeFlashSaleItem({ sale, primaryColor, secondaryColor }) {
  const { end_date, products, title } = sale || {};

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const end = new Date(end_date);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((end - now) / 1000);
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / 86400),
          hours: Math.floor((diff % 86400) / 3600),
          minutes: Math.floor((diff % 3600) / 60),
          seconds: diff % 60,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [end_date]);

  const carousel = useCarousel(
    {
      loop: true,
      align: "start",
      slideSpacing: "20px",
      slidesToShow: { xs: 1, md: 1 },
      dragFree: true,
      duration: 30,
      skipSnaps: false,
    },
    [Autoplay({ playOnInit: true, delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  return (
    <div className="bg-[#fffcfc]  p-4 md:p-4 lg:p-5 border border-red-50 relative overflow-hidden shadow-sm">
      <div className="flex flex-col gap-4">
        <Carousel carousel={carousel}>
          {products?.map((product) => (
            <HomeFlashSaleItemProduct
              key={product.id}
              item={product}
              title={title}
              timeLeft={timeLeft}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

function HomeFlashSaleItemProduct({ item, timeLeft, title, primaryColor, secondaryColor }) {
  const { product, flash_price, sold_count, sale_quantity } = item || {};
  const priceSaved = Number(product.price - flash_price);
  const total = Number(sale_quantity + sold_count);
  const availableProgress = (Number(sale_quantity) / total) * 100;
  const isLowStock = availableProgress <= 20;
  const isMediumStock = availableProgress > 20 && availableProgress <= 50;

  const progressColor = isLowStock
    ? "linear-gradient(90deg, #FF1644, #B71D18)"
    : isMediumStock
      ? "linear-gradient(90deg, #FFAB00, #B76E00)"
      : "linear-gradient(90deg, #22C55E, #15803D)";

  const stockTextColor = isLowStock
    ? "text-red-500"
    : isMediumStock
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div className="flex flex-col gap-2">
      {/* Title + Save badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Iconify icon="solar:fire-bold" className="text-red-500" />
          <span className="font-bold text-sm text-gray-900 ">
            {title || "Flash Sale"}
          </span>
        </div>
        <span className="absolute right-[10px] z-[99] top-[43px] flex items-center gap-1 text-xs font-semibold px-2 py-1  bg-green-500/10 text-green-500">
          <Iconify icon="solar:tag-price-bold" width={14} />
          Save Rs. {priceSaved.toFixed(2)}
        </span>
      </div>

      {/* Product Image */}
      <Link href={paths.product.details(product.slug)}>

        <div className="group p-3  bg-gray-500/[0.04] hover:bg-gray-500/[0.08] transition-colors duration-300">
          <img
            alt={product?.name || "Product"}
            title={product?.name || "Product"}
            src={product?.featured_image || ""}
            className=" transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Name */}
        <p className="text-center font-semibold text-sm text-gray-900  line-clamp-2">
          {product?.name}
        </p>

        {/* Pricing */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-gray-400 line-through text-sm">Rs. {product?.price}</span>
          <span className="text-red-500 font-bold text-xl">Rs. {flash_price}</span>
        </div>

        {/* Stock Info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Iconify
                icon="solar:box-bold-duotone"
                width={16}
                className={isLowStock ? "text-red-500" : "text-gray-400"}
              />
              Available:{" "}
              <strong className={isLowStock ? "text-red-500" : ""}>{sale_quantity}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Iconify icon="solar:cart-check-bold-duotone" width={16} className="text-green-500" />
              Sold: <strong className="text-green-500">{sold_count}</strong>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2.5 w-full  bg-gray-500/[0.16] overflow-hidden">
              <div
                className="h-full  transition-all duration-300"
                style={{ width: `${availableProgress}%`, background: progressColor }}
              />
            </div>

            {isLowStock && (
              <span
                className="absolute -top-2 right-0 text-[0.6rem] font-bold px-1.5 py-0.5 bg-red-500 text-white animate-pulse"
              >
                LOW STOCK
              </span>
            )}
          </div>

          <p className={`text-center text-xs font-semibold ${stockTextColor}`}>
            {Math.round(availableProgress)}% Stock Remaining
          </p>
        </div>

        {/* Countdown */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Iconify icon="solar:alarm-bold" width={16} />
            Hurry Up! Offer ends in:
          </p>

          <div className="flex items-center gap-2 justify-center">
            <TimeUnit value={timeLeft.days} label="DAYS" primaryColor={primaryColor} secondaryColor={secondaryColor} />
            <span className="text-xl font-bold text-gray-300">:</span>
            <TimeUnit value={timeLeft.hours} label="HRS" primaryColor={primaryColor} secondaryColor={secondaryColor} />
            <span className="text-xl font-bold text-gray-300">:</span>
            <TimeUnit value={timeLeft.minutes} label="MIN" primaryColor={primaryColor} secondaryColor={secondaryColor} />
            <span className="text-xl font-bold text-gray-300">:</span>
            <TimeUnit value={timeLeft.seconds} label="SEC" primaryColor={primaryColor} secondaryColor={secondaryColor} />
          </div>
        </div>

      </Link>
    </div >
  );
}

// ----------------------------------------------------------------------

function TimeUnit({ value, label, primaryColor, secondaryColor }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="min-w-[48px] p-2  text-center text-base font-bold text-white shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${secondaryColor} 0%, ${primaryColor} 100%)`,
          boxShadow: `0 4px 12px ${primaryColor}4D`,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[0.65rem] font-semibold text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}
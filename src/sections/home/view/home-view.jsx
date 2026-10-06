"use client";

import { useAppSelector } from "@/redux/hooks";

import {
  ScrollProgress,
  useScrollProgress,
} from "@/components/animate/scroll-progress";

import { HomeHeroBanner } from "../home-hero-banner";
import { HomeFeaturedCategories } from "../home-featured-categories";
import { HomeTrendingProducts } from "../home-trending-products";
import { HomeBestSellers } from "../home-best-sellers";
import { HomeFlashSale } from "../home-flash-sale";
import { HomeMarathon } from "../home-marathon";
import { HomeBlog } from "../home-blog";
import { HomeNewsletter } from "../home-newsletter";
import { HomePremium } from "../home-premium";
import { HomePopupDialog } from "../home-popup-dialog";

import {
  useGetBrands,
  useGetCategories,
  useGetHomeSliders,
  useGetHomeRecentProducts,
  useGetHomeCategoryProducts,
  useGetHomeFlashSale,
  useGetBlogs,
  useGetPopupDialogData,
} from "@/api";

export function HomeView() {
  const vendor = useAppSelector((state) => state.vendor.vendor);

  const pageProgress = useScrollProgress();

  const { sliders } = useGetHomeSliders();

  const { categories } = useGetCategories();

  useGetBrands();

  const { recentProducts } = useGetHomeRecentProducts();

  useGetHomeCategoryProducts();

  const { flashSale } = useGetHomeFlashSale();

  const { blogs, isLoading: blogsLoading } = useGetBlogs();

  const { popupDialogData } = useGetPopupDialogData();

  const flashSaleLength = flashSale?.length || 0;

  return (
    <>
      {/* Popup Dialog */}
      <HomePopupDialog data={popupDialogData} />

      {/* Scroll Progress */}
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[
          (theme) => ({
            position: "fixed",
            zIndex: theme.zIndex.appBar + 1,
          }),
        ]}
      />

      {/* Main Container */}
      <main className="">
        <section className="flex flex-col">
          {/* SEO */}
          <h1 className="hidden">{vendor?.vendor_name}</h1>

          {/* Hero Banner */}
          <HomeHeroBanner sliders={sliders} />

          {/* Premium Section */}
          <HomePremium categories={categories} />

          {/* Flash Sale + Best Sellers */}
          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <HomeFlashSale flashSale={flashSale} />
            </div>

            {flashSaleLength > 0 && (
              <div className="col-span-1">
                <HomeBestSellers products={recentProducts} />
              </div>
            )}
          </div>

          {/* Featured Categories */}
          <HomeFeaturedCategories categories={categories?.slice(0, 8)} />

          {/* Trending Products */}
          <HomeTrendingProducts products={recentProducts} />

          <HomeMarathon />

          {/* Blogs */}
          <HomeBlog blogs={blogs?.slice(0, 3)} isLoading={blogsLoading} />

          <HomeNewsletter />
        </section>
      </main>
    </>
  );
}
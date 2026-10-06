"use client";

import { useTabs, usePopover } from "minimal-shared/hooks";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProductReviewsRequest, setActiveChatData } from "@/redux/actions";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { EmptyContent } from "@/components/empty-content";
import { Iconify } from "@/components/iconify";
import { useCarousel } from "@/components/carousel";
import { CustomPopover } from "@/components/custom-popover";
import { toast } from "@/components/snackbar";

import { ProductDetailsReview } from "../product-details-review";
import { ProductDetailsSummary } from "../product-details-summary";
import { ProductDetailsCarousel } from "../product-details-carousel";
import { ProductDetailsDescription } from "../product-details-description";
import { ProductDetailsRelatedProducts } from "../product-details-related-products";

import { ChatView } from "@/sections/chat/view";

import { createChat } from "@/api";

// ----------------------------------------------------------------------

export function ProductDetailsView({ product, relatedProducts }) {
  const chatPopover = usePopover();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { isLogin } = useAppSelector((state) => state.auth);

  const carousel = useCarousel({ thumbs: { slidesToShow: "auto" } });

  const {
    product_id,
    name,
    featured_image,
    description,
    descriptions,
    product_galleries,
    variants,
  } = product || {};

  // Filter active descriptions and set default tab
  const activeDescriptions =
    descriptions?.filter((desc) => desc.is_active == 1) || [];
  const defaultTab = "description";

  const tabs = useTabs(defaultTab);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductReviewsRequest(product_id));
  }, [product_id]);

  const [selectedVariant, setSelectedVariant] = useState(null);

  const featuredImage = featured_image
    ? { id: "featured_image", image: featured_image }
    : null;

  // Base images (featured + galleries) — these are the only ones with thumbnails
  const baseImages = [
    ...(featuredImage ? [featuredImage] : []),
    ...(product_galleries || []),
  ].filter((img) => img && img.image);

  // The selected variant's image is appended last, so it only shows in the
  // main carousel while that variant is selected
  const selectedVariantImage = selectedVariant?.image
    ? {
      id: `variant-${selectedVariant.variant_id}`,
      image: selectedVariant.image,
      isVariant: true,
    }
    : null;

  const imageCarousel = [
    ...baseImages,
    ...(selectedVariantImage ? [selectedVariantImage] : []),
  ];

  // Use placeholder if no images available
  const displayImages =
    imageCarousel.length > 0
      ? imageCarousel
      : [{ id: "placeholder", image: "/assets/placeholder.png" }];

  // Jump to the variant image whenever the selected variant changes
  useEffect(() => {
    const api = carousel.mainApi;

    if (!selectedVariantImage || !api) return undefined;

    const variantIndex = baseImages.length;
    const scrollToVariant = () => api.scrollTo(variantIndex);

    // Embla re-inits once the newly added slide is picked up
    scrollToVariant();
    api.on("reInit", scrollToVariant);

    return () => {
      api.off("reInit", scrollToVariant);
    };
  }, [selectedVariantImage?.image, carousel.mainApi, baseImages.length]);

  const handleOpenChat = async (event) => {
    if (!isLogin) {
      toast.error("Please login to start a chat!");
      router.push(paths.auth.signIn);
      return;
    }

    chatPopover.onOpen(event);

    try {
      const response = await createChat(product_id);

      const activeChatData = {
        ...response,
        product: {
          product_id,
          name,
          featured_image,
        },
      };

      dispatch(setActiveChatData(activeChatData));
    } catch (error) {
      console.error(error);
    }
  };

  const renderError = () => (
    <EmptyContent
      title="Product Not Found"
      description="Oops! The product you're looking for isn't available. Check out our other amazing products!"
      action={
        <RouterLink href={paths.product.root}>
          <button className="mt-3 inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            <Iconify icon="eva:arrow-ios-back-fill" width={16} />
            Back to List
          </button>
        </RouterLink>
      }
      className="container w-full mx-auto px-2 md:px-8 lg:px-8"
    />
  );

  const renderProduct = () => (
    <div className="flex flex-col gap-6 ">
      {/* Breadcrumbs */}
      <CustomBreadcrumbs
        links={[
          { name: "Home", href: paths.home },
          { name: "Shop", href: paths.product.root },
          { name: name },
        ]}
        className="mb-1 container w-full mx-auto px-2 md:px-8 lg:px-8"
      />

      {/* Product Grid — image + summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 container w-full mx-auto px-2 md:px-8 lg:px-8">
        {/* Carousel — lg: 7/12 columns */}
        <div className="min-w-0">
          <ProductDetailsCarousel images={displayImages} carousel={carousel} />
        </div>

        {/* Summary — lg: 5/12 columns */}
        <div className="min-w-0">
          <ProductDetailsSummary
            product={product}
            carousel={carousel}
            galleryImagesLength={displayImages.length}
            onVariantChange={setSelectedVariant}
            onOpenChat={handleOpenChat}
          />
        </div>
      </div>

      {/* Tabs Card */}
      {/* <div className="rounded-2xl bg-white shadow-sm overflow-hidden p-4">
        <div className=" border-b border-gray-500/[0.08] ">
          <div className="flex gap-0 w-full min-w-max mb-3">
            <TabButton
              active={tabs.value === "description"}
              onClick={() => tabs.onChange(null, "description")}
            >
              Description
            </TabButton>

            {activeDescriptions.map((desc) => (
              <TabButton
                key={desc.id}
                active={tabs.value === desc.id.toString()}
                onClick={() => tabs.onChange(null, desc.id.toString())}
              >
                {desc.title}
              </TabButton>
            ))}

            <TabButton
              active={tabs.value === "reviews"}
              onClick={() => tabs.onChange(null, "reviews")}
            >
              Reviews
            </TabButton>
          </div>
        </div>

        {tabs.value === "description" && (
          <ProductDetailsDescription description={description} />
        )}

        {activeDescriptions.map(
          (desc) =>
            tabs.value === desc.id.toString() && (
              <ProductDetailsDescription
                key={desc.id}
                description={desc.description}
              />
            )
        )}

        {tabs.value === "reviews" && (
          <ProductDetailsReview productId={product_id} />
        )}
      </div> */}

      {/* <section
        className="bg-black text-white pt-section-gap pb-24 overflow-hidden p-0"
      >
        <div className="px-margin-desktop max-w-7xl mx-auto">
          <div
            className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16"
          >
            <div>
              <span
                className="text-performance-neon font-label-caps tracking-widest block mb-4"
              >THE SCIENCE OF SPEED</span
              >
              <h2
                className="text-display-hero font-display-hero uppercase leading-none"
              >
                Xtep Lab™
              </h2>
            </div>
        
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div
                className="absolute -top-10 -left-10 w-40 h-40 bg-xtep-red/20 blur-3xl rounded-full"
              ></div>
              <img
                alt="Technical view"
                className="relative z-10 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                data-alt="A technical, blueprint-style visual of a sneaker's cross-section showing the internal carbon fiber plate. The lighting is cinematic and focused, with neon glowing lines highlighting the propulsion mechanics. The background is a dark, industrial charcoal grey, creating a high-contrast laboratory aesthetic that feels premium and engineered."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsIImyp5aWKBRq_OSs319-JpnCQA-BbTbVei5aZFB6WU1pvsJC6gzr5w2T6sM8KDNh3XgXhIdZJP-l0DJNNb7uFOpaDxcaLGKdmbwAmcdjUkBrX4c35z3JiEg28VQ8oBYX45TI0jKfUrrjoVS9TAygKZ1fd8ykRQqvyiYkHJPdVmLiLFj1jjsH2_EmmX8gZqocIudcBG_csfA0jLcxfwmEFb5LHFIN1WCzdEHw6p5A1kyYBN13FYMpW0zNTAz_trqLetPZtVdmD0o"
              />
              <div
                className="absolute top-1/4 -right-8 z-20 bg-performance-neon text-primary p-4 max-w-[200px]"
              >
                <p className="font-label-caps text-[12px] mb-1">
                  PROPULSION SYSTEM
                </p>
                <p className="font-bold text-sm">Carbon Plate 3.0</p>
                <div className="w-full h-px bg-primary/20 my-2"></div>
                <p className="text-[11px] leading-tight">
                  Full-length curved carbon plate for maximum energy return.
                </p>
              </div>
              <div
                className="absolute bottom-1/4 -left-8 z-20 bg-white text-primary p-4 max-w-[200px]"
              >
                <p className="font-label-caps text-[12px] mb-1">CUSHIONING TECH</p>
                <p className="font-bold text-sm">Feather Foam</p>
                <div className="w-full h-px bg-primary/20 my-2"></div>
                <p className="text-[11px] leading-tight">
                  Ultra-lightweight supercritical foam midsole with 80% rebound.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <h3
                className="text-headline-lg font-headline-lg leading-tight uppercase"
              >
                Shattering Personal Bests
              </h3>
              <p className="text-body-lg text-primary-fixed-dim leading-relaxed">
                The Xtep 160X 3.0 Pro is not just a shoe; it's a statement of
                engineering excellence. Tested in the Xtep Lab, it is designed
                to minimize energy loss and maximize propulsion. Every stitch,
                every curve of the carbon plate is calculated for the elite
                marathon runner seeking to shave seconds off their PB.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-4">
                <div>
                  <h4
                    className="text-performance-neon font-display-hero text-4xl mb-2"
                  >
                    186g
                  </h4>
                  <p className="text-label-caps text-on-surface-variant">
                    ULTRA LIGHTWEIGHT
                  </p>
                </div>
                <div>
                  <h4
                    className="text-performance-neon font-display-hero text-4xl mb-2"
                  >
                    35mm
                  </h4>
                  <p className="text-label-caps text-on-surface-variant">
                    STACK HEIGHT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="bg-black text-white py-24 my-16 overflow-hidden p-0">
        <div className="px-margin-desktop max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <span className="text-performance-neon font-label-caps tracking-widest block mb-4">
                THE SCIENCE OF SPEED
              </span>
              <h2 className="text-display-hero font-display-hero uppercase leading-none">
                Xtep Lab™
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-xtep-red/20 blur-3xl rounded-full" />
              <img
                alt="Technical view"
                className="relative z-10 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src="/assets/images/unnamed.png"
              />
              <div className="absolute top-1/4 -right-8 z-20 bg-performance-neon text-primary p-4 max-w-[200px]">
                <p className="font-label-caps text-[12px] mb-1">PROPULSION SYSTEM</p>
                <p className="font-bold text-sm">Carbon Plate 3.0</p>
                <div className="w-full h-px bg-primary/20 my-2" />
                <p className="text-[11px] leading-tight">
                  Full-length curved carbon plate for maximum energy return.
                </p>
              </div>
              <div className="absolute bottom-1/4 -left-8 z-20 bg-white text-black p-4 max-w-[200px]">
                <p className="font-label-caps text-[12px] mb-1">CUSHIONING TECH</p>
                <p className="font-bold text-sm">Feather Foam</p>
                <div className="w-full h-px bg-primary/20 my-2" />
                <p className="text-[11px] leading-tight">
                  Ultra-lightweight supercritical foam midsole with 80% rebound.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="rounded-2xl shadow-sm overflow-hidden p-4">
                <div className="border-b border-gray-500/[0.08] ">
                  <div className="flex gap-0 w-full min-w-max mb-3">
                    <TabButton
                      active={tabs.value === "description"}
                      onClick={() => tabs.onChange(null, "description")}
                    >
                      Description
                    </TabButton>

                    {activeDescriptions.map((desc) => (
                      <TabButton
                        key={desc.id}
                        active={tabs.value === desc.id.toString()}
                        onClick={() => tabs.onChange(null, desc.id.toString())}
                      >
                        {desc.title}
                      </TabButton>
                    ))}

                    <TabButton
                      active={tabs.value === "reviews"}
                      onClick={() => tabs.onChange(null, "reviews")}
                    >
                      Reviews
                    </TabButton>
                  </div>
                </div>

                {tabs.value === "description" && (
                  <ProductDetailsDescription description={description} className="text-white!" />
                )}

                {activeDescriptions.map(
                  (desc) =>
                    tabs.value === desc.id.toString() && (
                      <ProductDetailsDescription
                        key={desc.id}
                        description={desc.description}
                        sx={{ color: "white" }}
                      />
                    )
                )}

                {tabs.value === "reviews" && (
                  <ProductDetailsReview productId={product_id} />
                )}
              </div>
              <h3 className="text-headline-lg font-headline-lg leading-tight uppercase text-white">
                Shattering Personal Bests
              </h3>
              <p className="text-body-lg text-gray-300 leading-relaxed">
                The Xtep 160X 3.0 Pro is not just a shoe; it's a statement of
                engineering excellence. Tested in the Xtep Lab, it is designed to
                minimize energy loss and maximize propulsion. Every stitch, every
                curve of the carbon plate is calculated for the elite marathon runner
                seeking to shave seconds off their PB.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-4">
                <div>
                  <h4 className="text-performance-neon font-display-hero text-4xl mb-2">186g</h4>
                  <p className="text-label-caps text-gray-400">ULTRA LIGHTWEIGHT</p>
                </div>
                <div>
                  <h4 className="text-performance-neon font-display-hero text-4xl mb-2">35mm</h4>
                  <p className="text-label-caps text-gray-400">STACK HEIGHT</p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section> */}
      <ProductDetailsRelatedProducts
        list={relatedProducts}
        title="Related Products"
        className="mt-5 container w-full mx-auto px-2 md:px-8 lg:px-8"
      />
    </div>
  );

  return (
    <>
      {/* Main container */}
      <div className=" mt-5 mb-10">
        {product ? renderProduct() : renderError()}
      </div>

      {/* Floating Chat Button */}
      <div className="group relative">
        <div
          role="button"
          aria-label="Chat with us"
          onClick={handleOpenChat}
          className={[
            "fixed z-[999] flex cursor-pointer items-center justify-center",
            "right-5 sm:right-5 md:right-6",
            "bottom-20 sm:bottom-10 md:bottom-[10]",
            "rounded-full bg-white p-2",
            "text-primary shadow-[0_12px_24px_0_rgba(0,0,0,0.12)]",
            "transition-opacity duration-200 hover:opacity-75",
          ].join(" ")}
        >
          <Iconify icon="solar:chat-line-bold-duotone" width={40} />
        </div>

        {/* Tooltip */}
        <span
          className={[
            "pointer-events-none fixed z-[1000]",
            "right-[72px] sm:right-[72px] md:right-[82px]",
            "bottom-[148px] sm:bottom-[148px] md:bottom-[96px]",
            "whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white",
            "opacity-0 transition-opacity group-hover:opacity-100",
          ].join(" ")}
        >
          Chat with us
          {/* Arrow pointing right */}
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
        </span>
      </div>

      {/* Chat Popover */}
      <CustomPopover
        open={chatPopover.open}
        anchorEl={chatPopover.anchorEl}
        onClose={chatPopover.onClose}
        slotProps={{
          arrow: { placement: "right-bottom" },
          paper: {
            sx: {
              width: 320,
              height: 1,
              maxHeight: 350,
            },
          },
        }}
      >
        <ChatView />
      </CustomPopover>
    </>
  );
}

// ---------------------------------------------------------------------------
// Internal helper: Tab Button
// ---------------------------------------------------------------------------

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 outline-none",
        "border-b-2 -mb-[2px]",
        active
          ? "border-white text-white"
          : "border-transparent text-gray-400 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
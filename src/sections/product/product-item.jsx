"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, addToWishlist, removeWishlistItem, getCartDataRequest } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";
import { fCurrency } from "@/utils/format-number";
import { addProductToCart, addProductToWishlist, removeProductFromWishlist } from "@/api";
import { ProductVariantFlipPanel } from "./product-variant-flip-panel";

// ----------------------------------------------------------------------

export function ProductItem({ product, detailsHref, isTrending = false }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLogin } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#000";

  const {
    product_id,
    name,
    slug,
    featured_image,
    price,
    selling_price,
    variants,
    flash_sale_products,
    categories,
  } = product;

  const regularPrice = selling_price?.regularPrice || price;
  const flashSalePrice = selling_price?.flashSalePrice || price;
  const hasFlashSale = flash_sale_products?.length > 0;
  const shouldUseFlashSalePrice =
    hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice);

  const hasVariants = variants?.length > 0;
  const isOutOfStock = hasVariants
    ? Boolean(product?.is_out_of_stock) || variants.every((v) => Boolean(v.is_out_of_stock) || (typeof v.stock?.stock_balance === "number" && v.stock.stock_balance <= 0))
    : Boolean(product?.is_out_of_stock) || (typeof product?.stock?.stock_balance === "number" && product.stock.stock_balance <= 0);

  const productInWishlist = wishlistItems?.find((w) => w.product_id == product_id);

  const imageUrl = featured_image
    ? featured_image.startsWith("http")
      ? featured_image
      : `/assets/placeholder.png`
    : `/assets/placeholder.png`;

  // --- Variant selection flip panel ---

  const [variantPanelOpen, setVariantPanelOpen] = useState(false);

  const closeVariantPanel = () => setVariantPanelOpen(false);

  // --- Handlers ---

  const addToCartWithVariant = async (variantId) => {
    let newProduct = { product_id, quantity: 1 };
    if (variantId) newProduct.variant_id = variantId;
    try {
      if (isLogin) {
        await addProductToCart([newProduct]);
        dispatch(getCartDataRequest());
      } else {
        const selectedVariant = variants?.find((v) => v.variant_id === variantId);
        dispatch(
          addToCart({
            ...newProduct,
            cart_id: items.length + 1,
            product_name: name,
            featured_image,
            slug,
            price: flashSalePrice || regularPrice,
            category: categories?.[0],
            variant_values: selectedVariant?.variant_values,
          })
        );
      }
      toast.success("Product added to cart!");
    } catch {
      toast.error("Couldn't add product to cart! Try again");
    }
  };

  const buyNowWithVariant = async (variantId) => {
    if (!isLogin) {
      const variantQuery = variantId ? `&variantId=${variantId}` : "";
      router.push(`${paths.checkout}?buyNow=true&productSlug=${slug}&quantity=1${variantQuery}`);
      return;
    }
    let newProduct = { product_id, quantity: 1 };
    if (variantId) newProduct.variant_id = variantId;
    try {
      await addProductToCart([newProduct]);
      dispatch(getCartDataRequest());
      toast.success("Product added to cart!");
      router.push(paths.cart);
    } catch {
      toast.error("Couldn't add product to cart! Try again");
    }
  };

  const handleAddToCart = (e) => {
    e?.preventDefault();
    if (isOutOfStock) return;
    if (variants?.length) {
      setVariantPanelOpen(true);
      return;
    }
    addToCartWithVariant();
  };

  const handleBuyNow = (e) => {
    e?.preventDefault();
    if (isOutOfStock) return;
    if (variants?.length) {
      setVariantPanelOpen(true);
      return;
    }
    buyNowWithVariant();
  };

  const handleVariantConfirm = (variantId, intent) => {
    closeVariantPanel();
    if (intent === "buy") {
      buyNowWithVariant(variantId);
    } else {
      addToCartWithVariant(variantId);
    }
  };

  const handleWishlist = async (e) => {
    e?.preventDefault();
    if (productInWishlist) {
      try {
        await removeProductFromWishlist(productInWishlist.wishlist_id);
        dispatch(removeWishlistItem(productInWishlist.wishlist_id));
        toast.success("Removed from wishlist!");
      } catch {
        toast.error("Couldn't remove from wishlist! Try again.");
      }
    } else {
      const newProduct = { product_id };
      if (variants?.length) newProduct.variant_id = variants[0].variant_id;
      try {
        const response = await addProductToWishlist(newProduct);
        dispatch(addToWishlist(response[0]));
        toast.success("Added to wishlist!");
      } catch {
        toast.error("Couldn't add to wishlist! Try again.");
      }
    }
  };

  // --- Price display ---

  const displayPrice = () => {
    const variantPrice = variants?.[0]?.price;
    if (variantPrice) {
      return shouldUseFlashSalePrice ? (
        <>
          <span className="text-gray-400 line-through text-md">{fCurrency(variantPrice)}</span>
          <span>{fCurrency(flashSalePrice)}</span>
        </>
      ) : (
        <span>{fCurrency(variantPrice)}</span>
      );
    }
    return shouldUseFlashSalePrice ? (
      <>
        <span className="text-gray-400 line-through text-md">{fCurrency(regularPrice)}</span>
        <span>{fCurrency(flashSalePrice)}</span>
      </>
    ) : (
      <span>{fCurrency(flashSalePrice || regularPrice)}</span>
    );
  };

  return (
    <div className="relative" style={{ perspective: "1600px" }}>
      <div
        className="relative transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: variantPanelOpen ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front face */}
        <div style={{ backfaceVisibility: "hidden" }}>
          <RouterLink href={detailsHref}>
            <div className="group bg-white border border-transparent hover:border-gray-200 transition-all cursor-pointer">

              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={imageUrl}
                  alt={name}
                  title={name}
                  className={`w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ${isOutOfStock ? "opacity-75" : ""}`}
                  onError={(e) => { e.currentTarget.src = ""; }}
                />

                {/* Badges */}
                {isOutOfStock ? (
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-neutral-900/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm z-10">
                    Out of Stock
                  </span>
                ) : (
                  isTrending && (
                    <span
                      className="absolute top-4 left-4 px-3 py-1 text-white text-[12px] font-bold uppercase"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Best Seller
                    </span>
                  )
                )}
                {shouldUseFlashSalePrice && flash_sale_products?.[0] && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-[12px] font-bold uppercase">
                    -{flash_sale_products[0].discount_percentage}%
                  </span>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col py-4 items-center justify-center gap-3 p-5">
                  {isOutOfStock ? (
                    <div className="w-full">
                      <div className="w-full bg-white/90 text-gray-700 p-3 font-bold text-xs uppercase tracking-wider text-center select-none shadow-sm">
                        Out of Stock
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-full">
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-white text-black p-3 font-bold text-xs active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
                        >
                          <Iconify icon="solar:cart-plus-bold" width={15} />
                          Add to Cart
                        </button>
                      </div>
                      <div className="w-full">
                        <button
                          onClick={handleBuyNow}
                          className="w-full border border-white text-white p-3 font-bold text-xs active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-white hover:text-black"
                        >
                          <Iconify icon="solar:bolt-bold" width={15} />
                          Buy Now
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="lg:p-5 md:p-5 p-2">
                {categories && (
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {categories[0]?.category_name}
                  </p>
                )}
                <h4 className="leading-tight mb-2 line-clamp-1.2 text-sm lg:text-md md:text-md">
                  {name}
                </h4>
                <div className="flex justify-between items-center">
                  <div
                    className="flex items-center gap-2 font-black text-md lg:text-lg md:text-lg"
                    style={{ color: primaryColor }}
                  >
                    {displayPrice()}
                  </div>

                  {isLogin && (
                    <button
                      onClick={handleWishlist}
                      className="transition-colors"
                      style={{ color: productInWishlist ? "red" : "#d1d5db" }}
                      aria-label="Toggle wishlist"
                    >
                      <Iconify
                        icon={productInWishlist ? "solar:heart-bold" : "solar:heart-outline"}
                        width={20}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </RouterLink>
        </div>

        {/* Back face — variant selection */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {variants?.length > 0 && (
            <ProductVariantFlipPanel
              open={variantPanelOpen}
              product={product}
              onBack={closeVariantPanel}
              onConfirm={handleVariantConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { fCurrency } from "@/utils/format-number";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  addToWishlist,
  removeWishlistItem,
  getCartDataRequest,
} from "@/redux/actions";

import { Iconify } from "@/components/iconify";
import { NumberInput } from "@/components/number-input";
import { toast } from "@/components/snackbar";

import {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/api";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------

export function ProductDetailsSummary({
  product,
  carousel,
  galleryImagesLength,
  onVariantChange = () => { },
  onOpenChat = () => { },
  isQuickOrder = false,
  ...other
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLogin } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || null;

  const {
    product_id,
    name,
    description,
    slug,
    brand,
    categories,
    price,
    selling_price,
    variants,
    featured_image,
    flash_sale_products,
  } = product || {};

  const regularPrice = selling_price?.regularPrice || price;
  const flashSalePrice = selling_price?.flashSalePrice || price;
  const hasFlashSale = flash_sale_products && flash_sale_products.length > 0;
  const shouldUseFlashSalePrice =
    hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice);
  const hasVariant = variants?.length > 0;

  const productInWishlist = wishlistItems?.find(
    (w) => w.product_id == product_id
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedOptions, setSelectedOptions] = useState({});

  const shouldUseVariantFlashSalePrice =
    selectedVariant?.price &&
    hasFlashSale &&
    parseFloat(flashSalePrice) < parseFloat(selectedVariant.price);

  const currentStock = hasVariant
    ? selectedVariant?.stock?.stock_balance
    : product?.stock?.stock_balance;

  const isOutOfStock = hasVariant
    ? selectedVariant
      ? Boolean(selectedVariant.is_out_of_stock) ||
        (typeof selectedVariant?.stock?.stock_balance === "number" && selectedVariant.stock.stock_balance <= 0)
      : Boolean(product?.is_out_of_stock)
    : Boolean(product?.is_out_of_stock) ||
      (typeof product?.stock?.stock_balance === "number" && product.stock.stock_balance <= 0);

  useEffect(() => {
    if (hasVariant && variants?.length > 0) {
      const defaultVariant = variants[0];
      setSelectedVariant(defaultVariant);
      onVariantChange(defaultVariant);
      const initial = {};
      defaultVariant.variant_values?.forEach((val) => {
        const name = val.variant_type?.name;
        if (name) {
          initial[name] = val.value;
        }
      });
      setSelectedOptions(initial);
    }
  }, [hasVariant, variants]);

  const handleOptionSelect = (optionName, optionValue) => {
    const nextOptions = { ...selectedOptions, [optionName]: optionValue };

    let bestVariant = null;
    let maxScore = -1;

    variants.forEach((v) => {
      const hasClickedValue = v.variant_values?.some(
        (val) => val.variant_type?.name === optionName && val.value === optionValue
      );
      if (!hasClickedValue) return;

      let score = 0;
      v.variant_values?.forEach((val) => {
        const typeName = val.variant_type?.name;
        if (typeName !== optionName && nextOptions[typeName] === val.value) {
          score++;
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestVariant = v;
      }
    });

    if (bestVariant) {
      setSelectedVariant(bestVariant);
      const updatedOptions = {};
      bestVariant.variant_values?.forEach((val) => {
        const name = val.variant_type?.name;
        if (name) updatedOptions[name] = val.value;
      });
      setSelectedOptions(updatedOptions);

      // Let the parent swap in the selected variant image (carousel only)
      onVariantChange(bestVariant);
    }
  };

  // ── Handlers ────────────────────────────────────────────────────

  const handleRemoveFromWishlist = async () => {
    try {
      await removeProductFromWishlist(productInWishlist.wishlist_id);
      dispatch(removeWishlistItem(productInWishlist.wishlist_id));
      toast.success("Removed from wishlist.");
    } catch {
      toast.error("Couldn't remove. Try again.");
    }
  };

  const handleAddToWishlist = async () => {
    const payload = { product_id };
    if (hasVariant)
      payload.variant_id =
        selectedVariant?.variant_id ?? variants[0].variant_id;
    try {
      const response = await addProductToWishlist(payload);
      dispatch(addToWishlist(response[0]));
      toast.success("Added to wishlist.");
    } catch {
      toast.error("Couldn't add to wishlist. Try again.");
    }
  };

  const handleAddToCart = async () => {
    let payload = { product_id, quantity };
    if (hasVariant)
      payload.variant_id =
        selectedVariant?.variant_id ?? variants[0].variant_id;
    try {
      if (isLogin) {
        await addProductToCart([payload]);
        dispatch(getCartDataRequest());
      } else {
        payload = {
          ...payload,
          cart_id: items.length + 1,
          product_name: name,
          featured_image,
          slug,
          price: flashSalePrice || regularPrice,
          category: categories?.[0],
          variant_values: selectedVariant?.variant_values,
        };
        dispatch(addToCart(payload));
      }
      toast.success("Added to cart.");
    } catch (error) {
      console.error("[ADD TO CART]", error);
      toast.error("Couldn't add to cart. Try again.");
    }
  };

  const handleBuyNow = async () => {
    if (!isLogin) {
      router.push(
        `${paths.checkout}?buyNow=true&productSlug=${slug}&quantity=1`
      );
      return;
    }
    let payload = { product_id, quantity };
    if (hasVariant) {
      payload.variant_id = selectedVariant?.variant_id ?? variants[0].variant_id;
    }
    try {
      await addProductToCart([payload]);
      dispatch(getCartDataRequest());
      toast.success("Product added to cart!");
      router.push(paths.cart);
    } catch {
      toast.error("Couldn't add product to cart! Try again");
    }
  };

  // ── Render helpers ───────────────────────────────────────────────

  const renderBadge = () => {
    if (!shouldUseFlashSalePrice && !shouldUseVariantFlashSalePrice)
      return null;
    const regular = hasVariant ? selectedVariant?.price : regularPrice;
    const sale = flashSalePrice;
    const pct = Math.round(((regular - sale) / regular) * 100);
    return (
      <span className="inline-block bg-red-600 text-white text-[12px] font-bold tracking-[0.12em] uppercase px-2 py-0.5">
        {pct}% OFF
      </span>
    );
  };

  const renderPrice = () => {
    const salePrice = hasVariant
      ? shouldUseVariantFlashSalePrice
        ? flashSalePrice
        : selectedVariant?.price || regularPrice
      : shouldUseFlashSalePrice
        ? flashSalePrice
        : regularPrice;

    const strikePrice =
      (hasVariant && shouldUseVariantFlashSalePrice && selectedVariant?.price) ||
      (!hasVariant && shouldUseFlashSalePrice && regularPrice);

    return (
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold  text-[#e40013] leading-none">
          {fCurrency(salePrice)}
        </span>
        {strikePrice && (
          <span className="text-base text-gray-400 line-through mb-0.5 font-bold">
            {fCurrency(strikePrice)}
          </span>
        )}
        {renderBadge()}
      </div>
    );
  };

  const renderRating = () => (
    <div className="flex items-center gap-2">
      {/* <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div> */}
      <span className="text-[0.95rem] text-gray-600 tracking-wide">{product?.sku}</span>
    </div>
  );

  const renderVariants = () => {
    if (!hasVariant) return null;

    // Collect the distinct option types in the order they first appear
    const optionTypeNames = [];
    variants.forEach((v) => {
      v.variant_values?.forEach((val) => {
        const typeName = val.variant_type?.name;
        if (typeName && !optionTypeNames.includes(typeName)) {
          optionTypeNames.push(typeName);
        }
      });
    });

    // For each option type, only surface values that still exist on a variant
    // matching the currently selected values of every OTHER option type.
    // e.g. once Gender = Male is selected, Size only lists sizes available for Male.
    const optionGroups = optionTypeNames.map((typeName) => {
      const compatibleVariants = variants.filter((v) =>
        v.variant_values?.every((val) => {
          const otherType = val.variant_type?.name;
          if (!otherType || otherType === typeName) return true;
          return (
            selectedOptions[otherType] === undefined ||
            selectedOptions[otherType] === val.value
          );
        })
      );

      const values = [];
      const images = {};
      compatibleVariants.forEach((v) => {
        v.variant_values?.forEach((val) => {
          if (val.variant_type?.name !== typeName) return;
          if (!values.includes(val.value)) values.push(val.value);
          if (!images[val.value] && v.image) images[val.value] = v.image;
        });
      });

      if (/size/i.test(typeName)) {
        values.sort((a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b));
      }

      return { name: typeName, values, images, compatibleVariants };
    });

    return (
      <div className="flex flex-col gap-4">
        {optionGroups.map((group) => {
          const isColor = /color/i.test(group.name);
          const currentValue = selectedOptions[group.name];

          return (
            <div key={group.name} className="flex flex-col gap-2">
              <RowLabel label={group.name} value={currentValue} />

              <div className="flex flex-wrap items-center gap-2">
                {group.values.map((valValue) => {
                  const isSelected = currentValue === valValue;
                  const matchingVariant = group.compatibleVariants?.find((v) =>
                    v.variant_values?.some(
                      (val) => val.variant_type?.name === group.name && val.value === valValue
                    )
                  );
                  const isValOutOfStock = matchingVariant
                    ? Boolean(matchingVariant.is_out_of_stock) ||
                      (typeof matchingVariant.stock?.stock_balance === "number" && matchingVariant.stock.stock_balance <= 0)
                    : false;

                  // Color attributes rendered as circular image swatches
                  if (isColor) {
                    const variantImg = group.images[valValue];
                    return (
                      <button
                        key={valValue}
                        title={isValOutOfStock ? `${valValue} (Out of Stock)` : valValue}
                        onClick={() => handleOptionSelect(group.name, valValue)}
                        className={[
                          "relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-150 focus:outline-none flex items-center justify-center p-0.5",
                          isSelected
                            ? "border-black scale-105 shadow-md"
                            : "border-gray-200 hover:border-gray-400 hover:scale-102",
                          isValOutOfStock && !isSelected ? "opacity-60" : "",
                        ].join(" ")}
                      >
                        {variantImg ? (
                          <img
                            src={variantImg}
                            alt={valValue}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-[12px] uppercase font-bold tracking-wider">{valValue}</span>
                        )}
                        {isValOutOfStock && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <span className="w-full h-[1.5px] bg-red-500 rotate-45" />
                          </span>
                        )}
                      </button>
                    );
                  }

                  // Non-color options (Size, Gender, etc.)
                  return (
                    <button
                      key={valValue}
                      onClick={() => handleOptionSelect(group.name, valValue)}
                      title={isValOutOfStock ? `${valValue} (Out of Stock)` : valValue}
                      className={[
                        "relative min-w-[48px] h-10 px-3 flex items-center justify-center text-xs font-semibold uppercase tracking-wider transition-all duration-150 border focus:outline-none",
                        isSelected
                          ? "bg-black text-white border-black font-bold"
                          : isValOutOfStock
                            ? "bg-gray-50 text-gray-400 border-dashed border-gray-300 hover:border-gray-400"
                            : "bg-white text-gray-800 border-gray-200 hover:border-black hover:text-black",
                      ].join(" ")}
                    >
                      <span className={isValOutOfStock && !isSelected ? "line-through text-gray-400" : ""}>
                        {valValue}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBrand = () => (
    <div className="flex items-center justify-between">
      <FieldLabel>Brand</FieldLabel>
      <div className="flex items-center gap-2">
        <img
          alt={brand?.brand_name}
          src={brand?.brand_image}
          className="w-5 h-5 rounded-full object-cover"
        />
        <span className="text-[13px] font-semibold text-gray-900 uppercase tracking-wide">
          {brand?.brand_name}
        </span>
      </div>
    </div>
  );

  const renderCategory = () => {
    if (!categories?.length) return null;
    return (
      <div className="flex items-center justify-between gap-4">
        <FieldLabel>Category</FieldLabel>
        <div className="flex items-center gap-2 flex-wrap justify-end">

          {categories.map((cat) => (
            <div key={cat.category_id} className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100 shadow-md">
              <img
                alt={cat.category_name}
                title={cat.category_name}
                src={cat.web_image}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">{cat.category_name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuantity = () => {
    if (isQuickOrder) return null;
    return (
      <div className="flex items-center justify-between">
        <FieldLabel>Quantity</FieldLabel>
        <NumberInput
          hideDivider
          value={quantity}
          onChange={(_, qty) => setQuantity(qty)}
          min={1}
          max={100}
          sx={{ maxWidth: 112 }}
        />
      </div>
    );
  };

  const renderChatAction = () => {
    if (isQuickOrder) return null;
    return (
      <div className="flex items-center justify-between py-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-900">
            Need more info?
          </span>
          <span className="text-[11px] text-gray-400">
            Chat with the supplier
          </span>
        </div>
        <button
          onClick={(event) => onOpenChat(event)}
          className="border border-gray-900 px-4 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
        >
          Chat Now
        </button>
      </div>
    );
  };

  const renderActions = () => {
    if (isQuickOrder) return null;

    if (isOutOfStock) {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-100 border border-gray-200 text-gray-400 text-[12px] font-bold tracking-[0.15em] uppercase cursor-not-allowed select-none"
            >
              <Iconify icon="solar:close-circle-bold" width={18} />
              Out of Stock
            </button>

            {isLogin && (
              <button
                onClick={
                  productInWishlist
                    ? handleRemoveFromWishlist
                    : handleAddToWishlist
                }
                title={productInWishlist ? "Remove from wishlist" : "Save to wishlist"}
                className={[
                  "w-14 flex items-center justify-center border-2 transition-colors",
                  productInWishlist
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-gray-300 text-gray-500 hover:border-black hover:text-black",
                ].join(" ")}
              >
                <Iconify
                  icon={
                    productInWishlist
                      ? "solar:heart-bold"
                      : "solar:heart-outline"
                  }
                  width={20}
                />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500">
            This item is currently out of stock. Please select another variant or add to your wishlist.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {/* Quantity + Add to Cart — 30 / 70 split */}
        <div className="flex gap-2 h-full">
          <div className="w-[30%] shrink-0">
            <NumberInput
              hideDivider
              value={quantity}
              onChange={(_, qty) => setQuantity(qty)}
              min={1}
              max={100}
              sx={{
                width: "100%",
                height: "100%",
                border: "2px solid black",
              }}
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="w-[70%] flex items-center justify-center gap-2 py-4 text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-150 bg-black text-white hover:bg-gray-800 active:scale-[0.99]"
            style={primaryColor ? { backgroundColor: primaryColor } : undefined}
          >
            <Iconify icon="solar:cart-plus-bold" width={18} />
            Add to Bag
          </button>
        </div>

        {/* Secondary row — Buy Now + Wishlist */}
        <div className="flex gap-2">
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-black text-black hover:bg-black hover:text-white text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-150"
          >
            <Iconify icon="solar:bolt-bold" width={16} />
            Buy Now
          </button>

          {isLogin && (
            <button
              onClick={
                productInWishlist
                  ? handleRemoveFromWishlist
                  : handleAddToWishlist
              }
              title={productInWishlist ? "Remove from wishlist" : "Save to wishlist"}
              className={[
                "w-14 flex items-center justify-center border-2 transition-colors",
                productInWishlist
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-gray-300 text-gray-500 hover:border-black hover:text-black",
              ].join(" ")}
            >
              <Iconify
                icon={
                  productInWishlist
                    ? "solar:heart-bold"
                    : "solar:heart-outline"
                }
                width={20}
              />
            </button>
          )}
        </div>
      </div>
    );
  };

  // ── Trust badges ────────────────────────────────────────────────
  const renderTrustBadges = () => {
    if (isQuickOrder) return null;
    return (
      <div className="grid grid-cols-3 gap-2 pt-5 border-t border-gray-100">
        {[
          { icon: "solar:verified-check-bold", label: "100% Authentic" },
          { icon: "solar:delivery-bold", label: "Nationwide Delivery" },
          { icon: "solar:history-bold", label: "7-Day Returns" },
        ].map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 text-center">
            <Iconify icon={icon} width={20} className="text-gray-400" />
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // ── Root ────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5 pt-1" {...other}>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl lg:text-5xl uppercase text-gray-900 leading-tight m-0">
          {name}
        </h1>
        {renderRating()}
      </div>
      <Markdown children={description} />
      {/* Price block */}
      <div className="flex flex-col gap-2">
        {renderPrice()}
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={[
              "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1",
              isOutOfStock
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200",
            ].join(" ")}
          >
            <span
              className={[
                "w-2 h-2 rounded-full",
                isOutOfStock ? "bg-red-500" : "bg-emerald-500",
              ].join(" ")}
            />
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </span>
        </div>
      </div>

      <Rule />

      {/* Meta — brand + category */}
      <div className="flex flex-col gap-3">
        {/* {renderBrand()} */}
        {renderCategory()}
      </div>

      <Rule />

      {/* Variants */}
      {hasVariant && (
        <>
          {renderVariants()}
          <Rule />
        </>
      )}

      {/* Chat */}
      {/* {renderChatAction()} */}

      {!isQuickOrder && <Rule />}

      {/* Actions */}
      {renderActions()}

      {/* Trust badges */}
      {renderTrustBadges()}

    </div>
  );
}

// ── Shared primitives ────────────────────────────────────────────

function Rule() {
  return <hr className="border-t border-gray-100 m-0" />;
}

function FieldLabel({ children }) {
  return (
    <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-gray-400">
      {children}
    </span>
  );
}

function RowLabel({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <FieldLabel>{label}:</FieldLabel>
      <span className="text-[12px] font-semibold text-gray-900 uppercase tracking-wide">
        {value}
      </span>
    </div>
  );
}
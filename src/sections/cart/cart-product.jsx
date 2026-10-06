import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { useAppSelector } from "@/redux/hooks";
import { selectAuthState, selectWishlistState } from "@/redux/selectors";

import { fCurrency } from "@/utils/format-number";
import { fixItemImageUrl } from "@/utils/format-image-url";

import { Iconify } from "@/components/iconify";
import { NumberInput } from "@/components/number-input";
import { CONFIG } from "@/global-config";

// ----------------------------------------------------------------------

export function CartProduct({
  row,
  onDeleteCartItem,
  onChangeItemQuantity,
  onMoveToWishlist,
}) {
  const { isLogin } = useAppSelector(selectAuthState);
  const { items: wishlistItems } = useAppSelector(selectWishlistState);
  console.log(row, "row");
  const {
    cart_id,
    product_id,
    itemable_id,
    product_name,
    item_name,
    slug,
    category,
    featured_image,
    item_image,
    price,
    regular_price,
    quantity,
    is_flash_sale,
    flash_sale_remaining_qty,
    itemable,
  } = row;
  const productId = product_id || itemable_id || row.product?.product_id;
  const productName = item_name || product_name || row.product?.name || row.product?.product_name;

  const variantValues = itemable?.variant_values || row.variant_values || [];

  const productSlug = slug || row.product?.slug;

  const priceValue = Number(price) || Number(regular_price) || 0;
  const regularPriceValue = Number(regular_price) || 0;
  const isFlashSale = Boolean(is_flash_sale);
  const flashSaleRemaining = Number(flash_sale_remaining_qty) || 0;

  const isProductInWishlist = wishlistItems?.some(
    (wishlistItem) => wishlistItem.product_id == productId
  );

  return (
    <div className="group flex flex-col md:flex-row gap-6 p-4 bg-surface-container-lowest border border-outline-variant hover:border-primary transition-colors w-full">
      {/* Product Image */}
      <div className="w-full md:w-48 h-48 bg-surface-alt overflow-hidden flex-shrink-0 shadow-md">
        <img
          src={fixItemImageUrl(item_image) || item_image || fixItemImageUrl(featured_image) || featured_image || "/assets/images/placeholder.png"}
          alt={productName}
          title={productName}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105 "
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col justify-between w-full">
        <div>
          {/* Name + Delete */}
          <div className="flex justify-between items-start">
            <RouterLink
              href={paths.product.details(productSlug)}
              className="font-headline-md text-headline-md uppercase no-underline hover:underline text-inherit lg:text-2xl font-bold"
            >
              {productName}
            </RouterLink>


            <button
              type="button"
              onClick={() => onDeleteCartItem(cart_id)}
              className="text-outline hover:text-error transition-colors"
              aria-label="Remove item"
            >
              <Iconify icon="solar:trash-bin-trash-bold" width={24} />
            </button>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {category?.category_name && (
              <span className="font-label-caps text-label-caps  bg-primary/10 px-2.5 py-0.5 font-semibold uppercase tracking-wide text-primary">
                {category.category_name}
              </span>
            )}
            {/* Variant Options (e.g. Male / 40) */}
            {variantValues.map((variantValue, index) => (
              <span
                key={variantValue.id ?? index}
                className="font-label-caps text-label-caps  border border-outline-variant bg-surface-alt px-2.5 py-0.5 uppercase tracking-wide text-on-surface-variant"
              >
                {variantValue.value}
              </span>
            ))}
          </div>

          {/* Flash Sale Badge */}
          {isFlashSale && (
            <div className="mt-1 inline-flex items-center gap-1  bg-red-100 px-2 py-0.5 text-[11px] font-medium text-red-600">
              <Iconify icon="solar:fire-bold" width={14} />
              Flash Sale
            </div>
          )}

          {/* Remaining stock */}
          {isFlashSale && flashSaleRemaining > 0 && (
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-1 flex items-center gap-1">
              <Iconify icon="solar:clock-circle-bold" width={14} />
              {flashSaleRemaining} left at this price
            </p>
          )}
        </div>

        {/* Quantity + Price Row */}
        <div className="mt-6 flex flex-wrap justify-between items-end gap-4">
          <div className="flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center border border-outline max-w-[150px]">
              <NumberInput
                hideDivider
                value={Number(quantity)}
                onChange={(event, qty) => onChangeItemQuantity(cart_id, qty)}
                min={1}
              />
            </div>

            {/* Move to Wishlist */}
            {isLogin && !isProductInWishlist && (
              <button
                type="button"
                onClick={() => onMoveToWishlist(row)}
                className="font-label-caps text-label-caps text-on-surface-variant underline hover:text-primary transition-colors whitespace-nowrap"
              >
                Move to Wishlist
              </button>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col items-end gap-0.5">
            {isFlashSale && regularPriceValue > priceValue ? (
              <>
                <span className="font-label-caps text-label-caps text-on-surface-variant line-through">
                  {fCurrency(regularPriceValue)}
                </span>
                <span className="font-price-display text-price-display text-red-600">
                  {fCurrency(priceValue * quantity)}
                </span>
                <span className="font-label-caps text-label-caps text-green-600">
                  Save {fCurrency((regularPriceValue - priceValue) * quantity)}
                </span>
              </>
            ) : (
              <span className="font-price-display text-price-display lg:text-2xl text-lg font-bold">
                {fCurrency(priceValue * quantity)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
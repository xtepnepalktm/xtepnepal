import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeWishlistItem, getCartDataRequest } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

import { WishlistProductList } from "./wishlist-product-list";

import { addProductToCart, removeProductFromWishlist } from "@/api";

// ── Design tokens (mirrored from OrderTableRow) ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function WishlistOverview() {
  const dispatch = useAppDispatch();

  const { isLoading, items, totalItems } = useAppSelector(
    (state) => state.wishlist
  );

  const isWishlistEmpty = !items.length;

  const handleMoveToCart = async ({ product_id, variant_id, wishlist_id }) => {
    const newProduct = {
      product_id,
      quantity: 1,
      ...(variant_id && { variant_id }),
    };

    try {
      await addProductToCart([newProduct]);
      await removeProductFromWishlist(wishlist_id);
      dispatch(removeWishlistItem(wishlist_id));
      dispatch(getCartDataRequest());
      toast.success("Product moved to cart!");
    } catch (error) {
      toast.error("Couldn't move to cart! Try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeProductFromWishlist(id);
      dispatch(removeWishlistItem(id));
      toast.success("Product removed from wishlist!");
    } catch (error) {
      toast.error("Couldn't remove product! Try again.");
    }
  };

  const renderLoading = () => (
    <div style={{
      height: 340,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "0.75rem",
    }}>
      <div style={{
        width: 24, height: 24,
        border: `2px solid ${BORDER}`,
        borderTopColor: TEXT,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <span style={{
        fontFamily: "Helvetica",
        fontSize: 9, fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: TEXT_MUTED,
      }}>
        Loading wishlist…
      </span>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const renderEmpty = () => (
    <div style={{
      height: 340,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "0.75rem", padding: "0 1.5rem", textAlign: "center",
    }}>
      {/* Icon box — sharp square, no border-radius */}
      <div style={{
        width: 50, height: 50,
        backgroundColor: BG,
        border: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Iconify
          icon="eva:heart-outline"
          style={{ width: 25, height: 25, color: TEXT_MUTED }}
        />
      </div>

      <div>
        <p style={{
          fontFamily: "Helvetica",
          fontSize: 16, fontWeight: 700,
          color: TEXT, marginBottom: 4,
        }}>
          Your wishlist is empty
        </p>
        <p style={{
          fontFamily: "Helvetica",
          fontSize: 12, fontWeight: 600,
          color: TEXT_MUTED, maxWidth: 200, lineHeight: 1.6,
        }}>
          Save items you love here and come back to them anytime.
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

      {/* Main Card */}
      <div style={{
        backgroundColor: WHITE,
        border: `1px solid ${BORDER}`,
        overflow: "hidden",
        width: "100%",
      }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0.75rem 1rem",
          borderBottom: `1px solid ${BORDER}`,
          backgroundColor: BG,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Iconify
              icon="eva:heart-fill"
              style={{ width: 20, height: 20, color: RED }}
            />
            <h2 style={{
              fontFamily: "Helvetica",
              fontSize: 14, fontWeight: 700,
              letterSpacing: "0.05em", textTransform: "uppercase",
              color: TEXT, margin: 0,
            }}>
              Wishlist
            </h2>
          </div>

          {!isWishlistEmpty && (
            <span style={{
              fontFamily: "Helvetica",
              fontSize: 12, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: TEXT_MUTED,
              backgroundColor: WHITE,
              border: `1px solid ${BORDER}`,
              padding: "2px 8px",
            }}>
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {/* Body */}
        {isLoading ? renderLoading() : isWishlistEmpty ? renderEmpty() : (
          <WishlistProductList
            items={items}
            onMoveToCart={handleMoveToCart}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Continue Shopping */}
      <RouterLink
        href={paths.product.root}
        className="p-2"
        style={{
          fontFamily: "Helvetica",
          fontSize: 9, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: TEXT_MUTED, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: "2px",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = TEXT}
        onMouseLeave={(e) => e.currentTarget.style.color = TEXT_MUTED}
      >
        <Iconify
          icon="eva:arrow-ios-back-fill"
          style={{ width: 12, height: 12 }}
        />
        Continue shopping
      </RouterLink>

    </div>
  );
}
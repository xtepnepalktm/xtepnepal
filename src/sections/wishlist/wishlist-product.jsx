import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { fCurrency } from "@/utils/format-number";
import { Iconify } from "@/components/iconify";

// ── Design tokens (mirrored from OrderTableRow) ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

const actionBtn = {
  fontFamily: "Helvetica",
  fontSize: 12, fontWeight: 700,
  letterSpacing: "0.12em", textTransform: "uppercase",
  color: TEXT_MUTED,
  backgroundColor: BG,
  border: `1px solid ${BORDER}`,
  padding: "0.3rem 0.625rem",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  transition: "border-color 0.15s, color 0.15s",
};

// ----------------------------------------------------------------------

export function WishlistProduct({ row, onMoveToCart, onDelete, isLast }) {
  const {
    wishlist_id, product_name, slug,
    product_image, price, variant_name,
  } = row;

  const { regularPrice, flashSalePrice } = price || {};
  const displayPrice = flashSalePrice ?? regularPrice ?? price;
  const hasDiscount = flashSalePrice && regularPrice && flashSalePrice < regularPrice;

  return (
    <tr
      style={{ borderBottom: isLast ? "none" : `1px solid ${BORDER}`, backgroundColor: WHITE }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = BG}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = WHITE}
    >
      {/* Product */}
      <td style={{ padding: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          {/* Image */}
          <div style={{
            width: 70, height: 70, flexShrink: 0,
            border: `1px solid ${BORDER}`, overflow: "hidden",
          }}>
            <img
              alt={product_name}
              title={product_name}
              src={product_image}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Name + variant */}
          <div>
            <RouterLink
              href={paths.product.details(slug)}
              style={{
                fontFamily: "Helvetica",
                fontSize: 14, fontWeight: 700,
                color: TEXT, textDecoration: "none",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                maxWidth: 240,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = RED}
              onMouseLeave={(e) => e.currentTarget.style.color = TEXT}
            >
              {product_name}
            </RouterLink>

            {variant_name && (
              <div style={{
                fontFamily: "Helvetica",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: TEXT_MUTED, marginTop: 2,
              }}>
                {variant_name}
              </div>
            )}
          </div>
        </div>
      </td>

      {/* Price */}
      <td style={{ padding: "0.75rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{
            fontFamily: "Helvetica",
            fontSize: 14, fontWeight: 800, color: TEXT,
          }}>
            {fCurrency(displayPrice)}
          </span>

          {hasDiscount && (
            <span style={{
              fontFamily: "Helvetica",
              fontSize: 12, fontWeight: 600,
              color: TEXT_MUTED, textDecoration: "line-through",
            }}>
              {fCurrency(regularPrice)}
            </span>
          )}
        </div>
      </td>

      {/* Add to Cart */}
      <td style={{ padding: "0.75rem" }}>
        <button
          onClick={() => onMoveToCart(row)}
          style={actionBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = TEXT;
            e.currentTarget.style.color = TEXT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = BORDER;
            e.currentTarget.style.color = TEXT_MUTED;
          }}
        >
          Add to Cart
        </button>
      </td>

      {/* Delete */}
      <td style={{ padding: "0.75rem 1rem 0.75rem 0.75rem", textAlign: "right" }}>
        <button
          onClick={() => onDelete(wishlist_id)}
          style={{
            background: "none", border: "none",
            cursor: "pointer", padding: "0.25rem",
            color: `${RED}66`,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = RED}
          onMouseLeave={(e) => e.currentTarget.style.color = `${RED}66`}
        >
          <Iconify icon="solar:trash-bin-trash-bold" style={{ width: 20, height: 20 }} />
        </button>
      </td>
    </tr>
  );
}
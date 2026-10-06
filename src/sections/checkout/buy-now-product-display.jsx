
"use client";

import { NumberInput } from "@/components/number-input";
import { fCurrency } from "@/utils/format-number";

// ── Design tokens — mirrors CheckoutView ──
const WHITE = "#ffffff";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function BuyNowProductDisplay({ product, variant, quantity, onQuantityChange }) {
    if (!product) return null;

    const { name, featured_image, price, selling_price, flash_sale_products } = product;

    const regularPrice = variant?.price || selling_price?.regularPrice || price;
    const flashSalePrice = selling_price?.flashSalePrice || price;
    const variantLabel = variant?.variant_values
        ?.map((v) => v.value)
        .join(" / ");

    const hasFlashSale =
        flash_sale_products && flash_sale_products.length > 0;

    const finalPrice =
        hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice)
            ? flashSalePrice
            : regularPrice;

    const subtotal = quantity * parseFloat(finalPrice);

    return (
        <div style={{
            backgroundColor: WHITE,
            border: `1px solid ${BORDER}`,
            padding: "1.5rem",
        }}>
            {/* Product row */}
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>

                {/* Image */}
                <div style={{
                    width: 96, height: 96,
                    flexShrink: 0,
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                    border: `1px solid ${BORDER}`,
                }}>
                    <img
                        alt={name}
                        title={name}
                        src={featured_image || ""}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>

                    {/* Section eyebrow */}
                    <p style={{
                        fontFamily: "Helvetica",
                        fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: TEXT_MUTED,
                        margin: "0 0 6px",
                    }}>
                        Product
                    </p>

                    <h3 style={{
                        fontFamily: "Helvetica",
                        fontSize: 15, fontWeight: 700,
                        color: TEXT,
                        margin: "0 0 10px",
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>
                        {name}
                    </h3>

                    {variantLabel && (
                        <p style={{
                            fontFamily: "Helvetica",
                            fontSize: 11, fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: TEXT_MUTED,
                            margin: "0 0 8px",
                        }}>
                            {variantLabel}
                        </p>
                    )}

                    {/* Price row */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        {hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice) && (
                            <span style={{
                                fontFamily: "Helvetica",
                                fontSize: 13,
                                color: TEXT_MUTED,
                                textDecoration: "line-through",
                            }}>
                                {fCurrency(regularPrice)}
                            </span>
                        )}
                        <span style={{
                            fontFamily: "Helvetica",
                            fontSize: 18, fontWeight: 800,
                            color: RED,
                        }}>
                            {fCurrency(finalPrice)}
                        </span>
                        {hasFlashSale && parseFloat(flashSalePrice) < parseFloat(regularPrice) && (
                            <span style={{
                                fontFamily: "Helvetica",
                                fontSize: 10, fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: RED,
                                backgroundColor: "rgba(230,25,17,0.08)",
                                padding: "2px 6px",
                            }}>
                                Sale
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: BORDER, margin: "1.25rem 0" }} />

            {/* Quantity row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                    fontFamily: "Helvetica",
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: TEXT_MUTED,
                }}>
                    Quantity
                </span>

                <div style={{ width: 120 }}>
                    <NumberInput
                        value={quantity}
                        onChange={(event, value) => onQuantityChange(value)}
                        min={1}
                        max={100}
                    />
                </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: BORDER, margin: "1.25rem 0" }} />

            {/* Subtotal row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                    fontFamily: "Helvetica",
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: TEXT_MUTED,
                }}>
                    Subtotal
                </span>

                <div style={{ textAlign: "right" }}>
                    <span style={{
                        fontFamily: "Helvetica",
                        fontSize: 22, fontWeight: 800,
                        color: TEXT,
                        letterSpacing: "-0.01em",
                    }}>
                        {fCurrency(subtotal)}
                    </span>
                </div>
            </div>

            {/* Red accent bar — mirrors the heading divider in CheckoutView */}
            <div style={{ height: 2, backgroundColor: RED, width: 32, marginTop: "1.25rem" }} />
        </div>
    );
}
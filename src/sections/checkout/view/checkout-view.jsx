// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import { useRouter } from "@/routes/hooks";
// import { paths } from "@/routes/paths";

// import { useAppSelector } from "@/redux/hooks";

// import { BuyNowProductDisplay } from "../buy-now-product-display";
// import { CartItemsDisplay } from "../cart-items-display";
// import { QuickOrderForm } from "../quick-order-form";

// // ----------------------------------------------------------------------

// export function CheckoutView() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const [checkoutMode, setCheckoutMode] = useState(null); // 'buyNow' | 'cart'
//     const [buyNowProduct, setBuyNowProduct] = useState(null);
//     const [buyNowQuantity, setBuyNowQuantity] = useState(1);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState("");

//     // Only access cart from Redux when in cart mode
//     const { items: cartItems } = useAppSelector((state) => state.cart);

//     useEffect(() => {
//         const isBuyNow = searchParams.get("buyNow") === "true";
//         const productSlug = searchParams.get("productSlug");
//         const quantity = searchParams.get("quantity");

//         if (isBuyNow && productSlug) {
//             // Buy Now mode
//             setCheckoutMode("buyNow");
//             setBuyNowQuantity(parseInt(quantity) || 1);

//             // Fetch product details
//             fetchProductForBuyNow(productSlug);
//         } else {
//             // Cart checkout mode
//             setCheckoutMode("cart");

//             if (!cartItems || cartItems.length === 0) {
//                 setError("Your cart is empty");

//                 setTimeout(() => {
//                     router.push(paths.cart);
//                 }, 2000);
//             } else {
//                 setIsLoading(false);
//             }
//         }
//     }, [searchParams, cartItems, router]);

//     const fetchProductForBuyNow = async (productSlug) => {
//         try {
//             setIsLoading(true);
//             setError("");

//             // Import product API function
//             const { getProductDetails } = await import("@/api");

//             const product = await getProductDetails(productSlug);

//             if (product) {
//                 setBuyNowProduct(product);
//             } else {
//                 setError("Product not found");

//                 setTimeout(() => {
//                     router.push(paths.home);
//                 }, 2000);
//             }
//         } catch (err) {
//             console.error("Error fetching product:", err);

//             setError("Failed to load product. Redirecting...");

//             setTimeout(() => {
//                 router.push(paths.home);
//             }, 2000);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleQuantityChange = (newQuantity) => {
//         setBuyNowQuantity(newQuantity);
//     };

//     // Loading State
//     if (isLoading) {
//         return (
//             <div className="py-20">
//                 <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 text-center">
//                     {/* Spinner */}
//                     <div
//                         className="
//               h-10 w-10 animate-spin rounded-full
//               border-4 border-gray-200 border-t-black
//             "
//                     />

//                     <p className="mt-4 text-sm text-gray-500">
//                         Loading checkout...
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     // Error State
//     if (error) {
//         return (
//             <div className="py-20">
//                 <div className="mx-auto max-w-4xl px-4">
//                     <div
//                         className="
//                border border-red-200
//               bg-red-50 px-4 py-3
//               text-sm text-red-700
//             "
//                     >
//                         {error}
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="py-6">
//             <div className="mx-auto max-w-5xl px-4">
//                 {/* Heading */}
//                 <h1 className="mb-8 text-3xl font-bold tracking-tight">
//                     Checkout
//                 </h1>

//                 {/* Buy Now */}
//                 {checkoutMode === "buyNow" && buyNowProduct && (
//                     <div className="mb-8">
//                         <h2 className="mb-4 text-xl font-semibold">
//                             Your Selected Item
//                         </h2>

//                         <BuyNowProductDisplay
//                             product={buyNowProduct}
//                             quantity={buyNowQuantity}
//                             onQuantityChange={handleQuantityChange}
//                         />
//                     </div>
//                 )}

//                 {/* Cart Items */}
//                 {checkoutMode === "cart" &&
//                     cartItems &&
//                     cartItems.length > 0 && (
//                         <div className="mb-8">
//                             <h2 className="mb-4 text-xl font-semibold">
//                                 Your Cart Items ({cartItems.length})
//                             </h2>

//                             <CartItemsDisplay items={cartItems} />
//                         </div>
//                     )}

//                 {/* Checkout Form */}
//                 <QuickOrderForm
//                     mode={checkoutMode}
//                     buyNowProduct={buyNowProduct}
//                     buyNowQuantity={buyNowQuantity}
//                     cartItems={cartItems}
//                 />
//             </div>
//         </div>
//     );
// }


"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useRouter } from "@/routes/hooks";
import { paths } from "@/routes/paths";

import { useAppSelector } from "@/redux/hooks";

import { BuyNowProductDisplay } from "../buy-now-product-display";
import { CartItemsDisplay } from "../cart-items-display";
import { QuickOrderForm } from "../quick-order-form";
import { RouterLink } from "@/routes/components";

// ── Design tokens — light theme, red accent ──
const BG = "#f5f5f5";
const WHITE = "#ffffff";
const RED = "#e61911";
const RED_LIGHT = "#fef2f2";
const RED_DIM = "rgba(230,25,17,0.08)";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export function CheckoutView() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [checkoutMode, setCheckoutMode] = useState(null);
    const [buyNowProduct, setBuyNowProduct] = useState(null);
    const [buyNowQuantity, setBuyNowQuantity] = useState(1);
    const [buyNowVariantId, setBuyNowVariantId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { items: cartItems } = useAppSelector((state) => state.cart);

    const buyNowVariant = buyNowProduct?.variants?.find(
        (v) => String(v.variant_id) === String(buyNowVariantId)
    );

    useEffect(() => {
        const isBuyNow = searchParams.get("buyNow") === "true";
        const productSlug = searchParams.get("productSlug");
        const quantity = searchParams.get("quantity");
        const variantId = searchParams.get("variantId");

        if (isBuyNow && productSlug) {
            setCheckoutMode("buyNow");
            setBuyNowQuantity(parseInt(quantity) || 1);
            setBuyNowVariantId(variantId || null);
            fetchProductForBuyNow(productSlug);
        } else {
            setCheckoutMode("cart");
            if (!cartItems || cartItems.length === 0) {
                setError("Your cart is empty");
                setTimeout(() => router.push(paths.cart), 2000);
            } else {
                setIsLoading(false);
            }
        }
    }, [searchParams, cartItems, router]);

    const fetchProductForBuyNow = async (productSlug) => {
        try {
            setIsLoading(true);
            setError("");
            const { getProductDetails } = await import("@/api");
            const product = await getProductDetails(productSlug);
            if (product) {
                setBuyNowProduct(product);
            } else {
                setError("Product not found");
                setTimeout(() => router.push(paths.home), 2000);
            }
        } catch (err) {
            console.error("Error fetching product:", err);
            setError("Failed to load product. Redirecting...");
            setTimeout(() => router.push(paths.home), 2000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuantityChange = (newQuantity) => setBuyNowQuantity(newQuantity);

    // ── Loading ──
    if (isLoading) {
        return (
            <div style={{ backgroundColor: BG, minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div style={{ textAlign: "center" }}>
                    <div style={{
                        width: 44, height: 44,
                        borderRadius: "50%",
                        border: `4px solid ${BORDER}`,
                        borderTopColor: RED,
                        animation: "spin 0.8s linear infinite",
                        margin: "0 auto",
                    }} />
                    <p style={{
                        marginTop: 16,
                        fontFamily: "Helvetica",
                        fontSize: 12,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: TEXT_MUTED,
                    }}>
                        Loading checkout…
                    </p>
                </div>
            </div>
        );
    }

    // ── Error ──
    if (error) {
        return (
            <div style={{ backgroundColor: BG, minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1rem" }}>
                <div style={{
                    maxWidth: 520, width: "100%",
                    backgroundColor: RED_LIGHT,
                    borderLeft: `4px solid ${RED}`,
                    padding: "1.25rem 1.5rem",
                    display: "flex", alignItems: "center", gap: "0.75rem",
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" stroke={RED} strokeWidth="2" />
                        <path d="M12 8v4M12 16h.01" stroke={RED} strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p style={{
                        fontFamily: "Helvetica",
                        fontSize: 13, fontWeight: 600,
                        color: RED, margin: 0,
                    }}>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    // ── Main Checkout ──
    return (
        <div style={{ backgroundColor: BG, minHeight: "100vh" }}>
            <div style={{ maxWidth: 1024, margin: "0 auto", padding: "4rem 1.5rem" }}>

                {/* Eyebrow */}
                <p style={{
                    fontFamily: "Helvetica",
                    fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: RED,
                    marginBottom: "0.75rem",
                }}>
                    — Order Summary
                </p>

                {/* Page heading */}
                <h1 style={{
                    fontFamily: "Helvetica",
                    fontSize: 38, fontWeight: 800,
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                    color: TEXT,
                    marginBottom: "1rem",
                    lineHeight: 1.1,
                }}>
                    Checkout
                </h1>

                {/* Top divider */}
                <div style={{ height: 2, backgroundColor: RED, width: 48, marginBottom: "1.5rem" }} />

                {/* Buy Now block */}
                {checkoutMode === "buyNow" && buyNowProduct && (
                    <div style={{ marginBottom: "1rem" }}>
                        <SectionLabel>Your Selected Item</SectionLabel>
                        <div style={{ backgroundColor: WHITE }}>
                            <BuyNowProductDisplay
                                product={buyNowProduct}
                                variant={buyNowVariant}
                                quantity={buyNowQuantity}
                                onQuantityChange={handleQuantityChange}
                            />
                        </div>
                    </div>
                )}

                {/* Cart Items block */}
                {checkoutMode === "cart" && cartItems && cartItems.length > 0 && (
                    <div style={{ marginBottom: "2rem" }}>
                        <SectionLabel>Your Cart Items ({cartItems.length})</SectionLabel>
                        <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
                            <CartItemsDisplay items={cartItems} />
                        </div>
                    </div>
                )}

                {/* LOGIN INFO */}
                <div className="mb-4 border border-gray-200 bg-white p-3 text-center text-sm">
                    Already have account?{" "}
                    <RouterLink
                        href={paths.auth.signIn}
                        className="font-semibold  hover:underline" style={{ color: RED }}
                    >
                        Login here
                    </RouterLink>
                </div>
                {/* Form block */}
                <div>
                    <SectionLabel>Delivery Details</SectionLabel>
                    <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
                        <QuickOrderForm
                            mode={checkoutMode}
                            buyNowProduct={buyNowProduct}
                            buyNowVariant={buyNowVariant}
                            buyNowQuantity={buyNowQuantity}
                            cartItems={cartItems}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

// ── Section label ──
function SectionLabel({ children }) {
    return (
        <p style={{
            fontFamily: "Helvetica",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: RED,
            borderLeft: `3px solid ${RED}`,
            paddingLeft: "0.75rem",
            marginBottom: "0.75rem",
        }}>
            {children}
        </p>
    );
}
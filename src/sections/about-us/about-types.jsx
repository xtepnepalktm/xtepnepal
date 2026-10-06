"use client";

import { useRef, useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetCategories } from "@/api";
import { setCategory } from "@/redux/actions";
import { paths } from "@/routes/paths";

// ----------------------------------------------------------------------

// Fallback static data when API returns empty
const FALLBACK_TYPES = [
    {
        id: 1,
        label: "Beginner",
        title: "RUN FIT",
        description:
            "Engineered for maximum comfort and stability for those starting their running journey.",
        badge: "New Arrival",
        badgeVariant: "neon",
        image: "/assets/images/about/runfit.webp",
        // "https://lh3.googleusercontent.com/aida-public/AB6AXuCfE7O52-yY6A_B9kbgXGYne-L3vrjKqNds5M3Jb6nC3b1e8sbE8SHuOs8uc1BAzt_YxtknC5B42ze7eO7wENBUr3cNLqZ0vLMa5NyvwZIULWHAdPNsy_VpTPT1TMnnVFNzCW0mtJ1TXwjhuykGSq2We-7--L5R552Z6x3tGxKYFNra2JH3crp1XpxeSNjqrCEjkcWzGvZgbaq8JX4k_TOnCnJelf63LvGUPuvKNuRa3Md_ms0qHS3qwYhseH6zL3LbAsuDNtjJnSs",
        imageAlt: "RUN FIT beginner footwear",
        reverse: false,
    },
    {
        id: 2,
        label: "Intermediate",
        title: "CUSHIONING",
        description:
            "The perfect balance of energy return and impact protection for daily mileage runners.",
        badge: "Best Seller",
        badgeVariant: "dark",
        image: "/assets/images/about/cushioning.png",
        // "https://lh3.googleusercontent.com/aida-public/AB6AXuC2Uby4Qj-pHtLnfM7LGSPo80j01bKW0K3o3ywy4QlMbR_7_7qXx4sf2KMBLsbvg_hQaiVEaTvbT6_0lZlfeyH0mBdhrCG5cI2uOkmgEDetZoep7oOdq8ERR9qz4wW184KsEiokCCvHsQkw1OPTVrdUu_5EuCTI2busg2i6Ey9MiHGAlzBjAQ_Ysn4fJN0NK7NgXlNkuoTvAFZ9TT4NZ7um22o5vNQ4FWppfaGv2yaCuVDavn8Eu4I6fRa1VJdwNnEbgF5eOw4dMyI",
        imageAlt: "CUSHIONING intermediate footwear",
        reverse: true,
    },
    {
        id: 3,
        label: "Expert",
        title: "RACING / TRAIL",
        description:
            "Elite performance propulsion for marathons and technical terrain. Engineered for the podium.",
        badge: "Elite Tier",
        badgeVariant: "red",
        image: "/assets/images/about/racing.png",
        // "https://lh3.googleusercontent.com/aida-public/AB6AXuCKAmzNRnWrY8LHy8Ig5qdPSigmFGsleiCHcRKvJ7o14J5ea7EmlrA2P3eWDb5RmUrz-peNWIppMUXYDyU0rNW8kXq9HtrB4RxoO6SqBb4K9sN3YcE5d73TTk0ifiJ0nMPmmhjfqPnivTHDJyHsDvaxwhfA7sOhzW-v1W07h5VA2tejH-JW8YqkZnrchp0TBFOez2xiVfVbGGCzDswryWIbmXqTQOzVzjCo7PrHw6ZDlKlvj7swd3eaBPt0bIBs6iyLBxb4LYvy7u8",
        imageAlt: "RACING TRAIL expert footwear",
        reverse: false,
    },
];

// ----------------------------------------------------------------------

function TypeCard({ item, primaryColor, cardWidth, onClick }) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setTilt({
            x: (y - centerY) / 20,
            y: (centerX - x) / 20,
        });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
    };

    const badgeStyles = {
        neon: { backgroundColor: primaryColor, color: "#fff" },
        dark: { backgroundColor: "#161e00", color: "#fff", border: `1px solid #161e00` },
        red: { backgroundColor: "#E60012", color: "#ffffff" },
    };

    const badgeStyle = badgeStyles[item.badgeVariant] || badgeStyles.neon;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                minWidth: cardWidth,
                flex: `0 0 ${cardWidth}`,
                scrollSnapAlign: "start",
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: hovered
                    ? "box-shadow 0.3s ease, border-color 0.3s ease"
                    : "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease, border-color 0.3s ease",
                backgroundColor: "#ffffff",
                border: hovered ? `1px solid ${primaryColor}` : "1px solid rgba(0,0,0,0.08)",
                overflow: "hidden",
                boxShadow: hovered
                    ? `0 24px 60px ${primaryColor}22, 0 8px 32px rgba(0,0,0,0.1)`
                    : "0 2px 12px rgba(0,0,0,0.06)",
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                position: "relative",
                cursor: onClick ? "pointer" : "default",
            }}
            onClick={onClick}
        >
            {/* Badge */}
            {item.badge && (
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        zIndex: 20,
                        ...badgeStyle,

                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                    }}
                >
                    {item.badge}
                </div>
            )}

            {/* Image area */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                {/* Glow blob */}
                <div
                    style={{
                        position: "absolute",
                        inset: "10%",

                        backgroundColor: primaryColor + "30",
                        filter: "blur(40px)",
                        transform: hovered ? "scale(1.15)" : "scale(0.9)",
                        transition: "transform 0.7s ease",
                    }}
                />
                <img
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    style={{
                        position: "relative",
                        zIndex: 10,
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        transform: hovered
                            ? `rotate(${item.reverse ? "6deg" : "-6deg"}) scale(1.08)`
                            : "rotate(0deg) scale(1)",
                        transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                        filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.18))",
                    }}
                />
            </div>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Level label */}
                <span
                    style={{

                        fontSize: "11px",
                        letterSpacing: "0.18em",
                        fontWeight: 700,
                        color: primaryColor,
                        textTransform: "uppercase",
                    }}
                >
                    {item.label}
                </span>

                {/* Title */}
                <h3
                    style={{

                        fontSize: "clamp(20px, 2vw, 28px)",
                        lineHeight: 1.1,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        color: "#0a0a0a",
                        margin: 0,
                    }}
                >
                    {item.title}
                </h3>

                {/* Red divider — expands on hover */}
                <div
                    style={{
                        width: hovered ? "60px" : "32px",
                        height: "2px",
                        backgroundColor: "#E60012",
                        transition: "width 0.4s ease",
                    }}
                />

                {/* Description */}
                <p
                    style={{
                        fontFamily: "Hanken Grotesk, sans-serif",
                        fontSize: "15px",
                        lineHeight: "24px",
                        color: "#555555",
                        margin: 0,
                    }}
                >
                    {item.description}
                </p>

                {/* CTA Button */}
                <button
                    type="button"
                    style={{
                        marginTop: "8px",
                        alignSelf: "flex-start",
                        padding: "10px 28px",
                        backgroundColor: hovered ? primaryColor : "transparent",
                        color: hovered ? "#161e00" : primaryColor,
                        border: `1px solid ${primaryColor}`,
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                >
                    Explore
                </button>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------

export function AboutTypes() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { vendor } = useAppSelector((state) => state.vendor);
    const { categories, isLoading } = useGetCategories();

    const handleClick = (id) => {
        dispatch(setCategory(id));
        router.push(paths.product.root);
    };

    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Track viewport width for responsive card sizing
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 1 card on mobile (<640px), 2 on tablet (640–1023px), 3 on desktop (≥1024px)
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;
    const cardsPerFrame = isMobile ? 1 : isTablet ? 2 : 3;
    const cardGap = 24;
    const cardWidth = isMobile
        ? "calc(100% - 0px)"
        : isTablet
            ? `calc(50% - ${cardGap / 2}px)`
            : `calc(25% - ${(cardGap * 2) / 4}px)`;

    // Use API data if available, otherwise fall back to static data
    const rawTypes = categories?.filter((cat) => cat.show_in_footer === true) || [];
    const types = rawTypes.length > 0 ? rawTypes : FALLBACK_TYPES;

    const primaryColor = vendor?.primary_color || "#c3f400";

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 8);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateScrollState, { passive: true });
        updateScrollState();
        return () => el.removeEventListener("scroll", updateScrollState);
    }, []);

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (!el) return;
        // Scroll exactly one card-width + gap per click
        const stepWidth = el.clientWidth / cardsPerFrame + cardGap;
        el.scrollBy({
            left: direction === "left" ? -stepWidth : stepWidth,
            behavior: "smooth",
        });
    };

    if (isLoading) return null;

    return (
        <section
            style={{
                backgroundColor: "#f8f8f6",
                position: "relative",
                overflow: "hidden",
                padding: isMobile ? "48px 0" : "80px 0",
            }}
        >
            {/* Dot grid texture */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.04) 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                    pointerEvents: "none",
                }}
            />

            {/* Top rule */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                        "linear-gradient(to right, transparent, rgba(0,0,0,0.1) 40%, rgba(230,0,18,0.3) 60%, transparent)",
                }}
            />

            <div
                className="mx-auto"
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1600px",
                    paddingLeft: "clamp(20px, 5vw, 64px)",
                    paddingRight: "clamp(20px, 5vw, 64px)",
                }}
            >
                {/* Section Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        marginBottom: "48px",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    <div>
                        {/* Eyebrow label */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "16px",
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "24px",
                                    height: "1px",
                                    backgroundColor: primaryColor,
                                }}
                            />
                            <span
                                style={{

                                    fontSize: "11px",
                                    letterSpacing: "0.2em",
                                    fontWeight: 600,
                                    color: primaryColor,
                                    textTransform: "uppercase",
                                }}
                            >
                                Featured Collection
                            </span>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "24px",
                                    height: "1px",
                                    backgroundColor: primaryColor,
                                }}
                            />
                        </div>

                        <h2
                            style={{

                                fontSize: "clamp(28px, 4vw, 52px)",
                                lineHeight: 1.05,

                                letterSpacing: "-0.04em",
                                color: "#0a0a0a",
                                margin: 0,
                            }}
                        >
                            FIND YOUR{" "}
                            <span style={{ color: primaryColor }}>PERFECT FIT</span>
                        </h2>

                        {/* Red accent divider */}
                        <div
                            style={{
                                width: "80px",
                                height: "3px",
                                backgroundColor: "#E60012",
                                marginTop: "16px",
                            }}
                        />
                    </div>

                    {/* Scroll controls */}
                    <div style={{ display: "flex", gap: "12px" }}>
                        <button
                            type="button"
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            style={{
                                width: "44px",
                                height: "44px",

                                border: "1px solid",
                                borderColor: canScrollLeft
                                    ? "rgba(0,0,0,0.5)"
                                    : "rgba(0,0,0,0.1)",
                                backgroundColor: "transparent",
                                color: canScrollLeft ? "#0a0a0a" : "rgba(0,0,0,0.2)",
                                cursor: canScrollLeft ? "pointer" : "default",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s ease",
                                fontSize: "18px",
                                fontWeight: 700,
                            }}
                        >
                            &larr;
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            style={{
                                width: "44px",
                                height: "44px",

                                border: "1px solid",
                                borderColor: canScrollRight
                                    ? "rgba(0,0,0,0.5)"
                                    : "rgba(0,0,0,0.1)",
                                backgroundColor: "transparent",
                                color: canScrollRight ? "#0a0a0a" : "rgba(0,0,0,0.2)",
                                cursor: canScrollRight ? "pointer" : "default",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s ease",
                                fontSize: "18px",
                                fontWeight: 700,
                            }}
                        >
                            &rarr;
                        </button>
                    </div>
                </div>

                {/* Horizontally scrollable cards strip — 3 per frame */}
                <div
                    ref={scrollRef}
                    className="no-scrollbar"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        overflowX: "auto",
                        scrollSnapType: "x mandatory",
                        gap: "24px",
                        paddingBottom: "8px",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {types.map((item, index) => (
                        <TypeCard
                            key={item.id || index}
                            item={{
                                ...item,
                                // Normalise API field names -> component field names
                                label:
                                    item.label || item.type || item.level || ("Type " + (index + 1)),
                                title: item.title || item.name || "",
                                description: item.description || "",
                                badge: item.badge || item.tag || null,
                                badgeVariant:
                                    item.badgeVariant ||
                                    (index === 1 ? "dark" : index === 2 ? "red" : "neon"),
                                image:
                                    item.image || item.image_url || item.thumbnail || item.web_image || "",
                                imageAlt:
                                    item.imageAlt || item.alt || item.title || item.name || "",
                                reverse: index % 2 === 1,
                            }}
                            primaryColor={primaryColor}
                            cardWidth={cardWidth}
                            onClick={() => item.category_id && handleClick(item.category_id)}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom rule */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                        "linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent)",
                }}
            />
        </section>
    );
}

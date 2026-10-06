"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { useGetServiceData } from "@/api";
import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

function FeatureItem({ feature, primaryColor }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
            }}
        >
            <div
                style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: primaryColor + "18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <Iconify
                    icon={feature.icon}
                    width={20}
                    style={{ color: primaryColor }}
                />
            </div>
            <div>
                <h4
                    style={{

                        fontSize: "13px",
                        fontWeight: 700,
                        // letterSpacing: "0.05em",
                        color: "#0a0a0a",
                        textTransform: "uppercase",
                        margin: "0 0 4px",
                    }}
                >
                    {feature.title}
                </h4>
                <p
                    style={{

                        fontSize: "14px",
                        lineHeight: "22px",
                        color: "#666666",
                        margin: 0,
                    }}
                >
                    {feature.detail}
                </p>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------

function TechCard({ tech, primaryColor, isMobile, shieldInnerCols }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                border: hovered
                    ? `1px solid ${primaryColor}`
                    : "1px solid rgba(0,0,0,0.07)",
                boxShadow: hovered
                    ? `0 20px 50px ${primaryColor}22, 0 4px 16px rgba(0,0,0,0.06)`
                    : "0 2px 16px rgba(0,0,0,0.05)",
                transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            {/* Image / Hero area */}
            <div
                style={{
                    position: "relative",
                    height: "300px",
                    overflow: "hidden",
                    flexShrink: 0,
                    backgroundColor: tech.image ? "#f0f0f0" : "#f8f8f8",
                }}
            >
                {tech.image ? (
                    <img
                        src={tech.image}
                        alt={tech.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform: hovered ? "scale(1.08)" : "scale(1)",
                            transition: "transform 0.7s ease",
                        }}
                    />
                ) : (
                    /* Shield placeholder for XTEP-SHIELD */
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(135deg, #f8f8f8 0%, ${primaryColor}18 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Iconify
                            icon={tech.icon || "solar:shield-bold-duotone"}
                            width={80}
                            style={{ color: primaryColor + "40" }}
                        />
                    </div>
                )}

                {/* Overlay gradient */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Category pill */}
                <div
                    style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        backgroundColor: primaryColor,
                        color: "#fff",

                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                    }}
                >
                    {tech.category}
                </div>
            </div>

            {/* Body */}
            <div
                style={{
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    flex: 1,
                }}
            >
                {/* Title */}
                <div>
                    <h3 className="font-black"
                        style={{

                            fontSize: "clamp(20px, 2vw, 26px)",
                            letterSpacing: "-0.03em",
                            color: "#0a0a0a",
                            margin: "0 0 8px",
                            textTransform: "uppercase",
                        }}
                    >
                        {tech.title}
                    </h3>
                    {/* Accent divider */}
                    <div
                        style={{
                            width: hovered ? "56px" : "28px",
                            height: "2px",
                            backgroundColor: "#E60012",
                            transition: "width 0.4s ease",
                        }}
                    />
                </div>

                {/* Feature list — 1-col for normal cards, responsive for wide */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            tech.isWide ? shieldInnerCols : "1fr",
                        gap: "16px",
                        flex: 1,
                    }}
                >
                    {tech.features.map((feature, i) => (
                        <FeatureItem key={i} feature={feature} primaryColor={primaryColor} />
                    ))}
                </div>

                {/* Bottom spec tags for SHIELD */}
                {tech.isWide && (
                    <div
                        style={{
                            paddingTop: "20px",
                            borderTop: "1px solid rgba(0,0,0,0.07)",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                        }}
                    >
                        {["UPF 50+ ANTI-UV", "99.9% ANTIBACTERIAL", "DWR WATER-RESISTANT"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    style={{

                                        fontSize: "9px",
                                        fontWeight: 700,
                                        letterSpacing: "0.1em",
                                        color: "#555",
                                        backgroundColor: "#f4f4f2",
                                        border: "1px solid rgba(0,0,0,0.08)",
                                        borderRadius: "4px",
                                        padding: "4px 10px",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------

export function AboutTech() {
    const { vendor } = useAppSelector((state) => state.vendor);
    const primaryColor = vendor?.primary_color || "#c3f400";
    const { serviceData } = useGetServiceData();

    // Responsive breakpoints
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;
    // 1 card per row on mobile, 2 on tablet+
    const gridCols = isMobile ? "1fr" : "repeat(3, 1fr)";
    // SHIELD inner feature grid: 1-col on mobile, 2-col on tablet+
    const shieldInnerCols = isMobile ? "1fr" : "repeat(1, 1fr)";

    return (
        <section
            style={{
                backgroundColor: "#f8f8f6",
                position: "relative",
                overflow: "hidden",
                padding: isMobile ? "48px 0" : "80px 0",
            }}
        >
            {/* Subtle dot grid */}
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
                        "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 40%, rgba(230,0,18,0.25) 60%, transparent)",
                }}
            />

            <div
                className=" mx-auto"
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1600px",
                    paddingLeft: "clamp(20px, 5vw, 64px)",
                    paddingRight: "clamp(20px, 5vw, 64px)",
                }}
            >
                {/* Section Header */}
                <div style={{ marginBottom: "56px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "20px",
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
                            Elite Performance Engineering
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
                            fontSize: "clamp(32px, 5vw, 60px)",
                            lineHeight: 1.0,
                            letterSpacing: "-0.04em",
                            color: "#0a0a0a",
                            margin: "0 0 16px",
                        }}
                    >
                        XSTEP{" "}
                        <span style={{ color: primaryColor }}>TECHNOLOGIES</span>
                    </h2>

                    <div
                        style={{
                            width: "80px",
                            height: "3px",
                            backgroundColor: "#E60012",
                            marginBottom: "20px",
                        }}
                    />

                    <p
                        style={{

                            fontSize: "17px",
                            lineHeight: "28px",
                            color: "#666666",
                            maxWidth: "600px",
                            margin: 0,
                        }}
                    >
                        Five specialized proprietary technologies designed to optimize
                        athletic output across every environment and condition.
                    </p>
                </div>

                {/* Grid: responsive — 1-col mobile, 2-col tablet+, last card full-width */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: gridCols,
                        gap: "24px",
                    }}
                >
                    {serviceData?.map((tech) => {
                        // Extract category from short_description
                        const category = tech.short_description
                            ? tech.short_description.replace(/<[^>]+>/g, "").trim()
                            : tech.category;

                        // Extract image from gallery
                        const image = tech.gallery?.[0] || tech.image;

                        // Extract features from description
                        let features = tech.features || [];
                        if (!tech.features && tech.description) {
                            const parsedFeatures = [];
                            const h4Regex = /<h4[^>]*>(.*?)<\/h4>/g;
                            const parts = tech.description.split(h4Regex);
                            for (let i = 1; i < parts.length; i += 2) {
                                const title = parts[i];
                                const detail = parts[i + 1]?.replace(/<[^>]+>/g, "").trim() || "";
                                parsedFeatures.push({
                                    icon: tech.icon || "solar:leaf-bold-duotone",
                                    title,
                                    detail,
                                });
                            }
                            features = parsedFeatures;
                        } else {
                            features = features.map(f => ({
                                ...f,
                                icon: tech.icon || f.icon || "solar:leaf-bold-duotone"
                            }));
                        }

                        const parsedTech = {
                            ...tech,
                            category,
                            image,
                            features,
                        };

                        return (
                            <RouterLink
                                key={tech.id}
                                href={paths.service.details(tech.slug)}
                                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                            >
                                <TechCard
                                    tech={parsedTech}
                                    primaryColor={primaryColor}
                                    isMobile={isMobile}
                                    shieldInnerCols={shieldInnerCols}
                                />
                            </RouterLink>
                        );
                    })}
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
                        "linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)",
                }}
            />
        </section>
    );
}

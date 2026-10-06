"use client";

import { Iconify } from "@/components/iconify";
import { useAppSelector } from "@/redux/hooks";
import { paths } from "@/routes/paths";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { loadIcon, buildIcon } from "@iconify/react";
import { useGetStoreLocation } from "@/api/about";

// Iconify icon → inline SVG string (for Leaflet popups, which take raw HTML)
async function iconSvg(name, size = 14) {
    try {
        const data = await loadIcon(name);
        const { attributes, body } = buildIcon(data, { height: size, width: size });
        const attrs = Object.entries(attributes).map(([k, v]) => `${k}="${v}"`).join(" ");
        return `<svg xmlns="http://www.w3.org/2000/svg" ${attrs} style="flex-shrink:0;margin-top:1px;">${body}</svg>`;
    } catch {
        return "";
    }
}

// ─────────────────────────────────────────────
// Leaflet Map — rendered client-side only
// ─────────────────────────────────────────────
function StoreMap({ stores, primaryColor, onMarkerClick }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markersRef = useRef([]);

    useEffect(() => {
        // Guard: only when the div is in the DOM
        if (!mapRef.current) return;

        let destroyed = false;

        (async () => {
            const L = (await import("leaflet")).default;

            const [pinSvg, phoneSvg, clockSvg] = await Promise.all([
                iconSvg("solar:map-point-bold"),
                iconSvg("solar:phone-bold"),
                iconSvg("solar:clock-circle-bold", 13),
            ]);

            // Abort if the effect was cleaned up while awaiting the import
            if (destroyed || !mapRef.current) return;

            // Clear any stale Leaflet state on the container (e.g. from React Strict Mode double-run)
            if (mapRef.current._leaflet_id) {
                mapRef.current._leaflet_id = null;
            }

            // Destroy any existing instance before re-creating
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
                markersRef.current = [];
            }

            // Must set explicit height on the container div BEFORE creating the map
            mapRef.current.style.height = "450px";

            const map = L.map(mapRef.current, {
                center: [28.3, 84.1],
                zoom: 8,
                zoomControl: true,
                scrollWheelZoom: true,
                minZoom: 7,
                maxZoom: 18,
            });

            // OpenStreetMap tiles — no API key required
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(map);

            // Fit to Nepal bounding box
            map.fitBounds(
                L.latLngBounds([26.3, 80.05], [30.45, 88.2]),
                { padding: [24, 24] }
            );

            // Plot markers
            stores.forEach((store, index) => {
                const icon = L.divIcon({
                    className: "",
                    html: `
            <div style="position:relative;width:32px;height:32px;">
              <div style="
                position:absolute;inset:0;border-radius:50%;
                background:${primaryColor};opacity:0.25;
                animation:pring 1.8s ease-out infinite;
              "></div>
              <div style="
                position:absolute;top:50%;left:50%;
                transform:translate(-50%,-50%);
                width:14px;height:14px;border-radius:50%;
                background:${primaryColor};
                border:2.5px solid #fff;
                box-shadow:0 2px 8px rgba(0,0,0,0.3);
              "></div>
            </div>`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                });

                const marker = L.marker([store.lat, store.lng], { icon }).addTo(map);

                marker.bindPopup(
                    `<div style="font-family:Sora,sans-serif;min-width:160px;padding:4px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin:0 0 6px;">
                <p style="font-weight:700;font-size:13px;color:${primaryColor};margin:0;">${store.name}</p>
                <a href="https://www.google.com/maps?q=${store.lat},${store.lng}" target="_blank" rel="noopener noreferrer" style="color:${primaryColor}; display:flex; align-items:center;" title="Open in Google Maps">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
            <p style="display:flex;gap:4px;font-size:12px;color:#4c4546;margin:0 0 3px;">${pinSvg}<span>${store.address}</span></p>
            <p style="display:flex;gap:4px;font-size:12px;color:#4c4546;margin:0 0 3px;">${phoneSvg}<span>${store.contact}</span></p>
            <p style="display:flex;gap:4px;font-size:11px;color:#888;margin:0;">${clockSvg}<span>${store.opening_hours}</span></p>
          </div>`,
                    { maxWidth: 220, closeButton: false }
                );

                marker.on("click", () => {
                    if (onMarkerClick) onMarkerClick(index);
                });

                markersRef.current.push(marker);
            });

            mapInstance.current = map;
        })();

        // Cleanup: runs synchronously on unmount or before effect re-runs
        return () => {
            destroyed = true;
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
                markersRef.current = [];
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <style>{`
        @keyframes pring {
          0%   { transform: scale(0.4); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 10px !important;
          box-shadow: 0 6px 24px rgba(0,0,0,0.12) !important;
          border: none !important;
        }
        .leaflet-popup-tip-container { display: none; }
        .leaflet-control-zoom a {
          border-radius: 6px !important;
        }
      `}</style>
            {/* width:100% + explicit height is required for Leaflet to render */}
            <div ref={mapRef} style={{ width: "100%", height: "450px" }} />
        </>
    );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function AboutContact() {
    const { vendor } = useAppSelector((state) => state.vendor);
    const { contact_info, address, vendor_name } = vendor || {};
    const primaryColor = vendor?.primary_color || "#E60012";
    // const details = [
    //         {
    //             name: vendor_name ?? "Newroad",
    //             icon: "solar:map-point-wave-bold",
    //             address: address ?? "Newroad, Ranjana Galli",
    //             contact: contact_info ?? "+977-1-4255718",
    //             opening_hours: "Open Daily: 10:00 AM - 7:00 PM",
    //             lat: 27.704903599339833,
    //             lng: 85.31063224484286,
    //         },
    //         {
    //             name: "Kumaripati",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Kumaripati, Lalitpur",
    //             contact: "+977-1-XXXXXXX",
    //             opening_hours: "Open Daily: 10:00 AM - 7:30 PM",
    //             lat: 27.673634723248338,
    //             lng: 85.3150002429828,
    //         },
    //         {
    //             name: "Koteshwor ",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Koteshwor, Nepal",
    //             contact: "+977 9761805894",
    //             opening_hours: "Open Daily: 8:00 AM - 8:00 PM",
    //             lat: 27.68175825224253,
    //             lng: 85.34921725402977,
    //         },
    //         {
    //             name: "Peoples's Plaza",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Kumaripati, Lalitpur",
    //             contact: "+977-1-XXXXXXX",
    //             opening_hours: "Open Daily: 10:00 AM - 8:00 PM",
    //             lat: 27.68175825224253,
    //             lng: 85.34921725402977,
    //         },
    //         {
    //             name: "Pokhara",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Pokhara, Nepal",
    //             contact: "+977-9851194374",
    //             opening_hours: "Open Daily: 8:00 AM - 12:00 AM",
    //             lat: 28.22249937451643,
    //             lng: 83.98737369405399,
    //         },
    //         {
    //             name: "Radhe Radhe",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Radhe Radhe, Madhyapur Thimi",
    //             contact: "+977-9841057373",
    //             opening_hours: "Open Daily: 8:00 AM - 12:00 AM",
    //             lat: 27.676966308908217,
    //             lng: 85.39801879658387,
    //         },
    //         {
    //             name: "Chitwan",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Chitwan, Nepal",
    //             contact: "+977-9861887691",
    //             opening_hours: "Open Daily: 8:00 AM - 12:00 AM",
    //             lat: 27.697664463140164,
    //             lng: 84.42180585425444,
    //         },
    //         {
    //             name: "Boudha",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Boudha, Nepal",
    //             contact: "+977-9861887691",
    //             opening_hours: "Open Daily: 8:00 AM - 8:00 PM",
    //             lat: 27.720952087001535,
    //             lng: 85.36073697116494,
    //         },
    //         {
    //             name: "City Square Mall",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Samakhusi, Kathmandu",
    //             contact: "+977-9749462030",
    //             opening_hours: "Open Daily: 8:00 AM - 12:00 AM",
    //             lat: 27.735637551814232,
    //             lng: 85.31789892883505,
    //         },
    //         {
    //             name: "Chabahil",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Chabahil, Kathmandu",
    //             contact: "+977-9845092605",
    //             opening_hours: "Open Daily: 8:00 AM - 8:00 PM",
    //             lat: 27.71871397995646,
    //             lng: 85.34893952883503,
    //         },
    //         {
    //             name: "Chakrapath",
    //             icon: "solar:map-point-wave-bold",
    //             address: "Chakrapath, Kathmandu",
    //             contact: "+977-9766850152",
    //             opening_hours: "Open Daily: 8:00 AM - 8:00 PM",
    //             lat: 27.73886205289172,
    //             lng: 85.33904089999999,
    //         },
    //     ];
    const [activeIndex, setActiveIndex] = useState(null);
    const { storeLocationData, isLoading, error } = useGetStoreLocation()
    console.log(storeLocationData)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const details = storeLocationData ? storeLocationData.map(store => ({
        ...store,
        lat: parseFloat(store.latitude),
        lng: parseFloat(store.longitude),
    })) : [];

    return (
        <section
            className="container mx-auto lg:px-8 px-2 lg:py-10"
            style={{ paddingBottom: "var(--spacing-section-gap, 120px)" }}
        >

            {/* ── Section Title ── */}
            <h2
                className="lg:text-4xl text-3xl"
                style={{

                    lineHeight: "52px",
                    marginBottom: "1.5rem",
                    color: "#1a1c1c",
                }}
            >
                LOCATE NEPAL OUTLETS
            </h2>

            {/* ── MAP — full width, standalone ── */}
            <div
                style={{
                    width: "100%",

                    overflow: "hidden",
                    border: "1px solid #e5e5e5",
                    marginBottom: "2rem",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                }}
            >
                <StoreMap
                    stores={details}
                    primaryColor={primaryColor}
                    onMarkerClick={setActiveIndex}
                />
            </div>

            {/* ── STORE CARDS — separate section below map ── */}
            <style>{`
        .store-grid { grid-template-columns: 1fr; }
        @media (min-width: 768px) {
          .store-grid { grid-template-columns: repeat(5, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .store-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

            <div className="store-grid" style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                {details?.map((detail, index) => (

                    <div
                        key={index}
                        onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            cursor: "pointer",
                            padding: "1.5rem",

                            border: activeIndex === index
                                ? `2px solid ${primaryColor}`
                                : "2px solid #e8e8e8",
                            background: activeIndex === index ? `${primaryColor}0a` : "#fff",
                            transition: "all 200ms ease",
                            boxShadow: activeIndex === index
                                ? `0 4px 20px ${primaryColor}20`
                                : "0 1px 6px rgba(0,0,0,0.05)",
                        }}
                    >

                        <Link href={`https://www.google.com/maps?q=${detail.lat},${detail.lng}`} target="_blank" rel="noopener noreferrer">

                            {/* Store name + icon */}
                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }} className="pb-2">
                                <Iconify
                                    icon={detail.icon}
                                    width={22}
                                    style={{ color: primaryColor, flexShrink: 0 }}
                                />
                                <h5
                                    style={{
                                        fontSize: "15px",
                                        margin: 0,
                                        color: primaryColor,
                                    }}
                                >
                                    {detail.name}
                                </h5>
                            </div>

                            {/* Divider */}
                            <div style={{ height: "1px", background: "#f0f0f0" }} />

                            {/* Info rows */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                                    <Iconify icon="solar:map-point-linear" width={16} style={{ color: "#888", marginTop: 2, flexShrink: 0 }} />
                                    <span style={{ fontSize: "13px", color: "#4c4546", lineHeight: "20px" }}>
                                        {detail.address}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    <Iconify icon="solar:phone-linear" width={16} style={{ color: "#888", flexShrink: 0 }} />
                                    <span style={{ fontSize: "13px", color: "#4c4546" }}>
                                        {detail.contact}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    <Iconify icon="solar:clock-circle-linear" width={16} style={{ color: "#888", flexShrink: 0 }} />
                                    <span style={{ fontSize: "13px", color: "#4c4546" }}>
                                        {detail.opening_hours}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* ── CTA Button ── */}
            <Link
                href={paths.contact}
                passHref
                style={{
                    display: "inline-block",
                    backgroundColor: "#E60012",
                    color: "#ffffff",
                    padding: "1rem 2.5rem",
                    fontFamily: "Helvetica",
                    fontSize: "14px",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "filter 200ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
            >
                Inquire Now
            </Link>

        </section>
    );
}
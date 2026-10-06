
"use client";

import { useRef, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { useGetHomeYoutubeShorts } from "@/api";

export function HomeVideoTestimonials() {
    const { vendor } = useAppSelector((state) => state.vendor);
    const primaryColor = vendor?.primary_color || "#ef4444";
    const { youtubeShorts } = useGetHomeYoutubeShorts();
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "next" ? 320 : -320,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="flex flex-col gap-6 lg:my-6 my-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center  bg-red-500/10 p-3">
                        <Iconify icon="solar:videocamera-record-bold-duotone" width={24} className="text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Customer Video Stories</h2>
                        <p className="text-sm text-gray-500">Real experiences from healthcare professionals</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => scroll("prev")} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-md transition hover:bg-gray-100">
                        <Iconify icon="solar:arrow-left-linear" />
                    </button>
                    <button onClick={() => scroll("next")} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-md transition hover:bg-gray-100">
                        <Iconify icon="solar:arrow-right-linear" />
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div ref={scrollRef} className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth">
                    {youtubeShorts?.map((testimonial) => (
                        <VideoTestimonialCard key={testimonial.id} testimonial={testimonial} primaryColor={primaryColor} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------

function VideoTestimonialCard({ testimonial, primaryColor }) {
    const { video_url } = testimonial;
    const iframeRef = useRef(null);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Only load iframe when card is visible in viewport
    const observerRef = useRef(null);
    const refCallback = (node) => {
        if (observerRef.current) observerRef.current.disconnect();
        if (node) {
            observerRef.current = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
                { threshold: 0.1 }
            );
            observerRef.current.observe(node);
        }
    };

    const thumbnailUrl = `https://i.ytimg.com/vi/${video_url}/hqdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${video_url}?enablejsapi=1&controls=0&showinfo=0&modestbranding=0&rel=0&autoplay=1`;

    const handleClick = () => setIsLoaded(true);

    const handleMouseEnter = () => {
        if (iframeRef.current && isLoaded) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*"
            );
        }
    };

    const handleMouseLeave = () => {
        if (iframeRef.current && isLoaded) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*"
            );
        }
    };

    return (
        <div
            ref={refCallback}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="group relative min-w-[280px] overflow-hidden rounded-[28px] bg-black shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-1 sm:min-w-[320px] md:min-w-[260px] lg:min-w-[280px] cursor-pointer"
        >
            <div
                className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `0 12px 32px ${primaryColor}40` }}
            />

            {/* Show thumbnail until clicked — avoids ytimg preconnect on load */}
            {!isLoaded ? (
                <div className="relative aspect-[9/16] w-full">
                    {isVisible && (
                        <img
                            src={thumbnailUrl}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover rounded-[28px]"
                        />
                    )}
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 text-red-500 fill-current ml-1">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (
                <iframe
                    ref={iframeRef}
                    src={embedUrl}
                    title="Video Testimonial"
                    frameBorder="0"
                    allow="autoplay; picture-in-picture"
                    allowFullScreen
                    className="aspect-[9/16] w-full rounded-[28px] shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
                />
            )}
        </div>
    );
}
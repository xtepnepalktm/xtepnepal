// "use client";

// import Autoplay from "embla-carousel-autoplay";

// import { Box, Stack, Typography, useTheme, Avatar, Rating, Card, CardContent } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { Iconify } from "@/components/iconify";
// import { Carousel, useCarousel, CarouselArrowBasicButtons, CarouselDotButtons } from "@/components/carousel";
// import { useGetHomeTestimonial } from "@/api";
// import { Markdown } from "@/components/markdown";
// import { CONFIG } from "@/global-config";
// import Image from "next/image";

// ----------------------------------------------------------------------

// Sample testimonials data - replace with actual API data
// const TESTIMONIALS = [
//     {
//         id: 1,
//         name: "Dr. Sarah Mitchell",
//         role: "Healthcare Professional",
//         avatar: null,
//         rating: 5,
//         content: "Premier Health has transformed how we source medical supplies. Their quality and reliability are unmatched. The delivery is always on time and the products meet all our clinical standards.",
//     },
//     {
//         id: 2,
//         name: "James Anderson",
//         role: "Pharmacy Owner",
//         avatar: null,
//         rating: 5,
//         content: "Outstanding service and product range! We've been partnering with Premier Health for over 3 years now. Their customer support is exceptional and pricing is very competitive.",
//     },
//     {
//         id: 3,
//         name: "Emily Chen",
//         role: "Hospital Administrator",
//         avatar: null,
//         rating: 5,
//         content: "The seamless ordering process and consistent quality have made Premier Health our go-to supplier. Their commitment to healthcare excellence is evident in everything they do.",
//     },
//     {
//         id: 4,
//         name: "Michael Roberts",
//         role: "Clinic Manager",
//         avatar: null,
//         rating: 4,
//         content: "Reliable, professional, and always delivering top-quality products. Premier Health understands the urgency of healthcare needs and responds accordingly. Highly recommended!",
//     },
//     {
//         id: 5,
//         name: "Dr. Lisa Thompson",
//         role: "General Practitioner",
//         avatar: null,
//         rating: 5,
//         content: "I appreciate the wide range of products available and the ease of placing orders. Premier Health has significantly streamlined our procurement process.",
//     },
// ];

// ----------------------------------------------------------------------
"use client";

import { useRef, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { useAppSelector } from "@/redux/hooks";
import { useGetHomeTestimonial } from "@/api";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------

const DEFAULT_PRIMARY = "#2d1b54";

// ----------------------------------------------------------------------
// Inline SVGs
// ----------------------------------------------------------------------

function QuoteIcon({ size = 26, className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
    );
}

function ChatLikeIcon({ size = 24, className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path opacity={0.5} d="M12 2C6.477 2 2 6.253 2 11.5c0 2.236.809 4.288 2.148 5.896L3.1 20.54a.5.5 0 0 0 .65.65l3.495-1.332A10.28 10.28 0 0 0 12 21c5.523 0 10-4.253 10-9.5S17.523 2 12 2z" />
            <path d="M8 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
    );
}

function ChevronLeftIcon({ size = 16 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

function ChevronRightIcon({ size = 16 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}

// ----------------------------------------------------------------------

export function HomeTestimonials() {
    const { vendor } = useAppSelector((state) => state.vendor);
    const { testimonials } = useGetHomeTestimonial();

    const primaryColor = vendor?.primary_color || DEFAULT_PRIMARY;

    const autoplayPlugin = useRef(
        Autoplay({ playOnInit: true, delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            watchResize: false, // disable auto resize watching
            loop: true, align: "start"
        },
        [autoplayPlugin.current]
    );

    const [prevEnabled, setPrevEnabled] = useState(false);
    const [nextEnabled, setNextEnabled] = useState(false);

    useEffect(() => {
        if (!emblaApi) return;
        const update = () => {
            setPrevEnabled(emblaApi.canScrollPrev());
            setNextEnabled(emblaApi.canScrollNext());
        };
        emblaApi.on("select", update);
        emblaApi.on("reInit", update);
        update();
        return () => {
            emblaApi.off("select", update);
            emblaApi.off("reInit", update);
        };
    }, [emblaApi]);

    return (
        <section className="container mx-auto lg:my-6 my-2">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center  bg-green-100 p-3">
                        <ChatLikeIcon size={24} />
                    </span>
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                            What Our Customers Say
                        </h2>
                        <p className="text-sm text-gray-500">
                            Trusted by healthcare professionals worldwide
                        </p>
                    </div>
                </div>

                {/* Prev / Next */}
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!prevEnabled}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 shadow-xl hover:bg-gray-50 disabled:opacity-50"
                    >
                        <ChevronLeftIcon size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!nextEnabled}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 shadow-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        <ChevronRightIcon size={16} />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative overflow-visible py-4">
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex gap-3">
                        {testimonials?.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 py-4"
                            >
                                <TestimonialCard testimonial={testimonial} primaryColor={primaryColor} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------

function TestimonialCard({ testimonial, primaryColor }) {
    const { name, designation, image, rating, comment } = testimonial;

    const initials = name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "👤";

    return (
        <div className="relative flex h-full flex-col overflow-visible  border border-gray-100 bg-white p-4 shadow-sm">
            {/* Quote badge */}
            <div
                className="absolute -top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: primaryColor }}
            >
                <QuoteIcon size={26} />
            </div>

            {/* Stars */}
            <div className="mb-3 flex pt-3 text-xl">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < (rating || 5) ? "text-yellow-400" : "text-gray-300"}>
                        ★
                    </span>
                ))}
            </div>

            {/* Comment */}
            <div className="mb-1 flex-1 italic text-gray-600">
                <Markdown>{comment}</Markdown>
            </div>

            {/* Author */}
            <div className="flex items-center pt-2">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        width={40}
                        height={40}
                        className="mr-4 h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <div
                        className="mr-4 flex h-10 w-10 items-center justify-center rounded-full font-bold"
                        style={{ backgroundColor: `${primaryColor}1F`, color: primaryColor }}
                    >
                        {initials}
                    </div>
                )}
                <div>
                    <h4 className="text-sm font-bold text-gray-800">{name}</h4>
                    <span className="mt-1 flex items-center text-[12px] font-bold text-green-500">
                        <span className="mr-1">✓</span> {designation}
                    </span>
                </div>
            </div>
        </div>
    );
}
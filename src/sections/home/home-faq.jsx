
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { useAppSelector } from "@/redux/hooks";
import { useGetHomeFaqs } from "@/api";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------

const DEFAULT_PRIMARY = "#1976d2";
const DEFAULT_SECONDARY = "#9c27b0";

/** Converts a hex color + opacity (0–1) to rgba() */
function hexAlpha(hex, opacity) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
}

// ----------------------------------------------------------------------
// Inline SVG icons (replaces Iconify)
// ----------------------------------------------------------------------

function QuestionCircleIcon({ size = 20, className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path opacity={0.5} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
            <path d="M12 17.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM12 7a2.5 2.5 0 0 0-2.5 2.5.75.75 0 0 0 1.5 0 1 1 0 1 1 1.957.294c-.15.417-.516.75-1.063 1.17C10.676 11.4 10 12.04 10 13.25a.75.75 0 0 0 1.5 0c0-.46.264-.754.822-1.168.574-.426 1.353-1.068 1.624-1.876A2.5 2.5 0 0 0 12 7z" />
        </svg>
    );
}

function ChatDotsIcon({ size = 22, className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path opacity={0.5} d="M12 2C6.477 2 2 6.253 2 11.5c0 2.117.75 4.07 2 5.643V21l4.047-2.024A11.27 11.27 0 0 0 12 19c5.523 0 10-3.253 10-7.5S17.523 2 12 2z" />
            <path d="M8 11.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
    );
}

function PlusIcon({ size = 20, className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function MinusIcon({ size = 20, className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={className}>
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

// ----------------------------------------------------------------------

export function HomeFaq() {
    const { vendor } = useAppSelector((state) => state.vendor);
    const { faqs } = useGetHomeFaqs();

    const primaryColor = vendor?.primary_color || DEFAULT_PRIMARY;
    const secondaryColor = vendor?.secondary_color || DEFAULT_SECONDARY;

    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        if (faqs?.length && !expanded) {
            setExpanded(faqs[0].id);
        }
    }, [faqs, expanded]);

    const handleToggle = (id) => {
        setExpanded((prev) => (prev === id ? null : id));
    };

    return (
        <section
            className="relative overflow-hidden  py-8 lg:my-6 lg:mb-16 my-2 md:py-12"
            style={{
                background: `linear-gradient(135deg, ${hexAlpha(primaryColor, 0.02)} 0%, ${hexAlpha(secondaryColor, 0.02)} 100%)`,
            }}
        >
            {/* Decorative blobs */}
            <div
                className="pointer-events-none absolute -right-[100px] -top-[100px] h-[300px] w-[300px] rounded-full"
                style={{ background: `radial-gradient(circle, ${hexAlpha(primaryColor, 0.1)} 0%, transparent 70%)` }}
            />
            <div
                className="pointer-events-none absolute -bottom-[150px] -left-[100px] h-[400px] w-[400px] rounded-full"
                style={{ background: `radial-gradient(circle, ${hexAlpha(secondaryColor, 0.08)} 0%, transparent 70%)` }}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-6xl px-4">
                <div className="flex flex-col gap-5">

                    {/* ── Header ── */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <div
                            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2"
                            style={{ backgroundColor: hexAlpha(secondaryColor, 0.08), color: secondaryColor }}
                        >
                            <QuestionCircleIcon size={20} />
                            <span className="text-sm font-semibold">FAQ</span>
                        </div>

                        {/* Title */}
                        <h2
                            className="mb-2 text-[2rem] font-extrabold md:text-[2.5rem]"
                            style={{
                                background: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor} 100%)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Frequently Asked Questions
                        </h2>

                        {/* Description */}
                        <p className="mx-auto max-w-[600px] text-[0.95rem] text-gray-500 md:text-[1.05rem]">
                            Find answers to common questions about our products, shipping, returns, and more.
                        </p>
                    </m.div>

                    {/* ── FAQ list ── */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mx-auto w-full max-w-[900px]"
                    >
                        <div className="flex flex-col gap-3">
                            {faqs?.map((faq, index) => {
                                const isOpen = expanded === faq.id;

                                return (
                                    <m.div
                                        key={faq.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div
                                            className="overflow-hidden  border bg-white transition-all duration-300"
                                            style={{
                                                borderColor: isOpen ? hexAlpha(secondaryColor, 0.2) : "rgba(145,158,171,0.12)",
                                                boxShadow: isOpen
                                                    ? `0 8px 24px ${hexAlpha(secondaryColor, 0.12)}`
                                                    : "0 2px 8px rgba(145,158,171,0.08)",
                                            }}
                                        >
                                            {/* Question button */}
                                            <button
                                                type="button"
                                                onClick={() => handleToggle(faq.id)}
                                                className="flex w-full items-center justify-between gap-4 p-3 text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {/* Left icon */}
                                                    <div
                                                        className="hidden h-7 w-7 shrink-0 items-center justify-center  sm:flex"
                                                        style={{
                                                            backgroundColor: isOpen
                                                                ? hexAlpha(secondaryColor, 0.1)
                                                                : "rgba(145,158,171,0.06)",
                                                        }}
                                                    >
                                                        <ChatDotsIcon
                                                            size={22}
                                                            className="transition-colors duration-300"
                                                            style={{ color: isOpen ? secondaryColor : "#637381" }}
                                                        />
                                                    </div>

                                                    {/* Question text */}
                                                    <h3
                                                        className="text-[0.95rem] font-semibold transition-colors duration-300 md:text-[1.05rem]"
                                                        style={{ color: isOpen ? secondaryColor : "#1c252e" }}
                                                    >
                                                        {faq.question}
                                                    </h3>
                                                </div>

                                                {/* Expand icon */}
                                                <div
                                                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                                                    style={{
                                                        backgroundColor: isOpen
                                                            ? hexAlpha(secondaryColor, 0.12)
                                                            : "rgba(145,158,171,0.08)",
                                                        color: isOpen ? secondaryColor : "#637381",
                                                    }}
                                                >
                                                    {isOpen ? <MinusIcon size={20} /> : <PlusIcon size={20} />}
                                                </div>
                                            </button>

                                            {/* Answer */}
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <m.div
                                                        initial={{ opacity: 0, scaleY: 0 }}
                                                        animate={{ opacity: 1, scaleY: 1 }}
                                                        exit={{ opacity: 0, scaleY: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        style={{ transformOrigin: "top" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 pb-3 sm:px-5">
                                                            <div className="text-[0.9rem] leading-8 text-gray-500 md:text-[0.95rem]">
                                                                <Markdown>{faq.answer}</Markdown>
                                                            </div>
                                                        </div>
                                                    </m.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </m.div>
                                );
                            })}
                        </div>
                    </m.div>

                </div>
            </div>
        </section>
    );
}
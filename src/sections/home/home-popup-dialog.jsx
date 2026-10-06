"use client";

import { useEffect, useMemo, useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { Markdown } from "@/components/markdown";

export function HomePopupDialog({ data }) {
  const activePopups = useMemo(() => {
    const list = Array.isArray(data) ? data : data ? [data] : [];
    return list.filter((item) => Number(item?.is_active) === 1);
  }, [data]);

  const [queueIndex, setQueueIndex] = useState(0);

  useEffect(() => {
    setQueueIndex(0);
  }, [activePopups.length]);

  const currentPopup = activePopups[queueIndex];

  if (!currentPopup) return null;

  return (
    <PopupCard
      key={currentPopup.id ?? queueIndex}
      popup={currentPopup}
      step={queueIndex + 1}
      total={activePopups.length}
      onClose={() => setQueueIndex((i) => i + 1)}
    />
  );
}

function PopupCard({ popup, step, total, onClose }) {
  const [visible, setVisible] = useState(false);

  const vendor = useAppSelector((state) => state.vendor.vendor);
  const primaryColor = vendor?.primary_color || "#E60012";

  const { title, description, image, link } = popup;

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-center justify-center p-4 sm:p-6"
      style={{
        backgroundColor: visible ? "rgba(10,10,10,0.72)" : "rgba(10,10,10,0)",
        backdropFilter: visible ? "blur(6px)" : "blur(0px)",
        transition: "background-color 300ms ease, backdrop-filter 300ms ease",
      }}
      onClick={handleClose}
    >
      {/* Dialog */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] bg-white overflow-hidden"
        style={{
          borderRadius: "18px",
          boxShadow:
            "0 30px 60px -12px rgba(0,0,0,0.45), 0 18px 36px -18px rgba(0,0,0,0.4)",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.92) translateY(16px)",
          transition: "opacity 320ms cubic-bezier(0.16,1,0.3,1), transform 320ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        >
          <Iconify icon="mingcute:close-line" width={18} />
        </button>

        {/* Queue indicator */}
        {total > 1 && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-200"
                style={{
                  width: i + 1 === step ? 18 : 6,
                  backgroundColor:
                    i + 1 === step ? primaryColor : "rgba(255,255,255,0.6)",
                }}
              />
            ))}
          </div>
        )}

        {/* Image */}
        {image && (
          <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
            <img
              src={image}
              alt={title || "Promotion"}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
              }}
            />
          </div>
        )}

        {/* Content */}
        {(title || description || link) && (
          <div className="relative flex flex-col gap-3 px-6 pt-5 pb-6">
            <span
              className="absolute top-0 left-6 w-10 h-[3px] -translate-y-full"
              style={{ backgroundColor: primaryColor }}
            />

            {title && (
              <h3
                className="m-0 text-[22px] font-extrabold uppercase tracking-[0.04em] leading-tight text-gray-900"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                {title}
              </h3>
            )}

            {description && (
              <div className="text-[14px] leading-relaxed text-gray-500 [&_p]:m-0">
                <Markdown children={description} />
              </div>
            )}

            <div className="flex items-center gap-3 mt-1">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-transform duration-150 hover:-translate-y-0.5"
                  style={{ backgroundColor: primaryColor }}
                >
                  Discover More
                  <Iconify icon="solar:arrow-right-linear" width={14} />
                </a>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-gray-700 transition-colors"
              >
                {step < total ? "Next" : "Dismiss"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

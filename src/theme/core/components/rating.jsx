'use client';

import { useState } from "react";

// ----------------------------------------------------------------------
// Icon
// ----------------------------------------------------------------------

const RatingIcon = ({ className = "", filled = false }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    <path d="M17.56,21 C17.4000767,21.0006435 17.2423316,20.9629218 17.1,20.89 L12,18.22 L6.9,20.89 C6.56213339,21.067663 6.15259539,21.0374771 5.8444287,20.8121966 C5.53626201,20.5869161 5.38323252,20.2058459 5.45,19.83 L6.45,14.2 L2.33,10.2 C2.06805623,9.93860108 1.9718844,9.55391377 2.08,9.2 C2.19824414,8.83742187 2.51242293,8.57366684 2.89,8.52 L8.59,7.69 L11.1,2.56 C11.2670864,2.21500967 11.6166774,1.99588989 12,1.99588989 C12.3833226,1.99588989 12.7329136,2.21500967 12.9,2.56 L15.44,7.68 L21.14,8.51 C21.5175771,8.56366684 21.8317559,8.82742187 21.95,9.19 C22.0581156,9.54391377 21.9619438,9.92860108 21.7,10.19 L17.58,14.19 L18.58,19.82 C18.652893,20.2027971 18.4967826,20.5930731 18.18,20.82 C17.9989179,20.9468967 17.7808835,21.010197 17.56,21 L17.56,21 Z" />
  </svg>
);

// ----------------------------------------------------------------------
// Rating Component
// ----------------------------------------------------------------------

const sizeMap = {
  small: { icon: "w-5 h-5", gap: "gap-0.5" }, // 20px
  medium: { icon: "w-6 h-6", gap: "gap-1" }, // 24px
  large: { icon: "w-7 h-7", gap: "gap-1" }, // 28px
};

const Rating = ({
  value = 0,
  onChange,
  max = 5,
  size = "medium",
  disabled = false,
  readOnly = false,
  precision = 1,     // 1 or 0.5
}) => {
  const [hovered, setHovered] = useState(-1);
  const { icon: iconSize, gap } = sizeMap[size] ?? sizeMap.medium;

  const getStarFill = (starIndex) => {
    const active = hovered >= 0 ? hovered : value;
    if (precision === 0.5) {
      if (active >= starIndex + 1) return "full";
      if (active >= starIndex + 0.5) return "half";
      return "empty";
    }
    return active >= starIndex + 1 ? "full" : "empty";
  };

  const handleClick = (starIndex, half = false) => {
    if (disabled || readOnly) return;
    const next = half ? starIndex + 0.5 : starIndex + 1;
    onChange?.(next === value ? 0 : next);
  };

  const handleMouseMove = (e, starIndex) => {
    if (disabled || readOnly) return;
    if (precision === 0.5) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeft = e.clientX - rect.left < rect.width / 2;
      setHovered(isLeft ? starIndex + 0.5 : starIndex + 1);
    } else {
      setHovered(starIndex + 1);
    }
  };

  return (
    <span
      className={[
        "inline-flex items-center",
        gap,
        disabled ? "opacity-[0.48] pointer-events-none" : "",
        readOnly ? "pointer-events-none" : "",
      ].join(" ")}
      onMouseLeave={() => setHovered(-1)}
      role="radiogroup"
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = getStarFill(i);
        const isFilled = fill === "full";
        const isHalf = fill === "half";

        return (
          <span
            key={i}
            className="relative cursor-pointer"
            onClick={(e) => {
              if (precision === 0.5) {
                const rect = e.currentTarget.getBoundingClientRect();
                handleClick(i, e.clientX - rect.left < rect.width / 2);
              } else {
                handleClick(i);
              }
            }}
            onMouseMove={(e) => handleMouseMove(e, i)}
            role="radio"
            aria-checked={value === i + 1}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClick(i);
            }}
          >
            {/* Empty star underneath */}
            <RatingIcon
              className={[
                iconSize,
                "transition-colors duration-150",
                "text-neutral-400/[0.48]", // varAlpha(grey[500Channel], 0.48)
              ].join(" ")}
            />

            {/* Filled overlay — clips to full or half width */}
            {(isFilled || isHalf) && (
              <span
                className={[
                  "absolute inset-0 overflow-hidden",
                  isHalf ? "w-1/2" : "w-full",
                ].join(" ")}
              >
                <RatingIcon
                  className={[
                    iconSize,
                    "text-amber-400 transition-colors duration-150",
                  ].join(" ")}
                />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

// ----------------------------------------------------------------------
// Demo
// ----------------------------------------------------------------------

export default function App() {
  const [v1, setV1] = useState(3);
  const [v2, setV2] = useState(2.5);
  const [v3, setV3] = useState(4);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col items-start justify-center gap-8 p-12">
      <div className="flex flex-col gap-6">

        <Row label="Small">
          <Rating value={v1} onChange={setV1} size="small" />
        </Row>

        <Row label="Medium (default)">
          <Rating value={v1} onChange={setV1} size="medium" />
        </Row>

        <Row label="Large">
          <Rating value={v1} onChange={setV1} size="large" />
        </Row>

        <Row label="Half precision">
          <Rating value={v2} onChange={setV2} size="medium" precision={0.5} />
        </Row>

        <Row label="Read only">
          <Rating value={3} size="medium" readOnly />
        </Row>

        <Row label="Disabled">
          <Rating value={v3} onChange={setV3} size="medium" disabled />
        </Row>

      </div>
    </div>
  );
}

const Row = ({ label, children }) => (
  <div className="flex items-center gap-6">
    <span className="w-36 text-sm text-neutral-400 dark:text-neutral-500 font-medium tracking-wide">
      {label}
    </span>
    {children}
  </div>
);
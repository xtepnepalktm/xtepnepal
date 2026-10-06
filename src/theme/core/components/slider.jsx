'use client';

import { useState, useRef, useCallback } from "react";

const SIZE = {
  rail: { small: 6, medium: 10 },
  thumb: { small: 16, medium: 20 },
  mark: { small: 4, medium: 6 },
};

// ----------------------------------------------------------------------
// Slider
// ----------------------------------------------------------------------

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  size = "small",
  disabled = false,
  color = "primary",
  valueLabelDisplay = "auto", // "auto" | "on" | "off"
}) => {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rail = SIZE.rail[size] ?? SIZE.rail.medium;
  const thumb = SIZE.thumb[size] ?? SIZE.thumb.medium;
  const mark = SIZE.mark[size] ?? SIZE.mark.medium;

  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  // Marks array
  const marksArr = Array.isArray(marks)
    ? marks
    : marks
      ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
        value: min + i * step,
      }))
      : [];

  const valueFromClient = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return value;
    const raw = ((clientX - rect.left) / rect.width) * (max - min) + min;
    const stepped = Math.round(raw / step) * step;
    return Math.min(max, Math.max(min, stepped));
  }, [min, max, step, value]);

  const onPointerDown = (e) => {
    if (disabled) return;
    e.preventDefault();
    trackRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    onChange?.(valueFromClient(e.clientX));
  };
  const onPointerMove = (e) => { if (dragging) onChange?.(valueFromClient(e.clientX)); };
  const onPointerUp = () => setDragging(false);

  const onKeyDown = (e) => {
    if (disabled) return;
    const d = e.shiftKey ? step * 10 : step;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") onChange?.(Math.min(max, value + d));
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") onChange?.(Math.max(min, value - d));
    if (e.key === "Home") onChange?.(min);
    if (e.key === "End") onChange?.(max);
  };

  // ── Color maps ──────────────────────────────────────────────────────
  const trackBg = disabled ? "bg-neutral-400/40"
    : color === "inherit" ? "bg-current"
      : color === "secondary" ? "bg-purple-500"
        : color === "error" ? "bg-red-500"
          : color === "warning" ? "bg-amber-500"
            : color === "success" ? "bg-green-500"
              : "bg-blue-500";

  // disabled color → varAlpha(grey[500Channel], disabledOpacity)
  const thumbBorder = disabled ? "border-neutral-400/40"
    : color === "secondary" ? "border-purple-500"
      : color === "error" ? "border-red-500"
        : color === "warning" ? "border-amber-500"
          : color === "success" ? "border-green-500"
            : "border-blue-500";

  // active mark bg for color="inherit" in dark → varAlpha(grey[800Channel], 0.48)
  const activeMarkBg = color === "inherit"
    ? "bg-white/[0.64] dark:bg-neutral-800/[0.48]"  // light / dark variant
    : "bg-white/[0.64]";

  const showLabel = valueLabelDisplay === "on"
    || (valueLabelDisplay === "auto" && (dragging || hovered));

  return (
    <div
      className={[
        "relative flex items-center w-full select-none",
        disabled ? "opacity-[0.48] cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
      style={{ height: thumb + 8 }}
    >
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: rail }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Rail — opacity: 0.12, bg: grey[500] */}
        <div
          className="absolute inset-0 rounded-full bg-neutral-500 opacity-[0.12]"
          style={{ height: rail }}
        />

        {/* Track */}
        <div
          className={`absolute left-0 top-0 rounded-full ${trackBg}`}
          style={{ width: `${pct}%`, height: rail }}
        />

        {/* Marks */}
        {marksArr.map((m, i) => {
          const mPct = ((m.value - min) / (max - min)) * 100;
          const isFirst = i === 0;
          const isLast = m.value === max;
          const active = m.value <= value;
          // hide first (data-index="0") and last (left === "100%") marks
          if (isFirst || isLast) return null;

          return (
            <span key={m.value}>
              {/* Mark dot
                  inactive → varAlpha(grey[500Channel], 0.48) → bg-neutral-500/[0.48]
                  active   → varAlpha(whiteChannel, 0.64)      → bg-white/[0.64]        */}
              <span
                className={[
                  "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  active ? activeMarkBg : "bg-neutral-500/[0.48]",
                ].join(" ")}
                style={{ left: `${mPct}%`, width: 1, height: mark }}
              />
              {/* Mark label — fontSize: 13px, color: text.disabled */}
              {m.label && (
                <span
                  className="absolute top-full mt-2 -translate-x-1/2 text-[13px] text-neutral-400 dark:text-neutral-500 whitespace-nowrap pointer-events-none"
                  style={{ left: `${mPct}%` }}
                >
                  {m.label}
                </span>
              )}
            </span>
          );
        })}

        {/* Thumb */}
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={onKeyDown}
          className={[
            // base — border: 1px solid, bg: white, shadow: customShadows.z1
            "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
            "bg-white border border-solid shadow-md",
            // borderColor: varAlpha(grey[500Channel], 0.08)
            "border-neutral-500/[0.08]",
            thumbBorder,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
            dragging ? "scale-110" : "scale-100",
            "transition-transform duration-100",
            disabled ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing",
          ].join(" ")}
          style={{ left: `${pct}%`, width: thumb, height: thumb }}
        >
          {/* ::before — gradient overlay
              opacity: 0.4 (light) / 0.8 (dark)
              background: linear-gradient(180deg, grey[500], transparent) */}
          <span
            className="absolute rounded-full pointer-events-none opacity-40 dark:opacity-80"
            style={{
              inset: 2,
              background: "linear-gradient(180deg, #919eab, transparent)",
            }}
          />

          {/* Value label
              borderRadius: 8, bg: grey[800] / dark: grey[700] */}
          {showLabel && (
            <span className={[
              "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10",
              "px-2 py-0.5  text-xs font-medium text-white whitespace-nowrap pointer-events-none",
              "bg-neutral-800 dark:bg-neutral-700",
            ].join(" ")}>
              {value}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800 dark:border-t-neutral-700" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Demo
// ----------------------------------------------------------------------

export default function App() {
  const [v1, setV1] = useState(30);
  const [v2, setV2] = useState(60);
  const [v3, setV3] = useState(3);
  const [v4, setV4] = useState(50);
  const [v5, setV5] = useState(70);

  const labeledMarks = [
    { value: 0, label: "0°C" },
    { value: 25, label: "25°C" },
    { value: 50, label: "50°C" },
    { value: 75, label: "75°C" },
    { value: 100, label: "100°C" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col items-center justify-center gap-10 p-12">
      <div className="w-full max-w-sm flex flex-col gap-10">
        <Row label="Small (default)">
          <Slider value={v1} onChange={setV1} size="small" valueLabelDisplay="auto" />
        </Row>
        <Row label="Medium">
          <Slider value={v2} onChange={setV2} size="medium" valueLabelDisplay="auto" />
        </Row>
        <Row label="Marks — step 10">
          <Slider value={v1} onChange={setV1} size="small" marks step={10} valueLabelDisplay="auto" />
        </Row>
        <Row label="Mark labels" className="mb-8">
          <Slider value={v4} onChange={setV4} size="medium" marks={labeledMarks} step={25} valueLabelDisplay="auto" />
        </Row>
        <Row label="Color: success">
          <Slider value={v5} onChange={setV5} size="medium" color="success" valueLabelDisplay="auto" />
        </Row>
        <Row label="Disabled">
          <Slider value={40} size="small" disabled />
        </Row>
      </div>
    </div>
  );
}

const Row = ({ label, children, className = "" }) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
      {label}
    </span>
    <div className="px-2">{children}</div>
  </div>
);
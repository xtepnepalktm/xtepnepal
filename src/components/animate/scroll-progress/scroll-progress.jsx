
import { Fragment } from "react";
import { mergeClasses } from "minimal-shared/utils";
import { m, useSpring, useTransform } from "framer-motion";

import { createClasses } from "@/theme/create-classes";

// ----------------------------------------------------------------------

export const scrollProgressClasses = {
  circular: createClasses("scroll__progress__circular"),
  linear: createClasses("scroll__progress__linear"),
};

// Map color prop to CSS variable pairs (light + main) matching MUI palette names
const COLOR_MAP = {
  primary:   { light: "var(--palette-primary-light)",   main: "var(--palette-primary-main)" },
  secondary: { light: "var(--palette-secondary-light)", main: "var(--palette-secondary-main)" },
  error:     { light: "var(--palette-error-light)",     main: "var(--palette-error-main)" },
  warning:   { light: "var(--palette-warning-light)",   main: "var(--palette-warning-main)" },
  info:      { light: "var(--palette-info-light)",      main: "var(--palette-info-main)" },
  success:   { light: "var(--palette-success-light)",   main: "var(--palette-success-main)" },
};

// ----------------------------------------------------------------------

export function ScrollProgress({
  sx,
  size,
  portal,
  variant,
  slotProps,
  className,
  thickness = 3.6,
  whenScroll = "y",
  color = "primary",
  progress: progressProps,
  ...other
}) {
  // RTL: detect from document direction instead of useTheme
  const isRtl =
    typeof document !== "undefined" &&
    document.documentElement.dir === "rtl";

  const transformProgress = useTransform(progressProps, [0, -1], [0, 1]);
  const progress = isRtl && whenScroll === "x" ? transformProgress : progressProps;

  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressSize = variant === "circular" ? (size ?? 64) : (size ?? 3);

  const colorTokens = COLOR_MAP[color];

  // ------------------------------------------------------------------
  // Circular variant
  // ------------------------------------------------------------------
  const renderCircular = () => (
    <m.svg
      viewBox={`0 0 ${progressSize} ${progressSize}`}
      xmlns="http://www.w3.org/2000/svg"
      className={mergeClasses([scrollProgressClasses.circular, className])}
      style={{
        width: progressSize,
        height: progressSize,
        transform: "rotate(-90deg)",
        color:
          color !== "inherit"
            ? colorTokens?.main ?? "var(--palette-primary-main)"
            : "inherit",
        // circle styles applied via CSS below
      }}
      {...other}
    >
      <style>{`
        .scroll-progress-svg circle {
          fill: none;
          stroke-dashoffset: 0;
          stroke: currentColor;
        }
      `}</style>
      <circle
        className="scroll-progress-svg"
        cx={progressSize / 2}
        cy={progressSize / 2}
        r={progressSize / 2 - thickness - 4}
        strokeWidth={thickness}
        strokeOpacity={0.2}
        fill="none"
        stroke="currentColor"
      />
      <m.circle
        cx={progressSize / 2}
        cy={progressSize / 2}
        r={progressSize / 2 - thickness - 4}
        strokeWidth={thickness}
        fill="none"
        stroke="currentColor"
        style={{ pathLength: progress }}
      />
    </m.svg>
  );

  // ------------------------------------------------------------------
  // Linear variant
  // ------------------------------------------------------------------
  const renderLinear = () => (
    <m.div
      className={mergeClasses([scrollProgressClasses.linear, className])}
      style={{
        // Position
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        transformOrigin: "0%",
        zIndex: 9999,
        // Size
        height: progressSize,
        // Color
        background:
          color !== "inherit" && colorTokens
            ? `linear-gradient(135deg, ${colorTokens.light}, ${colorTokens.main})`
            : "var(--text-primary)",
        // Animation
        scaleX,
      }}
      {...other}
    />
  );

  // ------------------------------------------------------------------
  // Portal wrapper (keep Portal behaviour via conditional rendering)
  // ------------------------------------------------------------------
  const content = (
    <div {...slotProps?.wrapper}>
      {variant === "circular" ? renderCircular() : renderLinear()}
    </div>
  );

  if (portal) {
    // Lazy-import Portal only if needed — avoids MUI dependency for non-portal usage
    const { createPortal } = require("react-dom");
    return typeof document !== "undefined"
      ? createPortal(content, document.body)
      : null;
  }

  return content;
}
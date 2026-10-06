"use client";

import { mergeClasses } from "minimal-shared/utils";
import { useRef, useState, useEffect, forwardRef } from "react";
import {
  m,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useMotionTemplate,
} from "framer-motion";

const animateBorderClasses = {
  root: "border__animation__root",
  primaryBorder: "border__animation__primary",
  secondaryBorder: "border__animation__secondary",
  svgWrapper: "border__animation__svg__wrapper",
  movingShape: "border__animation__moving__shape",
};

export function AnimateBorder({
  className,
  children,
  duration,
  slotProps,
  style,
  ...other
}) {
  const rootRef = useRef(null);
  const primaryBorderRef = useRef(null);

  const [isHidden, setIsHidden] = useState(false);

  const secondaryBorderStyles = useComputedElementStyles(primaryBorderRef);

  useEffect(() => {
    const handleVisibility = () => {
      if (rootRef.current) {
        const displayStyle = getComputedStyle(rootRef.current).display;
        setIsHidden(displayStyle === "none");
      }
    };

    handleVisibility();

    // Debounce resize to avoid repeated reflows
    let rafId;
    const debouncedResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleVisibility);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const outlineColor =
    typeof slotProps?.outlineColor === "function"
      ? slotProps?.outlineColor()
      : slotProps?.outlineColor;

  const borderProps = {
    duration,
    isHidden,
    rx: slotProps?.svgSettings?.rx,
    ry: slotProps?.svgSettings?.ry,
  };

  const renderPrimaryBorder = () => (
    <MovingBorder
      {...borderProps}
      ref={primaryBorderRef}
      size={slotProps?.primaryBorder?.size}
      borderWidth={slotProps?.primaryBorder?.width}
      className={slotProps?.primaryBorder?.className}
    />
  );

  const renderSecondaryBorder = () =>
    slotProps?.secondaryBorder && (
      <MovingBorder
        {...borderProps}
        size={slotProps?.secondaryBorder?.size ?? slotProps?.primaryBorder?.size}
        borderWidth={slotProps?.secondaryBorder?.width ?? secondaryBorderStyles.padding}
        className={slotProps?.secondaryBorder?.className}
        style={{
          borderRadius: secondaryBorderStyles.borderRadius,
          transform: "scale(-1, -1)",
        }}
      />
    );

  return (
    <div
      dir="ltr"
      ref={rootRef}
      className={mergeClasses([
        animateBorderClasses.root,
        "animate-border-root",
        !!children ? "" : "min-w-10 min-h-10",
        "overflow-hidden relative w-fit",
        className,
      ])}
      style={{
        "--outline-color": outlineColor,
        "--border-width": slotProps?.primaryBorder?.width,
        ...style,
      }}
      {...other}
    >
      {renderPrimaryBorder()}
      {renderSecondaryBorder()}
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

const MovingBorder = forwardRef((props, ref) => {
  const {
    rx = "30%",
    ry = "30%",
    size,
    duration = 8,
    isHidden,
    borderWidth,
    className,
    style,
    ...other
  } = props;

  const svgRectRef = useRef(null);
  const progress = useMotionValue(0);

  // Cache pathLength so getTotalLength() is only called once, not every frame
  const pathLengthRef = useRef(null);

  useEffect(() => {
    // Read pathLength once after mount, not on every animation frame
    if (svgRectRef.current) {
      try {
        pathLengthRef.current = svgRectRef.current.getTotalLength();
      } catch {
        pathLengthRef.current = null;
      }
    }
  }, []);

  const updateAnimationFrame = (time) => {
    if (!svgRectRef.current || pathLengthRef.current === null) return;
    try {
      const pixelsPerMs = pathLengthRef.current / (duration * 1000);
      progress.set((time * pixelsPerMs) % pathLengthRef.current);
    } catch {
      return;
    }
  };

  const calculateTransform = (val) => {
    if (!svgRectRef.current) return { x: 0, y: 0 };
    try {
      const point = svgRectRef.current.getPointAtLength(val);
      return point ? { x: point.x, y: point.y } : { x: 0, y: 0 };
    } catch {
      return { x: 0, y: 0 };
    }
  };

  useAnimationFrame((time) =>
    !isHidden ? updateAnimationFrame(time) : undefined
  );

  const x = useTransform(progress, (val) => calculateTransform(val).x);
  const y = useTransform(progress, (val) => calculateTransform(val).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <span
      ref={ref}
      className={mergeClasses([
        "animate-border-gradient text-left",
        className,
      ])}
      style={{ padding: borderWidth, ...style }}
      {...other}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        className={mergeClasses([animateBorderClasses.svgWrapper, "absolute"])}
      >
        <rect
          ref={svgRectRef}
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
        />
      </svg>

      <m.span
        style={{ transform }}
        className={mergeClasses([
          animateBorderClasses.movingShape,
          "absolute blur-[8px]",
        ])}
        css={{
          width: size,
          height: size,
          background: "radial-gradient(currentColor 40%, transparent 80%)",
        }}
      />
    </span>
  );
});

// ----------------------------------------------------------------------

function useComputedElementStyles(ref) {
  const [computedStyles, setComputedStyles] = useState(null);

  const isRtl =
    typeof document !== "undefined" &&
    document.documentElement.dir === "rtl";

  useEffect(() => {
    if (ref.current) {
      const style = getComputedStyle(ref.current);
      setComputedStyles({
        paddingTop: style.paddingBottom,
        paddingBottom: style.paddingTop,
        paddingLeft: isRtl ? style.paddingLeft : style.paddingRight,
        paddingRight: isRtl ? style.paddingRight : style.paddingLeft,
        borderTopLeftRadius: isRtl
          ? style.borderBottomLeftRadius
          : style.borderBottomRightRadius,
        borderTopRightRadius: isRtl
          ? style.borderBottomRightRadius
          : style.borderBottomLeftRadius,
        borderBottomLeftRadius: isRtl
          ? style.borderTopLeftRadius
          : style.borderTopRightRadius,
        borderBottomRightRadius: isRtl
          ? style.borderTopRightRadius
          : style.borderTopLeftRadius,
      });
    }
  }, [ref, isRtl]);

  return {
    padding: `${computedStyles?.paddingTop} ${computedStyles?.paddingRight} ${computedStyles?.paddingBottom} ${computedStyles?.paddingLeft}`,
    borderRadius: `${computedStyles?.borderTopLeftRadius} ${computedStyles?.borderTopRightRadius} ${computedStyles?.borderBottomRightRadius} ${computedStyles?.borderBottomLeftRadius}`,
  };
}
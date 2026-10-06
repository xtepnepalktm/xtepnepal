"use client";

import { forwardRef, useEffect, useState } from "react";
import { m } from "framer-motion";

// ----------------------------------------------------------------------

export const MotionViewport = forwardRef(
  (
    {
      children,
      viewport,
      disableAnimate = true,
      className = "",
      ...other
    },
    ref
  ) => {
    const [smDown, setSmDown] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 640px)");

      const handleResize = (e) => {
        setSmDown(e.matches);
      };

      setSmDown(mediaQuery.matches);

      mediaQuery.addEventListener("change", handleResize);

      return () => {
        mediaQuery.removeEventListener("change", handleResize);
      };
    }, []);

    const disabled = smDown && disableAnimate;

    if (disabled) {
      return (
        <div ref={ref} className={className} {...other}>
          {children}
        </div>
      );
    }

    return (
      <m.div
        ref={ref}
        initial="initial"
        whileInView="animate"
        variants={containerVariants}
        viewport={{
          once: true,
          amount: 0.3,
          ...viewport,
        }}
        className={className}
        {...other}
      >
        {children}
      </m.div>
    );
  }
);

MotionViewport.displayName = "MotionViewport";

// ----------------------------------------------------------------------
// Container Variants
// ----------------------------------------------------------------------

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};
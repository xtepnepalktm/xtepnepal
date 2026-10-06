"use client";

import { forwardRef } from "react";
import { m } from "framer-motion";

// ----------------------------------------------------------------------

export const MotionContainer = forwardRef(
  (
    {
      animate,
      action = false,
      className = "",
      children,
      ...other
    },
    ref
  ) => {
    return (
      <m.div
        ref={ref}
        variants={containerVariants}
        initial={action ? false : "initial"}
        animate={action ? (animate ? "animate" : "exit") : "animate"}
        exit={action ? undefined : "exit"}
        className={className}
        {...other}
      >
        {children}
      </m.div>
    );
  }
);

MotionContainer.displayName = "MotionContainer";

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

  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
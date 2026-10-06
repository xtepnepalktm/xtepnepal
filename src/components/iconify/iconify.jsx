"use client";

import { forwardRef } from "react";
import { Icon, disableCache } from "@iconify/react";

// ----------------------------------------------------------------------

export const Iconify = forwardRef(
  (
    {
      className = "",
      width = 20,
      icon,
      ...other
    },
    ref
  ) => {
    const baseStyles = {
      width,
      height: width,
      flexShrink: 0,
      display: "inline-flex",
    };

    return (
      <span
        className={`
          inline-flex
          shrink-0
          ${className}
        `}
        style={baseStyles}
      >
        <Icon
          ref={ref}
          icon={icon}
          width={width}
          height={width}
          {...other}
        />
      </span>
    );
  }
);

Iconify.displayName = "Iconify";

// ----------------------------------------------------------------------
// Disable local cache
// ----------------------------------------------------------------------

disableCache("local");

"use client";

import clsx from "clsx";
import { navSectionClasses } from "@/components/nav-section";

// ------------------------------------------------------
// NAV
// ------------------------------------------------------

export function Nav({ className = "", ...props }) {
  return (
    <nav
      className={clsx("block", className)}
      {...props}
    />
  );
}

// ------------------------------------------------------
// NAV UL
// ------------------------------------------------------

export function NavUl({ className = "", ...props }) {
  return (
    <ul
      className={clsx(
        navSectionClasses.ul,
        "flex flex-col",
        className
      )}
      {...props}
    />
  );
}

// ------------------------------------------------------
// NAV LI
// ------------------------------------------------------

export function NavLi({
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <li
      className={clsx(
        navSectionClasses.li,
        "inline-block",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    />
  );
}
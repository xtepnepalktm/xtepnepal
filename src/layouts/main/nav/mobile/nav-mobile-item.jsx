
import { forwardRef } from "react";
import { mergeClasses } from "minimal-shared/utils";

import { Iconify } from "@/components/iconify";
import { createNavItem, navSectionClasses } from "@/components/nav-section";
import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

export const NavItem = forwardRef((props, ref) => {
  const {
    path,
    icon,
    title,
    open,
    active,
    hasChild,
    className,
    externalLink,
    ...other
  } = props;

  const navItem = createNavItem({ path, icon, hasChild, externalLink });

  // Extract `component` from baseProps so it never lands on a DOM element.
  // createNavItem sets component=RouterLink for internal links and
  // component="a" for external ones — we handle both cases ourselves.
  const { component: _component, ...safeBaseProps } = navItem.baseProps ?? {};

  const sharedClassName = mergeClasses(
    [
      navSectionClasses.item.root,
      "relative flex items-center w-full gap-4 h-12",
      "pl-[20px] pr-[12px]",
      "text-[15px] outline-none border-none cursor-pointer",
      "transition-colors duration-200",
      // Default
      !open && !active &&
      "text-[var(--text-secondary)] bg-transparent hover:bg-[var(--action-hover)] font-semibold",
      // Open
      open && !active &&
      "text-[var(--text-primary)] bg-[var(--action-hover)] font-semibold",
      // Active — brand colour, tinted row and a left accent bar (see below)
      active && [
        "font-bold",
        "bg-[color-mix(in_srgb,var(--nav-active-color)_10%,transparent)]",
        "hover:bg-[color-mix(in_srgb,var(--nav-active-color)_18%,transparent)]",
      ],
      className,
    ],
    {
      [navSectionClasses.state.open]: open,
      [navSectionClasses.state.active]: active,
    }
  );

  // Colour comes from a CSS var, so it has to be an inline style rather than a
  // Tailwind arbitrary value that would fight the default text colour class.
  const sharedStyle = active ? { color: "var(--nav-active-color)" } : undefined;

  const children = (
    <>
      {/* Active accent bar */}
      {active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-full w-[3px] rounded-r-full"
          style={{ backgroundColor: "var(--nav-active-color)" }}
        />
      )}

      {/* Icon slot */}
      <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6">
        {navItem.renderIcon}
      </span>

      {/* Title slot */}
      <span
        className={[
          "flex-1 text-left truncate text-sm leading-snug text-current",
          active ? "font-bold" : "font-semibold",
        ].join(" ")}
      >
        {title}
      </span>

      {/* Arrow slot */}
      {hasChild && (
        <Iconify
          icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
          className="w-4 h-4 flex-shrink-0 ml-auto opacity-60"
        />
      )}
    </>
  );

  // External link → plain <a>
  if (externalLink) {
    return (
      <a
        ref={ref}
        aria-label={title}
        aria-current={active ? "page" : undefined}
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClassName}
        style={sharedStyle}
        {...other}
      >
        {children}
      </a>
    );
  }

  // Internal link → RouterLink (handles href natively, no component prop needed)
  if (path) {
    return (
      <RouterLink
        ref={ref}
        aria-label={title}
        aria-current={active ? "page" : undefined}
        href={path}
        className={sharedClassName}
        style={sharedStyle}
        {...safeBaseProps}
        {...other}
      >
        {children}
      </RouterLink>
    );
  }

  // No path (toggle-only item, e.g. parent with children) → <button>
  return (
    <button
      ref={ref}
      type="button"
      aria-label={title}
      aria-current={active ? "page" : undefined}
      className={sharedClassName}
      style={sharedStyle}
      {...other}
    >
      {children}
    </button>
  );
});
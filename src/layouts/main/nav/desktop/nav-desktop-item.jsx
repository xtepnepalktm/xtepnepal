import { forwardRef } from "react";
import { mergeClasses } from "minimal-shared/utils";

import { Iconify } from "@/components/iconify";
import {
  createNavItem,
  navSectionClasses,
} from "@/components/nav-section";

// ----------------------------------------------------------------------

export const NavItem = forwardRef((props, ref) => {
  const {
    title,
    path,
    /********/
    open,
    active,
    /********/
    subItem,
    hasChild,
    className,
    externalLink,
    disableActiveStyle,
    ...other
  } = props;

  const navItem = createNavItem({ path, hasChild, externalLink });

  const isActive = !!active && !disableActiveStyle;

  return (
    <ItemRoot
      ref={ref}
      aria-label={title}
      aria-current={isActive ? "page" : undefined}
      open={open}
      active={isActive}
      subItem={subItem}
      {...navItem.baseProps}
      className={mergeClasses([navSectionClasses.item.root, className], {
        [navSectionClasses.state.open]: open,
        [navSectionClasses.state.active]: isActive,
      })}
      {...other}
    >
      <ItemTitle active={isActive} subItem={subItem}>
        {title}
      </ItemTitle>

      {hasChild && (
        <ItemArrow
          open={open}
          active={isActive}
          icon="eva:arrow-ios-downward-fill"
        />
      )}
    </ItemRoot>
  );
});

// ----------------------------------------------------------------------

/**
 * @slot root
 *
 * Root items get an underline indicator that slides in from the left:
 * - active          → underline fully drawn, text in the brand colour
 * - open / hover    → underline drawn in the current text colour
 * Sub items only recolour, since they sit in a vertical dropdown list.
 */
function ItemRoot({
  ref,
  open,
  active,
  subItem,
  children,
  className,
  component,
  ...other
}) {
  // External links pass href without a component — render an anchor for them
  const Component = component || (other.href ? "a" : "button");

  const subItemColorClass = active
    ? "text-gray-900 font-semibold"
    : "text-gray-500 hover:text-gray-900";

  return (
    <Component
      ref={ref}
      {...(Component === "button" ? { type: "button" } : {})}
      data-active={active ? "true" : undefined}
      className={[
        // layout
        "group relative inline-flex cursor-pointer select-none appearance-none items-center",
        // reset ButtonBase
        "border-0 bg-transparent p-0 outline-none",
        // transition
        "transition-colors duration-200",
        // variant colour
        subItem ? subItemColorClass : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        !subItem && active
          ? { color: "var(--nav-active-color)" }
          : undefined
      }
      {...other}
    >
      {children}

      {/* Underline indicator — root items only */}
      {!subItem && (
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full",
            "origin-left transition-transform duration-200 ease-out",
            active || open
              ? "scale-x-100"
              : "scale-x-0 group-hover:scale-x-100",
          ].join(" ")}
          style={{
            backgroundColor: active ? "var(--nav-active-color)" : "currentColor",
          }}
        />
      )}
    </Component>
  );
}

// ----------------------------------------------------------------------

/**
 * @slot title
 */
function ItemTitle({ active, subItem, children }) {
  return (
    <span
      className={[
        "grow whitespace-nowrap text-[15px] text-current",
        subItem ? "text-[15px]" : "",
        active ? "font-bold" : "font-semibold",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

// ----------------------------------------------------------------------

/**
 * @slot arrow
 */
function ItemArrow({ open, icon }) {
  return (
    <Iconify
      icon={icon}
      className={[
        "ml-0.5 h-4 w-4 shrink-0 transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      ].join(" ")}
    />
  );
}

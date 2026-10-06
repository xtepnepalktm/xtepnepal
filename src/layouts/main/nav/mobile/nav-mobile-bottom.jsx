
import { forwardRef } from "react";
import { mergeClasses, isActiveLink } from "minimal-shared/utils";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { usePathname } from "@/routes/hooks";

import { useAppSelector } from "@/redux/hooks";

import { navSectionClasses } from "@/components/nav-section";

import { mobileBottomNavData } from "../../../nav-config-mobile-bottom";

// ----------------------------------------------------------------------

export function NavMobileBottom({ className }) {
  return (
    <nav
      className={[
        // Layout
        "flex justify-around items-center w-full",
        "h-[var(--layout-nav-mobile-bottom-height)]",
        // Position
        "fixed bottom-0 left-0 z-[1100]",
        // Visuals
        "bg-white",
        "backdrop-blur-[10px]",
        "shadow-[0_-4px_20px_rgba(0,0,0,0.08)]",
        "",
        // Hide on md+
        "md:hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {mobileBottomNavData.map((nav) => (
        <NavItem key={nav.title} nav={nav} />
      ))}
    </nav>
  );
}

// ----------------------------------------------------------------------

const NavItem = forwardRef(({ nav }, ref) => {
  const { path, icon, title, ...other } = nav;

  const { isLogin } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const isActive = isActiveLink(pathname, path, false);

  if (path === paths.profile.root && !isLogin) {
    return null;
  }

  return (
    <RouterLink
      ref={ref}
      href={path}
      aria-label={title}
      className={mergeClasses(
        [
          navSectionClasses.item.root,
          "mobile-bottom-nav",
          // Layout
          "flex flex-col items-center justify-center gap-[3px]",
          "h-[70px] w-full p-[12px]",
          // Typography & transition
          "text-sm no-underline outline-none",
          "transition-colors duration-200",
          // Default colour
          !isActive && "text-[var(--text-secondary)]",
          // Active colour
          isActive && "text-[var(--nav-active-color)]",
        ],
        {
          [navSectionClasses.state.active]: isActive,
        }
      )}
      aria-current={isActive ? "page" : undefined}
      {...other}
    >
      {/* Icon slot */}
      <span
        className={[
          "inline-flex items-center justify-center flex-shrink-0 w-6 h-6",
          "transition-transform duration-200",
          "[&_svg]:transition-all [&_svg]:duration-200",
        ].join(" ")}
      >
        {icon}
      </span>

      {/* Title slot */}
      <span
        className={[
          "truncate text-[0.75rem] leading-snug",
          isActive ? "font-bold" : "font-medium",
        ].join(" ")}
      >
        {title}
      </span>
    </RouterLink>
  );
});
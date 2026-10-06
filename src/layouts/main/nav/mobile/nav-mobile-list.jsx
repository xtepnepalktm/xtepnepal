
import { useRef, useCallback } from "react";
import { useBoolean } from "minimal-shared/hooks";
import { varAlpha, isActiveLink, isExternalLink } from "minimal-shared/utils";

import { paths } from "@/routes/paths";
import { usePathname } from "@/routes/hooks";

import { navSectionClasses, NavSectionVertical } from "@/components/nav-section";

import { NavLi } from "../components";
import { NavItem } from "./nav-mobile-item";

// ----------------------------------------------------------------------

export function NavList({ data, className, ...other }) {
  const pathname = usePathname();
  const navItemRef = useRef(null);

  const isNotRootOrDocs = !["/", paths.docs].includes(pathname);
  const isNotComponentsPath = !pathname.startsWith(paths.components);
  const isOpenPath = !!data.children && isNotRootOrDocs && isNotComponentsPath;

  const isActive = isActiveLink(pathname, data.path, !!data.children);

  const { value: open, onToggle } = useBoolean(isOpenPath);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      onToggle();
    }
  }, [data.children, onToggle]);

  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      path={data.path}
      icon={data.icon}
      title={data.title}
      open={open}
      active={isActive}
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      onClick={handleToggleMenu}

    />
  );

  const renderCollapse = () =>
    !!data.children && (
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? "1000px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <NavSectionVertical
          data={data.children}
          className="px-[6px]"
          slotProps={{
            rootItem: {
              sx: [
                (theme) => ({
                  minHeight: 36,
                  '&[aria-label="Dashboard"]': {
                    [`& .${navSectionClasses.item.title}`]: {
                      display: "none",
                    },
                    height: 180,
                    borderRadius: 1.5,
                    backgroundSize: "auto 88%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(/assets/illustrations/illustration-dashboard.webp)`,
                    border: `solid 1px ${varAlpha(
                      theme.vars.palette.grey["500Channel"],
                      0.12
                    )}`,
                  },
                }),
              ],
            },
          }}
        />
      </div>
    );

  return (
    <NavLi className={className} {...other}>
      {renderNavItem()}
      {renderCollapse()}
    </NavLi>
  );
}
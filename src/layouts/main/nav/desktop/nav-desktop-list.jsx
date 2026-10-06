import { useBoolean, usePopoverHover } from "minimal-shared/hooks";
import { useRef, useEffect, useCallback } from "react";
import {
  isEqualPath,
  isActiveLink,
  isExternalLink,
} from "minimal-shared/utils";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCategory, setBrand } from "@/redux/actions";

import { paths } from "@/routes/paths";
import { usePathname, useRouter } from "@/routes/hooks";

import { Iconify } from "@/components/iconify";

import { NavItem } from "./nav-desktop-item";
import { Nav, NavLi, NavUl, NavDropdown } from "../components";
import { NavItemDashboard } from "./nav-desktop-item-dashboard";

// ----------------------------------------------------------------------

export function NavList({ data, sx, itemClassName, disableActiveStyle, ...other }) {
  const pathname = usePathname();
  const navItemRef = useRef(null);

  const isActive = isActiveLink(pathname, data.path, !!data.children);
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      onOpen();
    }
  }, [data.children, onOpen]);

  const renderNavItem = () => (
    <NavItem
      ref={navItemRef}
      // slots
      path={data.path}
      title={data.title}
      // state
      open={open}
      active={isActive}
      className={itemClassName}
      disableActiveStyle={disableActiveStyle}
      // options
      hasChild={!!data.children}
      externalLink={isExternalLink(data.path)}
      // action
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
    />
  );

  const renderDropdown = () =>
    !!data.children && (
      <NavDropdown
        open={open}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={onClose}
      >
        <Nav>
          {/* gap-6 ≈ gap: 3 (3 * 8px = 24px), flex-row */}
          <NavUl className="flex flex-row gap-6">
            {data.children.map((list) => (
              <NavSubList
                key={list.subheader}
                subheader={list.subheader}
                data={list.items}
              />
            ))}
          </NavUl>
        </Nav>
      </NavDropdown>
    );

  return (
    <NavLi {...other}>
      {renderNavItem()}
      {renderDropdown()}
    </NavLi>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ data, subheader, ...other }) {
  const pathname = usePathname();

  const isDashboard = subheader === "Dashboard";

  return (
    <NavLi
      className={[
        "flex-auto",
        isDashboard ? "flex-shrink max-w-[560px]" : "flex-shrink-0",
      ].join(" ")}
      {...other}
    >
      <NavUl>
        {/* mb-[6px] ≈ mb: 0.75 (0.75 * 8px = 6px), overline style, text-[11px] */}
        <NavLi className="mb-[6px] text-[11px] font-semibold uppercase tracking-widest text-current opacity-60">
          {subheader}
        </NavLi>

        {data.map((item) =>
          isDashboard ? (
            // mt-[6px] ≈ mt: 0.75
            <NavLi key={item.title} className="mt-[6px]">
              <NavItemDashboard path={item.path} />
            </NavLi>
          ) : (
            <NavLi key={item.title} className="mt-[6px] gap-5">
              <NavItem
                subItem
                title={item.title}
                path={item.path}
                active={isEqualPath(item.path, pathname)}
              />
            </NavLi>
          )
        )}
      </NavUl>
    </NavLi>
  );
}

// ----------------------------------------------------------------------

export function NavCategoryList({ category }) {
  const { category_id, name, has_sub_cat, show_in_home, subCategories } =
    category;

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const selectedCategory = useAppSelector(
    (state) => state.productFilter.category
  );

  const { open, onOpen, onClose, elementRef, anchorEl } = usePopoverHover();

  // A category is "active" while we are on the product listing and either it
  // or one of its sub-categories is the selected filter.
  const isSelected = (id) =>
    !!selectedCategory && String(selectedCategory) === String(id);

  const isActive =
    isEqualPath(paths.product.root, pathname) &&
    (isSelected(category_id) ||
      !!subCategories?.some((sub) => isSelected(sub.category_id)));

  const handleOpenMenu = useCallback(() => {
    if (has_sub_cat) {
      onOpen();
    }
  }, [has_sub_cat, onOpen]);

  const handleSelectCategory = (categoryId) => {
    dispatch(setCategory(categoryId));
    dispatch(setBrand([]));
    router.push(paths.product.root);
  };

  const renderNavItem = () => (
    <div
      ref={elementRef}
      onMouseEnter={handleOpenMenu}
      onMouseLeave={onClose}
      onClick={() => handleSelectCategory(category_id)}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "true" : undefined}
      className="group relative flex cursor-pointer items-center transition-colors duration-200"
      style={isActive ? { color: "var(--nav-active-color)" } : undefined}
    >
      <span
        className={[
          "text-[15px]",
          isActive ? "font-bold text-current" : "font-semibold text-[#000000]",
        ].join(" ")}
      >
        {name}
      </span>

      {has_sub_cat && (
        <Iconify
          icon="eva:arrow-ios-downward-fill"
          className={[
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isActive ? "text-current" : "text-[#000000]",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        />
      )}

      {/* Underline indicator — matches the main nav items */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full",
          "origin-left transition-transform duration-200 ease-out",
          isActive || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        ].join(" ")}
        style={{
          backgroundColor: isActive ? "var(--nav-active-color)" : "currentColor",
        }}
      />
    </div>
  );

  const renderDropdown = () =>
    has_sub_cat && open && (
      <CustomPopoverTailwind
        open={open}
        anchorEl={anchorEl}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <ul className="">
          {subCategories?.map((subCategory) => (
            <li
              key={subCategory.category_id}
              onClick={() => handleSelectCategory(subCategory.category_id)}
              aria-current={
                isSelected(subCategory.category_id) ? "page" : undefined
              }
              className={[
                "cursor-pointer p-2 pb-1 text-sm transition-colors hover:bg-black/5",
                isSelected(subCategory.category_id)
                  ? "font-bold"
                  : "font-medium text-[#000000]",
              ].join(" ")}
              style={
                isSelected(subCategory.category_id)
                  ? { color: "var(--nav-active-color)" }
                  : undefined
              }
            >
              {subCategory.name}
            </li>
          ))}
        </ul>
      </CustomPopoverTailwind>
    );

  if (!show_in_home) return null;

  return (
    <NavLi>
      {renderNavItem()}
      {renderDropdown()}
    </NavLi>
  );
}

// ----------------------------------------------------------------------

function CustomPopoverTailwind({ open, anchorEl, onMouseEnter, onMouseLeave, children }) {
  if (!open) return null;

  // Compute position from anchorEl (same pattern as MUI Popover)
  const rect = anchorEl?.getBoundingClientRect?.();
  const top = rect ? rect.bottom + window.scrollY : 0;
  const left = rect ? rect.left + rect.width / 2 + window.scrollX : 0;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ top, left, transform: "translateX(-50%)" }}
      className={[
        "fixed z-[1300] min-w-[160px] ",
        "bg-white bg-neutral-800",
        "shadow-[0_8px_16px_0_rgba(145,158,171,0.24)]",
        "border border-black/[0.06] dark:border-white/[0.08]",
        "pointer-events-auto",
        "overflow-hidden",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
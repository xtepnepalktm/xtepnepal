// import { useEffect, useCallback } from "react";
// import { usePopoverHover } from "minimal-shared/hooks";
// import { isActiveLink, isExternalLink } from "minimal-shared/utils";

// import { useTheme } from "@mui/material/styles";
// import { popoverClasses } from "@mui/material/Popover";

// import { usePathname } from "@/routes/hooks";

// import { NavItem } from "./nav-item";
// import { navSectionClasses } from "../styles";
// import { NavUl, NavLi, NavDropdown, NavDropdownPaper } from "../components";

// // ----------------------------------------------------------------------

// export function NavList({
//   data,
//   depth,
//   render,
//   cssVars,
//   slotProps,
//   currentRole,
//   enabledRootRedirect,
// }) {
//   const theme = useTheme();

//   const pathname = usePathname();

//   const isActive = isActiveLink(pathname, data.path, !!data.children);

//   const {
//     open,
//     onOpen,
//     onClose,
//     anchorEl,
//     elementRef: navItemRef,
//   } = usePopoverHover();

//   const isRtl = theme.direction === "rtl";
//   const id = open ? `${data.title}-popover` : undefined;

//   useEffect(() => {
//     // If the pathname changes, close the menu
//     if (open) {
//       onClose();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]);

//   const handleOpenMenu = useCallback(() => {
//     if (data.children) {
//       onOpen();
//     }
//   }, [data.children, onOpen]);

//   const renderNavItem = () => (
//     <NavItem
//       ref={navItemRef}
//       aria-describedby={id}
//       // slots
//       title={data.title}
//       path={data.path}
//       icon={data.icon}
//       info={data.info}
//       caption={data.caption}
//       // state
//       active={isActive}
//       open={open}
//       disabled={data.disabled}
//       // options
//       depth={depth}
//       render={render}
//       hasChild={!!data.children}
//       externalLink={isExternalLink(data.path)}
//       enabledRootRedirect={enabledRootRedirect}
//       // styles
//       slotProps={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
//       // actions
//       onMouseEnter={handleOpenMenu}
//       onMouseLeave={onClose}
//     />
//   );

//   const renderDropdown = () =>
//     !!data.children && (
//       <NavDropdown
//         disableScrollLock
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         anchorOrigin={
//           depth === 1
//             ? { vertical: "bottom", horizontal: isRtl ? "right" : "left" }
//             : { vertical: "center", horizontal: isRtl ? "left" : "right" }
//         }
//         transformOrigin={
//           depth === 1
//             ? { vertical: "top", horizontal: isRtl ? "right" : "left" }
//             : { vertical: "center", horizontal: isRtl ? "right" : "left" }
//         }
//         slotProps={{
//           paper: {
//             onMouseEnter: handleOpenMenu,
//             onMouseLeave: onClose,
//             className: navSectionClasses.dropdown.root,
//           },
//         }}
//         sx={{
//           ...cssVars,
//           [`& .${popoverClasses.paper}`]: {
//             ...(depth === 1 && { pt: 1, ml: -0.75 }),
//           },
//         }}
//       >
//         <NavDropdownPaper
//           className={navSectionClasses.dropdown.paper}
//           sx={slotProps?.dropdown?.paper}
//         >
//           <NavSubList
//             data={data.children}
//             depth={depth}
//             render={render}
//             cssVars={cssVars}
//             slotProps={slotProps}
//             currentRole={currentRole}
//             enabledRootRedirect={enabledRootRedirect}
//           />
//         </NavDropdownPaper>
//       </NavDropdown>
//     );

//   // Hidden item by role
//   if (data.roles && currentRole && !data.roles.includes(currentRole)) {
//     return null;
//   }

//   return (
//     <NavLi disabled={data.disabled}>
//       {renderNavItem()}
//       {/*
//        * TODO: Should be removed in MUI next.
//        * Add `open` condition to disable transition effect on close.
//        * https://github.com/mui/material-ui/issues/43106
//        */}
//       {open && renderDropdown()}
//     </NavLi>
//   );
// }

// // ----------------------------------------------------------------------

// function NavSubList({
//   data,
//   render,
//   cssVars,
//   depth = 0,
//   slotProps,
//   currentRole,
//   enabledRootRedirect,
// }) {
//   return (
//     <NavUl sx={{ gap: 0.5 }}>
//       {data.map((list) => (
//         <NavList
//           key={list.title}
//           data={list}
//           render={render}
//           depth={depth + 1}
//           cssVars={cssVars}
//           slotProps={slotProps}
//           currentRole={currentRole}
//           enabledRootRedirect={enabledRootRedirect}
//         />
//       ))}
//     </NavUl>
//   );
// }
'use client';

import { useEffect, useCallback } from 'react';
import clsx from 'clsx';

import { usePathname } from '@/routes/hooks';
import { isActiveLink, isExternalLink } from 'minimal-shared/utils';

import { NavItem } from './nav-item';

// ------------------------------------------------------

export function NavList({
  data,
  depth = 0,
  render,
  cssVars,
  slotProps,
  currentRole,
  enabledRootRedirect,
}) {
  const pathname = usePathname();

  const isActive = isActiveLink(pathname, data.path, !!data.children);

  const hasChildren = !!data.children?.length;

  // simple hover state (replaces usePopoverHover)
  let timeout;

  const openDropdown = (e) => {
    if (!hasChildren) return;
    clearTimeout(timeout);
    setOpen(true);
  };

  const closeDropdown = () => {
    timeout = setTimeout(() => setOpen(false), 120);
  };

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]);

  const handleOpen = useCallback(() => {
    if (hasChildren) setOpen(true);
  }, [hasChildren]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // role filter
  if (data.roles && currentRole && !data.roles.includes(currentRole)) {
    return null;
  }

  return (
    <li className="relative w-full list-none">
      {/* NAV ITEM */}
      <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        <NavItem
          title={data.title}
          path={data.path}
          icon={data.icon}
          info={data.info}
          caption={data.caption}
          active={isActive}
          open={open}
          disabled={data.disabled}
          depth={depth}
          render={render}
          hasChild={hasChildren}
          externalLink={isExternalLink(data.path)}
          enabledRootRedirect={enabledRootRedirect}
        />
      </div>

      {/* DROPDOWN */}
      {hasChildren && open && (
        <div
          className={clsx(
            'absolute z-50 min-w-[180px]',
            'bg-white dark:bg-gray-900',
            'shadow-lg rounded-md border border-gray-200 dark:border-gray-800',
            'p-2',
            depth === 0
              ? 'top-full left-0 mt-2'
              : 'left-full top-0 ml-2'
          )}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <NavSubList
            data={data.children}
            depth={depth}
            render={render}
            cssVars={cssVars}
            slotProps={slotProps}
            currentRole={currentRole}
            enabledRootRedirect={enabledRootRedirect}
          />
        </div>
      )}
    </li>
  );
}

// ------------------------------------------------------

function NavSubList({
  data,
  render,
  depth = 0,
  slotProps,
  currentRole,
  enabledRootRedirect,
}) {
  return (
    <ul className="flex flex-col gap-1">
      {data.map((item) => (
        <NavList
          key={item.title}
          data={item}
          depth={depth + 1}
          render={render}
          slotProps={slotProps}
          currentRole={currentRole}
          enabledRootRedirect={enabledRootRedirect}
        />
      ))}
    </ul>
  );
}
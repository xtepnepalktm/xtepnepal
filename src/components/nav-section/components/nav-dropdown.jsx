// import { styled } from '@mui/material/styles';
// import Popover, { popoverClasses } from '@mui/material/Popover';

// // ----------------------------------------------------------------------

// export const NavDropdownPaper = styled('div')(({ theme }) => ({
//   minWidth: 180,
//   ...theme.mixins.paperStyles(theme, { dropdown: true }),
// }));

// // ----------------------------------------------------------------------

// export const NavDropdown = styled(Popover)(({ open, theme }) => ({
//   pointerEvents: 'none',
//   [`& .${popoverClasses.paper}`]: {
//     boxShadow: 'none',
//     overflow: 'unset',
//     backdropFilter: 'none',
//     background: 'transparent',
//     padding: theme.spacing(0, 0.75),
//     ...(open && { pointerEvents: 'auto' }),
//   },
// }));
'use client';

import { Fragment } from 'react';
import clsx from 'clsx';

// ------------------------------------------------------
// Dropdown container (replacement for NavDropdownPaper)
// ------------------------------------------------------

export function NavDropdownPaper({ className = '', children }) {
  return (
    <div
      className={clsx(
        'min-w-[180px] ',
        'bg-white/90 dark:bg-gray-900/90',
        'backdrop-blur-md',
        'shadow-none',
        className
      )}
    >
      {children}
    </div>
  );
}

// ------------------------------------------------------
// Dropdown wrapper (replacement for Popover)
// ------------------------------------------------------

export function NavDropdown({
  open,
  anchorRef,
  className = '',
  children,
}) {
  if (!open) return null;

  const rect = anchorRef?.current?.getBoundingClientRect?.();

  return (
    <div
      className={clsx(
        'fixed z-[1300] pointer-events-none',
        className
      )}
      style={{
        top: rect ? rect.bottom + window.scrollY : 0,
        left: rect ? rect.left + window.scrollX : 0,
      }}
    >
      <div className="pointer-events-auto px-3">
        {children}
      </div>
    </div>
  );
}
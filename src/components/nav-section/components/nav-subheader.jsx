// import { mergeClasses } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';
// import ListSubheader from '@mui/material/ListSubheader';

// import { navSectionClasses } from '../styles';
// import { Iconify, iconifyClasses } from '../../iconify';

// // ----------------------------------------------------------------------

// export const NavSubheader = styled(({ open, children, className, ...other }) => (
//   <ListSubheader
//     disableSticky
//     component="div"
//     {...other}
//     className={mergeClasses([navSectionClasses.subheader, className])}
//   >
//     <Iconify
//       width={16}
//       icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
//     />
//     {children}
//   </ListSubheader>
// ))(({ theme }) => ({
//   ...theme.typography.overline,
//   cursor: 'pointer',
//   alignItems: 'center',
//   position: 'relative',
//   gap: theme.spacing(1),
//   display: 'inline-flex',
//   alignSelf: 'flex-start',
//   color: 'var(--nav-subheader-color)',
//   padding: theme.spacing(2, 1, 1, 1.5),
//   fontSize: theme.typography.pxToRem(11),
//   transition: theme.transitions.create(['color', 'padding-left'], {
//     duration: theme.transitions.duration.standard,
//   }),
//   [`& .${iconifyClasses.root}`]: {
//     left: -4,
//     opacity: 0,
//     position: 'absolute',
//     transition: theme.transitions.create(['opacity'], {
//       duration: theme.transitions.duration.standard,
//     }),
//   },
//   '&:hover': {
//     paddingLeft: theme.spacing(2),
//     color: 'var(--nav-subheader-hover-color)',
//     [`& .${iconifyClasses.root}`]: { opacity: 1 },
//   },
// }));
'use client';

import clsx from 'clsx';
import { Iconify } from '../../iconify';

// ------------------------------------------------------

export function NavSubheader({
  open = false,
  children,
  className = '',
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'group relative inline-flex items-center gap-2',
        'cursor-pointer self-start',
        'text-[11px] uppercase font-medium tracking-wide',
        'text-[var(--nav-subheader-color)]',
        'pt-2 pb-1 px-1.5',
        'transition-all duration-200',
        'hover:pl-2 hover:text-[var(--nav-subheader-hover-color)]',
        className
      )}
      {...props}
    >
      {/* ICON */}
      <Iconify
        width={16}
        icon={
          open
            ? 'eva:arrow-ios-downward-fill'
            : 'eva:arrow-ios-forward-fill'
        }
        className={clsx(
          'absolute left-[-4px]',
          'opacity-0 transition-opacity duration-200',
          'group-hover:opacity-100'
        )}
      />

      {/* CONTENT */}
      <span className="relative">{children}</span>
    </div>
  );
}
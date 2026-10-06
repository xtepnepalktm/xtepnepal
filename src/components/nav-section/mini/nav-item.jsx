// import { forwardRef } from 'react';
// import { mergeClasses } from 'minimal-shared/utils';

// import Tooltip from '@mui/material/Tooltip';
// import { styled } from '@mui/material/styles';
// import ButtonBase from '@mui/material/ButtonBase';

// import { Iconify } from '../../iconify';
// import { createNavItem } from '../utils';
// import { navItemStyles, navSectionClasses } from '../styles';

// // ----------------------------------------------------------------------

// export const NavItem = forwardRef((props, ref) => {
//   const {
//     path,
//     icon,
//     info,
//     title,
//     caption,
//     /********/
//     open,
//     active,
//     disabled,
//     /********/
//     depth,
//     render,
//     hasChild,
//     slotProps,
//     className,
//     externalLink,
//     enabledRootRedirect,
//     ...other
//   } = props;

//   const navItem = createNavItem({
//     path,
//     icon,
//     info,
//     depth,
//     render,
//     hasChild,
//     externalLink,
//     enabledRootRedirect,
//   });

//   const ownerState = {
//     open,
//     active,
//     disabled,
//     variant: navItem.rootItem ? 'rootItem' : 'subItem',
//   };

//   return (
//     <ItemRoot
//       ref={ref}
//       aria-label={title}
//       {...ownerState}
//       {...navItem.baseProps}
//       className={mergeClasses([navSectionClasses.item.root, className], {
//         [navSectionClasses.state.open]: open,
//         [navSectionClasses.state.active]: active,
//         [navSectionClasses.state.disabled]: disabled,
//       })}
//       sx={slotProps?.sx}
//       {...other}
//     >
//       {icon && (
//         <ItemIcon {...ownerState} className={navSectionClasses.item.icon} sx={slotProps?.icon}>
//           {navItem.renderIcon}
//         </ItemIcon>
//       )}

//       {title && (
//         <ItemTitle {...ownerState} className={navSectionClasses.item.title} sx={slotProps?.title}>
//           {title}
//         </ItemTitle>
//       )}

//       {caption && (
//         <Tooltip title={caption} arrow placement="right">
//           <ItemCaptionIcon
//             {...ownerState}
//             icon="eva:info-outline"
//             className={navSectionClasses.item.caption}
//             sx={slotProps?.caption}
//           />
//         </Tooltip>
//       )}

//       {info && navItem.subItem && (
//         <ItemInfo {...ownerState} className={navSectionClasses.item.info} sx={slotProps?.info}>
//           {navItem.renderInfo}
//         </ItemInfo>
//       )}

//       {hasChild && (
//         <ItemArrow
//           {...ownerState}
//           icon="eva:arrow-ios-forward-fill"
//           className={navSectionClasses.item.arrow}
//           sx={slotProps?.arrow}
//         />
//       )}
//     </ItemRoot>
//   );
// });

// // ----------------------------------------------------------------------

// const shouldForwardProp = (prop) => !['open', 'active', 'disabled', 'variant', 'sx'].includes(prop);

// /**
//  * @slot root
//  */
// const ItemRoot = styled(ButtonBase, { shouldForwardProp })(({ active, open, theme }) => {
//   const rootItemStyles = {
//     textAlign: 'center',
//     flexDirection: 'column',
//     minHeight: 'var(--nav-item-root-height)',
//     padding: 'var(--nav-item-root-padding)',
//     ...(open && {
//       color: 'var(--nav-item-root-open-color)',
//       backgroundColor: 'var(--nav-item-root-open-bg)',
//     }),
//     ...(active && {
//       color: 'var(--nav-item-root-active-color)',
//       backgroundColor: 'var(--nav-item-root-active-bg)',
//       '&:hover': { backgroundColor: 'var(--nav-item-root-active-hover-bg)' },
//       ...theme.applyStyles('dark', {
//         color: 'var(--nav-item-root-active-color-on-dark)',
//       }),
//     }),
//   };

//   const subItemStyles = {
//     minHeight: 'var(--nav-item-sub-height)',
//     padding: 'var(--nav-item-sub-padding)',
//     color: theme.vars.palette.text.secondary,
//     ...(open && {
//       color: 'var(--nav-item-sub-open-color)',
//       backgroundColor: 'var(--nav-item-sub-open-bg)',
//     }),
//     ...(active && {
//       color: 'var(--nav-item-sub-active-color)',
//       backgroundColor: 'var(--nav-item-sub-active-bg)',
//     }),
//   };

//   return {
//     width: '100%',
//     color: 'var(--nav-item-color)',
//     borderRadius: 'var(--nav-item-radius)',
//     '&:hover': { backgroundColor: 'var(--nav-item-hover-bg)' },
//     variants: [
//       { props: { variant: 'rootItem' }, style: rootItemStyles },
//       { props: { variant: 'subItem' }, style: subItemStyles },
//       { props: { disabled: true }, style: navItemStyles.disabled },
//     ],
//   };
// });

// /**
//  * @slot icon
//  */
// const ItemIcon = styled('span', { shouldForwardProp })(() => ({
//   ...navItemStyles.icon,
//   width: 'var(--nav-icon-size)',
//   height: 'var(--nav-icon-size)',
//   margin: 'var(--nav-icon-root-margin)',
//   variants: [{ props: { variant: 'subItem' }, style: { margin: 'var(--nav-icon-sub-margin)' } }],
// }));

// /**
//  * @slot title
//  */
// const ItemTitle = styled('span', { shouldForwardProp })(({ active, theme }) => ({
//   ...navItemStyles.title(theme),
//   lineHeight: '16px',
//   fontSize: theme.typography.pxToRem(10),
//   fontWeight: theme.typography.fontWeightSemiBold,
//   variants: [
//     {
//       props: { variant: 'rootItem' },
//       style: { ...(active && { fontWeight: theme.typography.fontWeightBold }) },
//     },
//     {
//       props: { variant: 'subItem' },
//       style: {
//         ...theme.typography.body2,
//         fontWeight: theme.typography.fontWeightMedium,
//         ...(active && { fontWeight: theme.typography.fontWeightSemiBold }),
//       },
//     },
//   ],
// }));

// /**
//  * @slot caption icon
//  */
// const ItemCaptionIcon = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.captionIcon,
//   color: 'var(--nav-item-caption-color)',
//   variants: [{ props: { variant: 'rootItem' }, style: { top: 11, left: 6, position: 'absolute' } }],
// }));

// /**
//  * @slot info
//  */
// const ItemInfo = styled('span', { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.info,
// }));

// /**
//  * @slot arrow
//  */
// const ItemArrow = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.arrow(theme),
//   variants: [
//     {
//       props: { variant: 'rootItem' },
//       style: {
//         margin: 0,
//         top: 11,
//         right: 6,
//         position: 'absolute',
//       },
//     },
//     { props: { variant: 'subItem' }, style: { marginRight: theme.spacing(-0.5) } },
//   ],
// }));
'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';

import { Iconify } from '../../iconify';
import { createNavItem } from '../utils';

// ------------------------------------------------------

export const NavItem = forwardRef(function NavItem(props, ref) {
  const {
    path,
    icon,
    info,
    title,
    caption,
    open,
    active,
    disabled,
    depth,
    render,
    hasChild,
    className,
    externalLink,
    enabledRootRedirect,
    ...other
  } = props;

  const navItem = createNavItem({
    path,
    icon,
    info,
    depth,
    render,
    hasChild,
    externalLink,
    enabledRootRedirect,
  });

  const isRoot = navItem.rootItem;
  const variant = isRoot ? 'root' : 'sub';

  return (
    <button
      ref={ref}
      aria-label={title}
      disabled={disabled}
      {...navItem.baseProps}
      className={clsx(
        'relative w-full flex flex-col items-center justify-center',
        'transition-colors duration-200',
        'rounded-[var(--nav-item-radius)]',
        'hover:bg-[var(--nav-item-hover-bg)]',
        'text-[var(--nav-item-color)]',

        // ROOT ITEM (vertical centered)
        variant === 'root' &&
        'min-h-[var(--nav-item-root-height)] px-[var(--nav-item-root-padding)] text-center',

        variant === 'root' &&
        open &&
        'bg-[var(--nav-item-root-open-bg)] text-[var(--nav-item-root-open-color)]',

        variant === 'root' &&
        active &&
        'bg-[var(--nav-item-root-active-bg)] text-[var(--nav-item-root-active-color)]',

        variant === 'root' &&
        active &&
        'hover:bg-[var(--nav-item-root-active-hover-bg)]',

        // SUB ITEM
        variant === 'sub' &&
        'flex-row items-center justify-start text-left px-[var(--nav-item-sub-padding)] min-h-[var(--nav-item-sub-height)] text-gray-500',

        variant === 'sub' &&
        open &&
        'bg-[var(--nav-item-sub-open-bg)] text-[var(--nav-item-sub-open-color)]',

        variant === 'sub' &&
        active &&
        'bg-[var(--nav-item-sub-active-bg)] text-[var(--nav-item-sub-active-color)]',

        disabled && 'opacity-50 pointer-events-none',

        className
      )}
      {...other}
    >
      {/* ICON */}
      {icon && (
        <span
          className={clsx(
            'flex items-center justify-center',
            'w-[var(--nav-icon-size)] h-[var(--nav-icon-size)]',
            variant === 'root'
              ? 'mb-1'
              : 'mr-[var(--nav-icon-sub-margin)]'
          )}
        >
          {navItem.renderIcon}
        </span>
      )}

      {/* TITLE */}
      {title && (
        <span
          className={clsx(
            'text-[12px] leading-[16px]',
            'font-semibold',
            variant === 'sub' && 'text-sm font-medium',
            active &&
            variant === 'root' &&
            'font-bold',
            active &&
            variant === 'sub' &&
            'font-semibold'
          )}
        >
          {title}
        </span>
      )}

      {/* CAPTION (TAILWIND TOOLTIP) */}
      {caption && (
        <div className="relative group">
          <Iconify
            width={16}
            icon="eva:info-outline"
            className={clsx(
              'text-gray-400',
              variant === 'root' && 'absolute top-[11px] left-[6px]'
            )}
          />

          {/* Tooltip */}
          <div
            className="
              absolute left-1/2 -translate-x-1/2 bottom-full mb-2
              hidden group-hover:block
              opacity-0 group-hover:opacity-100
              transition-opacity duration-150
              whitespace-nowrap
              rounded-md bg-black px-2 py-1 text-xs text-white
              z-50
            "
          >
            {caption}
          </div>
        </div>
      )}

      {/* INFO (sub only) */}
      {info && navItem.subItem && (
        <span className="ml-auto text-xs text-gray-400">
          {navItem.renderInfo}
        </span>
      )}

      {/* ARROW */}
      {hasChild && (
        <span
          className={clsx(
            'ml-auto transition-transform duration-200',
            variant === 'root' &&
            'absolute top-[11px] right-[6px]',
            variant === 'sub' && '-mr-1'
          )}
        >
          <Iconify
            width={18}
            icon="eva:arrow-ios-forward-fill"
          />
        </span>
      )}
    </button>
  );
});
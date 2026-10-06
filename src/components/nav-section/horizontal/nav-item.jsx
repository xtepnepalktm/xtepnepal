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
//         <Tooltip title={caption} arrow>
//           <ItemCaptionIcon
//             {...ownerState}
//             icon="eva:info-outline"
//             className={navSectionClasses.item.caption}
//             sx={slotProps?.caption}
//           />
//         </Tooltip>
//       )}

//       {info && (
//         <ItemInfo {...ownerState} className={navSectionClasses.item.info} sx={slotProps?.info}>
//           {navItem.renderInfo}
//         </ItemInfo>
//       )}

//       {hasChild && (
//         <ItemArrow
//           {...ownerState}
//           icon={navItem.subItem ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-downward-fill'}
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
//     padding: 'var(--nav-item-root-padding)',
//     minHeight: 'var(--nav-item-root-height)',
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
//     padding: 'var(--nav-item-sub-padding)',
//     minHeight: 'var(--nav-item-sub-height)',
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
//     flexShrink: 0,
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
// const ItemTitle = styled('span', { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.title(theme),
//   ...theme.typography.body2,
//   fontWeight: theme.typography.fontWeightMedium,
//   variants: [
//     { props: { active: true }, style: { fontWeight: theme.typography.fontWeightSemiBold } },
//   ],
// }));

// /**
//  * @slot caption icon
//  */
// const ItemCaptionIcon = styled(Iconify, { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.captionIcon,
//   color: 'var(--nav-item-caption-color)',
//   variants: [{ props: { variant: 'rootItem' }, style: { marginLeft: theme.spacing(0.75) } }],
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
//   variants: [{ props: { variant: 'subItem' }, style: { marginRight: theme.spacing(-0.5) } }],
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
        'w-full flex items-center gap-2 flex-shrink-0',
        'rounded-[var(--nav-item-radius)]',
        'transition-colors duration-200',
        'hover:bg-[var(--nav-item-hover-bg)]',
        'text-[var(--nav-item-color)]',

        // ROOT ITEM
        variant === 'root' &&
        'py-[var(--nav-item-root-padding)] min-h-[var(--nav-item-root-height)]',

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
        'py-[var(--nav-item-sub-padding)] min-h-[var(--nav-item-sub-height)] text-gray-500',

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
            variant === 'sub'
              ? 'ml-[var(--nav-icon-sub-margin)]'
              : 'ml-[var(--nav-icon-root-margin)]'
          )}
        >
          {navItem.renderIcon}
        </span>
      )}

      {/* TITLE */}
      {title && (
        <span
          className={clsx(
            'text-sm font-medium',
            active && 'font-semibold'
          )}
        >
          {title}
        </span>
      )}

      {/* CAPTION (TAILWIND TOOLTIP) */}
      {caption && (
        <div className="relative group ml-auto flex items-center">
          <Iconify
            width={16}
            icon="eva:info-outline"
            className="text-gray-400"
          />

          {/* Tooltip */}
          <div
            className="
              absolute left-1/2 -translate-x-1/2 bottom-full mb-2
              hidden group-hover:block
              whitespace-nowrap
              rounded-md bg-black px-2 py-1 text-xs text-white
              shadow-lg z-50
              opacity-0 group-hover:opacity-100
              transition-opacity duration-150
            "
          >
            {caption}
          </div>
        </div>
      )}

      {/* INFO */}
      {info && (
        <span className="ml-auto text-xs text-gray-400">
          {navItem.renderInfo}
        </span>
      )}

      {/* ARROW */}
      {hasChild && (
        <span
          className={clsx(
            'ml-auto transition-transform duration-200',
            variant === 'sub' && '-mr-1'
          )}
        >
          <Iconify
            width={18}
            icon={
              navItem.subItem
                ? 'eva:arrow-ios-forward-fill'
                : 'eva:arrow-ios-downward-fill'
            }
          />
        </span>
      )}
    </button>
  );
});
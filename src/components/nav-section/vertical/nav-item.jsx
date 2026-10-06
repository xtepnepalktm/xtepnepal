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
//         <ItemTexts {...ownerState} className={navSectionClasses.item.texts} sx={slotProps?.texts}>
//           <ItemTitle {...ownerState} className={navSectionClasses.item.title} sx={slotProps?.title}>
//             {title}
//           </ItemTitle>

//           {caption && (
//             <Tooltip title={caption} placement="top-start">
//               <ItemCaptionText
//                 {...ownerState}
//                 className={navSectionClasses.item.caption}
//                 sx={slotProps?.caption}
//               >
//                 {caption}
//               </ItemCaptionText>
//             </Tooltip>
//           )}
//         </ItemTexts>
//       )}

//       {info && (
//         <ItemInfo {...ownerState} className={navSectionClasses.item.info} sx={slotProps?.info}>
//           {navItem.renderInfo}
//         </ItemInfo>
//       )}

//       {hasChild && (
//         <ItemArrow
//           {...ownerState}
//           icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
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
//   const bulletSvg = `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E"`;

//   const bulletStyles = {
//     left: 0,
//     content: '""',
//     position: 'absolute',
//     width: 'var(--nav-bullet-size)',
//     height: 'var(--nav-bullet-size)',
//     backgroundColor: 'var(--nav-bullet-light-color)',
//     mask: `url(${bulletSvg}) no-repeat 50% 50%/100% auto`,
//     WebkitMask: `url(${bulletSvg}) no-repeat 50% 50%/100% auto`,
//     transform:
//       theme.direction === 'rtl'
//         ? 'translate(calc(var(--nav-bullet-size) * 1), calc(var(--nav-bullet-size) * -0.4)) scaleX(-1)'
//         : 'translate(calc(var(--nav-bullet-size) * -1), calc(var(--nav-bullet-size) * -0.4))',
//     ...theme.applyStyles('dark', {
//       backgroundColor: 'var(--nav-bullet-dark-color)',
//     }),
//   };

//   const rootItemStyles = {
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
//     minHeight: 'var(--nav-item-sub-height)',
//     '&::before': bulletStyles,
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
//     paddingTop: 'var(--nav-item-pt)',
//     paddingLeft: 'var(--nav-item-pl)',
//     paddingRight: 'var(--nav-item-pr)',
//     paddingBottom: 'var(--nav-item-pb)',
//     borderRadius: 'var(--nav-item-radius)',
//     color: 'var(--nav-item-color)',
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
//   margin: 'var(--nav-icon-margin)',
// }));

// /**
//  * @slot texts
//  */
// const ItemTexts = styled('span', { shouldForwardProp })(() => ({
//   ...navItemStyles.texts,
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
//  * @slot caption text
//  */
// const ItemCaptionText = styled('span', { shouldForwardProp })(({ theme }) => ({
//   ...navItemStyles.captionText(theme),
//   color: 'var(--nav-item-caption-color)',
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
    externalLink,
    enabledRootRedirect,
    className,
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
      disabled={disabled}
      {...navItem.baseProps}
      className={clsx(
        'relative w-full text-left transition-colors duration-200',
        'rounded-[var(--nav-item-radius)]',
        'text-[var(--nav-item-color)]',
        'hover:bg-[var(--nav-item-hover-bg)]',

        // padding system
        'pt-[var(--nav-item-pt)] pr-[var(--nav-item-pr)] pb-[var(--nav-item-pb)] pl-[var(--nav-item-pl)]',

        // ROOT
        variant === 'root' &&
        'min-h-[var(--nav-item-root-height)]',

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
        'min-h-[var(--nav-item-sub-height)] pl-8',

        variant === 'sub' &&
        open &&
        'bg-[var(--nav-item-sub-open-bg)] text-[var(--nav-item-sub-open-color)]',

        variant === 'sub' &&
        active &&
        'bg-[var(--nav-item-sub-active-bg)] text-[var(--nav-item-sub-active-color)]',

        // disabled
        disabled && 'opacity-50 pointer-events-none',

        className
      )}
      {...other}
    >
      {/* ICON */}
      {icon && (
        <span
          className="inline-flex items-center justify-center
          w-[var(--nav-icon-size)] h-[var(--nav-icon-size)]
          mr-[var(--nav-icon-margin)]"
        >
          {navItem.renderIcon}
        </span>
      )}

      {/* TEXT BLOCK */}
      {title && (
        <span className="inline-flex flex-col relative">
          {/* TITLE */}
          <span
            className={clsx(
              'text-sm font-medium',
              active && 'font-semibold'
            )}
          >
            {title}
          </span>

          {/* CAPTION + TOOLTIP */}
          {caption && (
            <span className="relative group w-fit">
              <span className="text-xs text-[var(--nav-item-caption-color)] cursor-help">
                {caption}
              </span>

              {/* Tooltip */}
              <div
                className="
                  absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                  hidden group-hover:block
                  bg-black text-white text-xs px-2 py-1 rounded-md
                  whitespace-nowrap z-50
                  opacity-0 group-hover:opacity-100
                  transition-opacity
                "
              >
                {caption}
              </div>
            </span>
          )}
        </span>
      )}

      {/* INFO */}
      {info && (
        <span className="ml-auto text-xs text-gray-400">
          {navItem.renderInfo}
        </span>
      )}

      {/* ARROW */}
      {hasChild && (
        <span className="ml-auto">
          <Iconify
            width={18}
            icon={open
              ? 'eva:arrow-ios-downward-fill'
              : 'eva:arrow-ios-forward-fill'}
          />
        </span>
      )}

      {/* BULLET (sub items only) */}
      {variant === 'sub' && (
        <span
          className="
            absolute left-0 top-1/2 -translate-y-1/2
            w-2 h-2
            bg-[var(--nav-bullet-light-color)]
            dark:bg-[var(--nav-bullet-dark-color)]
            rounded-full
          "
        />
      )}
    </button>
  );
});
// import { varAlpha } from 'minimal-shared/utils';

// import SvgIcon from '@mui/material/SvgIcon';
// import { chipClasses } from '@mui/material/Chip';

// // ----------------------------------------------------------------------

// /**
//  * Icons
//  * https://icon-sets.iconify.design/solar/close-circle-bold
//  */
// const ChipDeleteIcon = (props) => (
//   <SvgIcon {...props}>
//     <path
//       fill="currentColor"
//       fillRule="evenodd"
//       d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
//       clipRule="evenodd"
//     />
//   </SvgIcon>
// );

// // ----------------------------------------------------------------------

// const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// function styleColors(ownerState, styles) {
//   const outputStyle = COLORS.reduce((acc, color) => {
//     if (!ownerState.disabled && ownerState.color === color) {
//       acc = styles(color);
//     }
//     return acc;
//   }, {});

//   return outputStyle;
// }

// const softVariant = {
//   colors: COLORS.map((color) => ({
//     props: ({ ownerState }) =>
//       !ownerState.disabled && ownerState.variant === 'soft' && ownerState.color === color,
//     style: ({ theme }) => ({
//       color: theme.vars.palette[color].dark,
//       backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.16),
//       '&:hover': {
//         backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.32),
//       },
//       ...theme.applyStyles('dark', {
//         color: theme.vars.palette[color].light,
//       }),
//     }),
//   })),
//   inheritColor: [
//     {
//       props: ({ ownerState }) => ownerState.variant === 'soft' && ownerState.color === 'default',
//       style: ({ theme }) => ({
//         backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
//         '&:hover': {
//           backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.32),
//         },
//       }),
//     },
//   ],
// };

// // ----------------------------------------------------------------------

// const MuiChip = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { deleteIcon: <ChipDeleteIcon /> },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ ownerState, theme }) => {
//       const styled = {
//         colors: styleColors(ownerState, (color) => ({
//           [`& .${chipClasses.avatar}`]: {
//             color: theme.vars.palette[color].lighter,
//             backgroundColor: theme.vars.palette[color].dark,
//           },
//         })),
//         disabled: {
//           [`&.${chipClasses.disabled}`]: {
//             opacity: 1,
//             [`& .${chipClasses.avatar}`]: {
//               color: theme.vars.palette.action.disabled,
//               backgroundColor: theme.vars.palette.action.disabledBackground,
//             },
//             ...(ownerState.variant === 'outlined' && {
//               color: theme.vars.palette.action.disabled,
//               borderColor: theme.vars.palette.action.disabledBackground,
//             }),
//             ...(['filled', 'soft'].includes(ownerState.variant) && {
//               color: theme.vars.palette.action.disabled,
//               backgroundColor: theme.vars.palette.action.disabledBackground,
//             }),
//           },
//         },
//       };

//       return {
//         variants: [
//           /**
//            * @variant soft
//            */
//           softVariant.inheritColor,
//           softVariant.colors,
//         ].flat(),
//         ...styled.colors,
//         ...styled.disabled,
//       };
//     },
//     label: ({ theme }) => ({ fontWeight: theme.typography.fontWeightMedium }),
//     icon: { color: 'currentColor' },
//     deleteIcon: {
//       opacity: 0.48,
//       color: 'currentColor',
//       '&:hover': { opacity: 1, color: 'currentColor' },
//     },
//     /**
//      * @sizes
//      */
//     sizeMedium: ({ theme }) => ({
//       borderRadius: theme.shape.borderRadius * 1.25,
//     }),
//     sizeSmall: ({ theme }) => ({ borderRadius: theme.shape.borderRadius }),
//     /**
//      * @variant filled
//      */
//     filled: ({ ownerState, theme }) => {
//       const styled = {
//         defaultColor: {
//           ...(!ownerState.disabled &&
//             ownerState.color === 'default' && {
//               color: theme.vars.palette.common.white,
//               backgroundColor: theme.vars.palette.text.primary,
//               [`& .${chipClasses.avatar}`]: {
//                 color: theme.vars.palette.text.primary,
//               },
//               '&:hover': { backgroundColor: theme.vars.palette.grey[700] },
//               ...theme.applyStyles('dark', {
//                 color: theme.vars.palette.grey[800],
//                 '&:hover': { backgroundColor: theme.vars.palette.grey[100] },
//               }),
//             }),
//         },
//       };
//       return { ...styled.defaultColor };
//     },
//     /**
//      * @variant outlined
//      */
//     outlined: ({ ownerState, theme }) => {
//       const styled = {
//         defaultColor: {
//           ...(!ownerState.disabled &&
//             ownerState.color === 'default' && {
//               borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.32),
//             }),
//         },
//       };
//       return { ...styled.defaultColor };
//     },
//   },
// };

// // ----------------------------------------------------------------------

// export const chip = { MuiChip };
"use client";

import { useState } from "react";

// ----------------------------------------------------------------------
// Delete Icon
// ----------------------------------------------------------------------

const ChipDeleteIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`h-4 w-4 fill-current ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
      clipRule="evenodd"
    />
  </svg>
);

// ----------------------------------------------------------------------
// Color Styles
// ----------------------------------------------------------------------

export const chipColorStyles = {
  primary: {
    filled: `
            bg-blue-600
            text-white
            hover:bg-blue-700
        `,
    soft: `
            bg-blue-500/15
            text-blue-900
            hover:bg-blue-500/30
        `,
    outlined: `
            border
            border-blue-500/50
            text-blue-600
        `,
    avatar: `
            bg-blue-900
            text-blue-100
        `,
  },

  secondary: {
    filled: `
            bg-purple-600
            text-white
            hover:bg-purple-700
        `,
    soft: `
            bg-purple-500/15
            text-purple-900
            hover:bg-purple-500/30
        `,
    outlined: `
            border
            border-purple-500/50
            text-purple-600
        `,
    avatar: `
            bg-purple-900
            text-purple-100
        `,
  },

  success: {
    filled: `
            bg-emerald-600
            text-white
            hover:bg-emerald-700
        `,
    soft: `
            bg-emerald-500/15
            text-emerald-900
            hover:bg-emerald-500/30
        `,
    outlined: `
            border
            border-emerald-500/50
            text-emerald-600
        `,
    avatar: `
            bg-emerald-900
            text-emerald-100
        `,
  },

  warning: {
    filled: `
            bg-amber-500
            text-white
            hover:bg-amber-600
        `,
    soft: `
            bg-amber-500/15
            text-amber-900
            hover:bg-amber-500/30
        `,
    outlined: `
            border
            border-amber-500/50
            text-amber-600
        `,
    avatar: `
            bg-amber-900
            text-amber-100
        `,
  },

  error: {
    filled: `
            bg-red-600
            text-white
            hover:bg-red-700
        `,
    soft: `
            bg-red-500/15
            text-red-900
            hover:bg-red-500/30
        `,
    outlined: `
            border
            border-red-500/50
            text-red-600
        `,
    avatar: `
            bg-red-900
            text-red-100
        `,
  },

  default: {
    filled: `
            bg-black
            text-white
            hover:bg-gray-800
            dark:bg-white
            dark:text-black
        `,
    soft: `
            bg-gray-500/15
            text-gray-800
            hover:bg-gray-500/30
        `,
    outlined: `
            border
            border-gray-400/40
            text-gray-700
        `,
    avatar: `
            bg-gray-700
            text-white
        `,
  },
};

// ----------------------------------------------------------------------
// Base Styles
// ----------------------------------------------------------------------

export const chipStyles = {
  root: `
        inline-flex
        items-center
        gap-2
        transition-all
        duration-200
        font-medium
        select-none
    `,

  label: `
        font-medium
    `,

  icon: `
        text-current
    `,

  deleteIcon: `
        text-current
        opacity-50
        transition-opacity
        duration-200
        hover:opacity-100
    `,

  disabled: `
        pointer-events-none
        opacity-100
        bg-gray-200
        text-gray-400
        border-gray-200
    `,

  sizeMedium: `
        
        px-3
        py-1.5
        text-sm
    `,

  sizeSmall: `
        
        px-2
        py-1
        text-xs
    `,

  avatar: `
        flex
        h-6
        w-6
        items-center
        justify-center
        rounded-full
        text-xs
        font-semibold
    `,
};

// ----------------------------------------------------------------------
// Helper Function
// ----------------------------------------------------------------------

export const getChipClass = ({
  variant = "filled",
  color = "default",
  size = "medium",
  disabled = false,
}) => {
  const classes = [
    chipStyles.root,
    size === "small"
      ? chipStyles.sizeSmall
      : chipStyles.sizeMedium,
  ];

  if (disabled) {
    classes.push(chipStyles.disabled);
  } else {
    classes.push(
      chipColorStyles[color][variant]
    );
  }

  return classes.join(" ");
};

// ----------------------------------------------------------------------
// Chip Component
// ----------------------------------------------------------------------

export function Chip({
  label,
  color = "default",
  variant = "filled",
  size = "medium",
  disabled = false,
  avatar,
  onDelete,
}) {
  return (
    <div
      className={getChipClass({
        color,
        variant,
        size,
        disabled,
      })}
    >
      {/* Avatar */}
      {avatar && (
        <div
          className={`
                        ${chipStyles.avatar}
                        ${chipColorStyles[color].avatar}
                    `}
        >
          {avatar}
        </div>
      )}

      {/* Label */}
      <span className={chipStyles.label}>
        {label}
      </span>

      {/* Delete */}
      {onDelete && !disabled && (
        <button
          onClick={onDelete}
          className={chipStyles.deleteIcon}
        >
          <ChipDeleteIcon />
        </button>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// Example
// ----------------------------------------------------------------------

export function ChipExample() {
  return (
    <div className="flex flex-wrap gap-4">
      <Chip
        label="Primary"
        color="primary"
        variant="soft"
      />

      <Chip
        label="Success"
        color="success"
        variant="filled"
        avatar="S"
      />

      <Chip
        label="Outlined"
        color="warning"
        variant="outlined"
      />

      <Chip
        label="Delete"
        color="error"
        variant="soft"
        onDelete={() => { }}
      />
    </div>
  );
}
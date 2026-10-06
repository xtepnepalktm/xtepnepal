// import { varAlpha } from 'minimal-shared/utils';

// import { fabClasses } from '@mui/material/Fab';

// // ----------------------------------------------------------------------

// const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// const DEFAULT_COLORS = ['default', 'inherit'];
// const EXTENDED_VARIANT = ['extended', 'outlinedExtended', 'softExtended'];
// const FILLED_VARIANT = ['circular', 'extended'];
// const OUTLINED_VARIANT = ['outlined', 'outlinedExtended'];
// const SOFT_VARIANT = ['soft', 'softExtended'];

// const filledVariant = {
//   colors: COLORS.map((color) => ({
//     props: ({ ownerState }) =>
//       !ownerState.disabled &&
//       FILLED_VARIANT.includes(ownerState.variant) &&
//       ownerState.color === color,
//     style: ({ theme }) => ({
//       boxShadow: theme.vars.customShadows[color],
//       '&:hover': { boxShadow: 'none' },
//     }),
//   })),
//   base: [
//     {
//       props: ({ ownerState }) =>
//         FILLED_VARIANT.includes(ownerState.variant) && DEFAULT_COLORS.includes(ownerState.color),
//       style: ({ theme }) => ({
//         boxShadow: theme.vars.customShadows.z8,
//         /**
//          * @color default
//          */
//         color: theme.vars.palette.grey[800],
//         backgroundColor: theme.vars.palette.grey[300],
//         '&:hover': {
//           boxShadow: 'none',
//           backgroundColor: theme.vars.palette.grey[400],
//         },
//         /**
//          * @color inherit
//          */
//         [`&.${fabClasses.colorInherit}`]: {
//           color: theme.vars.palette.common.white,
//           backgroundColor: theme.vars.palette.text.primary,
//           '&:hover': { backgroundColor: theme.vars.palette.grey[700] },
//           ...theme.applyStyles('dark', {
//             color: theme.vars.palette.grey[800],
//             '&:hover': { backgroundColor: theme.vars.palette.grey[400] },
//           }),
//         },
//       }),
//     },
//   ],
// };

// const outlinedVariant = {
//   colors: COLORS.map((color) => ({
//     props: ({ ownerState }) =>
//       !ownerState.disabled &&
//       OUTLINED_VARIANT.includes(ownerState.variant) &&
//       ownerState.color === color,
//     style: ({ theme }) => ({
//       color: theme.vars.palette[color].main,
//       border: `solid 1px ${varAlpha(theme.vars.palette[color].mainChannel, 0.48)}`,
//       '&:hover': {
//         backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.08),
//       },
//     }),
//   })),
//   base: [
//     {
//       props: ({ ownerState }) => OUTLINED_VARIANT.includes(ownerState.variant),
//       style: ({ theme }) => ({
//         boxShadow: 'none',
//         backgroundColor: 'transparent',
//         color: theme.vars.palette.text.secondary,
//         border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
//         '&:hover': {
//           borderColor: 'currentColor',
//           boxShadow: '0 0 0 0.75px currentColor',
//           backgroundColor: theme.vars.palette.action.hover,
//         },
//         [`&.${fabClasses.colorInherit}`]: {
//           color: theme.vars.palette.text.primary,
//         },
//         [`&.${fabClasses.disabled}`]: {
//           backgroundColor: 'transparent',
//           border: `1px solid ${theme.vars.palette.action.disabledBackground}`,
//         },
//       }),
//     },
//   ],
// };

// const softVariant = {
//   colors: COLORS.map((color) => ({
//     props: ({ ownerState }) =>
//       !ownerState.disabled &&
//       SOFT_VARIANT.includes(ownerState.variant) &&
//       ownerState.color === color,
//     style: ({ theme }) => ({
//       boxShadow: 'none',
//       color: theme.vars.palette[color].dark,
//       backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.16),
//       '&:hover': {
//         boxShadow: 'none',
//         backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.32),
//       },
//       ...theme.applyStyles('dark', {
//         color: theme.vars.palette[color].light,
//       }),
//     }),
//   })),
//   base: [
//     {
//       props: ({ ownerState }) =>
//         SOFT_VARIANT.includes(ownerState.variant) && DEFAULT_COLORS.includes(ownerState.color),
//       style: ({ theme }) => ({
//         /**
//          * @color default
//          */
//         boxShadow: 'none',
//         color: theme.vars.palette.grey[800],
//         backgroundColor: theme.vars.palette.grey[300],
//         '&:hover': {
//           boxShadow: 'none',
//           backgroundColor: theme.vars.palette.grey[400],
//         },
//         /**
//          * @color inherit
//          */
//         [`&.${fabClasses.colorInherit}`]: {
//           color: theme.vars.palette.text.primary,
//           backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
//           '&:hover': {
//             backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
//           },
//         },
//       }),
//     },
//   ],
// };

// const sizes = [
//   {
//     props: ({ ownerState }) => EXTENDED_VARIANT.includes(ownerState.variant),
//     style: ({ theme }) => ({
//       height: 48,
//       width: 'auto',
//       minHeight: 48,
//       borderRadius: 48 / 2,
//       gap: theme.spacing(1),
//       padding: theme.spacing(0, 2),
//       [`&.${fabClasses.sizeSmall}`]: {
//         height: 34,
//         minHeight: 34,
//         borderRadius: 34 / 2,
//         gap: theme.spacing(0.5),
//         padding: theme.spacing(0, 1),
//       },
//       [`&.${fabClasses.sizeMedium}`]: {
//         height: 40,
//         minHeight: 40,
//         borderRadius: 40 / 2,
//       },
//     }),
//   },
// ];

// const MuiFab = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { color: 'primary' },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: {
//       variants: [
//         /**
//          * @variant filled
//          */
//         filledVariant.base,
//         filledVariant.colors,
//         /**
//          * @variant outlined
//          */
//         outlinedVariant.base,
//         outlinedVariant.colors,
//         /**
//          * @variant soft
//          */
//         softVariant.base,
//         softVariant.colors,
//         /**
//          * @sizes
//          */
//         sizes,
//       ].flat(),
//     },
//   },
// };

// // ----------------------------------------------------------------------

// export const fab = { MuiFab };
// ----------------------------------------------------------------------
// Tailwind Version of MUI FAB
// ----------------------------------------------------------------------

export const FAB_COLORS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
];

// ----------------------------------------------------------------------
// Base Styles
// ----------------------------------------------------------------------

export const fabStyles = {
  base: `
        inline-flex
        items-center
        justify-center
        rounded-full
        font-medium
        transition-all
        duration-200
        select-none
        outline-none
        disabled:pointer-events-none
        disabled:opacity-50
    `,

  circular: `
        h-14
        w-14
    `,

  extended: `
        min-h-12
        h-12
        gap-2
        rounded-full
        px-4
    `,

  extendedSmall: `
        min-h-[34px]
        h-[34px]
        gap-1
        px-3
        text-sm
    `,

  extendedMedium: `
        min-h-10
        h-10
        px-4
    `,
};

// ----------------------------------------------------------------------
// Filled Variant
// ----------------------------------------------------------------------

export const filledFabStyles = {
  primary: `
        bg-blue-600
        text-white
        shadow-lg
        hover:shadow-none
    `,

  secondary: `
        bg-purple-600
        text-white
        shadow-lg
        hover:shadow-none
    `,

  info: `
        bg-cyan-600
        text-white
        shadow-lg
        hover:shadow-none
    `,

  success: `
        bg-emerald-600
        text-white
        shadow-lg
        hover:shadow-none
    `,

  warning: `
        bg-amber-500
        text-white
        shadow-lg
        hover:shadow-none
    `,

  error: `
        bg-red-600
        text-white
        shadow-lg
        hover:shadow-none
    `,

  default: `
        bg-gray-300
        text-gray-800
        shadow-xl
        hover:bg-gray-400
        hover:shadow-none
    `,

  inherit: `
        bg-black
        text-white
        shadow-xl
        hover:bg-gray-700
        hover:shadow-none
        dark:bg-white
        dark:text-gray-800
        dark:hover:bg-gray-300
    `,
};

// ----------------------------------------------------------------------
// Outlined Variant
// ----------------------------------------------------------------------

export const outlinedFabStyles = {
  base: `
        border
        border-gray-300
        bg-transparent
        text-gray-600
        shadow-none
        hover:border-current
        hover:bg-gray-100
    `,

  primary: `
        border-blue-500/50
        text-blue-600
        hover:bg-blue-500/10
    `,

  secondary: `
        border-purple-500/50
        text-purple-600
        hover:bg-purple-500/10
    `,

  info: `
        border-cyan-500/50
        text-cyan-600
        hover:bg-cyan-500/10
    `,

  success: `
        border-emerald-500/50
        text-emerald-600
        hover:bg-emerald-500/10
    `,

  warning: `
        border-amber-500/50
        text-amber-600
        hover:bg-amber-500/10
    `,

  error: `
        border-red-500/50
        text-red-600
        hover:bg-red-500/10
    `,

  inherit: `
        text-black
    `,

  disabled: `
        border-gray-200
        bg-transparent
    `,
};

// ----------------------------------------------------------------------
// Soft Variant
// ----------------------------------------------------------------------

export const softFabStyles = {
  primary: `
        bg-blue-500/15
        text-blue-900
        shadow-none
        hover:bg-blue-500/30
    `,

  secondary: `
        bg-purple-500/15
        text-purple-900
        shadow-none
        hover:bg-purple-500/30
    `,

  info: `
        bg-cyan-500/15
        text-cyan-900
        shadow-none
        hover:bg-cyan-500/30
    `,

  success: `
        bg-emerald-500/15
        text-emerald-900
        shadow-none
        hover:bg-emerald-500/30
    `,

  warning: `
        bg-amber-500/15
        text-amber-900
        shadow-none
        hover:bg-amber-500/30
    `,

  error: `
        bg-red-500/15
        text-red-900
        shadow-none
        hover:bg-red-500/30
    `,

  default: `
        bg-gray-300
        text-gray-800
        shadow-none
        hover:bg-gray-400
    `,

  inherit: `
        bg-gray-500/10
        text-black
        hover:bg-gray-500/25
    `,
};

// ----------------------------------------------------------------------
// Helper Function
// ----------------------------------------------------------------------

export const getFabClass = ({
  variant = "circular",
  color = "primary",
  size = "large",
}) => {
  let classes = [fabStyles.base];

  // Variant size
  if (
    ["extended", "outlinedExtended", "softExtended"].includes(
      variant
    )
  ) {
    classes.push(fabStyles.extended);

    if (size === "small") {
      classes.push(fabStyles.extendedSmall);
    }

    if (size === "medium") {
      classes.push(fabStyles.extendedMedium);
    }
  } else {
    classes.push(fabStyles.circular);
  }

  // Filled
  if (
    ["circular", "extended"].includes(variant)
  ) {
    classes.push(
      filledFabStyles[color] ||
      filledFabStyles.default
    );
  }

  // Outlined
  if (
    ["outlined", "outlinedExtended"].includes(
      variant
    )
  ) {
    classes.push(outlinedFabStyles.base);

    classes.push(
      outlinedFabStyles[color] ||
      outlinedFabStyles.default
    );
  }

  // Soft
  if (
    ["soft", "softExtended"].includes(
      variant
    )
  ) {
    classes.push(
      softFabStyles[color] ||
      softFabStyles.default
    );
  }

  return classes.join(" ");
};
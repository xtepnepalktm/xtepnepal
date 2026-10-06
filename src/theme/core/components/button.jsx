// import { varAlpha } from 'minimal-shared/utils';

// import { buttonClasses } from '@mui/material/Button';
// import { loadingButtonClasses } from '@mui/lab/LoadingButton';

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

// // ----------------------------------------------------------------------

// const MuiButtonBase = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: ({ theme }) => ({ fontFamily: theme.typography.fontFamily }),
//   },
// };

// // ----------------------------------------------------------------------

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
//   base: [
//     {
//       props: ({ ownerState }) => ownerState.variant === 'soft',
//       style: ({ theme }) => ({
//         backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
//         '&:hover': {
//           backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
//         },
//         [`&.${buttonClasses.disabled}`]: {
//           backgroundColor: theme.vars.palette.action.disabledBackground,
//         },
//         [`& .${loadingButtonClasses.loadingIndicatorStart}`]: { left: 14 },
//         [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: { right: 14 },
//         [`&.${buttonClasses.sizeSmall}`]: {
//           [`& .${loadingButtonClasses.loadingIndicatorStart}`]: { left: 10 },
//           [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: { right: 10 },
//         },
//       }),
//     },
//   ],
// };

// const MuiButton = {
//   /** **************************************
//    * DEFAULT PROPS
//    *************************************** */
//   defaultProps: { color: 'inherit', disableElevation: true },

//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: { variants: [softVariant.base, softVariant.colors].flat() },
//     /**
//      * @variant contained
//      */
//     contained: ({ theme, ownerState }) => {
//       const styled = {
//         colors: styleColors(ownerState, (color) => ({
//           '&:hover': { boxShadow: theme.vars.customShadows[color] },
//         })),
//         inheritColor: {
//           ...(ownerState.color === 'inherit' &&
//             !ownerState.disabled && {
//               color: theme.vars.palette.common.white,
//               backgroundColor: theme.vars.palette.grey[800],
//               '&:hover': {
//                 boxShadow: theme.vars.customShadows.z8,
//                 backgroundColor: theme.vars.palette.grey[700],
//               },
//               ...theme.applyStyles('dark', {
//                 color: theme.vars.palette.grey[800],
//                 backgroundColor: theme.vars.palette.common.white,
//                 '&:hover': { backgroundColor: theme.vars.palette.grey[400] },
//               }),
//             }),
//         },
//       };
//       return { ...styled.inheritColor, ...styled.colors };
//     },
//     /**
//      * @variant outlined
//      */
//     outlined: ({ theme, ownerState }) => {
//       const styled = {
//         colors: styleColors(ownerState, (color) => ({
//           borderColor: varAlpha(theme.vars.palette[color].mainChannel, 0.48),
//         })),
//         inheritColor: {
//           ...(ownerState.color === 'inherit' &&
//             !ownerState.disabled && {
//               borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.32),
//               '&:hover': { backgroundColor: theme.vars.palette.action.hover },
//             }),
//         },
//         base: {
//           '&:hover': {
//             borderColor: 'currentColor',
//             boxShadow: '0 0 0 0.75px currentColor',
//           },
//         },
//       };
//       return { ...styled.base, ...styled.inheritColor, ...styled.colors };
//     },
//     /**
//      * @variant text
//      */
//     text: ({ ownerState, theme }) => {
//       const styled = {
//         inheritColor: {
//           ...(ownerState.color === 'inherit' &&
//             !ownerState.disabled && {
//               '&:hover': { backgroundColor: theme.vars.palette.action.hover },
//             }),
//         },
//       };
//       return { ...styled.inheritColor };
//     },
//     /**
//      * @sizes
//      */
//     sizeSmall: ({ ownerState }) => ({
//       height: 30,
//       ...(ownerState.variant === 'text'
//         ? { paddingLeft: '4px', paddingRight: '4px' }
//         : { paddingLeft: '8px', paddingRight: '8px' }),
//     }),
//     sizeMedium: ({ ownerState }) => ({
//       ...(ownerState.variant === 'text'
//         ? { paddingLeft: '8px', paddingRight: '8px' }
//         : { paddingLeft: '12px', paddingRight: '12px' }),
//     }),
//     sizeLarge: ({ ownerState }) => ({
//       height: 48,
//       ...(ownerState.variant === 'text'
//         ? { paddingLeft: '10px', paddingRight: '10px' }
//         : { paddingLeft: '16px', paddingRight: '16px' }),
//     }),
//   },
// };

// // ----------------------------------------------------------------------

// export const button = { MuiButtonBase, MuiButton };
// ----------------------------------------------------------------------
// Tailwind Version of MUI Button
// ----------------------------------------------------------------------

export const buttonStyles = {
  base: `
        inline-flex
        items-center
        justify-center
        
        font-medium
        transition-all
        duration-200
        outline-none
        select-none
        disabled:pointer-events-none
        disabled:opacity-50
    `,

  // Sizes
  sizeSmall: `
        h-[30px]
        px-2
        text-sm
    `,

  sizeMedium: `
        h-10
        px-3
        text-sm
    `,

  sizeLarge: `
        h-12
        px-4
        text-base
    `,

  textSizeSmall: `
        h-[30px]
        px-1
        text-sm
    `,

  textSizeMedium: `
        px-2
        text-sm
    `,

  textSizeLarge: `
        h-12
        px-2.5
        text-base
    `,
};

// ----------------------------------------------------------------------
// SOFT VARIANT
// ----------------------------------------------------------------------

export const softButtonStyles = {
  base: `
        bg-gray-500/10
        hover:bg-gray-500/25
        disabled:bg-gray-200
    `,

  primary: `
        bg-blue-500/15
        text-blue-900
        hover:bg-blue-500/30
    `,

  secondary: `
        bg-purple-500/15
        text-purple-900
        hover:bg-purple-500/30
    `,

  info: `
        bg-cyan-500/15
        text-cyan-900
        hover:bg-cyan-500/30
    `,

  success: `
        bg-emerald-500/15
        text-emerald-900
        hover:bg-emerald-500/30
    `,

  warning: `
        bg-amber-500/15
        text-amber-900
        hover:bg-amber-500/30
    `,

  error: `
        bg-red-500/15
        text-red-900
        hover:bg-red-500/30
    `,
};

// ----------------------------------------------------------------------
// CONTAINED VARIANT
// ----------------------------------------------------------------------

export const containedButtonStyles = {
  primary: `
        bg-blue-600
        text-white
        hover:shadow-lg
    `,

  secondary: `
        bg-purple-600
        text-white
        hover:shadow-lg
    `,

  info: `
        bg-cyan-600
        text-white
        hover:shadow-lg
    `,

  success: `
        bg-emerald-600
        text-white
        hover:shadow-lg
    `,

  warning: `
        bg-amber-500
        text-white
        hover:shadow-lg
    `,

  error: `
        bg-red-600
        text-white
        hover:shadow-lg
    `,

  inherit: `
        bg-gray-800
        text-white
        hover:bg-gray-700
        hover:shadow-xl
        dark:bg-white
        dark:text-gray-800
        dark:hover:bg-gray-300
    `,
};

// ----------------------------------------------------------------------
// OUTLINED VARIANT
// ----------------------------------------------------------------------

export const outlinedButtonStyles = {
  base: `
        border
        hover:border-current
        hover:shadow-[0_0_0_0.75px_currentColor]
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
        border-gray-400/40
        text-gray-800
        hover:bg-gray-100
    `,
};

// ----------------------------------------------------------------------
// TEXT VARIANT
// ----------------------------------------------------------------------

export const textButtonStyles = {
  inherit: `
        text-gray-800
        hover:bg-gray-100
    `,
};

// ----------------------------------------------------------------------
// Helper Function
// ----------------------------------------------------------------------

export const getButtonClass = ({
  variant = "contained",
  color = "inherit",
  size = "medium",
}) => {
  const classes = [buttonStyles.base];

  // Sizes
  if (variant === "text") {
    if (size === "small") {
      classes.push(
        buttonStyles.textSizeSmall
      );
    }

    if (size === "medium") {
      classes.push(
        buttonStyles.textSizeMedium
      );
    }

    if (size === "large") {
      classes.push(
        buttonStyles.textSizeLarge
      );
    }
  } else {
    if (size === "small") {
      classes.push(
        buttonStyles.sizeSmall
      );
    }

    if (size === "medium") {
      classes.push(
        buttonStyles.sizeMedium
      );
    }

    if (size === "large") {
      classes.push(
        buttonStyles.sizeLarge
      );
    }
  }

  // SOFT
  if (variant === "soft") {
    classes.push(
      softButtonStyles.base
    );

    classes.push(
      softButtonStyles[color]
    );
  }

  // CONTAINED
  if (variant === "contained") {
    classes.push(
      containedButtonStyles[color]
    );
  }

  // OUTLINED
  if (variant === "outlined") {
    classes.push(
      outlinedButtonStyles.base
    );

    classes.push(
      outlinedButtonStyles[color]
    );
  }

  // TEXT
  if (variant === "text") {
    if (color === "inherit") {
      classes.push(
        textButtonStyles.inherit
      );
    }
  }

  return classes.join(" ");
};
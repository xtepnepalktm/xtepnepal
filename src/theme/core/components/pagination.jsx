// import { varAlpha } from 'minimal-shared/utils';

// import { paginationItemClasses } from '@mui/material/PaginationItem';

// // ----------------------------------------------------------------------

// const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// const softVariant = {
//   colors: COLORS.map((color) => ({
//     props: ({ ownerState }) =>
//       !ownerState.disabled && ownerState.variant === 'soft' && ownerState.color === color,
//     style: ({ theme }) => ({
//       [`& .${paginationItemClasses.root}`]: {
//         [`&.${paginationItemClasses.selected}`]: {
//           fontWeight: theme.typography.fontWeightSemiBold,
//           color: theme.vars.palette[color].dark,
//           backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.08),
//           '&:hover': {
//             backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.16),
//           },
//           ...theme.applyStyles('dark', {
//             color: theme.vars.palette[color].light,
//           }),
//         },
//       },
//     }),
//   })),
//   standardColor: [
//     {
//       props: ({ ownerState }) => ownerState.variant === 'soft' && ownerState.color === 'standard',
//       style: ({ theme }) => ({
//         [`& .${paginationItemClasses.root}`]: {
//           [`&.${paginationItemClasses.selected}`]: {
//             fontWeight: theme.typography.fontWeightSemiBold,
//             backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
//             '&:hover': {
//               backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
//             },
//           },
//         },
//       }),
//     },
//   ],
// };

// // ----------------------------------------------------------------------

// const MuiPagination = {
//   /** **************************************
//    * STYLE
//    *************************************** */
//   styleOverrides: {
//     root: {
//       variants: [
//         /**
//          * @variant soft
//          */
//         softVariant.standardColor,
//         softVariant.colors,
//       ].flat(),
//     },
//     /**
//      * @variant text
//      */
//     text: ({ ownerState, theme }) => ({
//       [`& .${paginationItemClasses.root}`]: {
//         [`&.${paginationItemClasses.selected}`]: {
//           fontWeight: theme.typography.fontWeightSemiBold,
//           ...(ownerState.color === 'standard' && {
//             color: theme.vars.palette.common.white,
//             backgroundColor: theme.vars.palette.text.primary,
//             '&:hover': { backgroundColor: theme.vars.palette.grey[700] },
//             ...theme.applyStyles('dark', {
//               color: theme.vars.palette.grey[800],
//               '&:hover': { backgroundColor: theme.vars.palette.grey[100] },
//             }),
//           }),
//         },
//       },
//     }),
//     /**
//      * @variant outlined
//      */
//     outlined: ({ ownerState, theme }) => ({
//       [`& .${paginationItemClasses.root}`]: {
//         borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
//         [`&.${paginationItemClasses.selected}`]: {
//           borderColor: 'currentColor',
//           fontWeight: theme.typography.fontWeightSemiBold,
//           ...(ownerState.color === 'standard' && {
//             backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
//           }),
//         },
//       },
//     }),
//   },
// };

// // ----------------------------------------------------------------------

// export const pagination = { MuiPagination };
// pagination-tailwind.js

const COLORS = {
  primary: {
    soft: `
      text-primary-700
      bg-primary-500/10
      hover:bg-primary-500/20
    `,
    solid: `
      text-white
      bg-primary-600
      hover:bg-primary-700
    `,
    outlined: `
      border-primary-600
      text-primary-600
      hover:bg-primary-50
    `,
  },

  secondary: {
    soft: `
      text-secondary-700
      bg-secondary-500/10
      hover:bg-secondary-500/20
    `,
    solid: `
      text-white
      bg-secondary-600
      hover:bg-secondary-700
    `,
    outlined: `
      border-secondary-600
      text-secondary-600
      hover:bg-secondary-50
    `,
  },

  success: {
    soft: `
      text-green-700
      bg-green-500/10
      hover:bg-green-500/20
    `,
    solid: `
      text-white
      bg-green-600
      hover:bg-green-700
    `,
    outlined: `
      border-green-600
      text-green-600
      hover:bg-green-50
    `,
  },

  warning: {
    soft: `
      text-yellow-700
      bg-yellow-500/10
      hover:bg-yellow-500/20
    `,
    solid: `
      text-white
      bg-yellow-600
      hover:bg-yellow-700
    `,
    outlined: `
      border-yellow-600
      text-yellow-600
      hover:bg-yellow-50
    `,
  },

  error: {
    soft: `
      text-red-700
      bg-red-500/10
      hover:bg-red-500/20
    `,
    solid: `
      text-white
      bg-red-600
      hover:bg-red-700
    `,
    outlined: `
      border-red-600
      text-red-600
      hover:bg-red-50
    `,
  },

  info: {
    soft: `
      text-sky-700
      bg-sky-500/10
      hover:bg-sky-500/20
    `,
    solid: `
      text-white
      bg-sky-600
      hover:bg-sky-700
    `,
    outlined: `
      border-sky-600
      text-sky-600
      hover:bg-sky-50
    `,
  },

  standard: {
    soft: `
      bg-gray-500/10
      hover:bg-gray-500/20
      text-gray-800
    `,
    solid: `
      bg-black
      text-white
      hover:bg-gray-800
      dark:bg-white
      dark:text-gray-900
    `,
    outlined: `
      border-gray-300
      text-gray-800
      hover:bg-gray-100
    `,
  },
};

// ----------------------------------------------------------------------

export const paginationStyles = {
  root: `
    flex
    items-center
    gap-2
  `,

  item: `
    min-w-9
    h-9
    px-3
    flex
    items-center
    justify-center
    
    text-sm
    font-medium
    transition-all
    duration-200
    border
    border-transparent
    select-none
  `,

  disabled: `
    opacity-40
    pointer-events-none
  `,
};

// ----------------------------------------------------------------------

export const getPaginationItemStyles = ({
  variant = 'text',
  color = 'standard',
  selected = false,
  disabled = false,
}) => {
  let variantStyle = '';

  if (selected) {
    if (variant === 'soft') {
      variantStyle = COLORS[color]?.soft;
    }

    if (variant === 'text') {
      variantStyle = COLORS[color]?.solid;
    }

    if (variant === 'outlined') {
      variantStyle = `
        border
        font-semibold
        ${COLORS[color]?.outlined}
      `;
    }
  } else {
    variantStyle = `
      hover:bg-gray-100
      text-gray-700
    `;
  }

  return `
    ${paginationStyles.item}
    ${variantStyle}
    ${disabled ? paginationStyles.disabled : ''}
  `;
};
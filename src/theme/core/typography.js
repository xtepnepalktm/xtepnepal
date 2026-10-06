// import { pxToRem, setFont } from 'minimal-shared/utils';

// import { createTheme as getTheme } from '@mui/material/styles';

// import { themeConfig } from '../theme-config';

// // ----------------------------------------------------------------------

// const defaultMuiTheme = getTheme();

// function responsiveFontSizes(obj) {
//   const breakpoints = defaultMuiTheme.breakpoints.keys;

//   return breakpoints.reduce((acc, breakpoint) => {
//     const value = obj[breakpoint];

//     if (value !== undefined && value >= 0) {
//       acc[defaultMuiTheme.breakpoints.up(breakpoint)] = {
//         fontSize: pxToRem(value),
//       };
//     }

//     return acc;
//   }, {});
// }

// const primaryFont = setFont(themeConfig.fontFamily.primary);
// const secondaryFont = setFont(themeConfig.fontFamily.secondary);

// // ----------------------------------------------------------------------

// export const typography = {
//   fontFamily: primaryFont,
//   fontSecondaryFamily: secondaryFont,
//   fontWeightLight: '300',
//   fontWeightRegular: '400',
//   fontWeightMedium: '500',
//   fontWeightSemiBold: '600',
//   fontWeightBold: '700',
//   h1: {
//     fontFamily: secondaryFont,
//     fontWeight: 800,
//     lineHeight: 80 / 64,
//     fontSize: pxToRem(40),
//     ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
//   },
//   h2: {
//     fontFamily: secondaryFont,
//     fontWeight: 800,
//     lineHeight: 64 / 48,
//     fontSize: pxToRem(32),
//     ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
//   },
//   h3: {
//     fontFamily: secondaryFont,
//     fontWeight: 700,
//     lineHeight: 1.5,
//     fontSize: pxToRem(24),
//     ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
//   },
//   h4: {
//     fontWeight: 700,
//     lineHeight: 1.5,
//     fontSize: pxToRem(20),
//     ...responsiveFontSizes({ md: 24 }),
//   },
//   h5: {
//     fontWeight: 700,
//     lineHeight: 1.5,
//     fontSize: pxToRem(18),
//     ...responsiveFontSizes({ sm: 19 }),
//   },
//   h6: {
//     fontWeight: 600,
//     lineHeight: 28 / 18,
//     fontSize: pxToRem(17),
//     ...responsiveFontSizes({ sm: 18 }),
//   },
//   subtitle1: {
//     fontWeight: 600,
//     lineHeight: 1.5,
//     fontSize: pxToRem(16),
//   },
//   subtitle2: {
//     fontWeight: 600,
//     lineHeight: 22 / 14,
//     fontSize: pxToRem(14),
//   },
//   body1: {
//     lineHeight: 1.5,
//     fontSize: pxToRem(16),
//   },
//   body2: {
//     lineHeight: 22 / 14,
//     fontSize: pxToRem(14),
//   },
//   caption: {
//     lineHeight: 1.5,
//     fontSize: pxToRem(12),
//   },
//   overline: {
//     fontWeight: 700,
//     lineHeight: 1.5,
//     fontSize: pxToRem(12),
//     textTransform: 'uppercase',
//   },
//   button: {
//     fontWeight: 700,
//     lineHeight: 24 / 14,
//     fontSize: pxToRem(14),
//     textTransform: 'unset',
//   },
// };

/* =========================================================
   FONT FAMILIES (MUI setFont replacement)
========================================================= */

export const fontFamily = {
  primary: "Helvetica",
  secondary: "Helvetica",
};


/* =========================================================
   FONT WEIGHTS (same as MUI)
========================================================= */

export const fontWeight = {
  light: "font-light",       // 300
  regular: "font-normal",    // 400
  medium: "font-medium",     // 500
  semibold: "font-semibold", // 600
  bold: "font-bold",         // 700
  extrabold: "font-extrabold" // 800
};


/* =========================================================
   BASE TYPOGRAPHY SYSTEM (MUI → Tailwind mapping)
========================================================= */

export const typography = {
  /* ---------------- HEADINGS ---------------- */

  h1: `
    font-secondary font-extrabold
    text-[40px] sm:text-[52px] md:text-[58px] lg:text-[64px]
    leading-[1.25]
  `,

  h2: `
    font-secondary font-extrabold
    text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px]
    leading-[1.33]
  `,

  h3: `
    font-secondary font-bold
    text-[24px] sm:text-[26px] md:text-[30px] lg:text-[32px]
    leading-[1.5]
  `,

  h4: `
    font-bold
    text-[20px] md:text-[24px]
    leading-[1.5]
  `,

  h5: `
    font-bold
    text-[18px] sm:text-[19px]
    leading-[1.5]
  `,

  h6: `
    font-semibold
    text-[17px] sm:text-[18px]
    leading-[1.4]
  `,


  /* ---------------- SUBTITLES ---------------- */

  subtitle1: `
    font-semibold
    text-[16px]
    leading-[1.5]
  `,

  subtitle2: `
    font-semibold
    text-[14px]
    leading-[1.57]
  `,


  /* ---------------- BODY ---------------- */

  body1: `
    font-normal
    text-[16px]
    leading-[1.5]
  `,

  body2: `
    font-normal
    text-[14px]
    leading-[1.57]
  `,


  /* ---------------- CAPTION ---------------- */

  caption: `
    font-normal
    text-[12px]
    leading-[1.5]
  `,


  /* ---------------- OVERLINE ---------------- */

  overline: `
    font-bold uppercase tracking-wider
    text-[12px]
    leading-[1.5]
  `,


  /* ---------------- BUTTON ---------------- */

  button: `
    font-bold
    text-[14px]
    leading-[1.7]
    normal-case
  `,
};


/* =========================================================
   USAGE HELPERS
========================================================= */

export const text = {
  primary: fontFamily.primary,
  secondary: fontFamily.secondary,
};
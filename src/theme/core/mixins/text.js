// import { remToPx } from 'minimal-shared/utils';

// import { createTheme as getTheme } from '@mui/material/styles';

// // ----------------------------------------------------------------------

// /**
//  * The original theme has not been customized.
//  * Only use non-styling features such as breakpoints...
//  */
// const defaultMuiTheme = getTheme();

// /**
//  * @usage
//  * ...theme.mixins.textGradient(`to right, ${theme.vars.palette.text.primary}, ${alpha(theme.vars.palette.text.primary, 0.2)}`
//  */
// export function textGradient(color) {
//   return {
//     background: `linear-gradient(${color})`,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//     textFillColor: 'transparent',
//     color: 'transparent',
//   };
// }

// function getFontSize(fontSize) {
//   return typeof fontSize === 'string' ? remToPx(fontSize) : fontSize;
// }

// function getLineHeight(lineHeight, fontSize) {
//   if (typeof lineHeight === 'string') {
//     return fontSize ? remToPx(lineHeight) / fontSize : 1;
//   }

//   return lineHeight;
// }

// function calculateHeight(fontSize, lineHeight, line) {
//   return fontSize * lineHeight * line;
// }

// // ----------------------------------------------------------------------

// export function maxLine({ line, persistent }) {
//   const breakpoints = defaultMuiTheme.breakpoints.keys;

//   const baseStyles = {
//     overflow: 'hidden',
//     display: '-webkit-box',
//     textOverflow: 'ellipsis',
//     WebkitLineClamp: line,
//     WebkitBoxOrient: 'vertical',
//   };

//   if (!persistent) {
//     return baseStyles;
//   }

//   const fontSizeBase = getFontSize(persistent.fontSize);
//   const lineHeight = getLineHeight(persistent.lineHeight, fontSizeBase);

//   if (!lineHeight || !fontSizeBase) {
//     return baseStyles;
//   }

//   const responsiveStyles = breakpoints.reduce((acc, breakpoint) => {
//     const fontSize = getFontSize(persistent[defaultMuiTheme.breakpoints.up(breakpoint)]?.fontSize);

//     if (fontSize) {
//       acc[defaultMuiTheme.breakpoints.up(breakpoint)] = {
//         height: calculateHeight(fontSize, lineHeight, line),
//       };
//     }

//     return acc;
//   }, {});

//   return {
//     ...baseStyles,
//     height: calculateHeight(fontSizeBase, lineHeight, line),
//     ...responsiveStyles,
//   };
// }

/* =========================================================
   TEXT GRADIENT (MUI → Tailwind replacement)
========================================================= */

/**
 * Simple Tailwind version (recommended)
 * Uses Tailwind gradient utilities
 */
export const textGradient = (from = "blue-500", to = "purple-500", dir = "to-r") => `
  bg-gradient-${dir}
  from-${from}
  to-${to}
  bg-clip-text
  text-transparent
`;

/**
 * Safe version (no Tailwind dynamic class issues)
 * Recommended for production if colors are dynamic
 */
export const textGradientSafe = (css = "to right, #3b82f6, #a855f7") => ({
  background: `linear-gradient(${css})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
});


/* =========================================================
   MULTI LINE CLAMP (MUI maxLine replacement)
========================================================= */

/**
 * Simple Tailwind line clamp (BEST PRACTICE)
 * Requires: @tailwindcss/line-clamp plugin
 */
export const maxLine = (lines = 2) => `
  overflow-hidden
  text-ellipsis
  line-clamp-${lines}
`;

/**
 * Responsive clamp version (MUI breakpoint replacement)
 */
export const responsiveMaxLine = (base = 2, md = 3, lg = 4) => `
  line-clamp-${base}
  md:line-clamp-${md}
  lg:line-clamp-${lg}
`;

/**
 * Advanced fallback (no plugin needed)
 * Pure CSS WebKit version
 */
export const maxLineAdvanced = (lines = 2) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
});


/* =========================================================
   OPTIONAL: TEXT SIZE HELPERS (replaces remToPx logic indirectly)
========================================================= */

export const textSize = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};


/* =========================================================
   OPTIONAL: LINE HEIGHT HELPERS (MUI typography replacement)
========================================================= */

export const lineHeight = {
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};


/* =========================================================
   EXAMPLE USAGE (React)
========================================================= */

export function Example() {
  return `
    <div class="p-6 space-y-4">

      <!-- Gradient Text -->
      <h1 class="${textGradient("blue-500", "purple-500")} text-3xl font-bold">
        Gradient Title
      </h1>

      <!-- Safe Gradient -->
      <h2 style="${JSON.stringify(textGradientSafe("to right, #06b6d4, #f97316"))}" 
          class="text-2xl font-bold">
        Safe Gradient Title
      </h2>

      <!-- Line Clamp -->
      <p class="${maxLine(2)} text-sm text-gray-600">
        This is a long paragraph that will be truncated after 2 lines using Tailwind line clamp utilities.
      </p>

      <!-- Responsive Clamp -->
      <p class="${responsiveMaxLine(2, 3, 4)} text-sm text-gray-600">
        This text changes clamp behavior based on screen size.
      </p>

    </div>
  `;
}
// import { mergeClasses } from 'minimal-shared/utils';
// import { Children, forwardRef, isValidElement } from 'react';

// import { styled } from '@mui/material/styles';

// import { carouselClasses } from '../classes';
// import { CarouselSlide } from './carousel-slide';

// // ----------------------------------------------------------------------

// export const CarouselThumbs = forwardRef((props, ref) => {
//   const { children, slotProps, options, sx, className, ...other } = props;

//   const axis = options?.axis ?? 'x';
//   const slideSpacing = options?.slideSpacing ?? '12px';

//   const renderChildren = () =>
//     Children.map(children, (child) => {
//       if (isValidElement(child)) {
//         const reactChild = child;

//         return (
//           <CarouselSlide
//             key={reactChild.key}
//             options={{ ...options, slideSpacing }}
//             sx={slotProps?.slide}
//           >
//             {child}
//           </CarouselSlide>
//         );
//       }
//       return null;
//     });

//   return (
//     <ThumbsRoot
//       ref={ref}
//       axis={axis}
//       enableMask={!slotProps?.disableMask}
//       className={mergeClasses([carouselClasses.thumbs.root, className])}
//       sx={sx}
//       {...other}
//     >
//       <ThumbsContainer
//         axis={axis}
//         slideSpacing={slideSpacing}
//         className={carouselClasses.thumbs.container}
//         sx={slotProps?.container}
//       >
//         {renderChildren()}
//       </ThumbsContainer>
//     </ThumbsRoot>
//   );
// });

// // ----------------------------------------------------------------------

// const ThumbsRoot = styled('div', {
//   shouldForwardProp: (prop) => !['axis', 'enableMask', 'sx'].includes(prop),
// })(({ enableMask, theme }) => {
//   const maskBg = `${theme.vars.palette.background.paper} 20%, transparent 100%)`;

//   return {
//     flexShrink: 0,
//     margin: 'auto',
//     maxWidth: '100%',
//     overflow: 'hidden',
//     position: 'relative',
//     variants: [
//       {
//         props: { axis: 'x' },
//         style: {
//           maxWidth: '100%',
//           padding: theme.spacing(0.5),
//           ...(enableMask && {
//             '&::before, &::after': {
//               top: 0,
//               zIndex: 9,
//               width: 40,
//               content: '""',
//               height: '100%',
//               position: 'absolute',
//             },
//             '&::before': {
//               left: -8,
//               background: `linear-gradient(to right, ${maskBg}`,
//             },
//             '&::after': {
//               right: -8,
//               background: `linear-gradient(to left, ${maskBg}`,
//             },
//           }),
//         },
//       },
//       {
//         props: { axis: 'y' },
//         style: {
//           height: '100%',
//           maxHeight: '100%',
//           padding: theme.spacing(0.5),
//           ...(enableMask && {
//             '&::before, &::after': {
//               left: 0,
//               zIndex: 9,
//               height: 40,
//               content: '""',
//               width: '100%',
//               position: 'absolute',
//             },
//             '&::before': {
//               top: -8,
//               background: `linear-gradient(to bottom, ${maskBg}`,
//             },
//             '&::after': {
//               bottom: -8,
//               background: `linear-gradient(to top, ${maskBg}`,
//             },
//           }),
//         },
//       },
//     ],
//   };
// });

// const ThumbsContainer = styled('ul', {
//   shouldForwardProp: (prop) => !['axis', 'slideSpacing', 'sx'].includes(prop),
// })(({ slideSpacing }) => ({
//   display: 'flex',
//   backfaceVisibility: 'hidden',
//   variants: [
//     {
//       props: { axis: 'x' },
//       style: {
//         touchAction: 'pan-y pinch-zoom',
//         marginLeft: `calc(${slideSpacing} * -1)`,
//       },
//     },
//     {
//       props: { axis: 'y' },
//       style: {
//         height: '100%',
//         flexDirection: 'column',
//         touchAction: 'pan-x pinch-zoom',
//         marginTop: `calc(${slideSpacing} * -1)`,
//       },
//     },
//   ],
// }));
"use client";

import {
  Children,
  forwardRef,
  isValidElement,
} from "react";

import { CarouselSlide } from "./carousel-slide";

// ----------------------------------------------------------------------

export const CarouselThumbs = forwardRef(
  (
    {
      children,
      slotProps = {},
      options,
      className = "",
      disableMask = false,
      ...other
    },
    ref
  ) => {
    const axis = options?.axis ?? "x";

    const slideSpacing =
      options?.slideSpacing ?? "12px";

    const renderChildren = () =>
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          return (
            <CarouselSlide
              key={child.key}
              options={{
                ...options,
                slideSpacing,
              }}
              className={slotProps?.slide}
            >
              {child}
            </CarouselSlide>
          );
        }

        return null;
      });

    return (
      <div
        ref={ref}
        className={`
          relative
          mx-auto
          max-w-full
          shrink-0
          overflow-hidden
          p-2

          ${axis === "y"
            ? "h-full max-h-full"
            : ""
          }

          ${className}
        `}
        {...other}
      >
        {/* LEFT MASK */}
        {!disableMask && axis === "x" && (
          <div
            className="
              pointer-events-none
              absolute
              left-[-8px]
              top-0
              z-[9]
              h-full
              w-10
              bg-gradient-to-r
              from-white
              to-transparent
            "
          />
        )}

        {/* RIGHT MASK */}
        {!disableMask && axis === "x" && (
          <div
            className="
              pointer-events-none
              absolute
              right-[-8px]
              top-0
              z-[9]
              h-full
              w-10
              bg-gradient-to-l
              from-white
              to-transparent
            "
          />
        )}

        {/* TOP MASK */}
        {!disableMask && axis === "y" && (
          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-[-8px]
              z-[9]
              h-10
              w-full
              bg-gradient-to-b
              from-white
              to-transparent
            "
          />
        )}

        {/* BOTTOM MASK */}
        {!disableMask && axis === "y" && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-[-8px]
              left-0
              z-[9]
              h-10
              w-full
              bg-gradient-to-t
              from-white
              to-transparent
            "
          />
        )}

        {/* THUMBS CONTAINER */}
        <ul
          className={`
            flex
            backface-hidden

            ${axis === "x"
              ? "touch-pan-y"
              : "h-full flex-col touch-pan-x"
            }

            ${slotProps?.container || ""}
          `}
          style={{
            ...(axis === "x"
              ? {
                touchAction:
                  "pan-y pinch-zoom",
                marginLeft: `calc(${slideSpacing} * -1)`,
              }
              : {
                touchAction:
                  "pan-x pinch-zoom",
                marginTop: `calc(${slideSpacing} * -1)`,
              }),
          }}
        >
          {renderChildren()}
        </ul>
      </div>
    );
  }
);

CarouselThumbs.displayName =
  "CarouselThumbs";
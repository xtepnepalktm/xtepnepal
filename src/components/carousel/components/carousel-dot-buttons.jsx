// import { varAlpha, mergeClasses } from 'minimal-shared/utils';

// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';
// import ButtonBase from '@mui/material/ButtonBase';

// import { carouselClasses } from '../classes';

// // ----------------------------------------------------------------------

// export function CarouselDotButtons({
//   sx,
//   gap,
//   slotProps,
//   className,
//   onClickDot,
//   scrollSnaps,
//   selectedIndex,
//   variant = 'circular',
//   ...other
// }) {
//   const GAPS = { rounded: gap ?? 2, circular: gap ?? 2, number: gap ?? 6 };

//   const SIZES = {
//     circular: slotProps?.dot?.size ?? 18,
//     rounded: slotProps?.dot?.size ?? 18,
//     number: slotProps?.dot?.size ?? 28,
//   };

//   return (
//     <Box
//       component="ul"
//       className={mergeClasses([carouselClasses.dots.root, className])}
//       sx={[
//         () => ({
//           gap: `${GAPS[variant]}px`,
//           height: SIZES[variant],
//           zIndex: 9,
//           display: 'flex',
//           '& > li': {
//             display: 'inline-flex',
//           },
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       {scrollSnaps.map((_, index) => {
//         const selected = index === selectedIndex;

//         return (
//           <li key={index}>
//             <DotItem
//               disableRipple
//               aria-label={`dot-${index}`}
//               variant={variant}
//               selected={selected}
//               className={mergeClasses(carouselClasses.dots.item, {
//                 [carouselClasses.dots.itemSelected]: selected,
//               })}
//               onClick={() => onClickDot(index)}
//               sx={[
//                 () => ({
//                   width: SIZES[variant],
//                   height: SIZES[variant],
//                 }),
//                 ...(Array.isArray(slotProps?.dot?.sx)
//                   ? (slotProps?.dot?.sx ?? [])
//                   : [slotProps?.dot?.sx]),
//               ]}
//             >
//               {variant === 'number' && index + 1}
//             </DotItem>
//           </li>
//         );
//       })}
//     </Box>
//   );
// }

// // ----------------------------------------------------------------------

// const DotItem = styled(ButtonBase, {
//   shouldForwardProp: (prop) => !['variant', 'selected', 'sx'].includes(prop),
// })(({ selected, theme }) => {
//   const dotStyles = {
//     width: 8,
//     height: 8,
//     content: '""',
//     opacity: 0.24,
//     borderRadius: '50%',
//     backgroundColor: 'currentColor',
//     transition: theme.transitions.create(['width', 'opacity'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.short,
//     }),
//   };

//   return {
//     variants: [
//       {
//         props: { variant: 'circular' },
//         style: { '&::before': { ...dotStyles, ...(selected && { opacity: 1 }) } },
//       },
//       {
//         props: { variant: 'rounded' },
//         style: {
//           '&::before': {
//             ...dotStyles,
//             ...(selected && {
//               opacity: 1,
//               width: 'calc(100% - 4px)',
//               borderRadius: theme.shape.borderRadius,
//             }),
//           },
//         },
//       },
//       {
//         props: { variant: 'number' },
//         style: {
//           ...theme.typography.caption,
//           borderRadius: '50%',
//           color: theme.vars.palette.text.disabled,
//           border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
//           ...(selected && {
//             color: theme.vars.palette.common.white,
//             backgroundColor: theme.vars.palette.text.primary,
//             fontWeight: theme.typography.fontWeightSemiBold,
//             ...theme.applyStyles('dark', {
//               color: theme.vars.palette.grey[800],
//             }),
//           }),
//         },
//       },
//     ],
//   };
// });
"use client";

// ----------------------------------------------------------------------

export function CarouselDotButtons({
  gap,
  slotProps,
  className = "",
  onClickDot,
  scrollSnaps,
  selectedIndex,
  variant = "circular",
  ...other
}) {
  const GAPS = {
    rounded: gap ?? 2,
    circular: gap ?? 2,
    number: gap ?? 6,
  };

  const SIZES = {
    circular: slotProps?.dot?.size ?? 18,
    rounded: slotProps?.dot?.size ?? 18,
    number: slotProps?.dot?.size ?? 28,
  };

  return (
    <ul
      className={`
        z-[9]
        flex
        ${className}
      `}
      style={{
        gap: `${GAPS[variant]}px`,
        height: SIZES[variant],
      }}
      {...other}
    >
      {scrollSnaps.map((_, index) => {
        const selected = index === selectedIndex;

        return (
          <li key={index} className="inline-flex">
            <DotItem
              index={index}
              selected={selected}
              variant={variant}
              size={SIZES[variant]}
              onClick={() => onClickDot(index)}
              className={slotProps?.dot?.className}
            />
          </li>
        );
      })}
    </ul>
  );
}

// ----------------------------------------------------------------------

function DotItem({
  index,
  selected,
  variant,
  size,
  onClick,
  className = "",
}) {
  // --------------------------------------------------------------------
  // NUMBER STYLE
  // --------------------------------------------------------------------

  if (variant === "number") {
    return (
      <button
        type="button"
        aria-label={`dot-${index}`}
        onClick={onClick}
        className={`
          flex
          items-center
          justify-center
          rounded-full
          border
          text-xs
          transition-all
          duration-200
          ease-in-out

          ${selected
            ? "bg-black text-white font-semibold border-black"
            : "border-black/10 text-gray-400"
          }

          ${className}
        `}
        style={{
          width: size,
          height: size,
        }}
      >
        {index + 1}
      </button>
    );
  }

  // --------------------------------------------------------------------
  // CIRCULAR + ROUNDED STYLE
  // --------------------------------------------------------------------

  return (
    <button
      type="button"
      aria-label={`dot-${index}`}
      onClick={onClick}
      className={`
        relative
        flex
        items-center
        justify-center
        transition-all
        duration-200
        ease-in-out

        ${className}
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      <span
        className={`
          block
          bg-current
          transition-all
          duration-200
          ease-in-out

          ${variant === "rounded"
            ? selected
              ? "w-[calc(100%-4px)] rounded-md opacity-100"
              : "w-2 rounded-full opacity-25"
            : selected
              ? "w-2 rounded-full opacity-100"
              : "w-2 rounded-full opacity-25"
          }
        `}
        style={{
          height: 8,
        }}
      />
    </button>
  );
}
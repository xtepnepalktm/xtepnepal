// import { varAlpha, mergeClasses } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';

// import { ArrowButton } from './arrow-button';
// import { carouselClasses } from '../classes';

// // ----------------------------------------------------------------------

// const BasicButtonsRoot = styled('div')(({ theme }) => ({
//   gap: '4px',
//   zIndex: 9,
//   alignItems: 'center',
//   display: 'inline-flex',
//   color: theme.vars.palette.action.active,
// }));

// // ----------------------------------------------------------------------

// export function CarouselArrowBasicButtons({
//   sx,
//   options,
//   slotProps,
//   onClickPrev,
//   onClickNext,
//   disablePrev,
//   disableNext,
//   className,
//   ...other
// }) {
//   return (
//     <BasicButtonsRoot
//       className={mergeClasses([carouselClasses.arrows.root, className])}
//       sx={sx}
//       {...other}
//     >
//       <ArrowButton
//         variant="prev"
//         options={options}
//         disabled={disablePrev}
//         onClick={onClickPrev}
//         svgIcon={slotProps?.prevBtn?.svgIcon}
//         svgSize={slotProps?.prevBtn?.svgSize}
//         sx={slotProps?.prevBtn?.sx}
//       />

//       <ArrowButton
//         variant="next"
//         options={options}
//         disabled={disableNext}
//         onClick={onClickNext}
//         svgIcon={slotProps?.nextBtn?.svgIcon}
//         svgSize={slotProps?.nextBtn?.svgSize}
//         sx={slotProps?.nextBtn?.sx}
//       />
//     </BasicButtonsRoot>
//   );
// }

// // ----------------------------------------------------------------------

// export function CarouselArrowFloatButtons({
//   sx,
//   options,
//   slotProps,
//   onClickPrev,
//   onClickNext,
//   disablePrev,
//   disableNext,
// }) {
//   const baseStyles = (theme) => ({
//     zIndex: 9,
//     top: '50%',
//     borderRadius: 1.5,
//     position: 'absolute',
//     color: 'common.white',
//     bgcolor: 'text.primary',
//     '&:hover': { opacity: 0.8 },
//     ...theme.applyStyles('dark', {
//       color: 'grey.800',
//     }),
//   });

//   return (
//     <>
//       <ArrowButton
//         variant="prev"
//         options={options}
//         disabled={disablePrev}
//         onClick={onClickPrev}
//         svgIcon={slotProps?.prevBtn?.svgIcon}
//         svgSize={slotProps?.prevBtn?.svgSize}
//         sx={[
//           (theme) => ({
//             ...baseStyles(theme),
//             left: 0,
//             transform: 'translate(-50%, -50%)',
//           }),
//           ...(Array.isArray(sx) ? sx : [sx]),
//           ...(Array.isArray(slotProps?.prevBtn?.sx)
//             ? (slotProps?.prevBtn?.sx ?? [])
//             : [slotProps?.prevBtn?.sx]),
//         ]}
//       />

//       <ArrowButton
//         variant="next"
//         options={options}
//         disabled={disableNext}
//         onClick={onClickNext}
//         svgIcon={slotProps?.nextBtn?.svgIcon}
//         svgSize={slotProps?.nextBtn?.svgSize}
//         sx={[
//           (theme) => ({
//             ...baseStyles(theme),
//             right: 0,
//             transform: 'translate(50%, -50%)',
//           }),
//           ...(Array.isArray(sx) ? sx : [sx]),
//           ...(Array.isArray(slotProps?.nextBtn?.sx)
//             ? (slotProps?.nextBtn?.sx ?? [])
//             : [slotProps?.nextBtn?.sx]),
//         ]}
//       />
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// const NumberButtonsRoot = styled('div')(({ theme }) => ({
//   gap: '2px',
//   zIndex: 9,
//   alignItems: 'center',
//   display: 'inline-flex',
//   padding: theme.spacing(0.5),
//   color: theme.vars.palette.common.white,
//   borderRadius: theme.shape.borderRadius * 1.25,
//   backgroundColor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
//   [`& .${carouselClasses.arrows.label}`]: {
//     ...theme.typography.subtitle2,
//     margin: theme.spacing(0, 0.5),
//   },
//   [`& .${carouselClasses.arrows.prev}`]: {
//     borderRadius: 'inherit',
//     padding: theme.spacing(0.75),
//   },
//   [`& .${carouselClasses.arrows.next}`]: {
//     borderRadius: 'inherit',
//     padding: theme.spacing(0.75),
//   },
// }));

// // ----------------------------------------------------------------------

// export function CarouselArrowNumberButtons({
//   sx,
//   options,
//   slotProps,
//   className,
//   totalSlides,
//   onClickPrev,
//   onClickNext,
//   disablePrev,
//   disableNext,
//   selectedIndex,
//   ...other
// }) {
//   return (
//     <NumberButtonsRoot
//       className={mergeClasses([carouselClasses.arrows.root, className])}
//       sx={sx}
//       {...other}
//     >
//       <ArrowButton
//         variant="prev"
//         options={options}
//         disabled={disablePrev}
//         onClick={onClickPrev}
//         svgIcon={slotProps?.prevBtn?.svgIcon}
//         svgSize={slotProps?.prevBtn?.svgSize ?? 16}
//         sx={slotProps?.prevBtn?.sx}
//       />

//       <span className={carouselClasses.arrows.label}>
//         {selectedIndex}/{totalSlides}
//       </span>

//       <ArrowButton
//         variant="next"
//         options={options}
//         disabled={disableNext}
//         onClick={onClickNext}
//         svgIcon={slotProps?.nextBtn?.svgIcon}
//         svgSize={slotProps?.nextBtn?.svgSize ?? 16}
//         sx={slotProps?.nextBtn?.sx}
//       />
//     </NumberButtonsRoot>
//   );
// }
"use client";

import { ArrowButton } from "./arrow-button";

// ----------------------------------------------------------------------
// BASIC BUTTONS
// ----------------------------------------------------------------------

export function CarouselArrowBasicButtons({
  options,
  slotProps,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
  className = "",
  ...other
}) {
  return (
    <div
      className={`
        z-[9]
        inline-flex
        items-center
        gap-1
        text-current
        ${className}
      `}
      {...other}
    >
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize}
        className={slotProps?.prevBtn?.className}
      />

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize}
        className={slotProps?.nextBtn?.className}
      />
    </div>
  );
}

// ----------------------------------------------------------------------
// FLOAT BUTTONS
// ----------------------------------------------------------------------

export function CarouselArrowFloatButtons({
  options,
  slotProps,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
  className = "",
}) {
  const baseStyles = `
    absolute
    top-1/2
    z-[9]
    
    bg-black
    text-white
    hover:opacity-80
    transition-opacity
  `;

  return (
    <>
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize}
        className={`
          ${baseStyles}
          left-0
          -translate-x-1/2
          -translate-y-1/2
          ${slotProps?.prevBtn?.className || ""}
          ${className}
        `}
      />

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize}
        className={`
          ${baseStyles}
          right-0
          translate-x-1/2
          -translate-y-1/2
          ${slotProps?.nextBtn?.className || ""}
          ${className}
        `}
      />
    </>
  );
}

// ----------------------------------------------------------------------
// NUMBER BUTTONS
// ----------------------------------------------------------------------

export function CarouselArrowNumberButtons({
  options,
  slotProps,
  className = "",
  totalSlides,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
  selectedIndex,
  ...other
}) {
  return (
    <div
      className={`
        z-[9]
        inline-flex
        items-center
        gap-0.5
        rounded-2xl
        bg-black/50
        px-2
        py-1
        text-white
        backdrop-blur-sm
        ${className}
      `}
      {...other}
    >
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize ?? 16}
        className={`
          rounded-inherit
          p-3
          ${slotProps?.prevBtn?.className || ""}
        `}
      />

      <span className="mx-1 text-sm font-semibold">
        {selectedIndex}/{totalSlides}
      </span>

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize ?? 16}
        className={`
          rounded-inherit
          p-3
          ${slotProps?.nextBtn?.className || ""}
        `}
      />
    </div>
  );
}
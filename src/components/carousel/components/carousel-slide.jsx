// import { mergeClasses } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';

// import { getSlideSize } from '../utils';
// import { carouselClasses } from '../classes';

// // ----------------------------------------------------------------------

// export function CarouselSlide({ sx, options, children, className, ...other }) {
//   const slideSize = getSlideSize(options?.slidesToShow);

//   return (
//     <CarouselSlideRoot
//       axis={options?.axis ?? 'x'}
//       slideSpacing={options?.slideSpacing}
//       className={mergeClasses([carouselClasses.slide.root, className])}
//       sx={[{ flex: slideSize }, ...(Array.isArray(sx) ? sx : [sx])]}
//       {...other}
//     >
//       {options?.parallax ? (
//         <div className={carouselClasses.slide.content}>
//           <div className={carouselClasses.slide.parallax}>{children}</div>
//         </div>
//       ) : (
//         children
//       )}
//     </CarouselSlideRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const CarouselSlideRoot = styled('li', {
//   shouldForwardProp: (prop) => !['axis', 'slideSpacing', 'sx'].includes(prop),
// })(({ slideSpacing }) => ({
//   display: 'block',
//   position: 'relative',
//   [`& .${carouselClasses.slide.content}`]: {
//     overflow: 'hidden',
//     position: 'relative',
//     borderRadius: 'inherit',
//   },
//   variants: [
//     { props: { axis: 'x' }, style: { minWidth: 0, paddingLeft: slideSpacing } },
//     { props: { axis: 'y' }, style: { minHeight: 0, paddingTop: slideSpacing } },
//   ],
// }));
"use client";

import { getSlideSize } from "../utils";

// ----------------------------------------------------------------------

export function CarouselSlide({
  options,
  children,
  className = "",
  ...other
}) {
  const slideSize = getSlideSize(options?.slidesToShow);

  const axis = options?.axis ?? "x";
  const slideSpacing = options?.slideSpacing ?? "0px";

  // Handle responsive flex sizes using CSS variables
  let baseFlex = "0 0 100%";
  let responsiveStyles = {};

  if (options?.slidesToShow) {
    if (typeof options.slidesToShow === 'object') {
      const { xs, sm, md, lg, xl } = options.slidesToShow;

      const getFlexValue = (val) => {
        if (!val) return undefined;
        if (typeof val === 'number') return `0 0 ${(100 / val)}%`;
        if (val === 'auto') return `0 0 auto`;
        return `0 0 ${val}`;
      };

      // Set lowest breakpoint available as the base flex
      baseFlex = getFlexValue(xs) || getFlexValue(sm) || getFlexValue(md) || getFlexValue(lg) || getFlexValue(xl) || baseFlex;

      // We will pass these onto inline CSS variables to allow media queries if needed,
      // but React `style` doesn't support media queries.
      // Easiest is to let a small CSS class handle this, or just rely on global tailwind classes
      // Wait, there's a simple trick. Since we are in React and Tailwind:
      // Tailwind provides static classes like: basis-1/2, sm:basis-1/3, etc.
    } else {
      baseFlex = getSlideSize(options.slidesToShow);
    }
  }

  // Instead of dynamic generation, we map to exact Tailwind basis classes which JIT can scan
  let tailwindBasisClasses = "";
  if (typeof options?.slidesToShow === 'object') {
    const mapVal = (val) => {
      if (val === 1) return `basis-full`;
      if (val === 2) return `basis-1/2`;
      if (val === 3) return `basis-1/3`;
      if (val === 4) return `basis-1/4`;
      if (val === 5) return `basis-1/5`;
      if (val === 6) return `basis-1/6`;
      if (val === 'auto') return 'basis-auto';
      return '';
    };

    // In MUI, xs is the default base (mobile first). sm is 600px, etc.
    const { xs, sm, md, lg, xl } = options.slidesToShow;
    const cls = [];
    if (xs) cls.push(`${mapVal(xs)}`); // No max-sm, xs acts as the default
    if (sm) cls.push(`sm:${mapVal(sm)}`);
    if (md) cls.push(`md:${mapVal(md)}`);
    if (lg) cls.push(`lg:${mapVal(lg)}`);
    if (xl) cls.push(`xl:${mapVal(xl)}`);

    tailwindBasisClasses = cls.filter(c => !c.endsWith(':')).join(" ");
  }

  return (
    <li
      className={`
        relative
        block
        shrink-0
        grow-0
        ${tailwindBasisClasses}
        ${axis === "x" ? "min-w-0" : "min-h-0"}

        ${className}
      `}
      style={{
        ...(!tailwindBasisClasses && { flex: baseFlex }),
        ...(axis === "x"
          ? {
            paddingLeft: slideSpacing,
          }
          : {
            paddingTop: slideSpacing,
          }),
      }}
      {...other}
    >
      {options?.parallax ? (
        <div className="relative overflow-hidden rounded-inherit">
          <div>{children}</div>
        </div>
      ) : (
        children
      )}
    </li>
  );
}
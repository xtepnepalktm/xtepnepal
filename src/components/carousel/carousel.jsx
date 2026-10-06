// import { Children, isValidElement } from 'react';
// import { mergeClasses } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';

// import { carouselClasses } from './classes';
// import { CarouselSlide } from './components/carousel-slide';

// // ----------------------------------------------------------------------

// export function Carousel({ sx, carousel, children, slotProps, className, ...other }) {
//   const { mainRef, options } = carousel;

//   const axis = options?.axis ?? 'x';
//   const slideSpacing = options?.slideSpacing ?? '0px';

//   const renderChildren = () =>
//     Children.map(children, (child) => {
//       if (isValidElement(child)) {
//         const reactChild = child;

//         return (
//           <CarouselSlide key={reactChild.key} options={carousel.options} sx={slotProps?.slide}>
//             {child}
//           </CarouselSlide>
//         );
//       }
//       return null;
//     });

//   return (
//     <CarouselRoot
//       sx={sx}
//       ref={mainRef}
//       axis={axis}
//       className={mergeClasses([carouselClasses.root, className])}
//       {...other}
//     >
//       <CarouselContainer
//         axis={axis}
//         slideSpacing={slideSpacing}
//         className={carouselClasses.container}
//         sx={[
//           (theme) => ({
//             ...(carousel.pluginNames?.includes('autoHeight') && {
//               alignItems: 'flex-start',
//               transition: theme.transitions.create(['height'], {
//                 easing: theme.transitions.easing.easeInOut,
//                 duration: theme.transitions.duration.shorter,
//               }),
//             }),
//           }),
//           ...(Array.isArray(slotProps?.container)
//             ? (slotProps?.container ?? [])
//             : [slotProps?.container]),
//         ]}
//       >
//         {renderChildren()}
//       </CarouselContainer>
//     </CarouselRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const CarouselRoot = styled('div', {
//   shouldForwardProp: (prop) => !['axis', 'sx'].includes(prop),
// })(() => ({
//   margin: 'auto',
//   maxWidth: '100%',
//   overflow: 'hidden',
//   position: 'relative',
//   variants: [{ props: { axis: 'y' }, style: { height: '100%' } }],
// }));

// const CarouselContainer = styled('ul', {
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
import { Children, isValidElement } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import { carouselClasses } from './classes';
import { CarouselSlide } from './components/carousel-slide';

// ----------------------------------------------------------------------

export function Carousel({ className, style, carousel, children, slotProps, ...other }) {
  const { mainRef, options } = carousel;

  const axis = options?.axis ?? 'x';
  const slideSpacing = options?.slideSpacing ?? '0px';

  const isAutoHeight = carousel.pluginNames?.includes('autoHeight');

  const renderChildren = () =>
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        const reactChild = child;

        return (
          <CarouselSlide key={reactChild.key} options={carousel.options} className={slotProps?.slide}>
            {child}
          </CarouselSlide>
        );
      }
      return null;
    });

  return (
    <div
      ref={mainRef}
      className={mergeClasses([
        carouselClasses.root,
        'mx-auto max-w-full overflow-hidden relative',
        axis === 'y' && 'h-full',
        className,
      ])}
      style={style}
      {...other}
    >
      <ul
        className={mergeClasses([
          carouselClasses.container,
          'flex backface-hidden',
          axis === 'x' && 'touch-pan-y',
          axis === 'y' && 'h-full flex-col touch-pan-x',
          isAutoHeight && 'items-start transition-[height] duration-200 ease-in-out',
          slotProps?.container,
        ])}
        style={{
          ...(axis === 'x' && { marginLeft: `calc(${slideSpacing} * -1)` }),
          ...(axis === 'y' && { marginTop: `calc(${slideSpacing} * -1)` }),
        }}
      >
        {renderChildren()}
      </ul>
    </div>
  );
}
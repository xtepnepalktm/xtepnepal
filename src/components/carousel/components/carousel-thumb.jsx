// import { mergeClasses } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';
// import ButtonBase from '@mui/material/ButtonBase';

// import { carouselClasses } from '../classes';

// // ----------------------------------------------------------------------

// export function CarouselThumb({ sx, src, index, selected, className, ...other }) {
//   return (
//     <ThumbRoot
//       selected={selected}
//       className={mergeClasses([carouselClasses.thumbs.item, className])}
//       sx={sx}
//       {...other}
//     >
//       <img alt={`carousel-thumb-${index}`} src={src} className={carouselClasses.thumbs.image} />
//     </ThumbRoot>
//   );
// }

// // ----------------------------------------------------------------------

// const ThumbRoot = styled(ButtonBase, {
//   shouldForwardProp: (prop) => !['selected', 'sx'].includes(prop),
// })(({ theme }) => ({
//   width: 64,
//   height: 64,
//   opacity: 0.48,
//   flexShrink: 0,
//   cursor: 'pointer',
//   borderRadius: theme.shape.borderRadius * 1.25,
//   transition: theme.transitions.create(['opacity', 'box-shadow'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.short,
//   }),
//   [`& .${carouselClasses.thumbs.image}`]: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     borderRadius: 'inherit',
//   },
//   variants: [
//     {
//       props: { selected: true },
//       style: { opacity: 1, boxShadow: `0 0 0 2px ${theme.vars.palette.primary.main}` },
//     },
//   ],
// }));
"use client";

// ----------------------------------------------------------------------

export function CarouselThumb({
  src,
  index,
  selected,
  className = "",
  ...other
}) {
  return (
    <button
      type="button"
      className={`
        h-16
        w-16
        shrink-0
        cursor-pointer
        overflow-hidden
        rounded-2xl
        transition-all
        duration-200
        ease-in-out

        ${selected
          ? "opacity-100 ring-2 ring-primary"
          : "opacity-50"
        }

        ${className}
      `}
      {...other}
    >
      <img
        alt={`carousel-thumb-${index}`}
        src={src}
        className="h-full w-full rounded-inherit object-cover"
      />
    </button>
  );
}
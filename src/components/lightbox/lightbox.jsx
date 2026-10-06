// import { mergeClasses } from "minimal-shared/utils";
// import ReactLightbox, { useLightboxState } from "yet-another-react-lightbox";

// import Box from "@mui/material/Box";

// import { Iconify } from "../iconify";
// import { getPlugins } from "./utils";
// import { lightboxClasses } from "./classes";

// // ----------------------------------------------------------------------

// export function Lightbox({
//   slides,
//   disableZoom,
//   disableVideo,
//   disableTotal,
//   disableCaptions,
//   disableSlideshow,
//   disableThumbnails,
//   disableFullscreen,
//   onGetCurrentIndex,
//   className,
//   ...other
// }) {
//   const totalItems = slides ? slides.length : 0;

//   return (
//     <ReactLightbox
//       slides={slides}
//       animation={{ swipe: 240 }}
//       carousel={{ finite: totalItems < 5 }}
//       controller={{ closeOnBackdropClick: true }}
//       plugins={getPlugins({
//         disableZoom,
//         disableVideo,
//         disableCaptions,
//         disableSlideshow,
//         disableThumbnails,
//         disableFullscreen,
//       })}
//       on={{
//         view: ({ index }) => {
//           if (onGetCurrentIndex) {
//             onGetCurrentIndex(index);
//           }
//         },
//       }}
//       toolbar={{
//         buttons: [
//           <DisplayTotal
//             key={0}
//             totalItems={totalItems}
//             disableTotal={disableTotal}
//           />,
//           "close",
//         ],
//       }}
//       render={{
//         iconClose: () => <Iconify width={24} icon="carbon:close" />,
//         iconZoomIn: () => <Iconify width={24} icon="carbon:zoom-in" />,
//         iconZoomOut: () => <Iconify width={24} icon="carbon:zoom-out" />,
//         iconSlideshowPlay: () => <Iconify width={24} icon="carbon:play" />,
//         iconSlideshowPause: () => <Iconify width={24} icon="carbon:pause" />,
//         iconPrev: () => <Iconify width={32} icon="carbon:chevron-left" />,
//         iconNext: () => <Iconify width={32} icon="carbon:chevron-right" />,
//         iconExitFullscreen: () => (
//           <Iconify width={24} icon="carbon:center-to-fit" />
//         ),
//         iconEnterFullscreen: () => (
//           <Iconify width={24} icon="carbon:fit-to-screen" />
//         ),
//       }}
//       className={mergeClasses([lightboxClasses.root, className])}
//       {...other}
//     />
//   );
// }

// // ----------------------------------------------------------------------

// function DisplayTotal({ totalItems, disableTotal }) {
//   const { currentIndex } = useLightboxState();

//   if (disableTotal) {
//     return null;
//   }

//   return (
//     <Box
//       component="span"
//       className="yarl__button"
//       sx={{
//         typography: "body2",
//         alignItems: "center",
//         display: "inline-flex",
//         justifyContent: "center",
//       }}
//     >
//       <strong> {currentIndex + 1} </strong> / {totalItems}
//     </Box>
//   );
// }
'use client';

import ReactLightbox, { useLightboxState } from 'yet-another-react-lightbox';
import clsx from 'clsx';

import { Iconify } from '../iconify';
import { getPlugins } from './utils';
import { lightboxClasses } from './classes';

// ------------------------------------------------------

export function Lightbox({
  slides,
  disableZoom,
  disableVideo,
  disableTotal,
  disableCaptions,
  disableSlideshow,
  disableThumbnails,
  disableFullscreen,
  onGetCurrentIndex,
  className,
  ...other
}) {
  const totalItems = slides?.length || 0;

  return (
    <ReactLightbox
      slides={slides}
      animation={{ swipe: 240 }}
      carousel={{ finite: totalItems < 5 }}
      controller={{ closeOnBackdropClick: true }}
      plugins={getPlugins({
        disableZoom,
        disableVideo,
        disableCaptions,
        disableSlideshow,
        disableThumbnails,
        disableFullscreen,
      })}
      on={{
        view: ({ index }) => {
          onGetCurrentIndex?.(index);
        },
      }}
      toolbar={{
        buttons: [
          <DisplayTotal
            key="total"
            totalItems={totalItems}
            disableTotal={disableTotal}
          />,
          'close',
        ],
      }}
      render={{
        iconClose: () => (
          <Iconify width={24} icon="carbon:close" />
        ),
        iconZoomIn: () => (
          <Iconify width={24} icon="carbon:zoom-in" />
        ),
        iconZoomOut: () => (
          <Iconify width={24} icon="carbon:zoom-out" />
        ),
        iconSlideshowPlay: () => (
          <Iconify width={24} icon="carbon:play" />
        ),
        iconSlideshowPause: () => (
          <Iconify width={24} icon="carbon:pause" />
        ),
        iconPrev: () => (
          <Iconify width={32} icon="carbon:chevron-left" />
        ),
        iconNext: () => (
          <Iconify width={32} icon="carbon:chevron-right" />
        ),
        iconExitFullscreen: () => (
          <Iconify width={24} icon="carbon:center-to-fit" />
        ),
        iconEnterFullscreen: () => (
          <Iconify width={24} icon="carbon:fit-to-screen" />
        ),
      }}
      className={clsx(lightboxClasses.root, className)}
      {...other}
    />
  );
}

// ------------------------------------------------------

function DisplayTotal({ totalItems, disableTotal }) {
  const { currentIndex } = useLightboxState();

  if (disableTotal) return null;

  return (
    <span className="flex items-center justify-center text-sm px-2 py-1 text-white/80">
      <strong className="text-white">
        {currentIndex + 1}
      </strong>
      <span className="mx-1">/</span>
      {totalItems}
    </span>
  );
}
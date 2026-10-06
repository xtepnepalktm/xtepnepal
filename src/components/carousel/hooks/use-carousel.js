// import { useMemo } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';

// import { useTheme } from '@mui/material/styles';

// import { useThumbs } from './use-thumbs';
// import { useCarouselDots } from './use-carousel-dots';
// import { useParallax } from './use-carousel-parallax';
// import { useCarouselArrows } from './use-carousel-arrows';
// import { useCarouselProgress } from './use-carousel-progress';
// import { useCarouselAutoPlay } from './use-carousel-auto-play';
// import { useCarouselAutoScroll } from './use-carousel-auto-scroll';

// // ----------------------------------------------------------------------

// export const useCarousel = (options, plugins) => {
//   const theme = useTheme();

//   const [mainRef, mainApi] = useEmblaCarousel({ ...options, direction: theme.direction }, plugins);

//   const { disablePrev, disableNext, onClickPrev, onClickNext } = useCarouselArrows(mainApi);

//   const pluginNames = plugins?.map((plugin) => plugin.name);

//   const _dots = useCarouselDots(mainApi);

//   const _autoplay = useCarouselAutoPlay(mainApi);

//   const _autoScroll = useCarouselAutoScroll(mainApi);

//   const _progress = useCarouselProgress(mainApi);

//   const _thumbs = useThumbs(mainApi, options?.thumbs);

//   useParallax(mainApi, options?.parallax);

//   const controls = useMemo(() => {
//     if (pluginNames?.includes('autoplay')) {
//       return {
//         onClickPrev: () => _autoplay.onClickAutoplay(onClickPrev),
//         onClickNext: () => _autoplay.onClickAutoplay(onClickNext),
//       };
//     }
//     if (pluginNames?.includes('autoScroll')) {
//       return {
//         onClickPrev: () => _autoScroll.onClickAutoplay(onClickPrev),
//         onClickNext: () => _autoScroll.onClickAutoplay(onClickNext),
//       };
//     }
//     return { onClickPrev, onClickNext };
//   }, [_autoScroll, _autoplay, onClickNext, onClickPrev, pluginNames]);

//   const mergedOptions = { ...options, ...mainApi?.internalEngine().options };

//   return {
//     options: mergedOptions,
//     pluginNames,
//     mainRef,
//     mainApi,
//     // arrows
//     arrows: {
//       disablePrev,
//       disableNext,
//       onClickPrev: controls.onClickPrev,
//       onClickNext: controls.onClickNext,
//     },
//     // dots
//     dots: _dots,
//     // thumbs
//     thumbs: _thumbs,
//     // progress
//     progress: _progress,
//     // autoplay
//     autoplay: _autoplay,
//     autoScroll: _autoScroll,
//   };
// };
"use client";

import { useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { useThumbs } from "./use-thumbs";
import { useCarouselDots } from "./use-carousel-dots";
import { useParallax } from "./use-carousel-parallax";
import { useCarouselArrows } from "./use-carousel-arrows";
import { useCarouselProgress } from "./use-carousel-progress";
import { useCarouselAutoPlay } from "./use-carousel-auto-play";
import { useCarouselAutoScroll } from "./use-carousel-auto-scroll";

// ----------------------------------------------------------------------

export const useCarousel = (options = {}, plugins = []) => {
  // RTL support
  const direction =
    typeof document !== "undefined"
      ? document.documentElement.dir || "ltr"
      : "ltr";

  // Embla
  const [mainRef, mainApi] = useEmblaCarousel(
    {
      ...options,
      direction,
    },
    plugins
  );

  // Arrow Controls
  const {
    disablePrev,
    disableNext,
    onClickPrev,
    onClickNext,
  } = useCarouselArrows(mainApi);

  // Plugin Names
  const pluginNames = plugins?.map((plugin) => plugin.name);

  // Dots
  const dots = useCarouselDots(mainApi);

  // Autoplay
  const autoplay = useCarouselAutoPlay(mainApi);

  // Auto Scroll
  const autoScroll = useCarouselAutoScroll(mainApi);

  // Progress
  const progress = useCarouselProgress(mainApi);

  // Thumbs
  const thumbs = useThumbs(mainApi, options?.thumbs);

  // Parallax
  useParallax(mainApi, options?.parallax);

  // Controls
  const controls = useMemo(() => {
    if (pluginNames?.includes("autoplay")) {
      return {
        onClickPrev: () =>
          autoplay.onClickAutoplay(onClickPrev),

        onClickNext: () =>
          autoplay.onClickAutoplay(onClickNext),
      };
    }

    if (pluginNames?.includes("autoScroll")) {
      return {
        onClickPrev: () =>
          autoScroll.onClickAutoplay(onClickPrev),

        onClickNext: () =>
          autoScroll.onClickAutoplay(onClickNext),
      };
    }

    return {
      onClickPrev,
      onClickNext,
    };
  }, [
    autoScroll,
    autoplay,
    onClickNext,
    onClickPrev,
    pluginNames,
  ]);

  // Merge Options
  const mergedOptions = {
    ...options,
    ...(mainApi?.internalEngine()?.options || {}),
  };

  return {
    options: mergedOptions,
    pluginNames,

    mainRef,
    mainApi,

    // arrows
    arrows: {
      disablePrev,
      disableNext,
      onClickPrev: controls.onClickPrev,
      onClickNext: controls.onClickNext,
    },

    // dots
    dots,

    // thumbs
    thumbs,

    // progress
    progress,

    // autoplay
    autoplay,

    // autoScroll
    autoScroll,
  };
};
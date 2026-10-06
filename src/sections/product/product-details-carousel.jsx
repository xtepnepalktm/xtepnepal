// // import { useEffect } from "react";

// // import Box from "@mui/material/Box";

// // import { CONFIG } from "@/global-config";

// // import { Image } from "@/components/image";
// // import { Lightbox, useLightBox } from "@/components/lightbox";
// // import {
// //   Carousel,
// //   CarouselThumb,
// //   CarouselThumbs,
// //   CarouselArrowNumberButtons,
// // } from "@/components/carousel";

// // // ----------------------------------------------------------------------

// // export function ProductDetailsCarousel({ carousel, images }) {
// //   const slides =
// //     images?.map((img) => ({ src: `${img.image}` })) || [];

// //   const lightbox = useLightBox(slides);

// //   useEffect(() => {
// //     if (lightbox.open) {
// //       carousel.mainApi?.scrollTo(lightbox.selected, true);
// //     }
// //   }, [carousel.mainApi, lightbox.open, lightbox.selected]);

// //   return (
// //     <>
// //       <div>
// //         <Box sx={{ mb: 2.5, position: "relative" }}>
// //           <CarouselArrowNumberButtons
// //             {...carousel.arrows}
// //             options={carousel.options}
// //             totalSlides={carousel.dots.dotCount}
// //             selectedIndex={carousel.dots.selectedIndex + 1}
// //             sx={{ right: 16, bottom: 16, position: "absolute" }}
// //           />

// //           <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
// //             {slides.map((slide, index) => (
// //               <Image
// //                 key={index}
// //                 alt={slide.src}
// //                 src={slide.src}
// //                 ratio="3/3"
// //                 onClick={() => lightbox.onOpen(slide.src)}
// //                 sx={{ cursor: "zoom-in", minWidth: 320, objectFit: "contain" }}
// //               />
// //             ))}
// //           </Carousel>
// //         </Box>

// //         <CarouselThumbs
// //           ref={carousel.thumbs.thumbsRef}
// //           options={carousel.options?.thumbs}
// //           slotProps={{ disableMask: true }}
// //           sx={{ width: 360 }}
// //         >
// //           {slides.map((item, index) => (
// //             <CarouselThumb
// //               key={index}
// //               index={index}
// //               src={item.src}
// //               selected={index === carousel.thumbs.selectedIndex}
// //               onClick={() => carousel.thumbs.onClickThumb(index)}
// //             />
// //           ))}
// //         </CarouselThumbs>
// //       </div>

// //       <Lightbox
// //         index={lightbox.selected}
// //         slides={slides}
// //         open={lightbox.open}
// //         close={lightbox.onClose}
// //         onGetCurrentIndex={(index) => lightbox.setSelected(index)}
// //       />
// //     </>
// //   );
// // }
// import { useEffect } from "react";

// import { Image } from "@/components/image";
// import { Lightbox, useLightBox } from "@/components/lightbox";

// // NOTE: You must already have a non-MUI carousel implementation or Swiper/Embla wrapper
// import {
//   Carousel,
//   CarouselThumb,
//   CarouselThumbs,
//   CarouselArrowNumberButtons,
// } from "@/components/carousel";

// export function ProductDetailsCarousel({ carousel, images }) {
//   const slides = images?.map((img) => ({ src: img.image })) || [];

//   const lightbox = useLightBox(slides);

//   useEffect(() => {
//     if (lightbox.open) {
//       carousel.mainApi?.scrollTo(lightbox.selected, true);
//     }
//   }, [carousel.mainApi, lightbox.open, lightbox.selected]);

//   return (
//     <div className="w-full">
//       {/* MAIN CAROUSEL */}
//       <div className="mb-6 relative  overflow-hidden">
//         {/* Arrow + counter */}
//         <div className="absolute right-4 bottom-4 z-10">
//           <CarouselArrowNumberButtons
//             {...carousel.arrows}
//             options={carousel.options}
//             totalSlides={carousel.dots.dotCount}
//             selectedIndex={carousel.dots.selectedIndex + 1}
//           />
//         </div>

//         <Carousel carousel={carousel}>
//           {slides.map((slide, index) => (
//             <div
//               key={index}
//               className="min-w-[320px] cursor-zoom-in"
//               onClick={() => lightbox.onOpen(slide.src)}
//             >
//               <Image
//                 alt={slide.src}
//                 src={slide.src}
//                 ratio="3/3"
//                 className="object-contain w-full"
//               />
//             </div>
//           ))}
//         </Carousel>
//       </div>

//       {/* THUMBNAILS */}
//       <div className="w-[360px]">
//         <CarouselThumbs
//           ref={carousel.thumbs.thumbsRef}
//           options={carousel.options?.thumbs}
//           disableMask
//         >
//           {slides.map((item, index) => (
//             <CarouselThumb
//               key={index}
//               index={index}
//               src={item.src}
//               selected={index === carousel.thumbs.selectedIndex}
//               onClick={() => carousel.thumbs.onClickThumb(index)}
//             />
//           ))}
//         </CarouselThumbs>
//       </div>

//       {/* LIGHTBOX */}
//       <Lightbox
//         index={lightbox.selected}
//         slides={slides}
//         open={lightbox.open}
//         close={lightbox.onClose}
//         onGetCurrentIndex={(index) => lightbox.setSelected(index)}
//       />
//     </div>
//   );
// }

import { useEffect } from "react";
import { Image } from "@/components/image";
import { Lightbox, useLightBox } from "@/components/lightbox";
import {
  Carousel,
  CarouselThumb,
  CarouselThumbs,
  CarouselArrowNumberButtons,
} from "@/components/carousel";

export function ProductDetailsCarousel({ carousel, images }) {
  const slides =
    images?.map((img) => ({ src: img.image, isVariant: !!img.isVariant })) || [];

  // Variant images live at the end of the list and are never shown as thumbnails,
  // so thumb indexes still line up with the main carousel indexes.
  const thumbSlides = slides.filter((slide) => !slide.isVariant);

  const lightbox = useLightBox(slides);

  useEffect(() => {
    if (lightbox.open) {
      carousel.mainApi?.scrollTo(lightbox.selected, true);
    }
  }, [carousel.mainApi, lightbox.open, lightbox.selected]);

  return (
    <div className="flex flex-col gap-3 w-full">

      {/* ── Main Image ────────────────────────────────────────── */}
      <div className="relative bg-gray-50 overflow-hidden group aspect-square">
        <div className="absolute bottom-4 right-4 z-10">
          <CarouselArrowNumberButtons
            {...carousel.arrows}
            options={carousel.options}
            totalSlides={carousel.dots.dotCount}
            selectedIndex={carousel.dots.selectedIndex + 1}
          />
        </div>

        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-black/60 text-white text-[12px] font-medium tracking-widest uppercase px-2 py-1">
            Click to zoom
          </span>
        </div>

        <Carousel carousel={carousel}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="cursor-zoom-in w-full aspect-square"
              onClick={() => lightbox.onOpen(slide.src)}
            >
              <Image
                alt={`Product image ${index + 1}`}
                src={slide.src}
                ratio="1/1"
                className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* ── Horizontal Thumbnail Row ──────────────────────────── */}
      <div className="w-full overflow-x-auto">
        <CarouselThumbs
          ref={carousel.thumbs.thumbsRef}
          options={carousel.options?.thumbs}
          disableMask
          className="flex flex-row gap-2"
        >
          {thumbSlides.map((item, index) => (
            <button
              key={index}
              onClick={() => carousel.thumbs.onClickThumb(index)}
              className={[
                "w-[100px] h-[100px] shrink-0 overflow-hidden border-2 border-gray-300 transition-all duration-200",
                index === carousel.thumbs.selectedIndex
                  ? "border-black"
                  : "border-transparent hover:border-gray-300",
              ].join(" ")}
            >
              <img
                src={item.src}
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </CarouselThumbs>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </div>
  );
}
// "use client";

// import Autoplay from "embla-carousel-autoplay";

// import { Box, Stack, Typography, useTheme } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { CONFIG } from "@/global-config";

// import { Iconify } from "@/components/iconify";
// import { Image } from "@/components/image";
// import { Carousel, useCarousel } from "@/components/carousel";
// import { useGetHomeClients } from "@/api";

// // ----------------------------------------------------------------------

// export function HomeCustomerLogos() {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);
//   const { clients, clientsLoading } = useGetHomeClients();

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;

//   const carousel = useCarousel(
//     {
//       loop: clients?.length > 6,
//       align: "center",
//       slideSpacing: "15px",
//       slidesToShow: { xs: 2, sm: 3, md: 4, lg: 6 },
//       duration: 40,
//     },
//     clients?.length > 6 ? [Autoplay({ playOnInit: true, delay: 0, stopOnInteraction: false, stopOnMouseEnter: true })] : []
//   );

//   // Check if clients count is less than slides shown
//   const isCentered = clients?.length <= 6;

//   if (clientsLoading || !clients?.length) return null;

//   return (
//     <Stack component="section" spacing={4}>
//       {/* Section Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           textAlign: "center",
//           gap: 1,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Box
//             sx={{
//               p: 1.5,
//               borderRadius: 2,
//               bgcolor: varAlpha(theme.vars.palette.warning.mainChannel, 0.12),
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Iconify icon="solar:users-group-rounded-bold-duotone" width={28} sx={{ color: "warning.main" }} />
//           </Box>
//           <Box sx={{ textAlign: "left" }}>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 700,
//                 fontSize: { xs: "1.25rem", md: "1.5rem" },
//               }}
//             >
//               Trusted by Leading Brands
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Our valued partners and customers
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* Logos Carousel */}
//       <Box
//         sx={{
//           py: 4,
//           px: 2,
//           borderRadius: 3,
//           bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
//           border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
//           ...(isCentered && {
//             "& .embla__container": {
//               justifyContent: "center",
//             },
//           }),
//         }}
//       >
//         <Carousel carousel={carousel}>
//           {clients.map((client, index) => (
//             <CustomerLogoItem
//               key={client.id || index}
//               client={client}
//               primaryColor={primaryColor}
//             />
//           ))}
//         </Carousel>
//       </Box>
//     </Stack>
//   );
// }

// // ----------------------------------------------------------------------

// function CustomerLogoItem({ client, primaryColor }) {
//   const theme = useTheme();
//   const { name, featured_image } = client;

//   return (
//     <Box
//       sx={{
//         p: { xs: 0.5, sm: 0.5, md: 1.5 },
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 2,
//         overflow: "visible",
//         bgcolor: "background.paper",
//         border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
//         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         minHeight: 120,
//         "&:hover": {
//           borderColor: primaryColor,
//           boxShadow: theme.shadows[4],
//           transform: "translateY(-2px)",
//           "& img": {
//             // filter: "grayscale(0%)",
//             opacity: 1,
//           },
//         },
//       }}
//     >
//       <Image
//         alt={name || "Customer Logo"}
//         title={name || "Customer Logo"}
//         src={`${featured_image}`}
//         sx={{
//           maxHeight: 120,
//           maxWidth: "auto",
//           objectFit: "contain",
//           // filter: "grayscale(100%)",
//           opacity: 1,
//           transition: "all 0.3s ease",
//           "&:hover": {
//             // filter: "grayscale(0%)",
//             opacity: 1,
//           },
//         }}
//       />
//     </Box>
//   );
// }
"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { useAppSelector } from "@/redux/hooks";
import { useGetHomeClients } from "@/api";

// ----------------------------------------------------------------------

const DEFAULT_PRIMARY = "#1976d2";

// Inline SVG — replaces <Iconify icon="solar:users-group-rounded-bold-duotone" />
function UsersGroupIcon({ size = 28, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        opacity={0.5}
        d="M13 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      />
      <path d="M13 13c-3.866 0-7 2.239-7 5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1c0-2.761-3.134-5-7-5zM5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-3 7a1 1 0 0 1-1-1c0-2.209 1.78-4 4-4 .374 0 .734.05 1.076.144C5.4 14.78 5 15.85 5 17c0 .693.134 1.355.376 1.963L2 20h-.001z" />
    </svg>
  );
}

// ----------------------------------------------------------------------

export function HomeCustomerLogos() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const { clients, clientsLoading } = useGetHomeClients();

  const primaryColor = vendor?.primary_color || DEFAULT_PRIMARY;

  const autoplay =
    clients?.length > 6
      ? [
        Autoplay({
          playOnInit: true,
          delay: 0,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]
      : [];

  const [emblaRef] = useEmblaCarousel(
    {
      watchResize: false, // disable auto resize watching

      loop: clients?.length > 6,
      align: "center",
      dragFree: true,
    },
    autoplay
  );

  const isCentered = clients?.length <= 6;

  if (clientsLoading || !clients?.length) return null;

  return (
    <section className="flex flex-col gap-4 mb-6 lg:mb-16">
      {/* ── Header ── */}
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className="flex items-center justify-center p-3"
            style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
          >
            <UsersGroupIcon size={28} className="text-yellow-500" />
          </div>

          {/* Text */}
          <div className="text-left">
            <h2 className="text-[1.25rem] font-bold text-gray-900 md:text-[1.5rem]">
              Trusted by Leading Brands
            </h2>
            <p className="text-sm text-gray-500">
              Our valued partners and customers
            </p>
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        className=" border px-2 py-4"
        style={{
          backgroundColor: "rgba(145,158,171,0.04)",
          borderColor: "rgba(145,158,171,0.08)",
        }}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            className={`flex gap-[15px] ${isCentered ? "justify-center" : ""}`}
          >
            {clients.map((client, index) => (
              <CustomerLogoItem
                key={client.id || index}
                client={client}
                primaryColor={primaryColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------

function CustomerLogoItem({ client, primaryColor }) {
  const { name, featured_image } = client;

  return (
    <div
      className="
        group flex min-h-[120px] min-w-[48%] items-center justify-center
        overflow-visible  border bg-white p-2
        transition-all duration-300 ease-in-out
        hover:-translate-y-[2px] hover:shadow-md
        sm:min-w-[30%] md:min-w-[22%] lg:min-w-[15%]
      "
      style={{ borderColor: "rgba(145,158,171,0.08)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = primaryColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(145,158,171,0.08)";
      }}
    >
      <img
        alt={name || "Customer Logo"}
        title={name || "Customer Logo"}
        src={featured_image}
        className="max-h-[120px] w-auto object-contain opacity-100 transition-all duration-300 ease-in-out"
      />
    </div>
  );
}
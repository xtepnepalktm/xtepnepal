// import { Box, Typography, Button, useTheme, Stack } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { CONFIG } from "@/global-config";

// import { RouterLink } from "@/routes/components";

// import { Image } from "@/components/image";
// import { Markdown } from "@/components/markdown";
// import { Iconify } from "@/components/iconify";

// export function HomeHighlightFeatures({ sliders }) {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;
//   const primaryDark = vendor?.primary_color ? `${vendor.primary_color}dd` : theme.palette.primary.dark;

//   return (
//     <Box component="section">
//       <Stack spacing={3}>
//         {/* Section Header */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Box
//             sx={{
//               p: 1.5,
//               borderRadius: 2,
//               bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.12),
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Iconify icon="solar:sale-bold-duotone" width={28} sx={{ color: "info.main" }} />
//           </Box>
//           <Box>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 700,
//                 fontSize: { xs: "1.25rem", md: "1.5rem" },
//               }}
//             >
//               Special Offers
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Exclusive deals you don't want to miss
//             </Typography>
//           </Box>
//         </Box>

//         {/* Banner Grid */}
//         <Box
//           sx={{
//             gap: 3,
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "repeat(1, 1fr)",
//               sm: "repeat(2, 1fr)",
//             },
//           }}
//         >
//           {sliders
//             ?.slice(0, 2)
//             ?.map(
//               ({ title, description, featured_image, product_url }, index) => (
//                 <Box
//                   key={title}
//                   component={RouterLink}
//                   href={product_url}
//                   sx={{
//                     p: 4,
//                     gap: 2,
//                     minHeight: 320,
//                     display: "flex",
//                     textDecoration: "none",
//                     borderRadius: 3,
//                     position: "relative",
//                     overflow: "hidden",
//                     transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                     background: index === 0
//                       ? `linear-gradient(135deg, ${primaryDark} 0%, ${primaryColor} 100%)`
//                       : varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
//                     color: index === 0 ? "common.white" : "text.primary",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: theme.shadows[16],
//                       "& .banner-image": {
//                         transform: "scale(1.1) rotate(3deg)",
//                       },
//                     },
//                     "&::before": index === 0 ? {
//                       content: '""',
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       background: `radial-gradient(circle at 80% 20%, ${varAlpha(theme.vars.palette.common.whiteChannel, 0.1)} 0%, transparent 50%)`,
//                       pointerEvents: "none",
//                     } : {},
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 2,
//                       alignItems: "start",
//                       flex: 1,
//                       zIndex: 1,
//                     }}
//                   >
//                     <Typography
//                       variant="h3"
//                       sx={{
//                         fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.6rem" },
//                         fontWeight: 700,
//                       }}
//                     >
//                       {title}
//                     </Typography>

//                     <Box
//                       sx={{
//                         opacity: 0.9,
//                         "& p": {
//                           fontSize: { xs: "0.85rem", md: "0.95rem" },
//                           lineHeight: 1.6,
//                         },
//                       }}
//                     >
//                       <Markdown children={description} />
//                     </Box>

//                     <Button
//                       variant={index === 0 ? "contained" : "outlined"}
//                       endIcon={<Iconify icon="solar:arrow-right-bold" />}
//                       sx={{
//                         mt: "auto",
//                         whiteSpace: "nowrap",
//                         fontWeight: 600,
//                         borderRadius: 2,
//                         px: 3,
//                         ...(index === 0 && {
//                           bgcolor: "common.white",
//                           color: primaryColor,
//                           "&:hover": {
//                             bgcolor: "common.white",
//                             transform: "translateX(4px)",
//                           },
//                         }),
//                         ...(index !== 0 && {
//                           borderColor: primaryColor,
//                           color: primaryColor,
//                           "&:hover": {
//                             borderColor: primaryColor,
//                             bgcolor: `${primaryColor}14`,
//                           },
//                         }),
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       Shop Now
//                     </Button>
//                   </Box>

//                   <Box
//                     sx={{
//                       flex: "0 0 40%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Image
//                       alt={title}
//                       title={title}
//                       src={`${featured_image}`}
//                       className="banner-image"
//                       sx={{
//                         maxHeight: 200,
//                         borderRadius: 3,
//                         transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               )
//             )}
//         </Box>

//         {/* Secondary Banners */}
//         <Box
//           sx={{
//             gap: 3,
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "repeat(1, 1fr)",
//               sm: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//             },
//           }}
//         >
//           {sliders
//             ?.slice(2, 5)
//             ?.map(
//               ({ title, description, featured_image, product_url }, index) => (
//                 <Box
//                   key={index}
//                   component={RouterLink}
//                   href={product_url}
//                   sx={{
//                     p: 3,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     textAlign: "center",
//                     textDecoration: "none",
//                     color: "inherit",
//                     borderRadius: 3,
//                     bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
//                     border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
//                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                     "&:hover": {
//                       bgcolor: "background.paper",
//                       boxShadow: theme.shadows[8],
//                       transform: "translateY(-4px)",
//                       borderColor: primaryColor,
//                       "& .mini-banner-image": {
//                         transform: "scale(1.1)",
//                       },
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       mb: 2,
//                       overflow: "hidden",
//                       borderRadius: 2,
//                     }}
//                   >
//                     <Image
//                       alt={title}
//                       title={title}
//                       src={`${featured_image}`}
//                       className="mini-banner-image"
//                       sx={{
//                         height: 120,
//                         width: "auto",
//                         transition: "transform 0.3s ease",
//                       }}
//                     />
//                   </Box>

//                   <Typography
//                     variant="overline"
//                     sx={{
//                       color: primaryColor,
//                       fontWeight: 600,
//                     }}
//                   >
//                     New Arrival
//                   </Typography>

//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 600,
//                       fontSize: { xs: "0.9rem", md: "1rem" },
//                     }}
//                   >
//                     {title}
//                   </Typography>
//                 </Box>
//               )
//             )}
//         </Box>
//       </Stack>
//     </Box>
//   );
// }
"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { Markdown } from "@/components/markdown";

// ----------------------------------------------------------------------

const DEFAULT_PRIMARY = "#1976d2";
const DEFAULT_PRIMARY_DARK = "#1565c0";

function hexAlpha(hex, opacity) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

// ----------------------------------------------------------------------
// Inline SVGs
// ----------------------------------------------------------------------

function SaleIcon({ size = 28, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path opacity={0.5} d="M3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464z" />
      <path d="M8.5 9a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm0 1.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 4.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm0 1.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm.03-9.28a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 0 1-1.06-1.06l7-7a.75.75 0 0 1 1.06 0z" />
    </svg>
  );
}

function ArrowRightIcon({ size = 18, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7 7a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H4a.75.75 0 0 1 0-1.5h14.69l-5.72-5.72a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
    </svg>
  );
}

// ----------------------------------------------------------------------

export function HomeHighlightFeatures({ sliders }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || DEFAULT_PRIMARY;
  const primaryDark = vendor?.primary_color
    ? `${vendor.primary_color}dd`
    : DEFAULT_PRIMARY_DARK;

  return (
    <section className="flex flex-col gap-6">

      {/* ── Section Header ── */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center  p-3 bg-cyan-100">
          <SaleIcon size={28} className="text-cyan-600" />
        </div>
        <div>
          <h2 className="text-[1.25rem] font-bold text-gray-900 md:text-[1.5rem]">
            Special Offers
          </h2>
          <p className="text-sm text-gray-500">
            Exclusive deals you don't want to miss
          </p>
        </div>
      </div>

      {/* ── Primary Banners (first 2) ── */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {sliders?.slice(0, 2)?.map(({ title, description, featured_image, product_url }, index) => {
          const isPrimary = index === 0;

          return (
            <Link
              key={title}
              href={product_url}
              className="group relative flex min-h-[320px] overflow-hidden  p-8 no-underline transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: isPrimary
                  ? `linear-gradient(135deg, ${primaryDark} 0%, ${primaryColor} 100%)`
                  : "rgba(145,158,171,0.08)",
                color: isPrimary ? "#fff" : "inherit",
              }}
            >
              {/* Radial overlay for primary card */}
              {isPrimary && (
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  }}
                />
              )}

              {/* Text content */}
              <div className="relative z-10 flex flex-1 flex-col items-start gap-4">
                <h3 className="text-[1.1rem] font-bold sm:text-[1.3rem] md:text-[1.6rem]">
                  {title}
                </h3>

                <div
                  className="opacity-90 text-[0.85rem] leading-relaxed md:text-[0.95rem]"
                  style={{ lineHeight: 1.6 }}
                >
                  <Markdown>{description}</Markdown>
                </div>

                {isPrimary ? (
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="mt-auto inline-flex items-center gap-2  bg-white px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:translate-x-1"
                    style={{ color: primaryColor }}
                  >
                    Shop Now <ArrowRightIcon size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="mt-auto inline-flex items-center gap-2  border-2 px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:translate-x-1"
                    style={{
                      borderColor: primaryColor,
                      color: primaryColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = hexAlpha(primaryColor, 0.08);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    Shop Now <ArrowRightIcon size={16} />
                  </button>
                )}
              </div>

              {/* Banner image */}
              <div className="flex flex-[0_0_40%] items-center justify-center">
                <img
                  alt={title}
                  title={title}
                  src={featured_image}
                  className="max-h-[200px] w-auto  object-contain transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110 group-hover:rotate-3"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Secondary Banners (next 3) ── */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {sliders?.slice(2, 5)?.map(({ title, featured_image, product_url }, index) => (
          <Link
            key={index}
            href={product_url}
            className="group flex flex-col items-center  border p-6 text-center no-underline transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            style={{
              backgroundColor: "rgba(145,158,171,0.04)",
              borderColor: "rgba(145,158,171,0.08)",
              color: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = primaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(145,158,171,0.08)";
            }}
          >
            {/* Image */}
            <div className="mb-4 overflow-hidden ">
              <img
                alt={title}
                title={title}
                src={featured_image}
                className="h-[120px] w-auto object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            {/* "New Arrival" label */}
            <span
              className="mb-1 text-xs font-semibold uppercase tracking-widest"
              style={{ color: primaryColor }}
            >
              New Arrival
            </span>

            {/* Title */}
            <h4 className="text-[0.9rem] font-semibold text-gray-900 md:text-[1rem]">
              {title}
            </h4>
          </Link>
        ))}
      </div>

    </section>
  );
}
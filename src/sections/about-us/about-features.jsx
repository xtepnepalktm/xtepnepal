// "use client";

// import { Box, Container, Typography, Stack, useTheme, Card, Grid2 } from "@mui/material";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { Iconify } from "@/components/iconify";
// import { useGetAboutData } from "@/api/about";

// // ----------------------------------------------------------------------
// // export const capabilities = [
// //   {
// //     id: 1,
// //     title: "Expert Team",
// //     icon: "fa-users-cog",
// //     description:
// //       "A multidisciplinary team with strong expertise in nutraceuticals, formulations, healthcare marketing, and regulatory-aligned product positioning.",
// //     key: "expert-team",
// //   },
// //   {
// //     id: 2,
// //     title: "Niche Healthcare Marketing",
// //     icon: "fa-lightbulb",
// //     description:
// //       "Focused marketing strategies tailored for nutraceuticals, wellness, and healthcare products, driven by digital-first and data-backed approaches.",
// //     key: "healthcare-marketing",
// //   },
// //   {
// //     id: 3,
// //     title: "Contract Manufacturing Support",
// //     icon: "fa-cog",
// //     description:
// //       "End-to-end support for product conceptualization, formulation coordination, and sourcing through trusted contract manufacturing partners.",
// //     key: "contract-manufacturing",
// //   },
// //   {
// //     id: 4,
// //     title: "Franchise Partnerships",
// //     icon: "fa-heart",
// //     description:
// //       "Franchise and distribution partnerships for domestic and international nutraceutical, cosmeceutical, medical device, and wellness brands.",
// //     key: "franchise-partnerships",
// //   },
// //   {
// //     id: 5,
// //     title: "Strategic Marketing Consultation",
// //     icon: "fa-rockett",
// //     description:
// //       "Marketing strategy development, field audits, and go-to-market planning designed specifically for healthcare and wellness industries.",
// //     key: "strategic-consultation",
// //   },
// //   {
// //     id: 6,
// //     title: "Quality & Innovation",
// //     icon: "fa-dollar-sign",
// //     description:
// //       "Commitment to superior quality, innovative formulations, and globally benchmarked healthcare products.",
// //     key: "quality-innovation",
// //   },
// // ];


// // Map FontAwesome icons to Solar icons
// const FA_TO_SOLAR_ICON_MAP = {
//   "fa-star": "solar:star-bold-duotone",
//   "fa-lightbulb": "solar:lightbulb-bolt-bold-duotone",
//   "fa-headset": "solar:headphones-round-sound-bold-duotone",
//   "fa-users-cog": "solar:users-group-rounded-bold-duotone",
//   "fa-shield": "solar:shield-check-bold-duotone",
//   "fa-rocket": "solar:rocket-bold-duotone",
//   "fa-cog": "solar:settings-bold-duotone",
//   "fa-check": "solar:verified-check-bold-duotone",
//   "fa-heart": "solar:heart-bold-duotone",
//   "fa-clock": "solar:clock-circle-bold-duotone",
//   "fa-truck": "solar:delivery-bold-duotone",
//   "fa-dollar-sign": "solar:tag-price-bold-duotone",
// };

// // Rotate through colors for visual variety
// const FEATURE_COLORS = ["primary", "success", "warning", "info", "secondary", "error"];

// // Helper function to get icon and color for a feature
// const getFeatureStyle = (faIcon, index) => {
//   const solarIcon = FA_TO_SOLAR_ICON_MAP[faIcon] || "solar:star-bold-duotone";
//   const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
//   return { solarIcon, color };
// };

// export function AboutFeatures() {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);
//   const { aboutData } = useGetAboutData();
//   const whyChooseUs = aboutData?.why_choose_us || [];

//   return (
//     <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
//       <Container maxWidth="lg">
//         <Stack spacing={6}>
//           {/* Section Header */}
//           <Stack spacing={2} alignItems="center" textAlign="center">
//             <Typography
//               variant="overline"
//               sx={{
//                 color: "primary.main",
//                 fontWeight: 700,
//                 letterSpacing: 2,
//               }}
//             >
//               Why Choose Us
//             </Typography>

//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 800,
//                 maxWidth: 600,
//               }}
//             >
//               Everything You Need for a
//               <Box component="span" sx={{ color: "primary.main", ml: 1 }}>
//                 Perfect
//               </Box>
//               {" "}Shopping Experience
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 maxWidth: 600,
//                 lineHeight: 1.7,
//               }}
//             >
//               We've designed every aspect of our platform to make your shopping journey
//               smooth, secure, and satisfying.
//             </Typography>
//           </Stack>

//           {/* Features Grid */}
//           <Grid2 container spacing={3} justifyContent="center">
//             {whyChooseUs.map(({ id, title, icon, description }, index) => {
//               const { solarIcon, color } = getFeatureStyle(icon, index);

//               return (
//                 <Grid2 key={id} size={{ xs: 12, sm: 6, md: 4 }}>
//                   <Card
//                     sx={{
//                       p: 3.5,
//                       height: "100%",
//                       borderRadius: 3,
//                       bgcolor: "background.paper",
//                       border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.12)}`,
//                       boxShadow: "none",
//                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       cursor: "default",
//                       "&:hover": {
//                         transform: "translateY(-6px)",
//                         boxShadow: `0 16px 40px ${varAlpha(theme.vars.palette[color].mainChannel, 0.15)}`,
//                         borderColor: varAlpha(theme.vars.palette[color].mainChannel, 0.3),
//                         "& .feature-icon-wrapper": {
//                           bgcolor: `${color}.main`,
//                           color: "common.white",
//                           transform: "scale(1.05)",
//                         },
//                       },
//                     }}
//                   >
//                     <Stack spacing={2.5}>
//                       <Box
//                         className="feature-icon-wrapper"
//                         sx={{
//                           width: 56,
//                           height: 56,
//                           borderRadius: 2,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           bgcolor: varAlpha(theme.vars.palette[color].mainChannel, 0.12),
//                           color: `${color}.main`,
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <Iconify icon={solarIcon} width={28} />
//                       </Box>

//                       <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                         {title}
//                       </Typography>

//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color: "text.secondary",
//                           lineHeight: 1.7,
//                         }}
//                       >
//                         {description}
//                       </Typography>
//                     </Stack>
//                   </Card>
//                 </Grid2>
//               );
//             })}
//           </Grid2>
//         </Stack>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { useAppSelector } from "@/redux/hooks";

import { Iconify } from "@/components/iconify";
import { useGetAboutData } from "@/api/about";

// ----------------------------------------------------------------------

const FA_TO_SOLAR_ICON_MAP = {
  "fa-star": "solar:star-bold-duotone",
  "fa-lightbulb": "solar:lightbulb-bolt-bold-duotone",
  "fa-headset":
    "solar:headphones-round-sound-bold-duotone",
  "fa-users-cog":
    "solar:users-group-rounded-bold-duotone",
  "fa-shield": "solar:shield-check-bold-duotone",
  "fa-rocket": "solar:rocket-bold-duotone",
  "fa-cog": "solar:settings-bold-duotone",
  "fa-check": "solar:verified-check-bold-duotone",
  "fa-heart": "solar:heart-bold-duotone",
  "fa-clock": "solar:clock-circle-bold-duotone",
  "fa-truck": "solar:delivery-bold-duotone",
  "fa-dollar-sign": "solar:tag-price-bold-duotone",
};

const FEATURE_COLORS = [
  "primary",
  "success",
  "warning",
  "info",
  "secondary",
  "error",
];

const COLOR_STYLES = {
  primary: {
    bg: "rgba(33, 150, 243, 0.12)",
    color: "#2196f3",
    shadow: "rgba(33, 150, 243, 0.15)",
    border: "rgba(33, 150, 243, 0.3)",
  },
  success: {
    bg: "rgba(76, 175, 80, 0.12)",
    color: "#4caf50",
    shadow: "rgba(76, 175, 80, 0.15)",
    border: "rgba(76, 175, 80, 0.3)",
  },
  warning: {
    bg: "rgba(255, 152, 0, 0.12)",
    color: "#ff9800",
    shadow: "rgba(255, 152, 0, 0.15)",
    border: "rgba(255, 152, 0, 0.3)",
  },
  info: {
    bg: "rgba(3, 169, 244, 0.12)",
    color: "#03a9f4",
    shadow: "rgba(3, 169, 244, 0.15)",
    border: "rgba(3, 169, 244, 0.3)",
  },
  secondary: {
    bg: "rgba(156, 39, 176, 0.12)",
    color: "#9c27b0",
    shadow: "rgba(156, 39, 176, 0.15)",
    border: "rgba(156, 39, 176, 0.3)",
  },
  error: {
    bg: "rgba(244, 67, 54, 0.12)",
    color: "#f44336",
    shadow: "rgba(244, 67, 54, 0.15)",
    border: "rgba(244, 67, 54, 0.3)",
  },
};

const getFeatureStyle = (faIcon, index) => {
  const solarIcon =
    FA_TO_SOLAR_ICON_MAP[faIcon] ||
    "solar:star-bold-duotone";

  const color =
    FEATURE_COLORS[index % FEATURE_COLORS.length];

  return { solarIcon, color };
};

export function AboutFeatures() {
  const { vendor } = useAppSelector(
    (state) => state.vendor
  );

  const { aboutData } = useGetAboutData();

  const primaryColor =
    vendor?.primary_color || "#2563eb";

  const whyChooseUs =
    aboutData?.why_choose_us || [];

  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2 text-center">
            <span
              className="text-sm font-bold uppercase tracking-[2px]"
              style={{ color: primaryColor }}
            >
              Why Choose Us
            </span>

            <h2 className="max-w-[750px] text-2xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              Everything You Need for a
              <span
                className="ml-2"
                style={{ color: primaryColor }}
              >
                Perfect
              </span>{" "}
              Shopping Experience
            </h2>

            <p
              className="max-w-[600px] text-base leading-7 text-gray-500"
              style={{ lineHeight: 1.5 }}
            >
              We've designed every aspect of our platform
              to make your shopping journey smooth,
              secure, and satisfying.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {whyChooseUs.map(
              (
                { id, title, icon, description },
                index
              ) => {
                const { solarIcon, color } =
                  getFeatureStyle(icon, index);

                const currentColor =
                  COLOR_STYLES[color];

                return (
                  <div
                    key={id}
                    className="group h-full cursor-default  border bg-white p-4 transition-all duration-300"
                    style={{
                      borderColor:
                        "rgba(145, 158, 171, 0.12)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-6px)";
                      e.currentTarget.style.boxShadow = `0 16px 40px ${currentColor.shadow}`;
                      e.currentTarget.style.borderColor =
                        currentColor.border;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px)";
                      e.currentTarget.style.boxShadow =
                        "none";
                      e.currentTarget.style.borderColor =
                        "rgba(145, 158, 171, 0.12)";
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className="feature-icon-wrapper flex h-7 w-7 items-center justify-center  transition-all duration-300"
                        style={{
                          backgroundColor:
                            currentColor.bg,
                          color:
                            currentColor.color,
                        }}
                      >
                        <Iconify
                          icon={solarIcon}
                          width={25}
                        />
                      </div>

                      <h3 className="mb-0 pb-0 text-xl font-bold text-gray-900">
                        {title}
                      </h3>

                      <p
                        className="text-sm leading-7 text-gray-500"
                        style={{ lineHeight: 1.5 }}
                      >
                        {description}
                      </p>
                    </div>

                    <style jsx>{`
                      .group:hover
                        .feature-icon-wrapper {
                        background-color: ${currentColor.color};
                        color: white;
                        transform: scale(1.05);
                      }
                    `}</style>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
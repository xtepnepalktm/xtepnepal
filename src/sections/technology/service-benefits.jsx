// "use client";

// import { Box, Container, Typography, Stack, useTheme, Card } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// const BENEFITS = [
//   {
//     icon: "solar:wallet-money-bold-duotone",
//     title: "Best Prices Guaranteed",
//     description: "We offer competitive pricing with price match guarantee on all products.",
//   },
//   {
//     icon: "solar:verified-check-bold-duotone",
//     title: "Quality Assurance",
//     description: "Every product undergoes strict quality checks before reaching you.",
//   },
//   {
//     icon: "solar:clock-circle-bold-duotone",
//     title: "Same Day Dispatch",
//     description: "Orders placed before 2 PM are dispatched the same business day.",
//   },
//   {
//     icon: "solar:lock-password-bold-duotone",
//     title: "Data Privacy",
//     description: "Your personal information is encrypted and never shared with third parties.",
//   },
//   {
//     icon: "solar:tag-horizontal-bold-duotone",
//     title: "Exclusive Deals",
//     description: "Members get access to exclusive discounts and early sale access.",
//   },
//   {
//     icon: "solar:globe-bold-duotone",
//     title: "Nationwide Coverage",
//     description: "We deliver to every corner of the country with reliable shipping partners.",
//   },
// ];

// export function ServiceBenefits() {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;
//   const secondaryColor = vendor?.secondary_color || theme.palette.secondary.main;

//   return (
//     <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
//       <Container maxWidth="lg">
//         <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
//           {/* Content Side */}
//           <Grid size={{ xs: 12, md: 5 }}>
//             <Stack spacing={3}>
//               <Typography
//                 variant="overline"
//                 sx={{
//                   color: "primary.main",
//                   fontWeight: 700,
//                   letterSpacing: 2,
//                 }}
//               >
//                 Why Shop With Us
//               </Typography>

//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontWeight: 800,
//                   lineHeight: 1.3,
//                 }}
//               >
//                 Benefits That Make a {" "}
//                 <Box
//                   component="span"
//                   sx={{
//                     display: "block",
//                     background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     backgroundClip: "text",
//                   }}
//                 >
//                   Real Difference
//                 </Box>
//               </Typography>

//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: "text.secondary",
//                   lineHeight: 1.8,
//                   fontSize: "1.05rem",
//                 }}
//               >
//                 We're committed to providing more than just products. Our comprehensive 
//                 services ensure that every aspect of your shopping experience exceeds 
//                 expectations.
//               </Typography>

//               {/* Stats */}
//               <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
//                 <Box>
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontWeight: 800,
//                       color: "primary.main",
//                     }}
//                   >
//                     50K+
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Happy Customers
//                   </Typography>
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontWeight: 800,
//                       color: "primary.main",
//                     }}
//                   >
//                     99%
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Satisfaction Rate
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Stack>
//           </Grid>

//           {/* Benefits Grid */}
//           <Grid size={{ xs: 12, md: 7 }}>
//             <Grid container spacing={2}>
//               {BENEFITS.map((benefit, index) => (
//                 <Grid key={benefit.title} size={{ xs: 12, sm: 6 }}>
//                   <Card
//                     sx={{
//                       p: 2.5,
//                       borderRadius: 2,
//                       bgcolor: "background.paper",
//                       border: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.12)}`,
//                       boxShadow: "none",
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         borderColor: "primary.main",
//                         boxShadow: `0 8px 24px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.12)}`,
//                         transform: "translateY(-4px)",
//                         "& .benefit-icon": {
//                           bgcolor: "primary.main",
//                           color: "common.white",
//                           transform: "rotate(10deg)",
//                         },
//                       },
//                     }}
//                   >
//                     <Stack direction="row" spacing={2} alignItems="flex-start">
//                       <Box
//                         className="benefit-icon"
//                         sx={{
//                           p: 1.5,
//                           borderRadius: 2,
//                           bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.1),
//                           color: "primary.main",
//                           flexShrink: 0,
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         <Iconify icon={benefit.icon} width={24} />
//                       </Box>
//                       <Box>
//                         <Typography
//                           variant="h4"
//                           sx={{ fontWeight: 700, mb: 0.5, fontSize:{xs:"0.8rem", sm:"1rem", md:"1rem"} }}
//                         >
//                           {benefit.title}
//                         </Typography>
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "text.secondary",
//                             lineHeight: 1.6,
//                             display: "block",
//                           }}
//                         >
//                           {benefit.description}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { useAppSelector } from "@/redux/hooks";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    icon: "solar:wallet-money-bold-duotone",
    title: "Best Prices Guaranteed",
    description:
      "We offer competitive pricing with price match guarantee on all products.",
  },
  {
    icon: "solar:verified-check-bold-duotone",
    title: "Quality Assurance",
    description:
      "Every product undergoes strict quality checks before reaching you.",
  },
  {
    icon: "solar:clock-circle-bold-duotone",
    title: "Same Day Dispatch",
    description:
      "Orders placed before 2 PM are dispatched the same business day.",
  },
  {
    icon: "solar:lock-password-bold-duotone",
    title: "Data Privacy",
    description:
      "Your personal information is encrypted and never shared with third parties.",
  },
  {
    icon: "solar:tag-horizontal-bold-duotone",
    title: "Exclusive Deals",
    description:
      "Members get access to exclusive discounts and early sale access.",
  },
  {
    icon: "solar:globe-bold-duotone",
    title: "Nationwide Coverage",
    description:
      "We deliver to every corner of the country with reliable shipping partners.",
  },
];

export function ServiceBenefits() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#7C3AED";
  const secondaryColor = vendor?.secondary_color || "#A855F7";

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          {/* Content Side */}
          <div className="md:col-span-5">
            <div className="space-y-6">
              <p
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: primaryColor }}
              >
                Why Shop With Us
              </p>

              <h2 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
                Benefits That Make a{" "}
                <span
                  className="block"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Real Difference
                </span>
              </h2>

              <p className="text-base leading-8 text-gray-500 md:text-lg">
                We're committed to providing more than just products. Our
                comprehensive services ensure that every aspect of your shopping
                experience exceeds expectations.
              </p>

              {/* Stats */}
              <div className="flex gap-10 pt-2">
                <div>
                  <h3
                    className="text-2xl font-extrabold"
                    style={{ color: primaryColor }}
                  >
                    50K+
                  </h3>
                  <p className="text-sm text-gray-500">
                    Happy Customers
                  </p>
                </div>

                <div>
                  <h3
                    className="text-2xl font-extrabold"
                    style={{ color: primaryColor }}
                  >
                    99%
                  </h3>
                  <p className="text-sm text-gray-500">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="md:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group  border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    borderColor: "#e5e7eb",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex h-12 w-12 items-center justify-center  transition-all duration-300 group-hover:rotate-12 group-hover:text-white"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor,
                      }}
                    >
                      <Iconify icon={benefit.icon} width={24} />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="mb-1 text-sm font-bold text-gray-900 sm:text-base">
                        {benefit.title}
                      </h3>

                      <p className="text-xs leading-6 text-gray-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  <style jsx>{`
                    .group:hover > div > div:first-child {
                      background-color: ${primaryColor};
                    }
                  `}</style>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
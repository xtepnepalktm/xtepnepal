// "use client";

// import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { varAlpha } from "minimal-shared/utils";

// import { useAppSelector } from "@/redux/hooks";

// import { Iconify } from "@/components/iconify";

// // ----------------------------------------------------------------------

// const PROCESS_STEPS = [
//   {
//     number: "01",
//     icon: "solar:magnifer-bold-duotone",
//     title: "Browse & Discover",
//     description: "Explore our vast collection of products and find exactly what you're looking for.",
//     color: "primary",
//   },
//   {
//     number: "02",
//     icon: "solar:cart-plus-bold-duotone",
//     title: "Add to Cart",
//     description: "Select your items, choose quantities, and add them to your shopping cart.",
//     color: "info",
//   },
//   {
//     number: "03",
//     icon: "solar:card-bold-duotone",
//     title: "Secure Checkout",
//     description: "Complete your purchase with our fast, secure, and hassle-free payment process.",
//     color: "warning",
//   },
//   {
//     number: "04",
//     icon: "solar:box-bold-duotone",
//     title: "Fast Delivery",
//     description: "Sit back and relax while we deliver your order right to your doorstep.",
//     color: "success",
//   },
// ];

// export function ServiceProcess() {
//   const theme = useTheme();
//   const { vendor } = useAppSelector((state) => state.vendor);

//   const primaryColor = vendor?.primary_color || theme.palette.primary.main;
//   const secondaryColor = vendor?.secondary_color || theme.palette.secondary.main;

//   return (
//     <Box
//       component="section"
//       sx={{
//         py: { xs: 6, md: 10 },
//         bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.04),
//       }}
//     >
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
//               How It Works
//             </Typography>

//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 800,
//                 maxWidth: 500,
//               }}
//             >
//               Simple & Easy
//               <Box component="span" sx={{ color: "primary.main", ml: 1 }}>
//                 Shopping Process
//               </Box>
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 maxWidth: 500,
//                 lineHeight: 1.7,
//               }}
//             >
//               Get started in just a few simple steps and enjoy a seamless shopping experience.
//             </Typography>
//           </Stack>

//           {/* Process Steps */}
//           <Grid container spacing={4}>
//             {PROCESS_STEPS.map((step, index) => (
//               <Grid key={step.title} size={{ xs: 12, sm: 6, md: 3 }}>
//                 <Stack
//                   spacing={2}
//                   alignItems="center"
//                   textAlign="center"
//                   sx={{
//                     position: "relative",
//                     p: 3,
//                   }}
//                 >
//                   {/* Connector Line */}
//                   {index < PROCESS_STEPS.length - 1 && (
//                     <Box
//                       sx={{
//                         display: { xs: "none", md: "block" },
//                         position: "absolute",
//                         top: 50,
//                         right: -40,
//                         width: 80,
//                         height: 2,
//                         background: `linear-gradient(90deg, ${primaryColor} 0%, ${varAlpha(theme.vars.palette.grey["500Channel"], 0.2)} 100%)`,
//                         "&::after": {
//                           content: '""',
//                           position: "absolute",
//                           right: 0,
//                           top: -4,
//                           width: 10,
//                           height: 10,
//                           borderRadius: "50%",
//                           bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.2),
//                         },
//                       }}
//                     />
//                   )}

//                   {/* Step Number Badge */}
//                   <Box
//                     sx={{
//                       position: "relative",
//                       width: 100,
//                       height: 100,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       bgcolor: varAlpha(theme.vars.palette[step.color].mainChannel, 0.12),
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         transform: "scale(1.1)",
//                         bgcolor: `${step.color}.main`,
//                         boxShadow: `0 12px 24px ${varAlpha(theme.vars.palette[step.color].mainChannel, 0.3)}`,
//                         "& .step-icon": {
//                           color: "common.white",
//                         },
//                         "& .step-number": {
//                           bgcolor: "common.white",
//                           color: `${step.color}.main`,
//                         },
//                       },
//                     }}
//                   >
//                     <Iconify
//                       className="step-icon"
//                       icon={step.icon}
//                       width={40}
//                       sx={{
//                         color: `${step.color}.main`,
//                         transition: "color 0.3s ease",
//                       }}
//                     />

//                     {/* Step Number */}
//                     <Box
//                       className="step-number"
//                       sx={{
//                         position: "absolute",
//                         top: -5,
//                         right: -5,
//                         width: 32,
//                         height: 32,
//                         borderRadius: "50%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         bgcolor: `${step.color}.main`,
//                         color: "common.white",
//                         fontWeight: 800,
//                         fontSize: "0.75rem",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       {step.number}
//                     </Box>
//                   </Box>

//                   <Typography variant="h4" sx={{ fontWeight: 700, fontSize:{xs:"1rem", sm:"1.1rem", md:"1.2rem"} }}>
//                     {step.title}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "text.secondary",
//                       lineHeight: 1.7,
//                     }}
//                   >
//                     {step.description}
//                   </Typography>
//                 </Stack>
//               </Grid>
//             ))}
//           </Grid>
//         </Stack>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { useAppSelector } from "@/redux/hooks";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

const PROCESS_STEPS = [
  {
    number: "01",
    icon: "solar:magnifer-bold-duotone",
    title: "Browse & Discover",
    description:
      "Explore our vast collection of products and find exactly what you're looking for.",
    color: "blue",
  },
  {
    number: "02",
    icon: "solar:cart-plus-bold-duotone",
    title: "Add to Cart",
    description:
      "Select your items, choose quantities, and add them to your shopping cart.",
    color: "cyan",
  },
  {
    number: "03",
    icon: "solar:card-bold-duotone",
    title: "Secure Checkout",
    description:
      "Complete your purchase with our fast, secure, and hassle-free payment process.",
    color: "amber",
  },
  {
    number: "04",
    icon: "solar:box-bold-duotone",
    title: "Fast Delivery",
    description:
      "Sit back and relax while we deliver your order right to your doorstep.",
    color: "green",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600",
    shadow: "group-hover:shadow-[0_12px_30px_-10px_rgba(59,130,246,0.8)]",
    badgeBg: "bg-blue-600",
  },
  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-cyan-600",
    shadow: "group-hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.8)]",
    badgeBg: "bg-cyan-600",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600",
    shadow: "group-hover:shadow-[0_12px_30px_-10px_rgba(245,158,11,0.8)]",
    badgeBg: "bg-amber-600",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-green-600",
    shadow: "group-hover:shadow-[0_12px_30px_-10px_rgba(22,163,74,0.8)]",
    badgeBg: "bg-green-600",
  },
};

export function ServiceProcess() {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#2563eb";

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-50/50 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-50/50 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <span
              className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
            >
              How It Works
            </span>

            <h2 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Simple & Easy{" "}
              <span
                className="relative whitespace-nowrap"
                style={{ color: primaryColor }}
              >
                <span className="relative">Shopping Process</span>
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg text-gray-500 leading-relaxed">
              Get started in just a few simple steps and enjoy a seamless
              shopping experience designed just for you.
            </p>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => {
              const colors = colorClasses[step.color];

              return (
                <div
                  key={step.title}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Connector Line */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute left-[65%] top-12 hidden w-[70%] lg:block">
                      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-gray-100">
                        <div className="absolute h-full w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent -translate-x-full transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                      </div>
                      <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full bg-gray-200 transition-colors duration-300 group-hover:bg-gray-400" />
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div className="relative mb-8 flex flex-col items-center justify-center">
                    <div
                      className={`
                        relative z-10 flex h-24 w-24 items-center justify-center transition-all duration-500 ease-out
                        group-hover:-translate-y-2
                        ${colors.bg}
                        ${colors.shadow}
                        ${colors.hoverBg}
                      `}
                    >
                      <Iconify
                        icon={step.icon}
                        width={40}
                        className={`${colors.text} transition-all duration-500 group-hover:scale-110 group-hover:text-white`}
                      />

                      {/* Step Number Badge */}
                      <div
                        className={`
                          absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center
                          rounded-full text-xs font-bold text-white shadow-sm ring-4 ring-white
                          transition-all duration-500
                          ${colors.badgeBg}
                          group-hover:scale-110
                        `}
                      >
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="transition-all duration-300 group-hover:translate-y-[-4px]">
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
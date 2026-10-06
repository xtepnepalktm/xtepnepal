// import { Box, Stack, Container, Skeleton, Paper } from "@mui/material";
// import Grid from "@mui/material/Grid2";

// // ----------------------------------------------------------------------

// export function HomeViewSkeleton() {
//     return (
//         <Container maxWidth="xl" sx={{ mt: 3, mb: 10 }}>
//             <Stack spacing={6}>
//                 {/* Hero Banner Skeleton */}
//                 <Skeleton
//                     variant="rectangular"
//                     sx={{
//                         width: "100%",
//                         height: { xs: 300, sm: 400, md: 500 },
//                         borderRadius: 2
//                     }}
//                 />

//                 {/* About Section Skeleton */}
//                 <Box sx={{ textAlign: "center", px: { xs: 2, md: 8 } }}>
//                     <Skeleton variant="text" sx={{ fontSize: 32, mx: "auto", width: "60%", mb: 2 }} />
//                     <Skeleton variant="text" sx={{ fontSize: 16, mx: "auto", width: "80%" }} />
//                     <Skeleton variant="text" sx={{ fontSize: 16, mx: "auto", width: "75%" }} />
//                     <Skeleton variant="text" sx={{ fontSize: 16, mx: "auto", width: "70%" }} />
//                 </Box>

//                 {/* Flash Sale & Best Sellers Skeleton */}
//                 <Grid container spacing={3}>
//                     <Grid size={{ xs: 12 }}>
//                         <Box>
//                             <Skeleton variant="text" sx={{ fontSize: 28, width: 200, mb: 3 }} />
//                             <Grid container spacing={2}>
//                                 {[...Array(4)].map((_, index) => (
//                                     <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
//                                         <ProductCardSkeleton />
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Box>
//                     </Grid>

//                     <Grid size={{ xs: 12 }}>
//                         <Box>
//                             <Skeleton variant="text" sx={{ fontSize: 28, width: 200, mb: 3 }} />
//                             <Grid container spacing={2}>
//                                 {[...Array(4)].map((_, index) => (
//                                     <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
//                                         <ProductCardSkeleton />
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Box>
//                     </Grid>
//                 </Grid>

//                 {/* Featured Categories Skeleton */}
//                 <Box>
//                     <Skeleton variant="text" sx={{ fontSize: 28, width: 250, mb: 3, mx: "auto", textAlign: "center" }} />
//                     <Grid container spacing={3}>
//                         {[...Array(8)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
//                                 <CategoryCardSkeleton />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>

//                 {/* Trending Products Skeleton */}
//                 <Box>
//                     <Skeleton variant="text" sx={{ fontSize: 28, width: 200, mb: 3 }} />
//                     <Grid container spacing={2}>
//                         {[...Array(5)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 6, sm: 4, md: 2.4 }}>
//                                 <ProductCardSkeleton />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>

//                 {/* Testimonials Section Skeleton */}
//                 <Box sx={{ py: 4 }}>
//                     <Skeleton variant="text" sx={{ fontSize: 32, width: 300, mb: 3, mx: "auto", textAlign: "center" }} />
//                     <Grid container spacing={3}>
//                         {[...Array(3)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
//                                 <TestimonialCardSkeleton />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>

//                 {/* Video Testimonials Skeleton */}
//                 <Box>
//                     <Skeleton variant="text" sx={{ fontSize: 28, width: 280, mb: 3, mx: "auto", textAlign: "center" }} />
//                     <Grid container spacing={3}>
//                         {[...Array(3)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
//                                 <Skeleton
//                                     variant="rectangular"
//                                     sx={{
//                                         width: "100%",
//                                         height: 200,
//                                         borderRadius: 2
//                                     }}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>

//                 {/* Featured Brands Skeleton */}
//                 <Box>
//                     <Skeleton variant="text" sx={{ fontSize: 28, width: 200, mb: 3, mx: "auto", textAlign: "center" }} />
//                     <Grid container spacing={2}>
//                         {[...Array(6)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 4, sm: 3, md: 2 }}>
//                                 <Skeleton
//                                     variant="rectangular"
//                                     sx={{
//                                         width: "100%",
//                                         height: 80,
//                                         borderRadius: 1
//                                     }}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>

//                 {/* Skin Concerns Skeleton */}
//                 <Box sx={{ py: 4 }}>
//                     <Skeleton variant="text" sx={{ fontSize: 28, width: 250, mb: 3, mx: "auto", textAlign: "center" }} />
//                     <Grid container spacing={3}>
//                         {[...Array(4)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 6, sm: 3 }}>
//                                 <Skeleton
//                                     variant="rectangular"
//                                     sx={{
//                                         width: "100%",
//                                         height: 150,
//                                         borderRadius: 2
//                                     }}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>

//                 {/* Tech Features Skeleton */}
//                 <Box sx={{ bgcolor: "grey.100", py: 3, borderRadius: 2 }}>
//                     <Grid container spacing={2}>
//                         {[...Array(4)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 6, sm: 3 }}>
//                                 <Stack alignItems="center" spacing={1}>
//                                     <Skeleton variant="circular" width={48} height={48} />
//                                     <Skeleton variant="text" sx={{ width: 100 }} />
//                                     <Skeleton variant="text" sx={{ width: 80 }} />
//                                 </Stack>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>

//                 {/* Customer Logos Skeleton */}
//                 <Box>
//                     <Skeleton variant="text" sx={{ fontSize: 28, width: 200, mb: 3, mx: "auto", textAlign: "center" }} />
//                     <Grid container spacing={2}>
//                         {[...Array(8)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 3, sm: 2, md: 1.5 }}>
//                                 <Skeleton
//                                     variant="rectangular"
//                                     sx={{
//                                         width: "100%",
//                                         height: 60,
//                                         borderRadius: 1
//                                     }}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>

//                 {/* Newsletter Skeleton */}
//                 <Box sx={{ bgcolor: "grey.100", py: 5, px: 3, borderRadius: 2 }}>
//                     <Stack spacing={2} alignItems="center">
//                         <Skeleton variant="text" sx={{ fontSize: 28, width: 300 }} />
//                         <Skeleton variant="text" sx={{ fontSize: 16, width: 400 }} />
//                         <Skeleton variant="rectangular" sx={{ width: 400, height: 48, borderRadius: 1 }} />
//                     </Stack>
//                 </Box>

//                 {/* FAQ Skeleton */}
//                 <Box>
//                     <Skeleton variant="text" sx={{ fontSize: 28, width: 250, mb: 3, mx: "auto", textAlign: "center" }} />
//                     <Stack spacing={2}>
//                         {[...Array(5)].map((_, index) => (
//                             <Skeleton
//                                 key={index}
//                                 variant="rectangular"
//                                 sx={{
//                                     width: "100%",
//                                     height: 60,
//                                     borderRadius: 1
//                                 }}
//                             />
//                         ))}
//                     </Stack>
//                 </Box>

//                 {/* Blog Section Skeleton */}
//                 <Box>
//                     <Skeleton variant="text" sx={{ fontSize: 28, width: 200, mb: 3 }} />
//                     <Grid container spacing={3}>
//                         {[...Array(3)].map((_, index) => (
//                             <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
//                                 <BlogCardSkeleton />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//             </Stack>
//         </Container>
//     );
// }

// // ----------------------------------------------------------------------
// // Sub-components for specific card types

// function ProductCardSkeleton() {
//     return (
//         <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
//             <Skeleton variant="rectangular" sx={{ width: "100%", pt: "100%" }} />
//             <Stack spacing={1} sx={{ p: 2 }}>
//                 <Skeleton variant="text" sx={{ width: "80%" }} />
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Skeleton variant="text" sx={{ width: 60 }} />
//                     <Skeleton variant="circular" width={24} height={24} />
//                 </Box>
//             </Stack>
//         </Paper>
//     );
// }

// function CategoryCardSkeleton() {
//     return (
//         <Box>
//             <Skeleton
//                 variant="rectangular"
//                 sx={{
//                     width: "100%",
//                     height: 150,
//                     borderRadius: 2,
//                     mb: 1
//                 }}
//             />
//             <Skeleton variant="text" sx={{ width: "80%", mx: "auto" }} />
//         </Box>
//     );
// }

// function TestimonialCardSkeleton() {
//     return (
//         <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Stack spacing={2}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Skeleton variant="circular" width={48} height={48} />
//                     <Box sx={{ flex: 1 }}>
//                         <Skeleton variant="text" sx={{ width: "60%" }} />
//                         <Skeleton variant="text" sx={{ width: "40%" }} />
//                     </Box>
//                 </Box>
//                 <Skeleton variant="text" />
//                 <Skeleton variant="text" />
//                 <Skeleton variant="text" sx={{ width: "80%" }} />
//             </Stack>
//         </Paper>
//     );
// }

// function BlogCardSkeleton() {
//     return (
//         <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
//             <Skeleton variant="rectangular" sx={{ width: "100%", height: 200 }} />
//             <Stack spacing={1} sx={{ p: 2 }}>
//                 <Skeleton variant="text" sx={{ width: "90%" }} />
//                 <Skeleton variant="text" sx={{ width: "100%" }} />
//                 <Skeleton variant="text" sx={{ width: "80%" }} />
//                 <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                     <Skeleton variant="text" sx={{ width: 60 }} />
//                     <Skeleton variant="text" sx={{ width: 80 }} />
//                 </Box>
//             </Stack>
//         </Paper>
//     );
// }
// ----------------------------------------------------------------------
// Shared pulse animation class (add to your global CSS or tailwind.config):
// 'animate-pulse' is built into Tailwind — used throughout for skeleton shimmer
// ----------------------------------------------------------------------

export function HomeViewSkeleton() {
    return (
        <div className="mx-auto container px-4 mt-6 mb-20 flex flex-col gap-12">

            {/* Hero Banner */}
            <Skel className="h-[300px] w-full  sm:h-[400px] md:h-[500px]" />

            {/* About Section */}
            <div className="px-2 text-center md:px-16 flex flex-col items-center gap-2">
                <Skel className="h-8 w-[60%]" />
                <Skel className="h-4 w-[80%]" />
                <Skel className="h-4 w-[75%]" />
                <Skel className="h-4 w-[70%]" />
            </div>

            {/* Flash Sale & Best Sellers */}
            <div className="flex flex-col gap-8">
                {[0, 1].map((i) => (
                    <div key={i}>
                        <Skel className="mb-6 h-7 w-48" />
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {[...Array(4)].map((_, idx) => <ProductCardSkeleton key={idx} />)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured Categories */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-64" />
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                    {[...Array(8)].map((_, i) => <CategoryCardSkeleton key={i} />)}
                </div>
            </div>

            {/* Trending Products */}
            <div>
                <Skel className="mb-6 h-7 w-48" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {[...Array(5)].map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-4">
                <Skel className="mx-auto mb-6 h-8 w-72" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => <TestimonialCardSkeleton key={i} />)}
                </div>
            </div>

            {/* Video Testimonials */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-72" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <Skel key={i} className="h-[200px] w-full " />
                    ))}
                </div>
            </div>

            {/* Featured Brands */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-48" />
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                    {[...Array(6)].map((_, i) => (
                        <Skel key={i} className="h-20 w-full " />
                    ))}
                </div>
            </div>

            {/* Skin Concerns */}
            <div className="py-4">
                <Skel className="mx-auto mb-6 h-7 w-64" />
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Skel key={i} className="h-[150px] w-full " />
                    ))}
                </div>
            </div>

            {/* Tech Features */}
            <div className=" bg-gray-100 py-6 px-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <Skel className="h-12 w-12 rounded-full" />
                            <Skel className="h-4 w-24" />
                            <Skel className="h-4 w-20" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Customer Logos */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-48" />
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                    {[...Array(8)].map((_, i) => (
                        <Skel key={i} className="h-[60px] w-full " />
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className=" bg-gray-100 px-6 py-10 flex flex-col items-center gap-4">
                <Skel className="h-7 w-72" />
                <Skel className="h-4 w-96" />
                <Skel className="h-12 w-96 " />
            </div>

            {/* FAQ */}
            <div>
                <Skel className="mx-auto mb-6 h-7 w-64" />
                <div className="flex flex-col gap-3">
                    {[...Array(5)].map((_, i) => (
                        <Skel key={i} className="h-[60px] w-full " />
                    ))}
                </div>
            </div>

            {/* Blog */}
            <div>
                <Skel className="mb-6 h-7 w-48" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => <BlogCardSkeleton key={i} />)}
                </div>
            </div>

        </div>
    );
}

// ----------------------------------------------------------------------
// Primitive — a single animated skeleton block
// ----------------------------------------------------------------------

function Skel({ className = "" }) {
    return <div className={`animate-pulse  bg-gray-200 ${className}`} />;
}

// ----------------------------------------------------------------------
// Sub-skeletons
// ----------------------------------------------------------------------

function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden  border border-gray-200">
            <Skel className="w-full pt-[100%] rounded-none" />
            <div className="flex flex-col gap-2 p-3">
                <Skel className="h-4 w-4/5" />
                <div className="flex items-center justify-between">
                    <Skel className="h-4 w-14" />
                    <Skel className="h-6 w-6 rounded-full" />
                </div>
            </div>
        </div>
    );
}

function CategoryCardSkeleton() {
    return (
        <div className="flex flex-col items-center gap-2">
            <Skel className="h-[150px] w-full " />
            <Skel className="h-4 w-4/5" />
        </div>
    );
}

function TestimonialCardSkeleton() {
    return (
        <div className=" bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <Skel className="h-12 w-12 rounded-full shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                    <Skel className="h-4 w-3/5" />
                    <Skel className="h-4 w-2/5" />
                </div>
            </div>
            <Skel className="h-4 w-full" />
            <Skel className="h-4 w-full" />
            <Skel className="h-4 w-4/5" />
        </div>
    );
}

function BlogCardSkeleton() {
    return (
        <div className="overflow-hidden  border border-gray-200">
            <Skel className="h-[200px] w-full rounded-none" />
            <div className="flex flex-col gap-2 p-3">
                <Skel className="h-4 w-[90%]" />
                <Skel className="h-4 w-full" />
                <Skel className="h-4 w-4/5" />
                <div className="mt-1 flex gap-2">
                    <Skel className="h-4 w-14" />
                    <Skel className="h-4 w-20" />
                </div>
            </div>
        </div>
    );
}
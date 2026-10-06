// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   transpilePackages: ['swr'],
// };

// export default nextConfig;
// /**
//  * @type {import('next').NextConfig} */
// const nextConfig = {
//   transpilePackages: ['swr'],
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'venturekartapi.walkershive.com.np',
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['swr'],
  experimental: {
    optimizeCss: true,
  },
  images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'venturekartapi.walkershive.com.np',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://venturekartapi.walkershive.com.np/api/frontend/:path*',
      },
    ];
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ],
      },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "ticketing-system-backend-mzzc1a97z-naimsiddiqui.vercel.app",
//           pathname: '/uploads/**'
//         },
//       ],
//     },
// };

// export default nextConfig;
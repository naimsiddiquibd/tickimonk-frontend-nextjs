// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//           {
//             protocol: "http",
//             hostname: "**",
//           },
//         ],
//       },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ticketing-system-backend-flzy6x0ku-naimsiddiqui.vercel.app",
          pathname: '/uploads/**'
        },
      ],
    },
};

export default nextConfig;
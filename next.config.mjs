/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dummyjson.com",
                pathname: "/users/**",  
            },
        ],
      },
};

export default nextConfig;

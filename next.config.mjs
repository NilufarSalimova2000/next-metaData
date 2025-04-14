/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dummyjson.com",
                pathname: "/**",  
            },
        ],
      },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/:slug.html',
                destination: '/:slug',
            },
        ];
    },
    images: {
        domains: ['apimovie.shenlong.cloud', 'picsum.photos'],
    },
};

export default nextConfig;

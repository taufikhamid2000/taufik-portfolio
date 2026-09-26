/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // The classic admin pages were replaced by owner tools inside the PES view.
    async redirects() {
      return [{ source: '/admin/:path*', destination: '/#login', permanent: false }];
    },
    images: {
        formats: ['image/avif', 'image/webp'],
    },
};

export default nextConfig;
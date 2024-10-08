const NEXT_PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;

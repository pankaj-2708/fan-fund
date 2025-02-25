/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_KEY_ID: process.env.NEXT_PUBLIC_KEY_ID,
    NEXT_PUBLIC_KEY_SECRET: process.env.NEXT_PUBLIC_KEY_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AUTH_FB_ID: process.env.AUTH_FB_ID,
    AUTH_FB_SECRET: process.env.AUTH_FB_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET
  }
};

export default nextConfig;

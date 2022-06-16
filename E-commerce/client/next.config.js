/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    HOST_CLIENT: process.env.HOST_CLIENT
  }
}

module.exports = nextConfig

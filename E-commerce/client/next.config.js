/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    HOST_CLIENT: process.env.HOST_CLIENT
  },
  images: {
    domains: ['s3.amazonaws.com','s3-us-west-2.amazonaws.com', 'dogston.com', 'm.media-amazon.com', 'www.catycan.com','ripleycl.imgix.net', 'res.cloudinary.com']
  }
}

module.exports = nextConfig

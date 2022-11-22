const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  experimental: { images: { allowFutureImage: true } },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;

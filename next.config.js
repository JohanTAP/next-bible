/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitar la importación de archivos JSON
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
}

module.exports = nextConfig 
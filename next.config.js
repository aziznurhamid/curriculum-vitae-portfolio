const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none';" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'ik.imagekit.io' },
      { hostname: 'cdn.jsdelivr.net' },
      { hostname: 'cdn.worldvectorlogo.com' },
      { hostname: 'www.w3schools.com' },
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'www.coreldraw.com' },
      { hostname: 'www.adobe.com' },
      { hostname: 'static.canva.com' },
      { hostname: 'sf16-web-tos-buz.capcutstatic.com' },
      { hostname: 'merch.mikrotik.com' },
      { hostname: 'supersonality.com' },
      { hostname: 'cdn-icons-png.flaticon.com' },
      { hostname: 'www.microsoft.com' },
      { hostname: 'cdn2.steamgriddb.com' },
      { hostname: 'chromeenterprise.google' },
    ],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
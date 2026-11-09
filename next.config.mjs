/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // There is a package-lock.json in the user folder: without this Next takes that
  // folder as the root and the watcher stops seeing changes (stale CSS, 404s).
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig

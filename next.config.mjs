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
  // Metadata (title, description, canonical, Open Graph…) always in the <head>, for every user
  // agent. By default Next streams it into the body for clients it doesn't recognise as limited
  // bots, which hides it from some crawlers and SEO tools. It only reads a local JSON file, so
  // there is nothing slow to stream.
  htmlLimitedBots: /.*/,
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig

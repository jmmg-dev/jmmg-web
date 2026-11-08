/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Hay un package-lock.json en la carpeta de usuario: sin esto Next toma esa
  // carpeta como raíz y el watcher deja de ver cambios (CSS desactualizado, 404).
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig

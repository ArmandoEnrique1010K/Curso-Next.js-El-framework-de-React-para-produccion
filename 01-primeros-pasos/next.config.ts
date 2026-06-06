import type { NextConfig } from "next";

// Configuración recomendada por el equipo de Next.js para Docker
// https://github.com/vercel/next.js/blob/canary/examples/with-docker/next.config.ts
const nextConfig: NextConfig = {
  // Standalone es recomendado cuando creas una imagen Docker
  output: "standalone",
};

export default nextConfig;

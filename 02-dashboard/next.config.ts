import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Se especifica los dominios de imágenes que se van a usar en la aplicación
  // Solamente extrae el dominio de la imagen, no la ruta completa
  images: {
    // Forma antigua
    // domains: ["images.unsplash.com"],

    // Forma nueva (recomendada)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

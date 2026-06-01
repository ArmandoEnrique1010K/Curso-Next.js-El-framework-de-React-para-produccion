import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Uso de next/font/google para cargar fuentes personalizadas
// https://nextjs.org/docs/pages/getting-started/fonts
const geistSans = Geist({
  // Crea una variable y almacena ahi la fuente
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuración de la metadata (por defecto) de la aplicación mediante la constante metadata
export const metadata: Metadata = {
  // Titulo en la pestaña del navegador
  title: "Fernando Home Page",
  // Descripción en la etiqueta <meta>
  // visible desde los motores de  búsqueda, pulsa F12, seccion Elements y busca la etiqueta
  // <meta name="description">
  // Ayuda a google a indexar tu página y mostrarla en los resultados de búsqueda
  description: "Generated with love by Vercel",
};

// Más etiquetas meta aqui: https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=es

// El layout es el componente que envuelve a todas las páginas de la aplicación
// Es un High Order Component (HOC), reciben un children como prop, el children tiene el tipado React.ReactNode
// En las herramientas de desarrollo del navegador, seccion Components de React Developer Tools se ve
// una enorme cantidad de componentes

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Si cambias la estructura HTML como agregar un estilo, los cambios se aplican a todas las paginas
    <html lang="en">
      <body
        // Para utilizar el estilo de las fuentes, necesitamos agregar las variables
        // Y luego el estilo de la fuente
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          font-sans
          `}
      >
        {children}
      </body>
    </html>
  );
}

// Desde la version 13 de Next.js, se puede usar fuentes de google fonts
// de forma nativa
import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Importa la fuente Montserrat Alternates
export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "700"],
});

// Para usar el estilo de la fuente, debes usar la propiedad className
// <h1 className={`${titleFont.className} font-bold`}>Hola mundo</h1>
// <h1 className={titleFont.className}>Hola mundo</h1>

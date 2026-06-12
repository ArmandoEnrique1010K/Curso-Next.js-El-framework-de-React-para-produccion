import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { geistMono, geistSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // No colocar la clase 'h-full' porque aplica un color de fondo tipo 'mosaico'
      className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

// Al ejecutar un 'npm run build' y si utilizas cache components, entonces es muy probable que
// aparezca un error en la consola como el siguiente:

// Error: Route "/orders/[id]": Uncached data was accessed outside of <Suspense>.

// Indica que hay datos que no están siendo manejados con Suspense, lo cual es necesario
// cuando se utiliza cache components, en otras palabras, un archivo que se encuentra en la carpeta
// 'app', sin importar el nombre (page.tsx, layout.tsx, etc.) tiene un 'await' dentro de la función
// exportada por defecto.

// Por ello se mencionaba que la unica solución es separar las partes estaticas y dinamicas de la
// página, layout, etc; en componentes individuales, aunque la página se puede utilizar solamente
// para las partes estaticas

//

// El resultado al hacer un npm run build es el siguiente:
// Route (app)
// ┌ ◐ /
// ├ ○ /_not-found
// ├ ○ /admin
// ├ ○ /auth/login
// ├ ○ /auth/new-account
// ├ ○ /cart
// ├ ○ /checkout
// ├ ○ /checkout/address
// ├ ○ /empty
// ├ ◐ /gender/[gender]
// │ └ /gender/[gender]
// ├ ○ /orders
// ├ ◐ /orders/[id]
// │ └ /orders/[id]
// ├ ◐ /product/[slug]
// │ └ /product/[slug]
// └ ○ /products

// ○  (Static)             prerendered as static content
// ◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content

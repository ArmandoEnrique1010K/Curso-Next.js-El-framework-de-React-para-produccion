import type { Metadata } from "next";

// Cada página puede tener su propia metadata (no olvidar el tipado Metadata)
export const metadata: Metadata = {
  title: "SEO Title",
  description: "SEO Description",
  // Palabras clave para SEO
  keywords: ["About Page", "Fernando", "SEO"],
};

// Es recomendable que el nombre de la función  siga la sintaxis de 'CarpetaPage'
export default function AboutPage() {
  return <span className="text-7xl">Página acerca de</span>;
}

// En Next.js las rutas se definen por convención de carpetas, por ejemplo:
// app/about/page.tsx -> /about
// app/contact/page.tsx -> /contact
// app/pricing/page.tsx -> /pricing

// layout, page, loading y error son nombres especiales en Next.js, las carpetas no pueden
// tener uno de esos nombres; el nombre page representa una página

// HMR (Hot Module Replacement) es un feature de Webpack que permite recargar el componente
// sin recargar toda la página (lo puedes ver en la consola del navegador luego de guardar los cambios
// en el código fuente)

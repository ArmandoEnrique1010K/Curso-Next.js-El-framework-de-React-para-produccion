import { cookies } from "next/headers";

import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies Page",
  description: "SEO Title",
};

// Página para mostrar las cookies
export default async function CookiesPage() {
  // OBTENER EL VALOR DE UNA COOKIE
  // https://nextjs.org/docs/app/api-reference/functions/cookies

  // Recuerda que un componente del lado del servidor se renderiza una sola vez
  // Importa cookies desde next/headers
  const cookieStore = await cookies();

  // Obtiene el valor de la cookie 'selectedTab', se le asigna un valor por defecto en
  // el caso de que no exista
  const cookieTab = cookieStore.get("selectedTab")?.value ?? "1";

  // Obtener todas las cookies en un arreglo de objetos
  const allCookies = cookieStore.getAll();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4">
      <div className="flex flex-col">
        <h1 className="flex mb-4 text-3xl">Tabs</h1>
        {/* Pasa el valor de la cookie como número para que sea seleccionado */}
        <TabBar currentTab={+cookieTab} />
        <div className="mt-6 text-xs whitespace-pre-wrap break-all">
          {JSON.stringify(allCookies, null, 2)}
        </div>
      </div>
    </div>
  );
}

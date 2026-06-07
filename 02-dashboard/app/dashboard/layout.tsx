// Componentes de React construidos con Tailwind CSS
// https://www.creative-tim.com/twcomponents/component/dashboard-navigation

import { Sidebar } from "@/components";
import { Suspense } from "react";

// Puedes hacer clic en la opción 'Show code' para ver el código fuente y copiarlo
// Recordar reemplazar el atributo class por className
// Pulsa CTRL + H y reemplaza la palabra 'class' por 'className'

// Layout para el dashboard
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="flex">
        {/* Contenido del menú lateral */}
        <Sidebar />
        {/* Contenido principal */}
        <div className="w-full text-slate-900">
          {/* Se recomienda que el children esté dentro de un componente Suspense si hay un 'use cache' en la página */}
          {/* En fallback se define un componente que se mostrará mientras se carga el children */}
          <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}

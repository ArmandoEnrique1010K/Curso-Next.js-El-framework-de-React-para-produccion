// Componentes de React construidos con Tailwind CSS
// https://www.creative-tim.com/twcomponents/component/dashboard-navigation

// Puedes hacer clic en la opción 'Show code' para ver el código fuente y copiarlo
// Recordar reemplazar el atributo class por className
// Pulsa CTRL + H y reemplaza la palabra 'class' por 'className'

import { Sidebar } from "../components";

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
        <div className="p-2 w-full text-slate-900">{children}</div>
      </div>
    </div>
  );
}

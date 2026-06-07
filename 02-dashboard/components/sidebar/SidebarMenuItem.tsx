"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react/jsx-runtime";

interface Props {
  path: string;
  title: string;
  // React.ReactNode permite que el icono sea cualquier elemento React válido
  // JSX.Element es más específico y solo permite elementos JSX
  icon: JSX.Element;
  subTitle: string;
}

// Item de la barra lateral
export const SidebarMenuItem = ({ path, title, icon, subTitle }: Props) => {
  // Obten la ruta actual con usePathname, el componente debe ser del lado del cliente
  const currentPath = usePathname();

  return (
    // En lugar de una etiqueta <a></a> usamos <Link> de next/link
    <Link
      href={path}
      // Verifica si la ruta actual es la misma que la ruta del link y aplicale un color de fondo
      className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 
      ${currentPath === path ? "bg-blue-800" : ""} hover:bg-white/5 transition ease-linear duration-150 `}
    >
      <div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          // En la consola del navegador, Next.js muestra errores sobre atributos inválidos
          // Como stroke-width que deberia ser strokeWidth
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg> */}

        {/* En lugar de código SVG para un icono se utiliza el componente Icono */}
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className="text-sm text-white/50 hidden md:block">
          {subTitle}
        </span>
      </div>
    </Link>
  );
};

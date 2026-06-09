"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

// Item de la barra lateral
export const SidebarItem = ({ icon, path, title }: Props) => {
  // Obtiene la ruta actual
  const pathName = usePathname();

  // Prueba con un contador, haz clic en el botón y luego cambia el estado de una tarea
  // Podras ver que el estado no se pierde cuando se recarga la página al llamar a router.refresh()
  // const [counter, setCounter] = useState(10);

  return (
    <li>
      {/* Cambia el color de fondo cuando la ruta coincida con la actual */}
      <Link
        href={path}
        className={`
        px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
        hover:bg-linear-to-r hover:bg-sky-600 hover:text-white
        ${path === pathName ? "text-white bg-linear-to-r from-sky-600 to-cyan-400" : ""}
      `}
      >
        {icon}
        <span className="group-hover:text-white-700">{title}</span>
        {/* <button
          className="group-hover:text-white-700"
          onClick={() => setCounter(counter + 1)}
        >
          {counter}
        </button> */}
      </Link>
    </li>
  );
};

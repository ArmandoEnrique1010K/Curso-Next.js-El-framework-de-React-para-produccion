"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Código fuente tomado de:
// https://tailwindcomponents.com/component/radio-buttons-1
// https://gist.github.com/Klerith/4651899f18a78fdec73faf803c014112

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

//

// COOKIES EN EL LADO DEL CLIENTE
// https://www.npmjs.com/package/cookies-next

// Ejecuta en la terminal:
// npm install cookies-next

// Componente para mostrar las tabs
export const TabBar = ({
  tabOptions = [1, 2, 3, 4],
  currentTab = 1,
}: Props) => {
  const router = useRouter();

  // Recordar que debe ser un componente del lado del cliente para poder usar el hook useState
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);

    // Guardar la pestaña seleccionada en una cookie, key 'selectedTab'
    // El tercer parámetro es el options, donde se puede configurar el tiempo de expiración
    // dominio, path, secure, httpOnly, sameSite, etc.

    // Recordar que las cookies se guardan como strings
    setCookie("selectedTab", tab.toString());

    // Refrescar la página
    router.refresh();
  };

  // Para ver las cookies, pulsa F12 en el navegador, ve a la sección 'Application', ve a la
  // sección 'Cookies', selecciona tu dominio y tendrás acceso a las cookies por su key

  // Marca la opción de 'Show URL-decoded' para ver el valor de la cookie en texto plano
  // Puedes modificar el valor de la cookie directamente desde el navegador

  return (
    <div
      // En tailwind no puedes usar variables dinámicas en las clases
      // grid-cols-${tabOptions.length}
      className={`
        grid w-full rounded-xl bg-gray-200 p-2
        grid-cols-4
      `}
    >
      {/* Mapear las tabs */}
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            id={tab.toString()}
            checked={selected === tab}
            // Evento vacio (para que no aparezca un error en la consola)
            onChange={() => {}}
            type="radio"
            // Ocultar el input
            // peer: permite cambiar el estilo de un elemento dependiendo del estado de su elemento hermano
            className="peer hidden"
          />
          <label
            htmlFor={tab.toString()}
            onClick={() => onTabSelected(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center 
            peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};

// En la primera linea coloca 'use client' para que el componente sea renderizado en el lado del cliente
// 'use client';

// O 'use server' para que el componente sea renderizado en el lado del servidor, aunque por defecto
// los componentes se renderizan en el lado del servidor y pueden ser sincronos o asincronos
// 'use server';

import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";

// Lista de navegación, ruta y texto a mostrar
const navItems = [
  { path: "/about", text: "Acerca de" },
  { path: "/pricing", text: "Precios" },
  { path: "/contact", text: "Contacto" },
];

// Componente sincrono
// export const Navbar = () => {}

// Componente asincrono
// export const Navbar = async () => {}

// Función asincrona para simular un retraso de 2 segundos
// const temporalAsync = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 2000);
//   });
// };

export const Navbar = async () => {
  // Este console.log se ejecutara cada vez que se renderice el componente
  // Pero se imprime en la consola del servidor porque es un componente del lado del servidor
  // console.log("Navbar renderizado");

  // Esperar 2 segundos antes de renderizar el componente
  // Pulsa F5 para ver el efecto
  // await temporalAsync();

  return (
    // La opacidad en tailwind v4 se especifica colocando un / luego
    // de un color de fondo seguido del nivel de opacidad (0 a 100)
    <nav className="flex bg-blue-400/20 p-2 m-2 gap-4 rounded-md">
      {/* Usa Link de next/link para enlaces internos */}
      {/* Pulsa F12 y observa en la pestaña Elements que crea elementos <a></a> */}
      {/* href contiene la ruta a la que se redirigirá el usuario, te puedes guiar por los archivos de la carpeta app */}
      <Link href={"/"} className="flex items-center">
        {/* Icono de home de Octicons, ejecuta npm i @primer/octicons-react para instalar el paquete */}
        {/* https://primer.style/octicons/ */}
        {/* https://www.npmjs.com/package/@primer/octicons-react */}
        <HomeIcon size={20} className="mr-2" />
        <span>Inicio</span>
      </Link>

      <div className="flex flex-1"></div>

      {/* Itera sobre la lista de navegación, no olvidar el key con un ID */}
      {navItems.map((navItem) => (
        <ActiveLink
          key={navItem.path}
          // Si el nombre de la propiedad es el mismo que el valor, se puede omitir, pero solamente si estás
          // pasando el objeto completo como props
          // path={navItem.path}
          // text={navItem.text}
          {...navItem}
        />
      ))}
    </nav>
  );
};

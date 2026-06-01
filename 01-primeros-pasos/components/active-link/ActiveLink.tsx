"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// Importa los estilos desde el modulo CSS
import style from "./ActiveLink.module.css";

interface Props {
  path: string;
  text: string;
}

// Los componentes se definen dentro de una carpeta llamada components
// y se importan en los archivos que los necesiten

// Se recomienda usar carpetas para agrupar componentes relacionados
export const ActiveLink = ({ path, text }: Props) => {
  // usePathname es un hook de Next.js que permite acceder a la ruta actual
  // Pero solamente puede ser usado en un componente del lado del cliente
  const pathName = usePathname();

  // Para que no muestre un error se tiene que colocar 'use client' en la primera linea del archivo
  // Y se vuelve un componente del lado del cliente

  // Posibles valores de pathName (solo toma uno a la vez): /about, /contact, /pricing
  console.log(pathName);

  // useRouter es un hook de Next.js que permite acceder a la instancia de router
  const router = useRouter();

  return (
    <Link
      // Se utiliza estilos de un modulo CSS, que basicamente son strings
      // pathName verifica si la ruta actual es la misma que la ruta del enlace
      // Utiliza corchetes para acceder a la variable escrita en la sintaxis de guion medio (kebab-case)
      className={`${style.link} ${pathName === path && style["active-link"]}`}
      href={path}
      // En un entorno de producción, esta propiedad evita que Next.js pre-cargue esta página
      prefetch={false}
      // Pre-carga la página cuando el usuario pasa el mouse sobre el enlace
      // Esto mejora la experiencia del usuario al reducir el tiempo de carga
      onMouseEnter={() => router.prefetch(path)}

      // Para ejecutar la app en modo de producción, primero debes compilarla con el comando:
      // npm run build
      // Luego ejecutarla con el comando:
      // npm run start (accede a http://localhost:3000)

      // En Next.js 13 ese comportamiento de carga la página al pasar el mouse sobre el enlace era automatico
      // En la actualidad se debe hacer de manera manual tal y como se ha mencionado anteriormente
    >
      {text}
    </Link>
  );
};

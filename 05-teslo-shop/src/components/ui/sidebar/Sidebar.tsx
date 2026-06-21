"use client";
import { signOut } from "next-auth/react";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

// Barra de menu lateral derecha
export const Sidebar = () => {
  // Toma el estado del store
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeMenu);

  // El hook useSession sirve para obtener la información de la sesión del usuario
  // en un componente del lado del cliente
  const { data: session } = useSession();

  // Ten en cuenta que useSession debe estar envuelto en un SessionProvider, el cual
  // es el que extrae la información de la sesión del usuario desde el servidor

  // Crea el provider en la ruta: src\components\provider\Provider.tsx
  // Y luego envuelvelo en el layout principal: src\app\layout.tsx

  // Luego SessionProvider te pedira que no se encuentra la ruta
  // http://localhost:3000/api/auth/session, busca esa ruta para ver si el usuario
  // esta autenticado

  // Para aquello crea el archivo route.ts, en la ruta:
  // src\app\api\auth\[...nextauth]\route.ts

  // Cualquier endpoint de Next Auth (auth.js) caera en ese archivo
  // Imprime la sesión del usuario (un objeto session con la información
  // del usuario autenticado en la propiedad user)
  // console.log({ session });

  // Usa la doble negación para convertir a boolean si hay un usuario autenticado
  const isAuthenticated = !!session?.user;

  // Verifica si el usuario es admin (devuelve un true o false)
  const isAdmin = session?.user?.role === "admin";

  // console.log({ isAdmin });

  // CLSX
  // Ejecuta 'npm i clsx', sirve para aplicar condiciones a clases de CSS
  // console.log("status:", status);
  // console.log("session:", session);
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("isAdmin:", isAdmin);

  return (
    <div>
      {/* Background black - Fondo negro sobre toda la pantalla */}

      {/* Si el menu esta abierto, muestra el fondo negro */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur - Efecto de desenfoque */}
      {/* backdrop-filter y backdrop-blur-sm aplican el desenfoque */}

      {/* Si el menu esta abierto, muestra el blur */}
      {isSideMenuOpen && (
        // Al hacer clic, cierra el menú
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          onClick={() => closeMenu()}
        />
      )}

      {/* Sidemenu - Menu lateral */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen z-20 bg-white shadow-2xl transform transition-all duration-300",
          // Estas clases se añaden condicionalmente
          {
            "translate-x-full": !isSideMenuOpen,
          },
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          // Si hay un evento del cliente, el componente debe ser un Client Component
          onClick={() => closeMenu()}
        />

        {/* Input de busqueda */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            // Se coloca el borde inferior azul cuando se hace clic en el input
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Opciones del menú */}
        {/* Solo muestra esta opción si el usuario esta autenticado */}
        {isAuthenticated && (
          <>
            {/* Perfil del usuario */}
            <Link
              href="/profile"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            {/* Enlace hacia ordenes */}
            <Link
              href="/orders"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          // Botón de cerrar sesión
          // Se recomienda usar un button en lugar de un Link con un evento
          // onClick que contenga una función del lado del servidor ('use server')

          <button
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            // No se recomienda llamar a un server action para cerrar sesión
            // onClick={async () => {
            //   await logout();
            //   closeMenu();
            //   router.refresh();
            // }}

            onClick={() => {
              closeMenu();

              // Esta es la forma correcta de cerrar sesión
              // Puedes redireccionar a una URL luego de cerrar sesión
              // Pero recuerda que AuthPrincipal redirecciona automáticamente
              // a la página de login cuando se cierra sesión

              // signOut({
              //    redirect: true,
              //    callbackUrl: "/",
              // });

              signOut();
            }}
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {/* Si no esta autenticado... */}
        {!isAuthenticated && (
          // Botón para iniciar sesión
          <Link
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {/* Opciones si el usuario tiene el rol de admin */}
        {isAdmin && (
          <>
            {/* Separador */}
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

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
  const { data: session, status } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

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
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            // onClick={async () => {
            //   await logout();
            //   closeMenu();
            //   router.refresh();
            // }}

            onClick={() => {
              closeMenu();

              // Esta es la forma correcta de cerrar sesión
              signOut({
                redirect: true,
                callbackUrl: "/",
              });
            }}
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

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

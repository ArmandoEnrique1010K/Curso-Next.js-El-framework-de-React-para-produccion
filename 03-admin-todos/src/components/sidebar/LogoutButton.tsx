"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";
import { BiLogIn } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";

export const LogoutButton = () => {
  // status sirve para saber el estado de la sesion
  // loading: cargando
  // authenticated: autenticado
  // unauthenticated: no autenticado
  const { data: session, status, update } = useSession();
  console.log(status);

  // update fuerza a next-auth a refrescar la sesion actual
  useEffect(() => {
    update();
  }, []);

  // Mientras carga, muestra un spinner
  if (status === "loading") {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    );
  }

  // Si no esta autenticado, muestra el boton de ingresar
  if (status === "unauthenticated") {
    return (
      <button
        // signIn sirva para iniciar sesion
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 cursor-pointer w-full hover:bg-sky-600 hover:text-white"
      >
        <BiLogIn size={24} />
        <span className="group-hover:text-gray-700">Ingresar</span>
      </button>
    );
  }

  // Si esta autenticado, muestra el boton de logout
  return (
    <button
      // signOut sirva para cerrar sesion
      // Al cerrar sesion se recarga la pagina
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 cursor-pointer w-full hover:bg-sky-600 hover:text-white"
    >
      <CiLogout size={24} />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
};

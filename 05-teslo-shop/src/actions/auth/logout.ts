"use server";

import { signOut } from "@/auth.config";

// Es una mala practica usar server actions para hacer logout
// Porque luego de cerrar sesion se tiene que redirigir a otra pagina
// Y para redirigir se hace en un componente del lado del cliente
export const logout = async () => {
  await signOut();
};

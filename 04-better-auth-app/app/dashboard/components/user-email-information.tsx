"use client";

import { authClient } from "@/lib/auth-client";

const placeholderUser = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
};

// OBTENER INFORMACIÓN DEL USUARIO EN UN COMPONENTE DEL LADO DEL CLIENTE
// https://better-auth.com/docs/basic-usage#client-side
export const UserEmailInformation = () => {
  // Usa el hook useSession de authClient
  const { data: session, isPending, error } = authClient.useSession();

  // Muestra un spinner mientras se carga la sesión
  if (isPending) {
    return <div>Cargando...</div>;
  }

  // Muestra un error si hay un error
  if (error) {
    return <div>Sesion no encontrada: {error.message}</div>;
  }

  // Si no hay sesión, muestra un mensaje
  if (!session) {
    return <div>Sesion no encontrada</div>;
  }

  // Si no hay ningun error, muestra la información del usuario
  return (
    <div className="shrink-0 text-right">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {/* {placeholderUser.name} */}
        {/* Muestra el nombre del usuario */}
        {session.user.name}
      </p>
      <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
        {/* {placeholderUser.email} */}
        {/* Muestra el email del usuario */}
        {session.user.email}
      </p>
    </div>
  );
};

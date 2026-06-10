"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

// Página para el perfil del usuario
export default function ProfilePage() {
  // useSession es un hook para acceder a la sesión del usuario
  const { data: session } = useSession();

  // Probar que se ejecuta del lado del cliente
  useEffect(() => {
    console.log("Lado del cliente");
  }, []);

  // Un error en consola indica que useSession debe estar dentro de un <SessionProvider>
  // en el punto más alto de la aplicación que es el 'src\app\layout.tsx' pero a su vez
  // <SessionProvider> debe estar en un componente del lado del cliente.

  // Y para aquello se crea 'src\auth\components\AuthProvider.tsx'

  return (
    <div>
      <h1 className="text-3xl font-bold">Perfil del usuario</h1>
      <hr />

      <div className="flex flex-col mt-6">
        <span>{session?.user?.name ?? "Sin nombre"}</span>
        <span>{session?.user?.email ?? "Sin email"}</span>
        <span>{session?.user?.image ?? "Sin imagen"}</span>
        <span>{session?.user?.id ?? "Sin UUID"}</span>

        {/* Separa los roles con una coma */}
        <span>{session?.user?.roles?.join(", ") ?? "Sin roles"}</span>
      </div>
    </div>
  );
}

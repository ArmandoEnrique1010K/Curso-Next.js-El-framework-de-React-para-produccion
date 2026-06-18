"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  // Toma SessionProvider de next-auth/react y envuelve el children,
  // para que los componentes hijos puedan acceder a la información de la sesión
  return <SessionProvider>{children}</SessionProvider>;
};

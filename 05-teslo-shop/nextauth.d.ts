import NextAuth, { DefaultSession } from "next-auth";

// Este archivo se usa para extender el tipado de la sesión de NextAuth
// Es necesario para que TypeScript reconozca los campos adicionales
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: string;
      image?: string;
    } & DefaultSession["user"];
  }
}

// Puedes recargar el IDE para que reconozca los cambios
// Pulsa F1 y escribe 'Reload window', pulsa Enter

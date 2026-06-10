import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Definición de tipado para el usuario
interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Agregar cualquier otro campo que tu manejas
   */

  // ID del usuario
  id: string;
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Maneja todas las rutas de autenticación definidas en better-auth
export const { POST, GET } = toNextJsHandler(auth);

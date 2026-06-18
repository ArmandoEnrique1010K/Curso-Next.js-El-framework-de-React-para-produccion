import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

// Redirige si hay una sesión activa. Si la sesión existe, redirige
// a la página de inicio ("/"). Si no existe, devuelve null.
export const PrincipalUser = async () => {
  const session = await auth();

  if (session?.user) {
    // Toma redirect de next/navigation
    redirect("/");
  }

  // Imprime la sesion actual
  console.log({ session });

  // Devolver un null en un componente significa que es un componente
  // que no devuelve nada, pero si ejecuta un procedimiento
  return null;
};

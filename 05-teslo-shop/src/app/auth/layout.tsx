import { auth } from "@/auth.config";
import { PrincipalUser } from "@/components/auth/PrincipalUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Los layouts son generados del lado del servidor
  // Si utilizas await auth(), estás haciendo una llamada asíncrona
  // lo cual no es permitido si tienes "cacheComponents: true" en el archivo next.config.ts
  // Para aquello debes trasladar las partes asincronas a uno o varios componentes

  // const session = await auth();

  // if (session?.user) {
  //   redirect("/");
  // }

  return (
    <main className="flex justify-center">
      {/* Envuelve en un <Suspense> los componentes que tengan contenido asincrono */}
      <Suspense fallback={<div>Cargando...</div>}>
        <PrincipalUser />
      </Suspense>
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
}

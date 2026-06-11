"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Resumen" },
  { href: "/dashboard/security", label: "Seguridad" },
  { href: "#", label: "Usuarios" },
  { href: "#", label: "Sesiones" },
  { href: "#", label: "Ajustes" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // CIERRE DE SESION
  // https://better-auth.com/docs/basic-usage#signout
  const handleSignOut = async () => {
    console.log("Cerrando sesión...");

    // PRIMERA FORMA
    // Llama a la función de Better Auth para cerrar sesión
    // await authClient.signOut({
    //   fetchOptions: {
    //     // Puedes mostrar un spinner o loader aquí
    //     onRequest: () => {
    //       console.log("Loading...");
    //     },
    //     onSuccess: () => {
    //       // Redireccionar
    //       // router.push("/login");
    //       router.push("/");
    //     },
    //     onError: (error) => {
    //       console.error("Error al cerrar sesión:", error);
    //     },
    //   },
    // });

    // SEGUNDA FORMA
    // signOut devuelve un objeto con data y error
    const { data, error } = await authClient.signOut();

    if (error) alert("Error al cerrar sesión");
    // router.replace("/");

    // PROXY EN NEXTJS
    // https://nextjs.org/docs/app/getting-started/proxy

    // En la version 16 de Next.js se recomienda trabajar con proxy en lugar de middlewares
    // Crea el archivo 'proxy.ts' en la raíz del proyecto

    // SI UTILIZAS UN PROXY, ENTONCES YA NO DEBES REDIRIGIR
    // router.replace("/");

    // SINO RECARGAR LA PÁGINA
    router.refresh();

    // Observación: Las contraseñas almacenadas en la base de datos
    // están hasheadas automáticamente por Better Auth.
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8 px-2">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Admin
        </p>
        <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Dashboard
        </p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                isActive
                  ? "rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                  : "rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
        >
          Volver al inicio
        </Link>
        <Link
          href="/auth/login"
          className="mt-1 block rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
        >
          Iniciar sesión
        </Link>
        {/* Botón de cerrar sesión */}
        <button
          type="button"
          onClick={() => handleSignOut()}
          className="mt-2 block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

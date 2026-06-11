"use client";

import type { SubmitEvent } from "react";
import { AuthDivider } from "../components/auth-divider";
import { AuthField } from "../components/auth-field";
import { SocialSignInButtons } from "../components/social-sign-in-buttons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();

  // REGISTRAR AL USUARIO DE LA MANERA TRADICIONAL
  // https://better-auth.com/docs/basic-usage#email--password

  // Esta función debe ser asincrona para que pueda manejar la respuesta de authClient
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Register:", { name, email, password });

    // Se llama a authClient para registrar al usuario
    const { data, error } = await authClient.signUp.email(
      // Se pasa el nombre, email y contraseña (deben ser strings)
      {
        name,
        email,
        password,

        // URL a la que se redirigirá después del registro
        // Se recomienda no usar esta opción porque se saltea la verificación de email
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          // Puedes mostrar un contenido mientras se procesa la solicitud
          console.log("Cargando...");
        },

        // Se ejecuta cuando la solicitud es exitosa ()
        onSuccess: (ctx) => {
          console.log("Todo bien...", ctx);
          // Redirigir al usuario a la página de inicio
          router.push("/");
        },
        // Se ejecuta cuando la solicitud falla
        onError: (ctx) => {
          console.log("Error ", ctx.error.message);
        },
      },
    );
  }

  // Al registrar el usuario, se imprime lo siguiente:
  // Consola del servidor, desde lib\auth.ts:
  // Verificando email: { user, url, token }
  // El valor de 'url' se tiene que utilizar para navegar al usuario a
  // la página de verificación

  // Esa URL contiene como query parameter el token de verificación que
  // se encuentra en la propiedad 'token'

  // Si el registro fue exitoso, en la base de datos, si te vas a la tabla
  // users, verás que el campo 'emailVerified' está en 'false' del usuario que
  // ha sido registrado, (exceptuando usuarios que iniciaron sesión con Google,
  // o GitHub)

  // Significa que aun no puedes usar el correo del usuario creado para iniciar
  // sesión

  // Toma la URL que se imprime en la consola del servidor y cópiala, pégala en
  // tu navegador y presiona Enter

  // Ahora recarga la base de datos y veras que el campo 'emailVerified' está
  // en 'true'

  return (
    <>
      <SocialSignInButtons />
      <AuthDivider />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          id="name"
          label="Nombre"
          type="text"
          name="name"
          autoComplete="name"
        />
        <AuthField
          id="email"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
        />

        {/* BetterAuth pide que la contraseña tenga al menos 8 caracteres (sin haberla validado previamente) */}
        <AuthField
          id="password"
          label="Contraseña"
          type="password"
          name="password"
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Registrarse
        </button>
      </form>
    </>
  );
}

"use client";

import type { SubmitEvent } from "react";
import { AuthDivider } from "../components/auth-divider";
import { AuthField } from "../components/auth-field";
import { SocialSignInButtons } from "../components/social-sign-in-buttons";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  // INICIO DE SESION CON EMAIL Y CONTRASEÑA
  // https://better-auth.com/docs/basic-usage#sign-in

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Login:", { email, password });
    // Llama a authClient para iniciar sesion
    const { data, error } = await authClient.signIn.email(
      {
        email: email,
        password: password,
        // Redirigir a esa URL después de iniciar sesión
        callbackURL: "/dashboard",

        // Recordar la sesión después de cerrar el navegador
        rememberMe: false,
      },
      {
        // Callbacks
        // Se ejecuta antes de enviar la solicitud
        onRequest: () => {
          console.log("Loading...");
        },

        // Se ejecuta si la solicitud fue exitosa
        onSuccess: () => {
          console.log("Success!");
        },

        // Se ejecuta si la solicitud falló (debe ser asincrona para validar error)
        onError: async (ctx) => {
          // Si el usuario no tiene su correo activado (desde la base de datos, si emailVerified
          // es false) e introduce credenciales validas, se ejecuta el callback onError
          // y se detiene la ejecución del formulario

          // Pero se tiene un error 403 forbidden, lo que significa que el servidor
          // no permite el acceso al recurso. A diferencia de un 401 unauthorized,
          // este error indica que el usuario no tiene permiso para acceder al recurso.

          // Puedes mostrar un error diferente para el usuario dependiendo del tipo de error
          // que recibas
          if (ctx.error.status === 403) {
            alert(
              "El correo no ha sido verificado. Por favor, verifica tu correo electrónico.",
            );

            // Envia un email de verificación al usuario
            await authClient.sendVerificationEmail({
              email: email,
              callbackURL: "/",
            });
            // Recuerda que para hacer que el correo del usuario sea verificado, accede a la
            // URL que se tiene en la consola

            return;
          }

          console.log({ contextError: ctx.error });
          console.log("Credenciales no son correctas");

          // Detiene la ejecución del callback
          return;
        },
      },
    );
  }

  // Al iniciar sesion con credenciales invalidas, se ejecuta el callback onError
  // y se detiene la ejecución del formulario

  // Si son validas las credenciales, se ejecuta el callback onSuccess
  // y se redirige al usuario a la página de dashboard

  return (
    <>
      {/* Botones de inicio de sesión social */}
      <SocialSignInButtons />
      <AuthDivider />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          id="email"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Contraseña"
          type="password"
          name="password"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Entrar
        </button>
      </form>
    </>
  );
}

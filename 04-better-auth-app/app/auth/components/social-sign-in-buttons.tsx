import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-5 w-5 fill-current"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const socialButtonClassName =
  "flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-zinc-300 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800";

export function SocialSignInButtons() {
  // Función para iniciar sesión con Google
  const handleGoogleSignIn = async () => {
    // Recuerda que en Next.js se mantiene todo en el lado del servidor a
    // menos que lo declares como 'use client' si necesitas una funcionalidad
    // especifica de cliente como un hook.

    // Toma authClient de 'lib/auth-client', porque es la autenticación del
    // lado del cliente

    // 'data' es la información del signIn y 'error' contiene un error que podria pasar
    const { data, error } = await authClient.signIn.social({
      // Selecciona el provider configurado en 'auth.ts'
      provider: "google",
      // Redirecciona a la ruta especificada después del inicio de sesión
      callbackURL: "/dashboard",
    });

    // console.log({ data, error });
    // El resultado en consola solamente se podra ver cuando marques la opción de
    // "Preserve log" en la consola de desarrollo de Chrome
    // Se tendra el objeto: {data: null, error: null}

    // El objeto no existe en memoria, por lo cual no puede encontrar la referencia
    // console.log(JSON.stringify({ data, error }, null, 2));

    // Ahora se tiene el objeto en consola
    // {
    //   "data": {
    //     "url": "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=..."
    //     "redirect": true
    //   },
    //   "error": null
    // }
  };

  // Función para iniciar sesión con GitHub
  const handleGitHubSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });

    // console.log({ data, error });
  };

  //

  // ERROR DE DEPENDENCIA @better-auth/kysely-adapter
  // SOLAMENTE si aparece un error luego de pulsar el botón de Google para iniciar sesión

  // Se debe a que hay una dependencia que usa una versión antigua de kysely
  // y better-auth usa una versión más reciente, por lo que hay un conflicto
  // de versiones.

  // Para solucionar este problema, se debe sobreescribir la dependencia
  // en el package.json colocando una version especifica (sin el ^ o ~)
  // "overrides": {
  //   "kysely": "0.28.17"
  // }

  // Luego borra la carpeta node_modules y ejecuta npm install

  // ================================================================

  // Clic en el botón de google, si seleccionas tu cuenta de Google
  // y das click en continuar, se te redirigirá a la página de dashboard

  // En la pestaña Applications de las herramientas de desarrollo de Chrome
  // verás que se ha creado las cookies de la aplicación cuando inicias sesión

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className={socialButtonClassName}
        // Llama a la función cuando se hace clic
        onClick={handleGoogleSignIn}
      >
        <GoogleIcon />
        Continuar con Google
      </button>
      <button
        type="button"
        className={socialButtonClassName}
        onClick={handleGitHubSignIn}
      >
        <GitHubIcon />
        Continuar con GitHub
      </button>
    </div>
  );
}

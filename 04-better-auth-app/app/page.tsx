import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:flex-wrap">
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[180px]"
            href="/auth/login"
          >
            Ir al login
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[180px]"
            href="/dashboard"
          >
            Ir al dashboard
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[180px]"
            href="/auth/two-factor"
          >
            Ir a two-factor
          </Link>
        </div>
      </main>
    </div>
  );
}

// INTRODUCCIÓN

// Para trabajar con Better Auth, se recomienda tener como minimo la version 16 de next.js, lo puedes
// comprobar en el archivo package.json

// Actualmente se recomienda trabajar con proxies en lugar de middlewares

// La mayor parte de las aplicaciones web modernas usan two factor authentication para manejar la autenticación

//

// NEONTECH: BASE DE DATOS
// https://neon.com/

// Una vez creado tu cuenta, se necesita crear una instancia de la base de datos
// 1. Clic en New Project
// 2. Escribele un nombre como 'BetterAuth-App', selecciona version 18 de Postgres
// 3. La región por defecto es suficiente (AWS US East 1(N. Virginia))
// 4. Clic en Create Project

// Clic en el botón Connect, selecciona la opción de "Connection String", se te mostrará una cadena
// de conexión, copiala y pegala en el archivo .env

// La URL de conexión tiene el siguiente formato:
// postgresql://<user>:<password>@<host>:<port (optional)>/<database_name>?sslmode=require&channel_binding=require
// SSLmode es el modo de autenticación, en este caso es require

// Puedes ir a la sección de 'tables' en Neon para ver las tablas que se tienen en la base de datos

//

// BETTER AUTH: AUTENTICACIÓN
// https://better-auth.com/docs/introduction
// Tiene conectores para cualquier framework, en este caso usaremos Next.js
// Ejecuta el comando 'npm install better-auth' para instalar la dependencia

// Luego se tiene que crear variables de entorno para la configuración de Better Auth
// en el archivo .env para el manejo de sesiones, se recomienda ejecutar ese comando para
// generar una clave secreta segura en una terminal:
// openssl rand -base64 32

// O pulsa el botón "Generate Secret" en la página de Better Auth:
// https://authkit.com/docs/guides/generate-secret

// Pega la clave generada en la variable BETTER_AUTH_SECRET

// Luego pide la variable de entorno BETTER_AUTH_URL, para redireccionar cuando se haga un
// login o registro

//

// CREAR LA INSTANCIA DE BETTER AUTH
// Crea una carpeta llamada 'lib' en la raiz del proyecto y dentro de ella crea un archivo
// llamado 'auth.ts'

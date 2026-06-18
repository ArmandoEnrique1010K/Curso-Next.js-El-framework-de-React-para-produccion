"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { authenticate } from "@/actions";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";
// import { useRouter } from 'next/navigation';

// Formulario de inicio de sesion del lado del ciente
// https://nextjs.org/learn/dashboard-app/adding-authentication#updating-the-login-form
export const LoginForm = () => {
  // const router = useRouter();

  // Anteriormente en NextAuth se utiliza useFormState para tener acceso al estado
  // del formulario y dispatch para ejecutar la acción relacionada a inicio de sesión
  // const [state, dispatch] = useFormState(authenticate, undefined);

  // Actualmente se utiliza useActionState que contiene una función de un server action
  // para autenticar al usuario
  // isPending es un boolean que indica si la acción está en curso
  // errorMessage es el mensaje de error retornado por la acción
  // formAction es la función que se ejecuta al enviar el formulario
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  // errorMessage devuelve un undefined al recargar la página de login
  // console.log(state);
  console.log(errorMessage);

  // useEffect(() => {
  //   if (state === "Success") {
  //     // redireccionar
  //     // router.replace('/');
  //     window.location.replace("/");
  //   }
  // }, [state]);

  // Para redireccionar luego de introducir credenciales correctas
  // utiliza un useEffect (este debe ser un client component) cuya dependencia
  // sea errorMessage
  useEffect(() => {
    if (errorMessage === "Success") {
      // Redireccionar a la página principal
      // router.replace('/');

      // En lugar de router.replace se utiliza window.location.replace
      // para que haga una recarga del navegador y actualice el estado

      // La diferencia es que router.replace no recarga el navegador,
      // solo cambia la ruta
      window.location.replace("/");

      // Recuerda que desde el componente PrincipalUser, si hay una sesión activa
      // redirige a la página de inicio ("/"), por lo cual ya no puedes ir a
      // la página de login ('auth/login').
    }
  }, [errorMessage]);

  return (
    // <form action={dispatch} className="flex flex-col">
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Credenciales no son correctas
            </p>
          </div>
        )} */}

        {/* Muestra el mensaje de error cuando las credenciales son incorrectas */}
        {/* Recordar que errorMessage devuelve 'Success' si ha sido exitoso desde 
        la función authenticate definido en el server action 'login.ts' */}
        {errorMessage && errorMessage !== "Success" && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Credenciales no son correctas
            </p>
          </div>
        )}
      </div>

      <LoginButton isPending={isPending} />
      {/* <button type="submit" className="btn-primary">
        Ingresar
      </button> */}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

// Componente funcional
function LoginButton({ isPending }: { isPending: boolean }) {
  // Obtiene el estado de carga del formulario
  // const { pending } = useFormStatus();

  // Actualmente se utiliza isPending de useActionState, y se pasa
  // como prop al componente funcional

  // Imprime true si se ha hecho clic para enviar el formulario (estado
  // de carga pendiente) y false cuando ya no se está cargando
  console.log(isPending);

  return (
    <button
      type="submit"
      // clsx aplica un estilo condicional
      className={clsx({
        "btn-primary": !isPending,
        // Utiliza la clase definida en globals.css
        "btn-disabled": isPending,
      })}
      // Se deshabilita el botón cuando está cargando
      disabled={!!isPending}
    >
      Ingresar
    </button>
  );
}

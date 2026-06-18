"use server";

import { sleep } from "@/utils";
import { signIn } from "../../auth.config";
import { AuthError } from "next-auth";

// Función que se encargue de autenticar al usuario (server action)
// https://nextjs.org/learn/dashboard-app/adding-authentication#updating-the-login-form
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Simula un retraso de 2 segundos para simular una carga
    await sleep(2);

    // Muestra los datos del formulario en la consola
    // console.log(Object.fromEntries(formData));

    // Posible resultado:
    // {
    //   '$ACTION_REF_1': '',
    //   '$ACTION_1:0': '{"id":"609a2db47f65e40e249620cfc7ae2455db461a29aa","bound":"$@1"}',
    //   '$ACTION_1:1': '["$undefined"]',
    //   '$ACTION_KEY': 'kdcfeb29f5179da8da9c655f5b839cbc0',
    //   email: 'fernando@google.com',
    //   password: '12345'
    // }

    // Para obtener la información del correo del usuario lo puedes obtener desde
    // auth.config.ts
    // No olvidaes colocar el atributo name en los campos del formulario

    // Coloca el provider de autenticación, en este caso credentials (ver auth.config.ts)
    // Forma tradicional de inicio de sesion
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      // Evita que la redirección automática ocurra
      redirect: false,
    });

    // Si no hay error, retorna "Success"
    return "Success";
  } catch (error) {
    // console.log(error);

    // Imprime el mensaje de error en la consola del servidor
    // console.log({ error: error?.toString() });

    // return "CredentialsSignin";

    // Devuelve un mensaje de error específico según el tipo de error
    if (error instanceof AuthError) {
      // error.type contiene el tipo de error
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas.";
        default:
          return "Algo salió mal.";
      }
    }
    throw error;
  }
}

// Server action para iniciar sesion desde el formulario de registrar usuario
export const login = async (email: string, password: string) => {
  try {
    // Inicia sesión con las credenciales
    await signIn("credentials", { email, password });

    // Respuesta exitosa
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};

import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

// Se utiliza cuando se necesita interactuar con la autenticación desde el cliente
export const authClient = createAuthClient({
  // URL base
  baseURL: "http://localhost:3000",

  // Habilita el plugin de autenticación de dos factores
  plugins: [
    twoFactorClient({
      // LOGIN CON TWO FACTOR AUTHENTICATOR
      // https://better-auth.com/docs/plugins/2fa#verifying-totp

      // Accede a la siguiente página para iniciar sesión con dos factores
      // http://localhost:3000/auth/two-factor

      // Página donde se mostrará el formulario de verificación
      twoFactorPage: "/auth/two-factor",
    }),
  ],
});

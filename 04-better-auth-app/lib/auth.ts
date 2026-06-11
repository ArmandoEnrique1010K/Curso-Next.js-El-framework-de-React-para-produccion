import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { Pool } from "pg";

// Configuracion global de Better Auth
export const auth = betterAuth({
  //    Base de datos, selecciona la opción postgres en la documentación
  // https://better-auth.com/docs/installation#configure-database
  // Requiere instalar 'pg', ejecuta 'npm i pg' y su tipado con 'npm i -D @types/pg'
  database: new Pool({
    // Cadena de conexion, usa la variable de entorno DATABASE_URL
    connectionString: process.env.DATABASE_URL,
    // Si la base de datos esta en la nube, coloca esto en true
    // Pero si esta en local o en docker, coloca esto en false
    ssl: true,

    // Luego pide crear las tablas, ejectuta 'npx auth@latest generate',
    // genera unos archivos de migración (te pedira instalar la dependencia auth,
    // solamente pulsa 'Y' para instalar, puede demorar unos minutos)

    // Luego te preguntara si quieres ejecutar las migraciones, pulsa 'Y'
    // Creara una carpeta 'better-auth_migrations' con los archivos de migración
    // Un archivo de migración tiene el SQL para crear las tablas de Better Auth

    // Luego puedes migrar esos campos, aplicarlos a la base de datos ejecutando
    // 'npx auth@latest migrate'

    // Tambien te preguntara si quieres ejecutar las migraciones, pulsa 'Y' (ten en
    // cuenta que esto va a borrar los datos existentes), puedes comprobarlo en la
    // base de datos si tiene las tablas creadas
  }),

  // PROVEEDORES Y METODOS DE AUTENTICACIÓN
  // https://better-auth.com/docs/installation#authentication-methods

  // Login con email y contraseña
  emailAndPassword: {
    // Habilitar el login con email y contraseña
    enabled: true,
    // Requerir verificación de email (caso de uso: si vas a crear un servicio,
    // necesitas que el usuario verifique su email antes de poder usar el servicio)
    // Si fuera 'false', se puede llenar de spam y usuarios falsos en la plataforma
    requireEmailVerification: true,
  },

  // Envia el correo de verificación
  emailVerification: {
    // Cuando inicia sesion
    sendOnSignIn: true,
    // Cuando se registra
    sendOnSignUp: true,
    // Inmediatamente una vez que el usuario verifique su email, inicia sesion
    autoSignIn: true,

    // Función para personalizar el envío del correo de verificación
    // Desestructura el primer parametro para obtener el email
    sendVerificationEmail: async ({ user, url, token }) => {
      console.log("Verificando email:", { user, url, token });

      // Aqui puedes llamar a una función para enviar el email
      // Por ejemplo, usando SendGrid, Resend, etc.
    },
  },

  // Proveedores sociales (Google, GitHub, etc.)
  socialProviders: {
    github: {
      // Las variables de entorno contiene el clientId y el clientSecret
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },

    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    // NOTA: EN EL PROYECTO ANTERIOR SE ENCUENTRAN LOS PASOS PARA CREAR UNA OAUTH APP DE GOOGLE
    // ADEMÁS DE CREAR EN GITHUB UNA OAUTH APP PARA OBTENER EL CLIENT_ID Y EL CLIENT_SECRET

    // Según la documentación de Better Auth, la URL de redireccionamiento de Google
    // en Better Auth es la misma que la de Auth.js
    // http://localhost:3000/api/auth/callback/google

    // Tambien la URL de redireccionamiento de GitHub es la misma que la de Auth.js
    // http://localhost:3000/api/auth/callback/github

    // Recuerda que la ubicación del archivo 'route.ts' es importante, ya que
    // la URL de redireccionamiento debe coincidir con la ruta del archivo
  },

  // HANDLER
  // Por defecto tiene seleccionada la opción 'next-js-app-router' en la documentación
  // https://better-auth.com/docs/installation#mount-handler

  // Crea el archivo 'route.ts' en el directorio:
  // 'app/api/auth/[...all]/route.ts'

  // Copia y pega el codigo que se encuentra en la documentación en ese archivo

  // INSTANCIA DEL CLIENTE
  // https://better-auth.com/docs/installation#create-client-instance
  // Crea el archivo 'auth-client.ts' en el directorio 'lib/', copia y pega el
  // codigo que se encuentra en la documentación, luego haber seleccionado el
  // framework de React

  //

  // Plugins adicionales

  // TWO FACTOR AUTHENTICATION EN BETTER AUTH
  // https://better-auth.com/docs/plugins/2fa

  // Aparte del usuario y contraseña, se va a tener un valor que cambie cada 30 segundos
  // Este valor se genera con una aplicación de autenticación como Google Authenticator
  // El valor sirve para asegurarse de que el usuario tenga acceso a su dispositivo para
  // autorizar el inicio de sesión

  plugins: [twoFactor()],

  // Luego debes hacer una migración, ejecuta 'npx auth migrate', te pedira instalar
  // 'auth@1.6.16' (solamente escribe 'Y' cuando te lo pida y pulsa ENTER), afectara
  // unos campos en las tablas, por lo cual es importante hacer una copia de seguridad
  // de la base de datos antes de ejecutar el comando si estas en un entorno de producción

  // Luego genera los modelos, para ese ultimo ejecuta 'npx auth generate'

  // Ahora debes tener la tabla 'twoFactor' en la base de datos

  // Luego te pide hacer una configuración en auth-client.ts
  // https://better-auth.com/docs/plugins/2fa#add-the-client-plugin
});

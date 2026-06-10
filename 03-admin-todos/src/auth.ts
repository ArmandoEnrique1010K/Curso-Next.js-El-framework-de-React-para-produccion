import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signInEmailPassword } from "./auth/actions/auth-actions";

// AUTH.JS
// https://authjs.dev/
// https://nextjs.org/learn/dashboard-app/adding-authentication

// Es la evolución de NextAuth v4, la versión 5 de NextAuth se llama ahora Auth.js
// Es una librería de autenticación para aplicaciones web, de código abierto
// Permite autenticar usuarios con OAuth, OpenID, JWT, entre otros
// Se integra facilmente con Next.js

// Ejecuta el comando 'npm install next-auth@beta' para instalar la dependencia
// 'beta' indica que es una versión beta, pero es estable y compatible con App Router de Next.js

// Luego se tiene que crear la configuración del servidor
// https://authjs.dev/guides/configuring-resend#creating-the-server-config
// https://authjs.dev/guides/configuring-github

// En la ruta app/api/auth/[...nextauth]/route.ts se crea la configuración del servidor

// Definición de la configuración de Auth.js
export const { auth, handlers, signIn, signOut } = NextAuth({
  // Definición de providers
  providers: [
    // Integración con el proveedor de Github
    // Requiere 2 variables de entorno
    GitHub({
      // No olvidar colocar las variables de entorno en el archivo '.env'
      // Se coloca un string vacio como valor por defecto para evitar errores en desarrollo
      clientId: process.env.GITHUB_ID! ?? "",
      clientSecret: process.env.GITHUB_SECRET! ?? "",
      allowDangerousEmailAccountLinking: true,

      // No funciona para obtener el email del usuario
      // authorization: {
      //   params: {
      //     scope: "read:user user:email",
      //   },
      // },

      // GITHUB PROVIDER
      // https://authjs.dev/getting-started/authentication/oauth

      // Entra a esta guia y ve a la sección de 'Creating an OAuth App in GitHub'
      // https://authjs.dev/guides/configuring-github

      // Existen varios providers aparte de Github
      // Para obtener esas 2 variables de entorno (que no son visibles para el usuario),
      // sigue estos pasos:
      // 1. Accede a tu perfil de github, clic en tu icono de perfil, selecciona settings
      // 2. En la barra lateral izquierda, busca 'Developer settings'
      // 3. En 'Developer settings', busca 'OAuth Apps'
      // 4. En 'OAuth Apps', busca 'New OAuth App'
      // 5. En 'New OAuth App', completa los campos necesarios:
      // - Application name: nombre de la aplicación <-- puedes poner cualquier nombre
      // - Homepage URL: URL del sitio web de la aplicación <-- puedes poner cualquier URL como 'http://armandoenrique1010k.com'
      // - Callback URL: URL de la aplicación <-- cuando inicia sesion, se redireccionara a esta, ejemplo: http://localhost:3000/api/auth/callback/github
      // - Webhook: desmarca la opción active
      // Deja los demas campos como estan

      // Clic en "Register application"

      // Copia el ClientID y pegalo en la variable de entorno respectiva
      // Tambien genera un 'client secret' (solamente se podra ver una vez)
      // Copia el 'client secret' y pegalo en la variable de entorno respectiva

      // Clic en 'Save changes' para guardar el client secret

      // Ahora puedes probar la autenticación y te mostrara el botón de 'Sign in with GitHub'
      // Te abrira la página de Github para que inicies sesión con tu cuenta actual
      // Recuerda que utilizara tu email de github para identificarte y tu información de perfil

      // Solamente haz clic en 'Authorize github' para autorizar el acceso a tu cuenta

      // Luego te redirecciona a una página de la aplicación

      // Si exploras las cookies, hay una llamada 'next-auth-callback-url' que contiene la URL de redirección
      // su valor por defecto es la ultima URL visitada antes de iniciar sesión
    }),

    // GOOGLE PROVIDER
    // https://authjs.dev/getting-started/providers/google
    // https://console.cloud.google.com

    // Se define un nuevo provider, el orden de los providers importa en la vista del usuario
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",

      // Para tener los valores ve a: https://console.cloud.google.com
      // Haz clic en 'Selecciona un proyecto' y luego 'Proyecto nuevo'
      // Colocale el nombre 'Next-Admin-Todos' y pulsa 'Crear'
      // Espera unos segundos hasta que el proyecto se cree

      // Luego haz clic en el botón de 'Sin organización' y selecciona 'Next-Admin-Todos'
      // En el buscador escribe y busca 'Credentials', seleccionalo

      // Haz clic en 'Crear credenciales' y selecciona 'ID de cliente de OAuth 2.0'
      // Clic en 'Configurar pantalla de consentimiento' para darle acceso a la aplicación
      // Te pedira configurar Google Auth Platform, clic en comenzar y escribe lo siguiente:

      // 1. Información de la app:
      // - Nombre de la app: Next-Admin-Todos
      // - Correo de asistencia al usuario: tu email

      // 2. Publico
      // - Selecciona 'usuarios externos' para cualquier usuario que tenga su correo de google

      // 3. Información de contacto
      // - Correo de contacto: tu email

      // 4. Finalizar
      // - Acepto los términos y condiciones

      // Clic en crear

      // Vuelve a buscar 'Credentials' y selecciona 'Crear Credenciales'
      // Selecciona 'ID de cliente de OAuth 2.0'

      // Te pedira el tipo de aplicación, selecciona 'Aplicación web'
      // Nombre: Cliente web - AdminTodos
      // URI de redirección autorizadas: http://localhost:3000/api/auth/callback/google
      // Esa URL es la que se usa en el provider de Google

      // Clic en crear y se mostrara el ID del cliente y el secreto solamente esa vez
      // Copia el 'Client ID' y el 'Client Secret' y pégalo en el archivo .env.local

      // Regresa a la página de autenticación (http://localhost:3000/api/auth/signin), borra
      // las cookies y aparecera el botón de Google para iniciar sesión por debajo del boton de github

      // Inicia sesion con tu usuario de Google y listo
      // Aparecera un problema con respecto a la imagen de perfil de google, agrega el dominio en
      // next.config.ts

      // ENLACE AUTOMATICO DE 2 PROVEEDORES
      // Si quieres que un usuario pueda iniciar sesion con 2 proveedores, puedes hacerlo de la siguiente manera:
      // En este caso, si un usuario ya tiene una cuenta con Google, puede iniciar sesion con Google y con Github
      // Si un usuario ya tiene una cuenta con Github, puede iniciar sesion con Github y con Google, para aquello
      // se agrega esto:
      allowDangerousEmailAccountLinking: true,
    }),

    //

    // CREDENTIALS PROVIDER
    // https://authjs.dev/getting-started/authentication/credentials

    // Se añade un nuevo provider para autenticación con credenciales
    Credentials({
      // Nombre
      name: "credentials",
      // Credenciales
      credentials: {
        email: {
          label: "Correo electronico",
          type: "email",
          placeholder: "usuario@google.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "********",
        },
      },

      // Método asincrono para devolver el usuario o un null
      async authorize(credentials) {
        // Aqui se puede hacer la validación de credenciales
        // Por ejemplo, validar contra una base de datos

        // Usuario de prueba
        // const user = {
        //   id: "1",
        //   name: "Usuario de prueba",
        //   email: "usuario@gmail.com",
        // };

        // Llamar a la función para validar las credenciales
        const user = await signInEmailPassword(
          // Ambos deben ser de tipo string
          credentials!.email as string,
          credentials!.password as string,
        );

        // Si las credenciales son validas, retorna el usuario
        if (user) {
          return user;
        } else {
          // Si las credenciales no son validas, retorna null
          return null;
        }

        // Si tratas de iniciar sesion en el formulario ingresando tu correo asociado a tu
        // cuenta de google o github no va a funcionar porque no tienes una contraseña
        // A menos que hagas clic en el botón de "Continuar con Google" o "Continuar con GitHub"
        return null;
      },
    }),
  ],

  // Puedes personalizar la página de inicio de sesión si defines en este caso
  // una pagina que se encuentra en: src\app\login\page.tsx
  pages: {
    signIn: "/login",
  },

  // CONFIGURAR PRISMA ADAPTER
  adapter: PrismaAdapter(prisma) as Adapter,

  // Intenta grabar los datos de autenticación en prisma
  // Tambien debes modificar el schema de Prisma tal y como lo menciona la URL
  // https://authjs.dev/getting-started/adapters/prisma

  // Modifica el archivo schema.prisma

  // Maneja la sesion por la estrategia de JWT
  session: {
    strategy: "jwt",
  },

  // Funciones que pasan en cierto punto del ciclo de vida de autenticación
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Devuelve los datos del usuario, pero
      console.log({ user });
      // Tiene las propiedades: id, name, email, image, createdAt, updatedAt, roles e isActive

      // Al retornar un false, niega la autenticación
      // return false;

      // Redirecciona a: http://localhost:3000/api/auth/error?error=AccessDenied
      // Se tiene una página con un error: Access Denied, You do not have permission to sign in.

      return true;
    },

    // JWT contiene la información que se le pasa a la función session
    async jwt({ token, user, account, profile }) {
      // token es un objeto con las propiedades name, email, picture, sub, iat, exp, jti
      // Con la propiedad email se puede verificar que el email exista en la base de datos
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? "sin-correo",
        },
      });

      // La propiedad isActive sirve para verificar si el usuario está activo
      if (dbUser?.isActive === false) {
        throw new Error("El usuario no estáactivo");
      }

      // Se le añade información adicional al JWT, esos campos se le añaden al objeto token
      token.roles = dbUser?.roles ?? ["sin-roles"];
      token.id = dbUser?.id ?? "sin-uuid";

      console.log({ token });

      return token;
    },

    // Session contiene la información que se le pasa a la función session
    // La sesion se crea luego del JWT
    async session({ session, token, user }) {
      if (session && session.user) {
        // Como el objeto session no tiene esas propiedades, se les asigna
        // session.user.roles = token.roles as string[];
        // session.user.id = token.id as string;

        // Otra forma es crear el archivo types.d.ts en la raiz del proyecto para
        // especificar el tipado y modificar tsconfig.json para que incluya ese archivo
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      console.log({ session, token, user });
      return session;
    },
  },

  // Definición de la secret
  secret: process.env.AUTH_SECRET,
});

// Para probar la autenticación, accede a la siguiente URL que ha sido generada
// http://localhost:3000/api/auth/signin

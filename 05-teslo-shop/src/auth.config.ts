import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";

import prisma from "./lib/prisma";

// AUTENTICACIÓN CON AUTH.JS
// https://nextjs.org/learn/dashboard-app/adding-authentication
// https://authjs.dev/reference/nextjs

// La ultima versión de NextAuth es la version 4, pero ahora se usa Auth.js
// Auth.js es la nueva versión de NextAuth, su version actual es la 5

// Ejecuta el comando 'npm install next-auth@beta', beta significa que es una
// versión experimental, pero es la que se usa actualmente

// Luego se tiene que crear una variable de entorno AUTH_SECRET y debe tener un
// valor generado cuando:
// - Ejecutas este comando en consola: openssl rand -base64 32
// - O puedes ir a https://generate-secret.vercel.app/32 y copiar el código generado

// Crea el archivo auth.config.ts dentro de la carpeta 'src'
// https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-pages-option

// Esta función debe tener el tipado de NextAuthConfig
export const authConfig: NextAuthConfig = {
  // Configuración de las rutas de páginas de login y registro
  // Tener en cuenta la direccion de archivos page.tsx
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  // Callbacks, se ejecutan cuando se autentica un usuario
  callbacks: {
    // authorized sirve para validar si el usuario está autorizado para acceder a una página
    authorized({ auth, request: { nextUrl } }) {
      // console.log({ auth });
      const isLoggedIn = !!auth?.user;

      // Proxy para limitar el acceso a ciertas rutas
      // https://nextjs.org/learn/dashboard-app/adding-authentication#protecting-your-routes-with-nextjs-proxy

      // Rutas protegidas
      const protectedRoutes = [
        "/profile",
        "/cart",
        // TODO: ARREGLAR LAS RUTAS
        // "/checkout",
        "/admin",
        "/checkout/address",
      ];

      // Verifica si se está accediendo a una ruta protegida
      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );

      // Si se está accediendo a una ruta protegida y el usuario no está logueado,
      // redirige al login
      if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      // Si el usuario está logueado y está intentando acceder a la página de
      // login, redirige al home
      if (
        isLoggedIn &&
        ["/auth/login", "/auth/new-account"].includes(nextUrl.pathname)
      ) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },

    // JSON WEB TOKEN, devuelve un JWT
    jwt({ token, user }) {
      // console.log({ token, user });
      // Posible valor:
      //  {
      //   token: {
      //     name: 'Fernando Herrera',
      //     email: 'fernando@google.com',
      //     picture: null,
      //     sub: 'd784166d-e76d-44dd-800b-66c401ca7240',
      //     data: {
      //       id: 'd784166d-e76d-44dd-800b-66c401ca7240',
      //       name: 'Fernando Herrera',
      //       email: 'fernando@google.com',
      //       emailVerified: null,
      //       role: 'admin',
      //       image: null
      //     },
      //     iat: 1781748572,
      //     exp: 1784340572,
      //     jti: 'd775e09a-f93a-4326-8fc1-7874e974c65a'
      //   },
      //   user: undefined
      // }

      // Cuando inicias sesion, el valor de la propiedad user es un objeto
      // user: {
      //   id: 'd784166d-e76d-44dd-800b-66c401ca7240',
      //   name: 'Fernando Herrera',
      //   email: 'fernando@google.com',
      //   emailVerified: null,
      //   role: 'admin',
      //   image: null
      // }

      // Que es el objeto equivalente devuelto por la función authorize en el provider
      // de Credentials

      // Si recargas la página, veras que user se vuelve undefined

      // Ese objeto se tiene que pasar al token para que tenga la información del usuario
      if (user) {
        token.data = user;
      }

      return token;
    },

    // El usuario (user) es undefined, porque el token ya tiene la información del usuario
    session({ session, token, user }) {
      // console.log({ session, token, user });

      // Solamente si el valor de token.data existe como resultado del callback de jwt
      // se asigna a session.token.data
      //
      // Posible valor:
      // {
      //   session: {
      //     user: {
      //       name: 'Fernando Herrera',
      //       email: 'fernando@google.com',
      //       image: null
      //     },
      //     expires: '2026-07-18T02:08:17.919Z'
      //   },
      //   token: {
      //     name: 'Fernando Herrera',
      //     email: 'fernando@google.com',
      //     picture: null,
      //     sub: 'd784166d-e76d-44dd-800b-66c401ca7240',
      //     data: {
      //       id: 'd784166d-e76d-44dd-800b-66c401ca7240',
      //       name: 'Fernando Herrera',
      //       email: 'fernando@google.com',
      //       emailVerified: null,
      //       role: 'admin',
      //       image: null
      //     },
      //     iat: 1781748497,
      //     exp: 1784340497,
      //     jti: 'c3377be9-6de2-4e33-ab3b-d55e625b7572'
      //   },
      //   user: undefined
      // }

      // Se coloca un tipado any
      session.user = token.data as any;
      return session;

      // Con ello ya se tiene la información del usuario en
      // src\components\profile\ProfileUser.tsx, al llamar a session.user (desde
      // la función auth())

      // Para solucionar el problema del tipado, crea el archivo 'nextauth.d.ts' en la
      // raíz del proyecto
    },
  },

  // Proveedores de autenticación
  // https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-credentials-provider
  providers: [
    // Proveedor de credenciales (email y password)
    // Login clásico
    Credentials({
      // La función authorize se ejecuta cuando se intenta iniciar sesión
      // Debe retornar null si el usuario no ha logrado iniciar sesión o un
      // objeto si ha iniciado sesión
      async authorize(credentials) {
        // Se utiliza zod para asegurarse que los datos sean válidos
        // Ejecuta 'npm i zod' para instalar zod

        // Parsear los credenciales con zod, se tiene un objeto cuyas propiedades
        // es un email y una password (minimo 6 caracteres)
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        // Verifica si se ha parseado los datos (true o false)
        // console.log(parsedCredentials.success)

        // Si no se pudo parsear los credenciales, retornar null
        if (!parsedCredentials.success) return null;

        // Extraer el email y la password
        const { email, password } = parsedCredentials.data;

        // Imprime en la consola del servidor el correo y la contraseña
        // (Solamente si ha introducido credenciales válidas)
        // console.log("auth.config.ts");
        // console.log({ email, password });
        // Posible valor: { email: 'fernando@google.com', password: '123456' }

        // Buscar el correo
        // findUnique sirve para buscar un único registro en la base de datos
        // Si hay más de un registro con el mismo email, retorna el primero
        const user = await prisma.user.findUnique({
          where: {
            // Se convierte el email a minúsculas para que no haya problemas con
            // el email (por ejemplo, si el usuario introduce "Fernando@GOOGLE.com")
            email: email.toLowerCase(),
          },
        });

        // Si no hay un usuario se retorna null y eso llama al throw definido
        // en la función authenticate (en el server action de login.ts)
        if (!user) return null;

        // Comparar las contraseñas
        // compareSync sirve para comparar una contraseña en texto plano con
        // una contraseña encriptada
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Regresar el usuario sin el password mediante el operador rest
        // Lo cual es importante para no exponer la contraseña
        const { password: _, ...rest } = user;

        // Inicia sesion con un usuario con credenciales validas y te imprimira
        // en la consola del servidor
        // console.log({ rest });

        // Posible valor:
        // {
        //   rest: {
        //     id: 'd784166d-e76d-44dd-800b-66c401ca7240',
        //     name: 'Fernando Herrera',
        //     email: 'fernando@google.com',
        //     emailVerified: null,
        //     role: 'admin',
        //     image: null
        //   }
        // }

        return rest;

        // Cuando inicias sesion, se almacenan unas cookies relacionadas
        // con la sesión del usuario:
        // authjs.callback-url: contiene la url de redireccion de la aplicación si ha logrado iniciar sesion
        // authjs.csrf-token: contiene el token de autenticación
      },
    }),
  ],
};

// Exportar las funciones de autenticación de NextAuth
// Pasale las configuraciones de authConfig
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

// Si realizas un cambio en la base de datos en la tabla users y vuelves a actualizar la
// página del perfil del usuario, veras que no se actualiza porque los cambios del usuario
// estan en el JWT
// Para actualizar el JWT, necesitas actualizar el JWT manualmente

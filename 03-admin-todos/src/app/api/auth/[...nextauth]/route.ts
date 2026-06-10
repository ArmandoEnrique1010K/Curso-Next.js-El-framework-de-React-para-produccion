// A partir de la versión 15 de Next.js se opta por utilizar Auth.js en lugar de NextAuth

// En la versión 5 de Auth.js la configuración de Auth.js se define en
// el archivo 'auth.ts' que debe encontrarse dentro de la carpeta 'src'

// [...nextauth] es un patrón de Auth.js para manejar las rutas de autenticación
// Configuración de Auth.js
import { handlers } from "@/auth";

// Solamente se manejan peticiones de tipo GET y POST
export const { GET, POST } = handlers;

//
//
//

// export const authOptions: NextAuthConfig = {
//   providers: [
//     GitHub,
//     // ({
//     //   clientId: process.env.GITHUB_ID!,
//     //   clientSecret: process.env.GITHUB_SECRET!,
//     // }),
//   ],
// };

// // Este handler es el que se exporta para ser usado en las rutas de Next.js
// const nextAuthHandler = NextAuth(authOptions);
// // Solamente se manejan peticiones de tipo GET y POST

// const { handlers } = nextAuthHandler;

// export { handlers as GET, handlers as POST };

// Configuración antigua de NextAuth v4
// // https://authjs.dev/getting-started/migrating-to-v5#typescript
// // Antes se usaba NextAuthOptions, ahora se usa NextAuthConfig para el tipado
// export const authOptions: NextAuthConfig = {
//   // adapter: PrismaAdapter(prisma) as Adapter,

//   // Definición de providers
//   providers: [
//     // Integración con el proveedor de Github
//     // Requiere 2 variables de entorno
//     GitHub({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//       // allowDangerousEmailAccountLinking: true
//     }),

//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     //   // allowDangerousEmailAccountLinking: true
//     // }),

//     //   CredentialsProvider({
//     //     name: "Credentials",
//     //     credentials: {
//     //       email: {
//     //         label: "Correo electrónico",
//     //         type: "email",
//     //         placeholder: "usuario@google.com",
//     //       },
//     //       password: {
//     //         label: "Contraseña",
//     //         type: "password",
//     //         placeholder: "******",
//     //       },
//     //     },
//     //     async authorize(credentials, req) {
//     //       const user = await signInEmailPassword(
//     //         credentials!.email,
//     //         credentials!.password,
//     //       );

//     //       if (user) {
//     //         return user;
//     //       }

//     //       return null;
//     //     },
//     //   }),
//   ],

//   // session: {
//   //   strategy: "jwt",
//   // },

//   // callbacks: {
//   //   async signIn({ user, account, profile, email, credentials }) {
//   //     return true;
//   //   },

//   //   async jwt({ token, user, account, profile }) {
//   //     const dbUser = await prisma.user.findUnique({
//   //       where: { email: token.email ?? "no-email" },
//   //     });

//   //     if (dbUser?.isActive === false) {
//   //       throw Error("Usuario no está activo");
//   //     }

//   //     token.roles = dbUser?.roles ?? ["no-roles"];
//   //     token.id = dbUser?.id ?? "no-uuid";

//   //     return token;
//   //   },

//   //   async session({ session, token, user }) {
//   //     if (session && session.user) {
//   //       session.user.roles = token.roles;
//   //       session.user.id = token.id;
//   //     }

//   //     return session;
//   //   },
//   // },
// };

// // Este handler es el que se exporta para ser usado en las rutas de Next.js
// const handler = NextAuth(authOptions);
// // Solamente se manejan peticiones de tipo GET y POST
// export { handler as GET, handler as POST };

// Para probar la autenticación, puedes usar la siguiente URL que ha sido generada
// http://localhost:3000/api/auth/signin

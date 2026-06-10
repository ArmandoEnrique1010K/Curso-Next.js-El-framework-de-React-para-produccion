import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Obtiene la sesión del usuario en el servidor
export const getUserSessionServer = async () => {
  const session = await auth();

  // Solamente devuelve el usuario
  return session?.user;
};

// Función para iniciar sesion con email y password tradicional
export const signInEmailPassword = async (email: string, password: string) => {
  // Validar que el email y password no esten vacios
  if (!email || !password) return null;

  // Buscar el usuario en la base de datos
  const user = await prisma.user.findUnique({ where: { email } });

  // No intentar esto en un entorno de producción porque la creación del usuario
  // debe ser en un formulario de registro

  // Si no existe el usurio, crearlo
  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  // Verificar la contraseña
  // compareSync sirve para comparar un texto con un hash
  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

// Función para crear al usuario y devolverlo
const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      // Importante hashear la contraseña
      // Ejecuta 'npm i bcryptjs'
      // hashSync sirve para hashear un texto
      password: bcrypt.hashSync(password),

      // El nombre se obtiene del email antes de '@'
      name: email.split("@")[0],

      // Por defecto, el usuario esta activo
      isActive: true,
      roles: ["user"],
    },
  });

  return user;
};

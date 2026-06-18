"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

// Server action para registrar un usuario
export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    // Crea el usuario en la base de datos
    const user = await prisma.user.create({
      // Pasale los argumentos recibidos
      data: {
        name: name,
        // Convierte el email a minúsculas
        email: email.toLowerCase(),
        // Hashea la contraseña
        password: bcryptjs.hashSync(password),
      },

      // Selecciona los campos que quieres retornar en user
      // Se omite el password
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // Devuelve un objeto con el resultado de la operación, incluye el usuario
    return {
      ok: true,
      user: user,
      message: "Usuario creado",
    };
  } catch (error) {
    console.log(error);

    // Devuelve un objeto con el resultado de la operación
    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
};

// Los server actions son casos de uso de la aplicación como registrar un usuario

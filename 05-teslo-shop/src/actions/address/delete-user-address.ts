"use server";

import prisma from "@/lib/prisma";

// Server action para borrar la dirección del usuario
export const deleteUserAddress = async (userId: string) => {
  try {
    // Borrar la dirección del usuario
    const deletedAddress = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    // Retorna la dirección eliminada
    return {
      ok: true,
      address: deletedAddress,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo eliminar la dirección",
    };
  }
};

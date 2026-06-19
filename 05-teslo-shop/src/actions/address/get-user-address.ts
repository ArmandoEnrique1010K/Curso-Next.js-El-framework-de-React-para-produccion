"use server";

import prisma from "@/lib/prisma";

// Server action para obtener la dirección del usuario por ID
export const getUserAddress = async (userId: string) => {
  try {
    // findUnique busca un único registro por el campo especificado
    const address = await prisma.userAddress.findUnique({
      where: {
        // Id del usuario
        userId,
      },
    });

    if (!address) {
      return null;
    }

    // Como hay una propiedad llamada countryId, se renombra a country
    // Para que pase el tipado del formulario
    const { countryId, address2, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      // Si address2 es null, se convierte a string vacío
      address2: address2 ? address2 : "",
      city: "Hola mundo",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

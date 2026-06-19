"use server";

import prisma from "@/lib/prisma";

// Server action para obtener la lista de paises
export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      // Ordenar por nombre de manera ascendente (alfabeticamente)
      orderBy: {
        name: "asc",
      },
    });
    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
};

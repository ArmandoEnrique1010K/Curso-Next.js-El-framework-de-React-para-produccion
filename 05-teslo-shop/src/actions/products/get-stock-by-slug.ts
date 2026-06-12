"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

// Obtiene el stock de un producto por su slug
export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    await sleep(1);

    const stock = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    });

    return stock?.inStock ?? 0;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener stock por slug");
  }
};

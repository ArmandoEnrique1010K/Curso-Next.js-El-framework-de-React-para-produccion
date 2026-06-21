"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

// Server action para obtener todas las ordenes del usuario
export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  // FindMany se encarga de obtener varios registros
  const orders = await prisma.order.findMany({
    where: {
      // Toma todos los que pertenezcan al id del usuario que ha iniciado sesion
      userId: session?.user.id,
    },
    include: {
      // Incluir la direccion de entrega
      orderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders,
  };
};

"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  try {
    // Buscar la orden por ID
    const order = await prisma.order.findUnique({
      where: {
        id,
      },

      include: {
        // Incluir la dirección de la orden (un objeto)
        orderAddress: true,
        // Incluir los items de la orden (un array de objetos)
        // orderItems: true,
        orderItems: {
          // Solamente selecciona los campos necesarios
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              // Seleccionar campos del producto
              select: {
                title: true,
                slug: true,

                // Concatena y selecciona una URL de la imagen
                productImages: {
                  select: {
                    url: true,
                  },
                  // toma el primer registro
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${id} no existe`;

    // Solamente si el usuario tiene el rol de 'user'
    if (session.user.role === "user") {
      // Si el usuario que ha iniciado sesion no es el dueño de la orden
      if (session.user.id !== order.userId) {
        throw `${id} no es de ese usuario`;
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No existe la orden",
    };
  }
};
// TODO: Verificar sesion de usuario
// TODO: Leer desde la base de datos
// TODO: Retornar el resultado

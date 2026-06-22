"use server";

import prisma from "@/lib/prisma";

// Server action para actualizar el ID de la transacción en la base de datos
export const setTransactionId = async (
  orderId: string,
  transactionId: string,
) => {
  try {
    // Solo actualiza el campo transactionId correspondiente a la orden por ID
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId: transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `No se encontro una orden con el ${orderId}`,
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar el ID de la transacción",
    };
  }
};

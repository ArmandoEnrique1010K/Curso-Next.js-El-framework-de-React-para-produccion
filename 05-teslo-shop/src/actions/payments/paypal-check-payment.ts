"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Realizar pago con paypal
export const paypalCheckPayment = async (paypalTransactionId: string) => {
  // console.log({paypalTransactionId});

  const authToken = await getPayPalBearerToken();
  // console.log({ authToken });

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener token de verificación",
    };
  }

  // Primero capturar la orden
  const captured = await capturePayPalOrder(paypalTransactionId, authToken);

  if (!captured) {
    return {
      ok: false,
      message: "No se pudo capturar la orden",
    };
  }

  // Pasa el ID de la transacción y el token de autenticación
  const response = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!response) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  // Desestructura de la respuesta solo lo necesario
  const { status, purchase_units } = response;

  // Solamente cuando hayas grabado el invoice_id en la respuesta
  // al hacer la petición en:
  // https://api.sandbox.paypal.com/v2/checkout/orders/<ID_TRANSACCION>
  // Podras obtener esa propiedad en la propiedad mencionada
  const { invoice_id: orderId } = purchase_units[0];

  // Imprime el estado y las unidades de compra (amount, payee, shipping)
  console.log({ status, purchase_units });

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aún no se ha pagado en PayPal",
    };
  }

  // Realizar la actualización en la base de datos
  try {
    // Actualiza la fecha de pago
    await prisma.order.update({
      // where: { id: "ced8d013-a3ac-4836-bf90-59948cc5c63f" },

      // Puedes buscar la orden por ID
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // Revalidar un path
    // Sin haber pulsado F5 en la vista del usuario, se recarga
    // la página
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "500 - El pago no se pudo realizar",
    };
  }

  return {
    ok: true,
    message: "Pago verificado",
  };
};

// Funcion auxiliar para obtener el Bearer Token
// Puede devolver un string o un null
const getPayPalBearerToken = async (): Promise<string | null> => {
  // DEBUGEAR VARIABLES
  // Puedes colocar un breakpoint desde el IDE y luego pulsa F1 y escribe
  // 'Debug: Debug npm script', selecciona la opcion 'dev', para examinar
  // los valores de las contanstes paso por paso,
  // Recurda pulsar el botón de 'Step Over' o pulsa F10 en el IDE cuando
  // quieras seguir con el siguiente paso

  // Ocurrira el proceso de debug cuando hagas una transacción con paypal
  // Examina los valores que se asignan a las variables

  // Para terminar el proceso de debug, ve a la consola y pulsa CTRL + C
  // 2 veces
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  // Convertir a base64 para generar el token de autenticación
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
  ).toString("base64");

  // Código fuente obtenido desde Postman cuando se realizo la petición
  // POST - https://api-m.sandbox.paypal.com/v1/oauth2/token
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    // Token de autenticación generado con base64
    `Basic ${base64Token}`,
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    // redirect: "follow",
    cache: "no-store",
  };

  try {
    // Se obtiene la URL desde la variable de entorno
    // "https://api-m.sandbox.paypal.com/v1/oauth2/token"

    // Si se van a agregar nuevas propiedades en requestOptions,
    // es mejor usar el operador spread para mantener
    // la inmutabilidad
    const result = await fetch(
      oauth2Url,
      // requestOptions,
      {
        ...requestOptions,
        cache: "no-store",
      },
    ).then((r) => r.json());

    // result contiene el access token
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// El token de autenticación es requerido para realizar la petición
// al endpoint de PayPal para verificar el pago

// Se asume que va a devolver una promesa cuyo resultado es un objeto
// de tipo PaypalOrderStatusResponse o null en caso de error
const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string,
): Promise<PaypalOrderStatusResponse | null> => {
  // URL para la verificación del pago
  const payPalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  // Realiza el mismo procedimiento para obtener el siguiente código desde Postman
  // GET - https://api.sandbox.paypal.com/v2/checkout/orders/{TRANSACTION_ID}
  // Ve al panel derecho, pulsa el botón 'Code'

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    // Aqui va el token de autenticación
    `Bearer ${bearerToken}`,
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    // redirect: "follow",
    cache: "no-store",
  };

  try {
    const response = await fetch(
      // Aqui va la URL
      payPalOrderUrl,

      // Si se van a agregar nuevas propiedades en requestOptions,
      // es mejor usar el operador spread para mantener
      // la inmutabilidad
      // requestOptions,
      {
        ...requestOptions,
        cache: "no-store",
      },
    ).then((r) => r.json());

    // console.log({ response });

    return response;
  } catch (error) {
    console.log(error);

    // Debe devolver un null porque fetch puede devolver un undefined
    // en caso de error
    return null;
  }
};

// Función auxiliar para capturar el pago en PayPal
// Exclusivo de SDK Paypal v6
const capturePayPalOrder = async (
  paypalTransactionId: string,
  bearerToken: string,
): Promise<boolean> => {
  const url = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.ok;
};

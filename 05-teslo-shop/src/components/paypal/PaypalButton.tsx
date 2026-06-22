"use client";

import {
  INSTANCE_LOADING_STATE,
  OnApproveDataOneTimePayments,
  PayPalGuestPaymentButton,
  PayPalOneTimePaymentButton,
  usePayPal,
} from "@paypal/react-paypal-js/sdk-v6";
import { paypalCheckPayment, setTransactionId } from "@/actions";
import { PurchaseUnit } from "../../interfaces/paypal.interface";
import { paypalCreateOrder } from "@/actions/payments/paypal-create-order";

interface Props {
  orderIdProp: string;
  amount: number;
}

// Los botones de paypal se colocan en componentes del lado del cliente
export const PaypalButton = ({ orderIdProp, amount }: Props) => {
  // En lugar de PayPalButtons, se utiliza PayPalOneTimePaymentButton para pagos únicos
  // a partir de la version 8.0.0 de @paypal/react-paypal-js
  // En la documentación de paypal busca sobre PayPalOneTimePaymentButton y la función approve
  // para obtener los datos del pago

  // Se tiene que generar el transactionId para la orden

  // Usa el custom hook de paypal usePayPal y la propiedad loadingStatus para ver si esta cargando
  const { loadingStatus } = usePayPal();

  // Muestra un Skeleton mientras se carga el SDK de PayPal
  if (loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
    return (
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-2"></div>
      </div>
    );
  }

  // Función auxiliar asincrona para manejar la orden
  // Retorna el orderId de la orden creada en una promesa
  // Forma antigua:
  // const createOrder = async (
  //   data: CreateOrderData,
  //   actions: CreateOrderActions,
  // ): Promise<{ orderId: string }> => {
  //   const transactionId = await actions?.order?.create({
  //     intent: "CAPTURE",
  //     purchase_units: [
  //       {
  //         // invoice_id: 'order_id'
  //         amount: {
  //           value: "10.00",
  //           currency_code: "USD",
  //         },
  //       },
  //     ],
  //   });

  //   console.log(transactionId);

  //   return { orderId: transactionId };
  // };

  // Forma nueva
  const createOrder = async (): Promise<{ orderId: string }> => {
    try {
      console.log({ orderIdProp, amount });

      // const res = await fetch("/api/paypal/create-order", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     // Debe ser el id de la orden en la base de datos
      //     // Una vez que una orden ya sea pagado, no se volvera a pagar
      //     orderId: orderIdProp,
      //     amount: amount,
      //   }),
      // });
      // const data = await res.json();

      const data = await paypalCreateOrder(orderIdProp, amount);

      // Imprime el ID generado (no confundir orderId con orderIdProp, que ese ultimo
      // es el id de la orden en la base de datos)
      console.log("orderId real:", data.orderId);

      // Guardar el ID de la orden generada desde Paypal en la base de datos
      const { ok } = await setTransactionId(orderIdProp, data.orderId);

      if (!ok) {
        throw new Error("No se pudo actualizar la orden");
      }

      return { orderId: data.orderId };
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  };

  // Ejecutar esta función cuando se realizo el proceso de compra
  const onApprove = async (data: OnApproveDataOneTimePayments) => {
    // Forma antigua
    // const details = await actions.order.capture();

    // if (!details) return;
    // await paypalCheckPayment(details.id);

    // Forma nueva
    // console.log("onApprove");
    // data.orderId contiene el ID de la orden generada en Paypal
    const response = await paypalCheckPayment(data.orderId);
    console.log({ response });

    // Recordar que cuando abre la ventana modal de paypal debes introducir el
    // correo y la contraseña que has generado en las aplicaciones de paypal,
    // que tiene una forma similar a: sb-1111111111111@personal.example.com en
    // Sandbox test accounts

    // Es el mismo transactionId que se encuentra grabado en la base de datos
  };

  // Paypal solamente acepta numeros decimales de hasta 4 decimales en el pago total
  return (
    <div className="flex flex-col gap-2">
      {/* Boton para pagar con paypal */}
      <PayPalOneTimePaymentButton
        // Crear la orden, al hacer clic en el botón, se llama a esta función
        // Si el usuario cierra el navegador web, paypal tendra la orden, evita cobros duplicados
        createOrder={createOrder}
        // Si se realizo de forma exitosa el flujo de pago, se va a ejecutar esta función
        onApprove={onApprove}
        // Modo de presentación de la ventana de pago
        // "auto", "popup" (ventana emergente), "modal" (ventana modal incrustado),
        // "redirect" (redirección al sitio de paypal)
        presentationMode="modal"
      ></PayPalOneTimePaymentButton>

      {/* Boton para pagar con tarjeta de debito o credito */}
      <PayPalGuestPaymentButton
        createOrder={createOrder}
        onApprove={onApprove}
        // Abre una ventana modal (no se puede cambiar el modo de presentación), en donde
        // el usuario tendra que introducir datos de su tarjeta
      ></PayPalGuestPaymentButton>
    </div>
  );
};

// VERIFICAR PAGOS DESDE PAYPAL
// Usa un webhook de paypal para que mande una peticion desde sus servidores, la
// información del pago con el transactionId de paypal y con el orderId de la orden
// en la base de datos

// Para aquello utiliza Postman

// Variables de entorno de Paypal para las peticiones, lo puedes colocar en el archivo .env

// POST - Genera un token de autenticación
// PAYPAL_OAUTH_URL=https://api-m.sandbox.paypal.com/v1/oauth2/token

// GET - Verifica el estado de una orden
// PAYPAL_ORDERS_URL=https://api.sandbox.paypal.com/v2/checkout/orders

// VERIFICAR EL ESTADO DE UNA ORDEN EN POSTMAN
// Realiza una petición de tipo GET a:
// https://api.sandbox.paypal.com/v2/checkout/orders/<TRANSACTION_ID>

// Reemplaza <TRANSACTION_ID> con el ID de la orden generada por paypal (lo tienes en la base
// de datos, en la tabla orders, columna transactionId)

// Es normal que te devuelva un error 401, unauthorized, y un mensaje en el objeto de respuesta:
// Authentication failed due to invalid authentication credentials or a missing Authorization header

// Lo cual indica que no tienes el header de autorización
// Debes generar un Bearer Token para autenticarte con paypal
// El token dura unos 10 minutos, después de eso debes generar uno nuevo

//

// OBTENER EL BEARER TOKEN
// Crea una nuevo request en postman para guardar el anterior request

// Realiza una petición de tipo POST a:
// https://api-m.sandbox.paypal.com/v1/oauth2/token

// Te dara un error si no sigues estos pasos:
//{
//    "error": "invalid_client",
//    "error_description": "Client Authentication failed"
//}

// Ve a la pestaña 'Authorization', selecciona el type 'Basic Auth', introduce
// las credenciales username y password, cuyos valores lo encuentras en las variables
// de entorno NEXT_PUBLIC_PAYPAL_CLIENT_ID y PAYPAL_SECRET, ambas credenciales lo
// obtuvistes cuando creaste la aplicación en paypal (en Sandbox test accounts)

// Ahora te dara un error:
// {
//     "error": "unsupported_grant_type",
//     "error_description": "Grant Type is NULL"
// }

// Para aquello debes definir el grant_type, en postman ve a la pestaña Body,
// selecciona 'x-www-form-urlencoded' y agrega el key 'grant_type' con el
// value 'client_credentials'

// Te dara un status 200 OK, en la respuesta hay una propiedad llamada 'access_token'
// que contiene el token de autenticación que dura unos 10 minutos, copia el valor

//

// Ve al request anterior (GET - https://api.sandbox.paypal.com/v2/checkout/orders)
// Ve a la pestaña 'authorization', selecciona el type 'Bearer Token' y pega el
// token que copiaste

// Debe devolverte un objeto con la respuesta similar a:
// {
//   "id": "8EG729802F804572G",
//   "intent": "CAPTURE",
// // Estado de la orden (CREATED o COMPLETED)
//   "status": "CREATED",
//   "purchase_units": [
//       {
//           "reference_id": "default",
//            // Cantida a pagar
//           "amount": {
//               "currency_code": "USD",
//               "value": "35.40"
//           },
//           // Email del usuario que recibira el pago (NEXT_PUBLIC_PAYPAL_CLIENT_ID)
//           "payee": {
//               "email_address": "...",
//               "merchant_id": "UG2ES3RAJWNRU"
//           }
//       }
//   ],
//   "create_time": "2026-06-21T17:52:51Z",
//   // ...
// }

// Si el status es CREATED, significa que la orden fue creada correctamente
// Si el status es COMPLETED, significa que la orden fue completada correctamente

// La respuesta cambia si el status es COMPLETED porque se agrega una nueva propiedad
// 'payment_source' que contiene la propiedad 'paypal' y a su vez tiene la propiedad
// 'email_Address' con el email del usuario que realizo el pago, 'account_id' con el
// id de la cuenta de paypal y 'given_name' con el nombre del usuario que realizo el pago

// Tambien hay otra información como la dirección de envío en la propiedad 'shipping', etc.

// En el panel derecho de Postman hay un boton que dice 'Code' en donde puedes obtener el codigo
// fuente escrito en 'JavaScript - Fetch' de la petición realizada

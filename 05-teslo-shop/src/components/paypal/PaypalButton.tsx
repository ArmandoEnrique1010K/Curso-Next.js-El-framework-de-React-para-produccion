"use client";

import {
  INSTANCE_LOADING_STATE,
  PayPalGuestPaymentButton,
  PayPalOneTimePaymentButton,
  usePayPal,
} from "@paypal/react-paypal-js/sdk-v6";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";

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
      <div className="animate-pulse mb-10">
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

      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        body: JSON.stringify({
          orderId: orderIdProp,
          amount,
        }),
      });

      const { orderId } = await res.json();

      console.log("orderId:", orderId);
      return { orderId: orderIdProp };
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  };
  // Paypal solamente acepta numeros decimales de hasta 4 decimales en el pago total
  return (
    <div className="flex flex-col gap-2">
      {/* Boton para pagar con paypal */}
      <PayPalOneTimePaymentButton
        // Crear la orden, al hacer clic en el botón, se llama a esta función
        // Si el usuario cierra el navegador web, paypal tendra la orden, evita cobros duplicados
        createOrder={createOrder}
        onApprove={async () => {
          console.log("Pago aprobado");
        }}
      ></PayPalOneTimePaymentButton>

      {/* Boton para pagar con tarjeta de debito o credito */}
      <PayPalGuestPaymentButton
        createOrder={createOrder}
        onApprove={async () => {
          console.log("Guest payment approved");
        }}
      ></PayPalGuestPaymentButton>
    </div>
  );
};

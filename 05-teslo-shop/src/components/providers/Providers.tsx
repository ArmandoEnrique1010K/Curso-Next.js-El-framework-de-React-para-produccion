"use client";

import { SessionProvider } from "next-auth/react";
import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6";
import { currencyFormat } from "../../utils/currencyFormat";

interface Props {
  children: React.ReactNode;
}

// Se renombra a Providers porque se va a tener más de 1 provider: SessionProvider y PayPalProvider
export const Providers = ({ children }: Props) => {
  // Toma SessionProvider de next-auth/react y envuelve el children,
  // para que los componentes hijos puedan acceder a la información de la sesión

  // Imprime el valor de la variable de entorno (para prueba)
  // console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);

  // A su vez tambien debe aparecer un error en la consola de que se hizo una peticion de tipo POST
  // a https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true, solamente
  // aparece cuando tienes un bloqueador de anuncios en el navegador o cuando usas el navegador
  // Brave y tienes los escudos activados, desactivalos para que no aparezca el error

  // Coloca SessionProvider dentro de  PayPalProvider para que los componentes hijos
  // puedan acceder a la información de la sesión y de PayPal
  return (
    <PayPalProvider
      // Aqui va la variabler de entorno definida en .env
      clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ""}
      environment="sandbox"
      // Carga de los componentes para que paypal pueda renderizarlos
      // Pago con paypal y pago con tarjeta de credito o debito
      // components={["paypal-payments"]}
      components={["paypal-payments", "paypal-guest-payments"]}
      pageType="checkout"
      // En la version 8 de React Paypal JS las configuraciones se colocaban en PayPalScriptProvider
      // sobre el tipo de moneda (currency) y el intento (intent), en una propiedad llamada 'options'
      // como un objeto, pero en la version 9 se coloca esas configuraciones en el botón de paypal
      // intent: 'capture'
      // currency: 'USD'
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalProvider>
  );
};

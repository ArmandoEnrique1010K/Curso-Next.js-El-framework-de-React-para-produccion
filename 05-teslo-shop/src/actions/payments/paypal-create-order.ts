"use server";

export const paypalCreateOrder = async (orderId: string, amount: number) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  const authTokenUrl = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

  const authTokenHeaders = new Headers();
  authTokenHeaders.append(
    "Authorization",
    `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
  );
  authTokenHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const requestOptions = {
    method: "POST",
    headers: authTokenHeaders,
    body: "grant_type=client_credentials",
  };

  //

  try {
    // 1. TOKEN DE AUTENTICACIÓN
    const authTokenResponse = await fetch(authTokenUrl, requestOptions);
    const auth = await authTokenResponse.json();
    // console.log(auth);

    const orderUrl = "https://api-m.sandbox.paypal.com/v2/checkout/orders";
    const orderHeaders = new Headers();
    orderHeaders.append("Authorization", `Bearer ${auth.access_token}`);
    orderHeaders.append("Content-Type", "application/json");

    const orderRequestOptions = {
      method: "POST",
      headers: orderHeaders,
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toString(),
            },
            // Aqui se coloca el id de la orden en la base de datos
            invoice_id: orderId,
          },
        ],
      }),
    };

    // 2. CREATE ORDER EN PAYPAL
    const orderResp = await fetch(orderUrl, orderRequestOptions);

    if (!orderResp.ok) {
      throw new Error("No se pudo crear la orden en PayPal");
    }

    const order = await orderResp.json();

    return {
      ok: true,
      // Id de la orden en PayPal (se obtiene desde PayPal)
      orderId: order.id,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};

import { NextResponse } from "next/server";

// export async function POST() {
//   return NextResponse.json({
//     orderId: "1243w332",
//   });
// }

export async function POST(request: Request) {
  const { amount, orderId } = await request.json();

  // 1. AUTH
  const authRes = await fetch(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID +
              ":" +
              process.env.PAYPAL_SECRET,
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    },
  );
  const auth = await authRes.json();

  // 2. CREATE ORDER EN PAYPAL
  const orderRes = await fetch(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        "Content-Type": "application/json",
      },
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
    },
  );

  const order = await orderRes.json();

  // console.log("PAYPAL ORDER:", order);

  return NextResponse.json({
    // ID de paypal
    orderId: order.id, // ESTE ES EL ÚNICO VALIDO
    // ID de la base de datos
    dbOrderId: orderId,
  });
}

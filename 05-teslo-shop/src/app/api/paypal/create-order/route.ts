import { NextResponse } from "next/server";

// export async function POST() {
//   return NextResponse.json({
//     orderId: "1243w332",
//   });
// }

export async function POST(request: Request) {
  const { orderId, amount } = await request.json();

  const auth = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET,
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  }).then((r) => r.json());

  const order = await fetch(
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
            invoice_id: orderId,
            amount: {
              currency_code: "USD",
              value: amount.toString(),
            },
          },
        ],
      }),
    },
  ).then((r) => r.json());

  return NextResponse.json({
    orderId: order.id, // 👈 ESTE ES EL REAL
  });
}

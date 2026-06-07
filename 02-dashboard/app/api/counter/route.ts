// ENDPOINTS DE RUTAS
// https://nextjs.org/docs/app/api-reference/file-conventions/route

import { NextResponse } from "next/server";

// El archivo route.ts es el archivo que define los endpoints de una ruta (GET, POST, PUT, DELETE, etc.).

// En Next.js 15, los endpoints de rutas se definen en archivos especiales dentro de la carpeta `app`.
// Aunque una buena practica es crear la carpeta 'api' dentro de la carpeta 'app', seguido del modulo
// correspondiente

// Por ejemplo, para crear un endpoint `/api/counter`, se crea un archivo `app/api/counter/route.ts`.

// Si te vas a Postman y haces una petición GET a `/api/counter` y si no existe ese archivo y/o
// carpeta verás que te devuelve un 404 (Not Found)

// Petición de tipo GET
export async function GET(request: Request) {
  // Imprime el método de la petición (consola del servidor)
  console.log({ method: request.method });

  // No puedes imprimir el request directamente

  // Devuelve datos con el método json de NextResponse
  // Se recomienda devolver un objeto porque es el formato más común (JSON)
  return NextResponse.json({ count: 100 });
}

// El nombre de la función debe coincidir con el método HTTP que se quiere manejar.
// Por ejemplo, si se quiere manejar una petición GET, se debe usar el nombre GET.
// Si se quiere manejar una petición POST, se debe usar el nombre POST, y así sucesivamente.

// Si haces una petición cuyo tipo no ha sido definido en Postman como por ejemplo DELETE,
// verás que te devuelve un 405 (Method Not Allowed)

// Ve a 'http://localhost:3000/api/counter' para ver la respuesta en Postman

// PETICIÓN DE TIPO POST
export async function POST(request: Request) {
  console.log({ method: request.method });

  return NextResponse.json({ method: "POST", count: 100 });
}

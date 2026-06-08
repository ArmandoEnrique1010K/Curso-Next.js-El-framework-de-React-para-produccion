import { NextResponse, NextRequest } from "next/server";

// Recordar que el archivo 'route.ts' sirve para definir las rutas de la API
// Escribe 'rag' para generar el código base
// Endpoint: http://localhost:3000/api/hello (GET)
export async function GET(request: Request) {
  return NextResponse.json({
    hola: "mundo",
  });
}

// Endpoint: http://localhost:3000/api/hello (POST)
export async function POST(request: Request) {
  return NextResponse.json({
    hola: "mundo",
  });
}

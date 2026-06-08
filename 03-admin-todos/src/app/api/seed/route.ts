import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

// Un seed es un script que se ejecuta una sola vez para insertar datos de prueba
// en la base de datos

// Una buena practica es crear un seed en la ruta mencionada:
// app/api/seed/route.ts
export async function GET(request: Request) {
  // Llama a la función create de prisma para crear una tarea
  //   const todo = await prisma.todo.create({
  //     data: {
  //       description: "Piedra del alma",
  //       complete: true,
  //     },
  //   });

  //   console.log(todo);

  // La idea de un seed es que solamente pueda insertar los datos una sola vez
  // Para aquello se borran todos los datos previos con deleteMany
  // delte * from todo
  await prisma.todo.deleteMany();

  // createMany inserta múltiples registros en una sola consulta
  await prisma.todo.createMany({
    data: [
      { description: "Piedra del alma", complete: true },
      { description: "Piedra del poder", complete: true },
      { description: "Piedra del tiempo", complete: true },
      { description: "Piedra del espacio", complete: true },
      { description: "Piedra de la realidad", complete: true },
      { description: "Piedra desconocida" },
    ],
  });

  // Mensaje de éxito
  return NextResponse.json({
    message: "Semilla ejecutada correctamente",
  });
}

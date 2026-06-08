import { Todo } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import * as yup from "yup";

// Define el tipado de Segments, params es una promesa que devuelve un objeto con el id
interface Segments {
  params: Promise<{
    id: string;
  }>;
}

// Función auxiliar asincrona para obtener una tarea por ID
// Se simplifica para que devuelva la tarea o null
const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id: id } });
  return todo;
};

// ...

// Para obtener solamente una tarea, se define un endpoint para obtenerla por ID
export async function GET(
  req: NextApiRequest,
  // segments es un objeto que contiene los parámetros dinamicos de la ruta
  // segments: any,
  segments: Segments,
  res: NextApiResponse,
) {
  // Imprime un objeto para ver los parámetros dinámicos en un objeto
  // segments.params.then((params) => {
  //   console.log({ params });
  // });
  // Posible respuesta: { params: { id: '32a55b52-92b9-4572-a849-0bcac9a7c5a2' } }

  // Forma simplificada
  // console.log({ id: (await segments.params).id });
  // Posible respuesta: { id: '32a55b52-92b9-4572-a849-0bcac9a7c5a2' }

  // Desestructura los parámetros
  const { id } = await segments.params;

  // Devuelve el id como texto
  // return NextResponse.json(id);

  // El metodo findFirst busca el primer registro por ID
  // const todo = await prisma.todo.findFirst({ where: { id: id } });

  // Llama a la función auxiliar para obtener la tarea
  const todo = await getTodo(id);

  // Valida que si no existe la tarea, devuelve un error
  if (!todo) {
    return NextResponse.json(
      { message: `Tarea con id ${id} no encontrado` },
      { status: 404 },
    );
  }

  return NextResponse.json(todo);
}

// Esquema de validación para la actualización de tareas
const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

// Para definir un endpoint de actualización, se usa el método PUT y tambien se
// requiere un ID para saber qué tarea actualizar
export async function PUT(
  request: Request,
  segments: Segments,
  res: NextApiResponse,
) {
  const { id } = await segments.params;
  // const todo = await prisma.todo.findFirst({ where: { id } });

  // Llama a la función auxiliar para obtener la tarea
  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Tarea con id ${id} no encontrado` },
      { status: 404 },
    );
  }
  // Recordar que si vas a validar con yup, debes usar un bloque try-catch
  try {
    const { complete, description } = await request.json();

    // El metodo update lleva una objeto con la propiedad where (para saber
    // qué tarea actualizar) y data (los datos a actualizar)
    const updatedTodo = await prisma.todo.update({
      where: { id },
      // Usa el operador spread para combinar los datos del body con los datos del todo
      // data: { ...body },

      // Si se le manda propiedades undefined, Prisma las ignora
      data: { complete, description },

      // La idea es que los campos en la base de datos no sean nulos porque se ignora
      // normas de normalización de bases de datos
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

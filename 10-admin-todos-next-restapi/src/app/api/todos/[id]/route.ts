import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { Todo } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

// Funcion para obtener un todo por su id
const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();

  if (!user) {
    return null;
  }

  const todo = await prisma.todo.findFirst({ where: { id: id } });

  if (todo?.userId !== user.id) {
    return null;
  }

  return todo;
};

export async function GET(
  req: NextApiRequest,
  segments: Segments,
  res: NextApiResponse,
) {
  const { id } = await segments.params;
  // const todo = await prisma.todo.findFirst({ where: { id: id } })
  const todo = await getTodo(await id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo con id ${id} no encontrado` },
      { status: 400 },
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(
  request: Request,
  segments: Segments,
  res: NextApiResponse,
) {
  const { id } = await segments.params;
  // const todo = await prisma.todo.findFirst({ where: { id: id } })
  const todo = await getTodo(await id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo con id ${id} no encontrado` },
      { status: 400 },
    );
  }

  try {
    // ...rest toma las demas propiedades del body
    const { complete, description } = await putSchema.validate(
      await request.json(),
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

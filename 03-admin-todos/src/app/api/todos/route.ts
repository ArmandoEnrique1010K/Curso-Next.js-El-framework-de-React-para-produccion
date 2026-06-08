import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Forma correcta de importar yup
import * as yup from "yup";

// Función para obtener las tareas
export async function GET(request: Request) {
  // Los query params son los parámetros que se envían en la URL (son opcionales)
  // https://nextjs.org/docs/app/api-reference/file-conventions/route

  // Ejemplo: http://localhost:3000/api/todos?take=5&skip=10 (query params: take=5, skip=10)

  // searchParams es un objeto que contiene los query params
  const { searchParams } = new URL(request.url);

  // Como son opcionales los query params, se usa ?? para asignar un valor por defecto
  // Recuerda que los query params son strings, para aquello se usa Number() para
  // convertirlo a numero
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "10");

  // Se valida de que los query params sean números
  // isNaN() devuelve true si el valor no es un número
  if (isNaN(take)) {
    return NextResponse.json(
      { message: "El parametro 'take' tiene que ser un número" },
      { status: 400 },
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "El parametro 'skip' tiene que ser un número" },
      { status: 400 },
    );
  }

  // findMany sirve para obtener múltiples registros
  // Puedes usar un objeto con las propiedades skip y take para
  // paginar los resultados (omitir y tomar cierta cantidad)
  // https://www.prisma.io/docs/orm/prisma-client/queries/pagination
  const todos = await prisma.todo.findMany({
    // skip: skip
    // take: take
    skip,
    take,
  });

  // NextResponse sirve para crear respuestas HTTP
  return NextResponse.json(todos);
}

// YUP
// Sirve para crear un esquema de validación
// https://www.npmjs.com/package/yup

// Crea un esquema de validación para el body de la petición
// description: debe ser un string y es requerido
// complete: debe ser un booleano y es opcional, por defecto es false
// Si quitaras la función .default(false), el campo complete se evalua como booleano o undefined
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

// Método para crear una tarea
export async function POST(request: Request) {
  // Obtiene el body de la petición (tipo JSON)
  // const body = await request.json();

  // Devuelve el body tal y como esta
  // return NextResponse.json(body);

  // Inserta todo el contenido escrito en el body en la base de
  // datos con el metodo create

  // Recordar que si o si el body debe tener las propiedades description y complete
  // const todo = await prisma.todo.create({
  //   data: body,
  // });

  // return NextResponse.json({ message: "Todo created" });

  //

  // Toma el body, validado con yup, en el caso de que no cumpla la validación, lanza un error
  // y ese error debe ser capturado con un try-catch
  try {
    // const body = await postSchema.validate(await request.json());
    const { complete, description } = await postSchema.validate(
      await request.json(),
    );

    const todo = await prisma.todo.create({
      // data: body,

      // Se recomienda desestructurar para tomar solamente los datos necesarios
      data: {
        complete,
        description,
      },

      // Si le mandas el ID, no lanzara un error porque el ID no lo toma en ninguna
      // parte de esta función
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });

    // En el caso de mandar una propiedad mal escrita, como "descriptio", mostraara el siguiente error:
    // Puedes devolver el valor de la propiedad 'errors' para ver el error específico
    // {
    //     "value": {
    //         "descriptio": "Conquistar el mundo",
    //         "complete": true
    //     },
    //     "path": "description",
    //     "type": "optionality",
    //     "params": {
    //         "path": "description",
    //         "spec": {
    //             "strip": false,
    //             "strict": false,
    //             "abortEarly": true,
    //             "recursive": true,
    //             "disableStackTrace": false,
    //             "nullable": false,
    //             "optional": false,
    //             "coerce": true
    //         },
    //         "disableStackTrace": false
    //     },
    //     "errors": [
    //         "description is a required field"
    //     ],
    //     "inner": [],
    //     "name": "ValidationError",
    //     "message": "description is a required field"
    // }

    // Si le envias una propiedad que no existe en el body, devolvera este error:
    // {
    // "name": "PrismaClientValidationError",
    // "clientVersion": "7.8.0"
    // }

    // Puedes depurar el código colocando un breakpoint en la constante 'body' para ver el error
  }
}

// const { description, complete } = await postSchema.validate(
//   await request.json(),
// );
// const todo = await prisma.todo.create({
//   data: {
//     description,
//     complete,
//   },
// });

// const user = await getUserSessionServer();

// if (!user) {
//   return NextResponse.json("No autorizado", { status: 401 });
// }

export async function DELETE(request: Request) {
  const user = await getUserSessionServer();

  if (!user) {
    return NextResponse.json("No autorizado", { status: 401 });
  }

  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
        // userId: user.id
      },
    });
    return NextResponse.json("Borrados");
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

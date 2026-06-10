// export const dynamic = "force-dynamic";
// export const revalidate = 0;

import { auth } from "@/auth";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

// Los server actions son una caracteristica de Next.js 14
// Server action es una función que tiene acceso al servidor
// Con los server actions es que no se necesita crear los endpoints de la API cuando se
// maneja la petición pero requiere validar el JSON de la respuesta que se va a enviar

// Server Actions: "La carga pesada se va a realizar en simples funciones"
export default async function ServerTodosPage() {
  // Recuerda que auth contiene la información del usuario autenticado
  // const session = await auth();

  // Simplica el código llamando a la función getUserSessionServer
  const user = await getUserSessionServer();

  // Si el usuario no existe, redireccionar
  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    // orderBy: { description: "asc" },

    // Condicion para listar tareas por usuario por ID

    where: {
      // userId: session?.user?.id,
      userId: user.id,
    },
    orderBy: { description: "asc" },
  });

  // Normalmente antes de los server actions se realizaba el procedimiento de realizar
  // la petición HTTP en el cliente, pero con server actions la petición se puede hacer
  // en el servidor

  // Crea el archivo src/todos/actions/todo-actions.ts, donde se van a definir las funciones
  // que se van a ejecutar en el servidor

  //

  // REVALIDAR LA DATA
  // Realiza un cambio en un registro en la base de datos y podras ver que no se ve el cambio inmediatamente
  // pero si haces clic en el boton de refrescar, se vera el cambio inmediatamente

  // Normalmente si usabas la función fetch se tenia que usar un objeto con la propiedad 'cache' para manejar
  // el cache

  // Route Segment Config
  // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

  // Ve a la primera linea de código y agrega las variables 'dynamic' y 'revalidate' para manejar la revalidación
  // En Next.js 15 y 16 el sistema de caché evolucionó.
  // Las opciones dynamic y revalidate siguen funcionando,
  // pero Next.js recomienda utilizar Cache Components,
  // cacheLife() y cacheTag() para nuevos desarrollos.

  // export const dynamic = "force-dynamic";
  // export const revalidate = 0;

  // Prueba imprimiendo en consola un mensaje y veras que cuando accedes por segunda vez a esta página,
  // el mensaje se imprime cada vez porque Next.js no cachea la respuesta
  console.log("Pagina construida");

  // Las consultas a bases de datos suelen convertir automaticamente la ruta a dinamica, por lo cual no hace
  // falta manejar la revalidación

  //

  return (
    <>
      <span className="flex mb-4 text-3xl">Server Actions</span>
      <div className="w-full  mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  );
}

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
// import { useEffect } from "react";

export const metadata = {
  title: "Listado de Tareas",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  // Si usas un useEffect no puedes usar metadata (metadata es para Server Components)
  // useEffect(() => {
  //   fetch("/api/todos")
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  // }, []);

  // Aprovecha la generación del lado del servidor y cada vez que se cree esta
  // página se hace un llamada a la base de datos
  const todos = await prisma.todo.findMany({
    // Ordena las tareas por descripción de manera ascendente (a-z)
    orderBy: { description: "asc" },
  });

  return (
    <>
      <span className="flex mb-4 text-3xl">Rest TODOS</span>
      {/* Componente para agregar una nueva tarea */}
      <div className="w-full mb-5">
        <NewTodo />
      </div>

      {/* {JSON.stringify(todos, null, 2)} */}

      {/* Muestra las tareas en una grilla */}
      <TodosGrid todos={todos} />
    </>
  );
}

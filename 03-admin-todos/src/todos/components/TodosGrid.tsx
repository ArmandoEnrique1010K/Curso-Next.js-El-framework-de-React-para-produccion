"use client";

import { Todo } from "@/generated/prisma/client";
import { TodoItem } from "./TodoItem";

// Importa todas las funciones del archivo todos.ts (dentro de la carpeta helpers)
import * as todosapi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";

// El tipo 'Todo' es generado por prisma, cuando se ejecuta el comando 'prisma generate'
interface Props {
  todos?: Todo[];
}

// Se coloca un arreglo vacio como valor por defecto de todos, para que no haya problemas si no se pasa el parametro
export const TodosGrid = ({ todos = [] }: Props) => {
  // Toma useRouter de next/navigation
  const router = useRouter();

  // Función auxiliar para cambiar el estado de una tarea
  const toogleTodo = async (id: string, complete: boolean) => {
    // Verifica que exista id y complete
    // console.log({ id, complete });

    const updatedTodo = await todosapi.updateTodo(id, complete);

    console.log({ updatedTodo });

    // Debe recargar la ruta actual y Next.js lo hace de tal manera de que solamente va a actualizar
    // los componentes afectados

    // Con router.refresh() se recarga la ruta actual
    router.refresh();
  };

  // Por cada tarea, se renderiza un componente TodoItem
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        // En toggleTodo se pasa la funcion updateTodo
        // El problema es que cuando se hace clic en el botón, se ejecuta la función updateTodo
        // pero no se actualiza la lista de tareas (a menos que recargues la página)
        // <TodoItem key={todo.id} todo={todo} toggleTodo={todosapi.updateTodo} />

        // Ahora si haces clic en el botón, se actualiza la lista de tareas (puede demorar
        // en marcar la tarea como completada, para aquello verifica la consola del
        // servidor)
        <TodoItem key={todo.id} todo={todo} toggleTodo={toogleTodo} />
        // Con ello no se pierden los estados de los componentes cuando se recarga la página
        // Ve a SidebarItem y descomenta el estado de 'counter' y la función 'setCounter'
      ))}
    </div>
  );
};

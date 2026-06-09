"use client";

import { Todo } from "@/generated/prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
// Si importas un modulo CSS, debe comenzar con './
import styles from "./TodoItem.module.css";
import { startTransition, useOptimistic } from "react";

interface Props {
  todo: Todo;
  // Acciones que quiero llamar
  // Cambiar el estado de la tarea (no importa si devuelve un Todo o void)
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  // ACELERAR LA RESPUESTA DEL SERVIDOR EN LA VISTA DEL USUARIO
  // https://react.dev/reference/react/useOptimistic
  // El usuario piensa que hizo clic en un boton y si ve que no actualiza
  // inmediatamente, puede pensar que no funcionó

  // En lugar de esperar unos 3 segundos, la respuesta se puede mostrar de inmediato
  // y luego actualizarse cuando el servidor responda
  // Se utiliza el hook de react useOptimistic

  // Requiere un estado y una función que se encarga de actualizar el estado
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    // Estado inicial
    todo,
    // Función que se encarga de actualizar el estado
    // Devuelve un nuevo estado basado en el estado actual y el nuevo valor
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    }),
  );

  const onToogleTodo = async () => {
    try {
      // Si o si se debe envolver la actualización en una transición o acción
      startTransition(() => {
        // Como pide una funcion que recibe un boolean, le pasamos el nuevo valor
        toggleTodoOptimistic(!todoOptimistic.complete);
      });

      // Visualmente hace el cambio inmediatamente (en la vista del usuario)
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      // Si hay un error, se puede revertir el cambio optimista
      // Porque el estado optimista es el que se muestra en la vista
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.complete);
      });
    }
  };

  // Se aplican estilos condicionales basados en el estado de la tarea
  // return (
  //   <div className={todo.complete ? styles.todoDone : styles.todoPending}>
  //     <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
  //       <div
  //         // Llama a la acción toggleTodo con el ID y el nuevo estado
  //         onClick={() => toggleTodo(todo.id, !todo.complete)}
  //         className={`
  //       flex p-2 rounded-md cursor-pointer
  //       hover:bg-opacity-60
  //       ${todo.complete ? "bg-blue-100" : "bg-red-100"}`}
  //       >
  //         {todo.complete ? (
  //           <IoCheckboxOutline size={30} />
  //         ) : (
  //           <IoSquareOutline size={30} />
  //         )}
  //       </div>

  //       <div className="text-center sm:text-left">{todo.description}</div>
  //     </div>
  //   </div>
  // );

  // PARA UTILIZAR EL ESTADO OPTIMISTICO, SE DEBE CAMBIAR LA LOGICA DEL COMPONENTE
  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // Llama a la acción toggleTodo con el ID y el nuevo estado
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
          onClick={onToogleTodo}
          // En la vista del usuario al hacer clic se actualiza inmediatamente
          // gracias al estado optimista (omite la espera de la respuesta del servidor)

          // Pero a su vez pasa un error en la consola:
          // "An optimistic state update occurred outside a transition or action."
          // Esto se debe a que el estado optimista se actualiza fuera de una transición o acción

          // Para solucionarlo, se debe envolver la actualización en una transición o acción
          // con startTransition de React
          // Y ya no aparece el error en la consola

          className={`
        flex p-2 rounded-md cursor-pointer
        hover:bg-opacity-60
        ${todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"}`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};

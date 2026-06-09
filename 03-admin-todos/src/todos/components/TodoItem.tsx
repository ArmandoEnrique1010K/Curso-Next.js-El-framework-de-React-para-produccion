"use client";

import { Todo } from "@/generated/prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
// Si importas un modulo CSS, debe comenzar con './
import styles from "./TodoItem.module.css";

interface Props {
  todo: Todo;
  // Acciones que quiero llamar
  // Cambiar el estado de la tarea (no importa si devuelve un Todo o void)
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  // Se aplican estilos condicionales basados en el estado de la tarea
  return (
    <div className={todo.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // Llama a la acción toggleTodo con el ID y el nuevo estado
          onClick={() => toggleTodo(todo.id, !todo.complete)}
          className={`
        flex p-2 rounded-md cursor-pointer
        hover:bg-opacity-60
        ${todo.complete ? "bg-blue-100" : "bg-red-100"}`}
        >
          {todo.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};

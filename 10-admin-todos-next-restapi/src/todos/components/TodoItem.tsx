"use client";

import { Todo } from "@/generated/prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic, useState, useTransition } from "react";
import { toogleTodo } from "../actions/todo-actions";
import { useRouter } from "next/navigation";

interface Props {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  // const [todoOptimistic, toogleTodoOptimistic] = useOptimistic(
  //     todo,
  //     (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
  // );

  // const onToogleTodo = async () => {
  //     try {
  //         startTransition(() => {
  //             toogleTodoOptimistic(!todoOptimistic.complete)
  //         })
  //         await toogleTodo(todoOptimistic.id, !todoOptimistic.complete)
  //     } catch (error) {
  //         startTransition(() => {
  //             toogleTodoOptimistic(!todoOptimistic.complete)
  //         })
  //     }
  // }

  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isCompleteOptimistic =
    isFetching || isPending ? !todo.complete : todo.complete;

  const onToggleTodo = async () => {
    setIsFetching(true);
    await toggleTodo(todo.id, !todo.complete);
    setIsFetching(false);

    startTransition(() => {
      // Actualizar la ruta actual:
      // - Hace una nueva solicitud al servidor para la ruta actual
      // - Vuelve a buscar solicitudes de datos y vuelve a renderizar los componentes del servidor
      // - Envía el payload actualizado del componente de Server Component al cliente
      // - El cliente fusiona el payload sin perder ningún estado

      router.refresh();
    });
  };

  return (
    // <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
    <div
      className={isCompleteOptimistic ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
          // onClick={() => onToogleTodo()}
          onClick={() => onToggleTodo()}
          className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${/*todoOptimistic.complete*/ isCompleteOptimistic ? "bg-blue-100" : "bg-red-100"}`}
        >
          {
            /*todoOptimistic.complete*/ isCompleteOptimistic ? (
              <IoCheckboxOutline size={30} />
            ) : (
              <IoSquareOutline size={30} />
            )
          }
        </div>

        <div className="text-center sm:text-left">
          {/* todoOptimistic.description */}
          {todo.description}
        </div>
      </div>
    </div>
  );
};

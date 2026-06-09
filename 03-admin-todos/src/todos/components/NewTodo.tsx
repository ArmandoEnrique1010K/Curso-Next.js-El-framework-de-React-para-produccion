"use client";

import { SubmitEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";

export const NewTodo = () => {
  const router = useRouter();

  // Estado para la descripción de la tarea
  const [description, setDescription] = useState("");

  // Función para subir una nueva tarea
  // FormEvent era el tipo de evento para formularios en versiones anteriores de React
  // Ahora se usa SubmitEvent de react
  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    // Evita que el formulario se envíe y recargue la página
    e.preventDefault();

    // Validación si la descripción está vacía
    if (description.trim().length === 0) return;

    // console.log("Formulario enviado", description);

    // Llama al helper para crear la tarea
    await todosApi.createTodo(description);

    // Limpia el input y refresca la página
    setDescription("");
    router.refresh();
  };

  // Función auxiliar para eliminar tareas completadas
  const deleteCompleted = async () => {
    await todosApi.deleteCompletedTodos();
    router.refresh();
  };

  return (
    // Llama a la función onSubmit cuando se envía el formulario
    <form onSubmit={onSubmit} className="flex">
      <input
        type="text"
        // Establece el estado cuando el usuario escribe en el input
        onChange={(e) => setDescription(e.target.value)}
        // Establece el valor del input
        value={description}
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 bg-white outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2  bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      {/* Botón para borrar tareas completadas */}
      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline size={24} />
        <span className="ml-2">Borrar completados</span>
      </button>
    </form>
  );
};

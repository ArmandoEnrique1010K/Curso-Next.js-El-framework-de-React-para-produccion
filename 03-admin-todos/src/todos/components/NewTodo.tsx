"use client";

import { SubmitEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

// import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";
import { addTodo, deleteCompleted } from "../actions/todo-actions";

export const NewTodo = () => {
  const router = useRouter();

  // Estado para la descripción de la tarea
  const [description, setDescription] = useState("");

  // ESTA FUNCIÓN LLAMA A LA FUNCIÓN createTodo DEL ARCHIVO todosApi
  // SIN EL USO DE SERVER ACTIONS
  // Función para subir una nueva tarea
  // FormEvent era el tipo de evento para formularios en versiones anteriores de React
  // Ahora se usa SubmitEvent de react
  // const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
  //   // Evita que el formulario se envíe y recargue la página
  //   e.preventDefault();

  //   // Validación si la descripción está vacía
  //   if (description.trim().length === 0) return;

  //   // console.log("Formulario enviado", description);

  //   // Llama al helper para crear la tarea
  //   await todosApi.createTodo(description);

  //   // Limpia el input y refresca la página
  //   setDescription("");
  //   router.refresh();
  // };

  //

  // Uso de Server Action
  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (description.trim().length === 0) return;

    await addTodo(description);
    setDescription("");

    // Para invalidar el cache de la ruta se hace en el server action
    // No aquí
  };

  //

  // SIN SERVER ACTION
  // Función auxiliar para eliminar tareas completadas
  // const deleteCompleted = async () => {
  //   await todosApi.deleteCompletedTodos();
  //   router.refresh();
  // };

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
        // Para el uso de server action, se llama a la función del módulo todo-actions.ts
        onClick={() => deleteCompleted()}
        // No funciona si haces un call directo a la función, el evento tiene funciones que no
        // son serializables
        // Error: Only plain objects, and a few built-ins, can be passed on Server Actions

        // onClickCapture={(e) =>deleteCompleted(e)}
        // onClickCapture={deleteCompleted}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline size={24} />
        <span className="ml-2">Borrar completados</span>
      </button>
    </form>
  );
};

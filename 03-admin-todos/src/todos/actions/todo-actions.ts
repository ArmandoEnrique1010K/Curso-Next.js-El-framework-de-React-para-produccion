"use server";

import { Todo } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Aqui se definen las funciones que se van a ejecutar en el servidor
// Coloca un 'use server' al inicio del modulo o al inicio de cada función para
// que se ejecute en el servidor

// El cliente puede llamar a una función del servidor
// Simula un delay de servidor
export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

// Función asincrona para cambiar el estado de una tarea
export const toogleTodo = async (
  id: string,
  complete: boolean,
): Promise<Todo> => {
  // Ralentiza la tarea (solamente para pruebas)
  await sleep(3);

  // Buscar la tarea
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con id ${id} no encontrado`;
  }

  // Actualizar la tarea
  const updatedTodo = await prisma.todo.update({
    where: { id },
    // Solamente el campo complete se actualiza
    data: { complete },
  });

  // Para evitar recargar la página, se invalida el cache de la ruta
  // Llama a revalidatePath de next/cache y pasale la URL de la ruta
  // que se quiere invalidar
  revalidatePath("/dashboard/server-todos");

  // Retornar la tarea actualizada
  return updatedTodo;
};

// DOCUMENTACIÓN SOBRE LOS SERVER ACTIONS
// https://nextjs.org/docs/app/getting-started/mutating-data
// https://nextjs.org/learn/dashboard-app/mutating-data

// Server action para crear una nueva tarea
// Observa que si se tiene un bloque try-catch, la función puede devolver
// 2 posibles respuestas:
// - La tarea creada: Promise<Todo>
// - Un objeto con el mensaje de error: { message: string }
export const addTodo = async (description: string) => {
  try {
    // Se omite el campo complete porque su valor por defecto es false
    const todo = await prisma.todo.create({ data: { description } });
    // No olvidar invalidar la ruta
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return {
      message: "Error creando tarea",
    };
  }
};

// Server action para eliminar tareas completadas
export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({ where: { complete: true } });
  revalidatePath("/dashboard/server-todos");
};

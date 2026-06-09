import { Todo } from "@/generated/prisma/client";

// En este archivo se hace la modificación de las solicitudes HTTP como si fuera POSTMAN

// Función auxiliar para simular una demora
const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

// Actualizar tarea, simula una demora de 2 segundos
export const updateTodo = async (
  id: string,
  complete: boolean,
): Promise<Todo> => {
  // Ralentiza a 2 segundos (simulando un entorno de producción)
  // await sleep(0);

  // Cuerpo de la solicitud
  const body = { complete };

  // Enviar la solicitud con fetch
  // El metodo PUT se usa para actualizar un recurso
  // Tiene un segundo argumento que es un objeto con las opciones de la solicitud
  const todo = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    // JSON.stringify convierte el objeto body a una cadena JSON
    body: JSON.stringify(body),
    headers: {
      // Content-Type indica el tipo de contenido que se está enviando
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log({ todo });

  return todo;
};

// Crear tarea, repite el proceso de actualizar tarea pero con cambios menores
export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const todo = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log({ todo });

  return todo;
};

// Eliminar tareas completadas
// Puede retornar void o boolean (de preferencia)
export const deleteCompletedTodos = async (): Promise<boolean> => {
  await fetch("/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return true;
};

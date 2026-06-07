// Escribe 'prc' y presiona ENTER para generar el código base
// Debes tener instala la extensión "Snippets simple Next.js 13"

// Recordar que todo lo que se encuentre dentro de la carpata 'app' deben ser paginas web,
// layouts y páginas de error que son componentes del lado del servidor y se renderizan una sola vez

import { CartCounter } from "@/shopping-cart";

// // "use client";

// import { useState } from "react";

// Para agregar metadatos a una página, se tiene que utilizar un componente del lado del servidor
// Al agregar metadata, si fuera un componente con 'use client', aparecería un error en la consola
export const metadata = {
  title: "Counter Page",
  description: "Counter Page",
};

// En ese caso para que funcione la metadata y el contador, se tiene que pensar como un arbol, donde
// ciertas partes del arbol son del lado del servidor y otras del lado del cliente, comienza
// quitando el 'use client'

// Los componentes del lado del servidor solamente se construyen una vez, no se va a renderizar varias
// veces, a diferencia de los componentes del lado del cliente

// Es una buena practica que la función principal tenga el nombre 'ModuloPage'
export default function CounterPage() {
  // Toda lógica de React como hooks, estados, etc. se colocan en un componente del lado del cliente
  // const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2">
      <span>Productos en el carrito</span>

      {/* Toda esta parte del contador es del lado del cliente */}
      {/* <CartCounter /> */}

      {/* Puedes mandar props desde un componente del lado del servidor a un componente del lado del cliente */}
      {/* USO DEL ESTADO GLOBAL
      Debe ser un componente del lado del cliente */}
      <CartCounter value={20} />
    </div>
  );
}

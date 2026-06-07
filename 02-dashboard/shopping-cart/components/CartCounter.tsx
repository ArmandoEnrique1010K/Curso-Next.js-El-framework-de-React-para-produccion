// Componente del lado del cliente para el carrito de compras
"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  addOne,
  initCounterState,
  resetCount,
  substractOne,
} from "@/store/counter/counterSlice";
import { useEffect } from "react";

// import { useState } from "react";

interface Props {
  value: number;
}

export interface CounterResponse {
  // // method: string;
  count: number;
}
// Función para llamar a la API (definida en la carpeta 'api')
const getApiCounter = async (): Promise<CounterResponse> => {
  const data = await fetch("http://localhost:3000/api/counter").then((res) =>
    res.json(),
  );

  // Coloca el tipado si no lo vas a colocar en la función como Promise<CounterResponse>
  // return data as CounterResponse;
  return data;
};

// Contador
export const CartCounter = ({ value = 0 }: Props) => {
  // Estado local
  // const [count, setCount] = useState(value);

  // Si deshabilitas JavaScript en el navegador, los botones no funcionarán
  // porque están en el lado del cliente

  // Acceder al estado global, estado de count
  const count = useAppSelector((state) => state.counter.count);

  // Accede a las acciones del store
  const dispatch = useAppDispatch();

  // Establecer el valor definido en value al estado global
  // Si usas un useEffect, al recargar la página por un momento se ve el valor
  // inicial definido en el estado global

  // Tambien se ve que cada vez que el componente se vuelve a crear (por ejemplo, cuando te vas
  // a otra sección en el Navbar), el valor inicial se pierde y se establece el valor definido
  // en value
  // useEffect(() => {
  //   dispatch(resetCount(value));
  // }, [dispatch, value]);

  // En su lugar se llama a la función de carga inicial, se soluciona el problema de
  // que el valor inicial se pierde y se establece el valor definido en value
  // El valor actual se mantiene porque hay una condición que verifica si el estado ya está listo
  // useEffect(() => {
  //   dispatch(initCounterState(value));
  // }, [dispatch, value]);

  // LLAMAR A LA API PARA ESTABLECER EL VALOR INICIAL
  useEffect(() => {
    // getApiCounter().then((data) => dispatch(initCounterState(data.count)));

    // Por un momento se vera el valor inicial definido en counterSlice (5)
    getApiCounter().then(({ count }) => dispatch(initCounterState(count)));

    // Parece que el valor inicial se pierde, pero no es así, se establece el valor de la API
  }, []);

  return (
    <>
      <span className="text-9xl">{count}</span>

      <div className="flex gap-2">
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px]"
          // Uso del estado local
          // onClick={() => setCount(count + 1)}

          // Estado global, llamar a la acción, no olvides de importar la acción
          onClick={() => dispatch(addOne())}
        >
          +1
        </button>
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px]"
          // onClick={() => setCount(count - 1)}
          onClick={() => dispatch(substractOne())}
        >
          -1
        </button>
      </div>
    </>
  );
};

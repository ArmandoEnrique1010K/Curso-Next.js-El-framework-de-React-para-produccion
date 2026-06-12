"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

// Cada vez que el componente se monte, se debe hacer la petición para actualizar el stock
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  // Llama al server action para obtener el stock de un producto por slug
  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    // console.log({ inStock });

    setStock(inStock);
    setIsLoading(false);
  };

  // Ahora ve por ejemplo a la ruta:
  // http://localhost:3000/product/men_chill_quarter_zip_pullover_-_white
  // Busca en la base de datos el registro por el slug, mira el stock y cambialo por 10
  // Luego ve a la página de inicio, vuelve a entrar a la misma página anterior y
  // veras que el stock es 10

  return (
    <>
      {isLoading ? (
        // Skeleton, es un placeholder que se muestra mientras se carga el contenido
        <h1
          className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
          {/* En la función getStockBySlug se simula un retraso de 3 segundos, muestra el valor 0 */}
          Stock: {stock}
        </h1>
      )}
    </>
  );
};

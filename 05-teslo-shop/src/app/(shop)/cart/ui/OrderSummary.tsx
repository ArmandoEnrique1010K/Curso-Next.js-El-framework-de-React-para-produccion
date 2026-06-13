"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  // No desestructures la constante para acceder a las propiedades del objeto
  // devuelto por el state
  const summaryInformation = useCartStore(
    (state) => state.getSummaryInformation,
  );

  // Hazlo luego de obtener la función del store
  const { itemInCart, subTotal, tax, total } = summaryInformation();

  // Evita el problema de rehidratación
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemInCart === 1 ? "1 artículo" : `${itemInCart} artículos`}
      </span>

      <span>Subtotal</span>
      {/* Aplica el formato de moneda a cada campo que representa un valor monetario  */}
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (18%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="text-2xl mt-5 text-right">{currencyFormat(total)}</span>
    </div>
  );
};

"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Componente para el resumen de la orden
export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  // Estado para colocar la orden
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Estado para manejar el mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  // Obtiene la dirección del usuario
  // No se recomienda desestructurar address
  const address = useAddressStore((state) => state.address);

  // Obtiene el resumen del carrito
  // Recordar que no se debe ejecutar la función inmediatamente cuando
  // se obtiene desde el store de Zustand
  const summaryInformation = useCartStore(
    (state) => state.getSummaryInformation,
  );

  // Ejecuta la función para obtener el resumen del carrito
  const { itemsInCart, subTotal, tax, total } = summaryInformation();

  // El carrito de compras desde el store
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Función para colocar la orden
  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    // Esperar 1 segundo
    // await sleep(1);

    const productToOrder = cart.map((product) => ({
      productId: product.id,
      size: product.size,
      quantity: product.quantity,
    }));

    // Al imprimir address no debe incluir el campo de rememberAddress
    // productToOrder solamente contiene el ID del producto, la talla y la cantidad
    // Ambos datos se tienen que pasar al server action

    // El ID del usuario que ha iniciado sesion no se envia porque se obtiene desde
    // el server action
    // console.log({ address, productToOrder });

    const resp = await placeOrder(productToOrder, address);

    // Imprime en la consola del servidor la respuesta del server action
    // console.log({ resp });

    // Si la respuesta no es exitosa, se detiene el proceso, pero
    // el usuario podra volver a hacer otro intento
    if (!resp.ok) {
      setIsPlacingOrder(false);

      // Muestra el mensaje de error en la interfaz de usuario,
      // el que se lanza desde throw
      setErrorMessage(resp.message);
      return;
    }

    // Si se ha creado la orden...
    // Limpiar el carrito y redirigir al usuario a la página de ordenes
    clearCart();
    router.push("/orders/" + resp.order?.id);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  // Si te vas a local Storage en las herramientas de desarrollo del navegador y digamos modificas
  // el precio de un producto, pues los cambios se veran reflejados en la vista del usuario.

  // Pero ten en cuenta que se manda al servidor la talla, el ID del producto y la cantidad para
  // volver a realizar el cálculo del total en el servidor (server action).

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      {/* Datos de la dirección */}
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      {/* Todo el codigo se obtuvo desde: src\app\(shop)\cart\ui\OrderSummary.tsx */}
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        {/* Aplica el formato de moneda a cada campo que representa un valor monetario  */}
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (18%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-2xl mt-5 text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className=" w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
            .
          </span>{" "}
        </p>

        {/* Puedes mostrar el mensaje de error cuando ya no haya stock del producto
        o cuando pase otro error */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Boton para colocar la orden */}
        {/* Solamente podra hacer clic en el botón 1 vez para que no envie la misma 
        orden más de una vez */}
        <button
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};

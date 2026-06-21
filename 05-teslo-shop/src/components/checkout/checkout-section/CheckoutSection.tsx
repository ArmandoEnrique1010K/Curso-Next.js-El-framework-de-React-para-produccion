"use client";

import { Title } from "@/components/ui/title/Title";
import { useCartStore } from "@/store";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { ProductsInCart } from "../ui/ProductsInCart";
import { PlaceOrder } from "../ui/PlaceOrder";
import { useEffect } from "react";

export const CheckoutSection = () => {
  // Obviamente si no hay ningun producto en el carrito, se puede redirigir
  // a una página de error
  const cart = useCartStore((state) => state.cart);

  // En componentes del lado del cliente debes usar useRouter en lugar de redirect
  const router = useRouter();

  // if (cart.length === 0) {
  //   redirect("/cart");
  // }

  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/cart");
    }
  }, []);

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      {/* w-[1000px] sirve para añadir un ancho personalizado */}
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>

            {/* {productInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  className="mr-5 rounded"
                  width={100}
                  height={100}
                  // Forzar a que la imagen tenga el tamaño especificado
                  // Normalmente width y height solo aplica el ancho o alto maximo a 100
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))} */}

            {/* Items del carrito, los items se obtienen desde el store */}
            <ProductsInCart />
          </div>

          {/* Checkout - Resumen de orden */}
          {/* <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Armando Enrique</p>
              <p>Av. Siempreviva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldia Cuautepec</p>
              <p>Ciudad. Cancún, Quintana Roo</p>
              <p>CP 123123</p>
              <p>555-555-5555</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (18%)</span>
              <span className="text-right">$ 18</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 text-right">$ 118</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
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

              <Link
                href="/orders/123"
                className="flex btn-primary justify-center"
              >
                Colocar orden
              </Link>
            </div>
          </div> */}

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
};

"use client";

import { useCartStore } from "@/store";
import { redirect } from "next/navigation";
import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "@/app/(shop)/cart/ui/ProductsInCart";
import { OrderSummary } from "@/app/(shop)/cart/ui/OrderSummary";

export const CartSection = () => {
  const cart = useCartStore((state) => state.cart);

  if (cart.length === 0) {
    redirect("/empty");
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      {/* w-[1000px] sirve para añadir un ancho personalizado */}
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continuar comprando
            </Link>

            {/* Items del carrito */}
            <ProductsInCart />
          </div>

          {/* Checkout - Resumen de orden */}
          {/* h-fit mantiene el tamaño del contenido */}
          <div className=" bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <Link
                href="/checkout/address"
                className="flex btn-primary justify-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { IoCartOutline, IoSearchCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

export const TopMenu = () => {
  // Si usas zustand, necesitas usar 'use client' para poder usar hooks
  const openMenu = useUIStore((state) => state.openMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  // Estado para esperar la carga de la cantidad de items del carrito
  const [loaded, setLoaded] = useState(false);

  // Cambia el estado en el primer renderizado para que se muestre el carrito
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href={"/"}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo{" "}
          </span>
          <span>| Shop</span>
        </Link>
      </div>

      {/* Menu central */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href={"/gender/men"}
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href={"/gender/women"}
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href={"/gender/kid"}
        >
          Niños
        </Link>
      </div>

      {/* Menu derecho: Search, Cart, Account */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchCircleOutline className="w-5 h-5" />
        </Link>
        {/* Solamente podra ir al carrito si hay al menos un item en el carrito y si loaded es true */}
        {/* loaded evita la rehidratación del carrito en el primer renderizado. Evita el siguiente 
        error en consola */}
        {/* A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. 
        This won't be patched up. */}
        <Link
          href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {/* Muestra el total de elementos en el carrito solamente si hay al menos uno y si loaded es true */}
            {loaded && totalItemsInCart > 0 && (
              // fade-in aplica el efecto visual de aparición
              <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={() => openMenu()}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};

"use client";

// https://tailwindcomponents.com/component/e-commerce-product-card

import Image from "next/image";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { Star } from "./Star";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/shopping-cart/actions/actions";
import { useRouter } from "next/navigation";
import { Product } from "../data/products";

// Recibe las mismas props que el arreglo products de la carpeta data
// interface Props {
//   id: string;
//   name: string;
//   price: number;
//   rating: number;
//   image: string;
// }

// Forma alternativa
interface Props extends Product {}

// Código fuente obtenido de: https://gist.github.com/Klerith/ae0a5153b243d546af420e0dbe27e3c4
// Las imagenes estaticas (que no van a cambiar en el tiempo) se colocan dentro de la carpeta public
export const ProductCard = ({ id, name, price, rating, image }: Props) => {
  const router = useRouter();

  // Define las funciones para agregar y remover productos del carrito
  const onAddToCart = () => {
    // El componente debe ser un componente del lado del cliente para poder usar
    // funciones de 'next/navigation'
    addProductToCart(id);
    router.refresh();
  };

  const onRemoveFromCart = () => {
    removeProductFromCart(id);
    router.refresh();
  };

  return (
    <div className="shadow-xl rounded-2xl border-2 border-gray-200">
      <div className="w-full flex justify-center bg-white rounded-tl-2xl rounded-tr-2xl">
        {/* Imagen del producto */}
        <Image
          width={600}
          height={600}
          className="rounded-tl-2xl rounded-tr-2xl"
          src={image}
          alt="product image"
        />
      </div>

      <div className="px-5 pt-4 pb-5 bg-gray-800 rounded-bl-2xl rounded-br-2xl">
        {/* Nombre del producto */}
        <h3 className="font-semibold text-xl tracking-tight text-white">
          {name}
        </h3>

        {/* Calificación del producto */}
        <div className="flex items-center mt-2.5 mb-5">
          {/* Itera sobre la cantidad de estrellas, rating es un número que representa la cantidad de estrellas */}
          {Array(rating)
            // fill sirve para crear un array con la cantidad de elementos especificada
            .fill(0)
            .map((_, i) => (
              <Star key={i} />
            ))}

          <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3">
            {rating.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          {/* Precio del producto */}
          <span className="text-2xl text-white font-bold">
            ${price.toFixed(2)}
          </span>

          {/* Botones de acción */}
          <div className="flex">
            <button
              onClick={onAddToCart}
              className="text-white mr-2  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              <IoAddCircleOutline size={25} />
            </button>
            <button
              onClick={onRemoveFromCart}
              className="text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

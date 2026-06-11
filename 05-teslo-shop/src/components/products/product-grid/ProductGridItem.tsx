"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}
export const ProductGridItem = ({ product }: Props) => {
  // Estado para la imagen a mostrar
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    // fade-in es una clase CSS personalizada definida en globals.css
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          // src={`/products/${product.images[0]}`}

          // Usar la imagen del estado
          src={`/products/${displayImage}`}
          alt={product.title}
          // object-cover para que la imagen cubra todo el contenedor
          className="w-full object-cover rounded-lg"
          width={500}
          height={500}
          // Evento si el mouse entra o sale de la imagen
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600">
          {product.title}
        </Link>
        <span className="font-bold">$ {product.price}</span>
      </div>
    </div>
  );
};

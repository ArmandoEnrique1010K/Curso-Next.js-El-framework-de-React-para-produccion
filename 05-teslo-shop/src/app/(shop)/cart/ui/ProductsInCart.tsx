"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  // Toma los productos del carrito desde el store
  const productsInCart = useCartStore((state) => state.cart);

  // Método del store para actualizar la cantidad de un producto
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );

  // Método del store para eliminar un producto del carrito
  const removeProduct = useCartStore((state) => state.removeProduct);

  // Para evitar el problema de rehidratación del store
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        // El key no puede ser el slug porque existen productos con talla diferente, pero con el mismo slug
        // En su lugar se concatena el slug con la talla
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            // El producto solamente tiene una imagen
            src={`/products/${product.image}`}
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

          {/* Un enlace en lugar del texto para ir al producto por slug */}
          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {/* Debe mostrar la talla del producto */}
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>

            {/* Como se trabaja con Zustand, cada vez que se cambia la cantidad 
            se actualiza el store y por ende se renderiza el componente, además
            del componente TopMenu en donde se muestra la cantidad de productos 
            en el carrito */}
            <QuantitySelector
              quantity={product.quantity}
              // Cambia la cantidad
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              className="underline mt-3 cursor-pointer"
              onClick={() => removeProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

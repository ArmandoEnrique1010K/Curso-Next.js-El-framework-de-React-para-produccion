"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  // Tipado definido en interfaces/product.interface.ts
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  // Estado de mostrar error
  const [posted, setPosted] = useState<boolean>(false);

  // Llama al store para agregar el producto al carrito
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  // Añadir al carrito
  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    // Imprime los datos necesarios para el producto
    // size puede ser undefined si no se ha seleccionado una talla
    // console.log({ size, quantity, product });

    // Crear el producto para el carrito, el tipado es CartProduct
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    // Llamar al metodo del store para agregar el producto al carrito
    addProductToCart(cartProduct);

    // Resetear el estado
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {/* Mensaje de error */}
      {posted && !size && (
        <span className="mt-2 text-red-500">Debe de seleccionar una talla</span>
      )}

      {/* Selector de tallas */}
      {/* En initialData.products, los productos tienen tallas, pero diferentes, la propiedad 
        'sizes' es un array de strings */}
      {/* Por ejemplo: ['XS', 'S', 'M', 'L', 'XL'] */}
      <SizeSelector
        // selectedSize={product.sizes[0]}
        selectedSize={size}
        availableSizes={product.sizes}
        // Imprime la talla que se selecciona
        // onSizeChanged={(size) => console.log(size)}
        // Actualiza el estado de la talla seleccionada
        onSizeChanged={(size) => setSize(size)}
      />

      {/* Selector de cantidad */}
      {/* Se pasa el estado de quantity como prop, la cantidad maxima debe ser 5 */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Botón para agregar al carrito */}
      {/* btn-primary es una clase personalizada que se define en globals.css */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};

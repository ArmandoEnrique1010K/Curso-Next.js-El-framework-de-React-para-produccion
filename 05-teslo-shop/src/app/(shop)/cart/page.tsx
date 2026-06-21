import { CartSection } from "@/components/cart/cart-section/CartSection";

// const productInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

export default function () {
  // Redirecciona si el carrito esta vacio
  // redirect retorna never, por lo que el codigo despues de redirect no se ejecuta
  // redirect("/empty");

  return <CartSection />;
}

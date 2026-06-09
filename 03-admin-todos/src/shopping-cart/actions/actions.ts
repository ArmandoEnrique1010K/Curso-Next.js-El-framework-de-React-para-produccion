// 'use client'

// Se va a tener el siguiente objeto en la cookie 'cart'
// Una propiedad tiene el id del producto como key y el valor es la cantidad
/*
cookie: cart
{
  'uui-123-1': 4,
  'uui-123-2': 1,
  'uui-123-3': 2,
}
*/

import { getCookie, hasCookie, setCookie } from "cookies-next";

// No se van a utilizar server-actions sino de la manera tradicional con cookies

// Obtener el carrito desde la cookie cart
export const getCookieCart = (): { [id: string]: number } => {
  // Valida que exista la cookie cart
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }

  return {};
};

// Agregar un producto al carrito
export const addProductToCart = (id: string) => {
  // Llama a la función para obtener el carrito
  const cookieCart = getCookieCart();

  // Si existe el producto en el carrito (si tiene el key 'id' del producto), incrementa la cantidad
  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    // Si no existe, agrega el producto con cantidad 1
    cookieCart[id] = 1;
  }

  // Guarda el carrito actualizado en la cookie
  setCookie("cart", JSON.stringify(cookieCart));
};

// Las cookies viajan por las peticiones HTTP y tiene que ser string para luego
// poder parsearlo con JSON.parse()

// Desde las herramientas de desarrollo observa el valor de la cookie 'cart'
// y verás que es un string, tambien debes volver a actualizar las cookies cada
// vez que se modifique el carrito, pulsando el botón de 'refresh' en el panel
// de cookies: F12 -> Application -> Cookies -> http://localhost:3000,
// porque no se actualiza automáticamente

// Eliminar producto del carrito (toda la cantidad)
export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  // Borra la propiedad del objeto por la key que coincida con id del producto
  delete cookieCart[id];
  setCookie("cart", JSON.stringify(cookieCart));
};

// Remover un item del carrito (una unidad)
export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  // Valida que el producto exista en el carrito
  if (!cookieCart[id]) return;

  const itemsInCart = cookieCart[id] - 1;

  // Si la cantidad es 0 o menos, elimina el producto del carrito
  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  // Guarda el carrito actualizado en la cookie
  setCookie("cart", JSON.stringify(cookieCart));
};

import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Estado del carrito
interface State {
  // El estado de cart debe ser un arreglo de productos que tengan las
  // propiedades de id, title, price, slug, images, stock, etc.

  // Para aquello se define una interfaz específica para el carrito
  cart: CartProduct[];

  // Obtiene el total de items en el carrito
  getTotalItems: () => number;

  // Crea la información resumida del carrito
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  // Métodos para gestionar el carrito
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;

  // Limpiar el carrito
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  // La función persist es un middleware de Zustand que permite persistir el estado en el localStorage,
  // Lleva 2 argumentos: la función que define el estado y un objeto con las opciones de persistencia
  persist(
    (set, get) => ({
      // Inicialmente es un arreglo vacio
      cart: [],

      getTotalItems: () => {
        const { cart } = get();

        // Solamente debe contar la cantidad de 'quantity' de cada producto
        // Utiliza el método reduce asociado a un arreglo, devuelve un valor único
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        // Calcula el subtotal, impuesto y total
        // Recuerda que reduce realiza una operación con los elementos de un arreglo devolviendo un valor único
        const subTotal = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
        const tax = subTotal * 0.18;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0,
        );

        // Se recomienda devolver un objeto en lugar de un arreglo
        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductToCart: (product: CartProduct) => {
        // Obtiene el estado actual del carrito
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        // El metodo some sirve para determinar si al menos un elemento cumple con la condición
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size,
        );

        if (!productInCart) {
          // Si el producto no existe en el carrito, se agrega
          set({
            cart: [...cart, product],
          });
          // Detiene la ejecución del resto del código
          return;
        }

        // 2. Se que el producto existe por talla, tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          // Itera sobre cada item del carrito y verifica si el id y la talla coinciden para incrementar la cantidad
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          // Si no coincide, retorna el item tal cual
          return item;
        });

        set({
          cart: updatedCartProducts,
        });
      },

      // Función para actualizar la cantidad de un producto
      updateProductQuantity(product: CartProduct, quantity: number) {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({
          cart: updatedCartProducts,
        });
      },

      // Eliminar un producto del carrito (incluyendo toda la cantidad por talla)
      removeProduct(product: CartProduct) {
        const { cart } = get();

        // Filtra los productos que no coinciden con el id o la talla del producto a eliminar
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        );

        set({
          cart: updatedCartProducts,
        });
      },

      // Limpiar el carrito
      clearCart() {
        set({
          cart: [],
        });
      },
    }),

    // Definición del key para el localStorage
    {
      name: "shoping-cart",

      // Lo puedes ver en las herramientas de desarrollo del navegador, en la pestaña Application -> Local Storage -> http://localhost:3000
      // Muestra el valor de los estados definidos en este store, en este caso, cart
      // contiene un arreglo de objetos con la información de los productos

      // REHIDRATACIÓN

      // El problema de rehidratación con la función persist es que crea una discrepancia entre lo que va a
      // almacenarse en el localStorage y lo que se va a mostrar en la interfaz de usuario, porque el servidor no
      // tiene la información del localStorage.

      // La propiedad skipHydration evita el problema de rehidratación, pero se tiene que manejar la lógica de
      // carga manualmente

      // skipHydration: true,

      // Error de rehidratación
      // Uncaught Error: Hydration failed because the server rendered HTML didn't match the client.
      // As a result this tree will be regenerated on the client.

      // Aparece cuando se pulsa F5 o se recarga la página, en la consola se encuentra ese mensaje
      // La solución es manejar la parte de la hidratación

      // Otra forma de solucionarlo es esperar a que se cargue el estado desde el localStorage en un componente
      // del lado del cliente ,tal y como esta en 'src\components\ui\top-menu\TopMenu.tsx'
    },
  ),
);

// Para borrar los datos almacenados en el localstorage, pulsa F12 en el navegador, ve a la pestaña
// 'Application', selecciona 'Local Storage', busca el key 'shoping-cart', clic derecho y selecciona
// 'delete', borra el carrito de compras

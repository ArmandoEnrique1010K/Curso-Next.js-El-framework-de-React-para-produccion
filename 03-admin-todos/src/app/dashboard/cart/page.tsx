import { WidgetItem } from "@/components";
import { products, type Product } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";

export const metadata = {
  title: "Carrito de compras",
  description: "SEO Title",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

// Función para obtener el carrito
// Se convierte de objeto a arreglo el carrito de compras
const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  // Itera por las claves o keys del objeto (IDs de productos)
  for (const id of Object.keys(cart)) {
    // Busca el producto por su ID en el arreglo de productos
    const product = products.find((prod) => prod.id === id);

    // Si el producto existe, lo agrega al arreglo de productos en el carrito
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }

  // Retorna el arreglo de productos en el carrito
  return productsInCart;
};

// La página del carrito de compras
// Código fuente tomado de: https://gist.github.com/Klerith/1e99f3af80901d3fea48af9eeba758f0
export default async function CartPage() {
  const cookiesStore = await cookies();

  // Obtener el carrito de compras (se especifica su tipado)
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as {
    [id: string]: number;
  };

  // Ahora que se tiene el arreglo ya se puede iterar con el en la vista del usuario
  const productsInCart = getProductsInCart(cart);

  // Calcula el total a pagar (mediante el método reduce)
  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0,
  );

  return (
    <div>
      <h1 className="flex mb-4 text-3xl">Productos en el carrito</h1>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        {/* Columna del total a pagar */}
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${(totalToPay * 1.18).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 18%: ${(totalToPay * 0.18).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}

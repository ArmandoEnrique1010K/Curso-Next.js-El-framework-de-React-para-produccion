"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

// Server action para crear y colocar una orden en la base de datos
// productsIds debe ser un arreglo de productos con su ID, talla y cantidad
export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address,
) => {
  // Obtiene la sesion del usuario
  const session = await auth();
  const userId = session?.user.id;

  // Verifica la sesión del usuario
  if (!userId)
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };

  // console.log({ productsIds, address, userId });

  // Obtener la información de los productos
  // Nota: Recuerden que podemos llevar 2 o más productos con el mismo ID

  // Busca todos los productos en donde el id del producto esté en el arreglo de productsIds
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds.map((p) => p.productId),
      },
    },
  });

  // products contiene una propiedad por cada producto, llamada inStock,
  // que indica si el producto está en stock, tambien se tiene la propiedad price
  // console.log(products);

  // Calcular los montos - Encabezado
  // Número de items en el carrito
  const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);
  // console.log({ itemsInOrder });

  // Los totales de tax, subtotal y total se calculan recorriendo los productos
  const { subTotal, tax, total } = productsIds.reduce(
    (totals, item) => {
      // Cantidad de producto
      const productQuantity = item.quantity;

      // Si el producto no existe, lanzamos un error
      const product = products.find((product) => product.id === item.productId);
      if (!product) throw new Error(`${item.productId} no existe - 500`);

      // Calcula el subtotal del producto
      const subTotal = product.price * productQuantity;

      // Acumula los totales, totals es el acumulador
      totals.subTotal += subTotal;

      // Aun no se ha definido el limite de cifras decimales, por lo que se deja asi
      totals.tax += subTotal * 0.18;
      totals.total += subTotal * 1.18;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 },
  );

  // console.log({ subTotal, tax, total });

  // TRANSACCIÓN EN PRISMA
  // https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions

  // Sirve para ejecutar múltiples operaciones en la base de datos de forma asincrona
  // En lugar de trabajar directamente con la base de datos, se utiliza 'tx' que tiene acceso
  // a todos los modelos de la base de datos de prisma, crea en memoria los registros y hace
  // los cambios solo cuando se confirma la transacción, es decir, mantiene en memoria los cambios
  // hasta que se cumpla todo el proceso, si algo falla, no se guarda nada

  // Transacción para crear la orden, se recomienda usar un try-catch porque
  // si algo falla, se puede revertir la transacción (uso de throw)
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Para acceder a los modelos de la base de datos, se utiliza 'tx'
      // tx.userAddress

      // Lanza un Error cuando sea necesario para interrumpir la transacción
      // throw new Error('Error al actualizar el stock');

      // 1. Actualizar el stock de los productos

      // LOGICA DE NEGOCIO
      // Recordar que se tiene en cuenta que la talla no forma parte del stock, es decir,
      // sin importar la talla, el stock cambia (aunque esto no es lo ideal en sistemas reales)

      // Se acumula la cantidad de cada producto que se quiere comprar
      // No se tiene en cuenta la talla, solo la cantidad total
      const updatedProductPromises = products.map((product) => {
        // Acumular los valores
        const productQuantity = productsIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => acc + item.quantity, 0);

        // Esto no deberia pasar
        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        // Actualizar el stock del producto
        return tx.product.update({
          where: { id: product.id },
          data: {
            // Esta es la forma incorrecta de actualizar el stock
            // inStock: product.inStock - productQuantity,

            // Cuando 2 personas hacen la compra al mismo tiempo, puede que uno
            // se quede sin stock porque el otro ya lo compró

            // Se tiene que actualizar el stock de forma segura, usando operaciones
            // atómicas de Prisma
            inStock: {
              // Disminuye en la cantidad que se quiere comprar, toma el valor
              // de inStock del producto y le resta la cantidad que se quiere comprar

              // Operación atómica de Prisma
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProduct = await Promise.all(updatedProductPromises);

      // Verificar valores negativos en las existencias = no hay stock
      updatedProduct.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado y detalles
      const order = await tx.order.create({
        data: {
          // Estos valores se van a actualizar después si pasa la transacción
          userId: userId,
          itesmInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          // No es necesario colocar un valor por defecto si tienes un @default en
          // schema.prisma
          // isPaid: false,
          orderItems: {
            createMany: {
              // Se tiene que insertar productos basados en productId
              // data: [],

              data: productsIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,

                // El precio se tiene que obtener desde la base de datos
                // No debe pasar que el precio sea undefined
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar si el price es 0, en un producto de la orden,
      // lanzar un error (obligatoriamente)
      if (products.find((product) => product.price === 0)) {
        throw new Error(
          "No se puede crear una orden con un producto de precio 0",
        );
      }
      // console.log("address:", address);

      // 3. Crear la dirección de la orden
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          // El id del país se obtiene del address
          countryId: country,
          // Se tiene que insertar el id de la orden creada
          orderId: order.id,
        },
      });

      // Puedes verificar en la base de datos si se ha insertado registros en las
      // tablas Order, OrderItem y OrderAddress y se ha modificado el stock en
      // la tabla Product (los productos del carrito)

      // Retornar solamente lo necesario
      return {
        updatedProduct: updatedProduct,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    // Recordar que si cae en un throw, message toma el mensaje que se le pasa al
    // objeto Error
    console.log(error);

    // Ejemplo: stock insuficiente -> "Men's Cybertruck Owl Tee no tiene inventario suficiente"
    return {
      ok: false,
      message: error?.message,
    };
  }
};

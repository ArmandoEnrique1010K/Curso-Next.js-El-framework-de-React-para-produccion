import { PaypalButton, Title } from "@/components";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";
import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";
import { getOrderById } from "@/actions";
import { OrderStatus } from "@/components";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export const OrderSection = async ({ params }: Props) => {
  const { id } = await params;

  // Obtener la orden por el ID
  const { ok, order } = await getOrderById(id);

  // Si hay un error, por ejemplo si cae en el bloque catch del server
  // action, redirigir al home
  if (!ok) {
    redirect("/");
  }

  // Dirección de la orden
  const address = order?.orderAddress;

  // console.log(order);

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            {/* Se recomienda utilizar un componente para el estado de la orden */}
            {/* order!.isPaid es seguro porque ya verificamos que ok sea true*/}
            {/* <OrderStatus isPaid={order?.isPaid || false} /> */}
            <OrderStatus isPaid={order!.isPaid} />

            {/* Itera con orderItems de la orden */}
            {order?.orderItems.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.productImages[0].url}`}
                  alt={item.product.title}
                  className="mr-5 rounded"
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />

                <div>
                  <p>{item.product.title}</p>
                  {/* El precio viene de la orden y no del producto */}
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>
                {/* countryId se utiliza en lugar de country */}
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itesmInOrder === 1
                  ? "1 articulo"
                  : `${order?.itesmInOrder} articulos`}
              </span>

              <span>Subtotal</span>

              {/* Se utiliza un ! en lugar de un ? para indicar que si o si va a tener
              un valor distinto que 0 o un valor falsy */}
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (18%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* <div
                className={clsx(
                  "flex items-center rounder-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    // Si la orden no está pagada
                    "bg-red-500": !order?.isPaid,
                    // Si la orden está pagada
                    "bg-green-500": order?.isPaid,
                  },
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">
                  {order?.isPaid ? "Pagada" : "No pagada"}
                </span>
              </div> */}
              {/* Aqui debe mostrar el boton de paypal y se le pasa las props */}
              {order?.isPaid ? (
                // Si esta pagada, no mostrara el boton de paypal
                <OrderStatus isPaid={order.isPaid} />
              ) : (
                <PaypalButton amount={order?.total!} orderIdProp={order?.id!} />
              )}

              {/* Recomendación: No se recomienda confiar en los datos que envia el cliente como modificar el precio total,
              es por ello que se toma la cantidad, el ID del producto y el precio (esos 2 ultimos de la base de datos) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

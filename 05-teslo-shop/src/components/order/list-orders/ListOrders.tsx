import { getOrdersByUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { IoCardOutline } from "react-icons/io5";

// Lista de ordenes
export const ListOrders = async () => {
  const { ok, orders } = await getOrdersByUser();

  // Si hay un error, debe redirigir al login
  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <div className="mb-10">
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              #ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Nombre completo
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Estado
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Iterar con las ordenes */}
          {orders?.map((order) => (
            <tr
              key={order.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {/* Toma la ultima parte del ID separada por guiones 
                (forma: AAA-AAA-AAA-AAA) - el número de orden */}
                {order.id.split("-").at(-1)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {order.orderAddress?.firstName} {order.orderAddress?.lastName}
              </td>
              <td
                className={clsx(
                  "flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap",
                  {
                    "text-green-800": order.isPaid,
                    "text-red-800": !order.isPaid,
                  },
                )}
              >
                <>
                  <IoCardOutline size={30} />
                  <span className="mx-2">
                    {order?.isPaid ? "Pagada" : "No pagada"}
                  </span>
                </>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href={`/orders/${order.id}`} className="hover:underline">
                  Ver orden
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

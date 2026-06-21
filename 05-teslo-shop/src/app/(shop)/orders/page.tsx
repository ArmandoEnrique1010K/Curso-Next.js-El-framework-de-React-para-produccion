// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from "@/actions";
import { Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { ListOrders } from "@/components/order/list-orders/ListOrders";
import { Suspense } from "react";

// Lista de ordenes de compra
export default function () {
  return (
    <>
      <Title title="Orders" />
      <Suspense fallback={<div>Cargando...</div>}>
        <ListOrders />
      </Suspense>
    </>
  );
}

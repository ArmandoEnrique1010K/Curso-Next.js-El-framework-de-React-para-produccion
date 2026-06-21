// Pagina de la orden por ID
import { OrderSection } from "@/components/order/order-section/OrderSection";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ({ params }: Props) {
  // const { id } = await params;
  // Temporalmente se omite el id para evitar el error de data no cacheada
  // const id = "test-id";

  // Verificar
  // redirect('/')

  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <OrderSection params={params} />
    </Suspense>
  );
}

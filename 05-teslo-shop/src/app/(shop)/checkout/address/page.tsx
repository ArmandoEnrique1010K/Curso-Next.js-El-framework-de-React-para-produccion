import { Title } from "@/components";
import { Suspense } from "react";
import { AddressSection } from "@/components/address/address-section/AddressSection";

// Página para gestionar la dirección de envío
// Código fuente obtenido de: https://gist.github.com/Klerith/a428f2c48519405402edf6019ec9172f
export default function () {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <Suspense fallback={<div>Cargando...</div>}>
          <AddressSection />
        </Suspense>
      </div>
    </div>
  );
}

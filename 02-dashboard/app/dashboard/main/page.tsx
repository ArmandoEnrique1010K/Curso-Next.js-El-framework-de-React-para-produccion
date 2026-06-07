import { SimpleWidget } from "@/components";
import { WidgetsGrid } from "@/components/dashboard/WidgetsGrid";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="mt-2 text-3xl ">Dashboard</h1>
      <span className="text-xl">Información general</span>

      {/* Para mostrar <SimpleWidget>, debe estar contenido en un componente del lado del cliente
      si se va a utilizar el estado global en ese componente */}

      {/* <div className="flex flex-wrap p-2 items-center justify-center">
        <SimpleWidget />
      </div> */}
      <WidgetsGrid />
    </div>
  );
}

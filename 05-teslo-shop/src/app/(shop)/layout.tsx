import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />

      <div className="px-0 sm:px-10">{children}</div>

      {/* Puedes seleccionar texto con el mouse en la vista del usuario y cuando cambias
      de página, el texto seleccionado se mantiene (porque ya no se vuelve a renderizar) */}
      <Footer />
    </main>
  );
}

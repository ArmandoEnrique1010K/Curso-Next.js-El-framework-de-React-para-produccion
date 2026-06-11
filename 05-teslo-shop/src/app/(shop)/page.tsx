import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

// Productos de prueba
const products = initialData.products;

export default function () {
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}

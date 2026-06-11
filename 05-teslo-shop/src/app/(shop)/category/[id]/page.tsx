import { ProductGrid, Title } from "@/components";
import { Categories } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

// Toma los productos de la semilla
const seedProducts = initialData.products;

interface Props {
  params: Promise<{
    // id: string;

    // El id debe ser uno de los valores permitidos en ValidCategories
    id: Categories;
  }>;
}

// Toma los parametros de la ruta y los desestructura
export default async function ({ params }: Props) {
  const { id } = await params;

  // notFound() de next/navigation redirige a la página 'not-found.tsx'
  // definida en este mismo directorio
  // if (id === "kids") {
  //   notFound();
  // }

  // Filtrar productos por género
  const products = seedProducts.filter((product) => product.gender === id);

  // Etiquetas para los géneros (en un objeto)
  // Definele el tipado usando un Record, especifica el key y el value
  const labels: Record<Categories, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Unisex",
  };

  return (
    <>
      <Title
        title={`Articulos de ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}

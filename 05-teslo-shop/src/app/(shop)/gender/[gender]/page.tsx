import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Categories } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound, redirect } from "next/navigation";
import { Gender } from "../../../../../generated/prisma/client";
import { Suspense } from "react";

// Toma los productos de la semilla
// const seedProducts = initialData.products;

interface Props {
  params: Promise<{
    // id: string;

    // El id debe ser uno de los valores permitidos en ValidCategories
    // id: Categories;
    gender: string;
  }>;

  searchParams: Promise<{
    page?: string;
  }>;
}

// Toma los parametros de la ruta y los desestructura
export default async function ({ params, searchParams }: Props) {
  // const { id } = await params;
  const { gender } = await params;
  const { page } = await searchParams;

  // notFound() de next/navigation redirige a la página 'not-found.tsx'
  // definida en este mismo directorio
  // if (id === "kids") {
  //   notFound();
  // }

  // Filtrar productos por género
  // const products = seedProducts.filter((product) => product.gender === id);

  // Etiquetas para los géneros (en un objeto)
  // Definele el tipado usando un Record, especifica el key y el value
  // const labels: Record<Categories, string> = {
  //   men: "Hombres",
  //   women: "Mujeres",
  //   kid: "Niños",
  //   unisex: "Unisex",
  // };
  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Unisex",
  };

  const pageNumber = page ? parseInt(page) : 1;

  // Obtener los productos por genero
  const { products, totalPages } = await getPaginatedProductsWithImages({
    // Primero gender era de tipo string y luego se estableció como Gender
    gender: gender as Gender,
    page: pageNumber,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  // Ocurre un error si 'gender' no es uno de los valores permitidos
  // En el caso de que llegue a pasar, entonces lanza el Error definido en
  // product-pagination.ts ("No se pudo obtener los productos"), es un error controlado
  // porque se tiene definido en el bloque catch
  // throw new Error("No se pudo obtener los productos");

  // Puedes definir la página de error personalizada para este route segment
  // en la carpeta 'error.tsx', pero debe ser un client component

  // Muestra la pantalla de error pero en la consola se tiene el error, algo que no
  // sucede en un entorno de producción

  //

  // REVALIDAR LA PÁGINA

  // Se hace un revalidate de 60 segundos, el tiempo que se mantiene estatico
  // (la pagina permanece sin cambios) por ese tiempo

  // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
  // En Next.js 16, revalidate ha sido removido y reemplazado por componentes de cache

  // Forma anterior
  // export const revalidate = 60;

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Title
        // title={`Articulos de ${labels[id]}`}
        title={`Articulos de ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </Suspense>
  );
}

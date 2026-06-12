import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

// Productos de prueba
// const products = initialData.products;

export default async function Home({ searchParams }: Props) {
  // Imprimir los parametros de busqueda
  // console.log(await searchParams);
  // Si te vas a: http://localhost:3000/?page=2,
  // Imprime: { page: '2' }

  const { page } = await searchParams;

  // Convertir a numero, si no existe, usar 1
  const pageNumber = page ? parseInt(page) : 1;

  //

  // Obtener productos desde la base de datos (no desde el seed inicial)
  // A diferencia del seed, los productos tienen imagenes y otros campos
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      // Pasa la pagina actual
      page: pageNumber,
    });

  // Para que no aparezca un error, debes manejar el tipado de datos en la
  // interface Product (product.interface.ts)

  // console.log(products);

  //

  // Si no hay productos en la página, redirigir a la página 1
  if (products.length === 0) {
    // Retorna un never, el código fuente de abajo en este bloque ya no se ejecutara
    redirect("/");

    // Ingresa a: http://localhost:3000/?page=28 y redirige a la página 1
  }

  //

  // Imprime la página actual y el total de páginas
  // console.log({ currentPage, totalPages });

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />

      {/* Paginación */}
      <Pagination totalPages={totalPages} />
    </>
  );
}

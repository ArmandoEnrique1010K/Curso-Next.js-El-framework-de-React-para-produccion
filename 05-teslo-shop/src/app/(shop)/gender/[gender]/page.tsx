import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Categories } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound, redirect } from "next/navigation";
import { Gender } from "../../../../../generated/prisma/client";
import { Suspense } from "react";
import { ProductSection } from "@/components/products/product-section/ProductSection";

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
// Esto ya no es un componente asincrono, es sincrono (elimina async)
export default function ({ params, searchParams }: Props) {
  // const { id } = await params;

  // Si se va a utilizar cache para revalidar cada 60 segundos, en cada una de las páginas que
  // sean dinamicas se tiene que separar elementos estaticos y dinamicos, en este componente
  // se colocan los elementos estaticos

  // Para que esta página sea estatica se tiene que separar los awaits en otro componente
  // Es decir toda función asincrona debe estar en otro componente
  // const { gender } = await params;
  // const { page } = await searchParams;

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

  // El contenido que depende de los parametros de la ruta, se trasladan a otro componente (ProductSection.tsx)

  // Se crea un objeto con las etiquetas para los géneros
  // const labels: Record<string, string> = {
  //   men: "Hombres",
  //   women: "Mujeres",
  //   kid: "Niños",
  //   unisex: "Unisex",
  // };

  // const pageNumber = page ? parseInt(page) : 1;

  // Los server actions tambien se trasladan
  // Obtener los productos por genero
  // Primero gender era de tipo string y luego se estableció como Gender
  // const { products, totalPages } = await getPaginatedProductsWithImages({
  //   gender: gender as Gender,
  //   page: pageNumber,
  // });

  // Esta validación tambien se traslada a otro componente
  // if (products.length === 0) {
  //   redirect(`/gender/${gender}`);
  // }

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

  // Forma actual
  // 1. En next.config.ts coloca el siguiente código:
  // const nextConfig: NextConfig = {
  //   cacheComponents: true,
  // };

  // 2. Agrega la siguiente línea al inicio de la función del server action, en donde
  // se obtienen los productos
  // "use cache";

  // 3. Agrega la siguiente línea al inicio de la función del server action
  // cacheLife({
  //   revalidate: 60,
  // });

  //

  // Si un componente tiene partes dinamicas, entonces se tiene que separar
  // en un componente aparte
  // Y el uso de <Suspense> debe contener el componente que tiene las partes dinamicas
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      {/* Todos estos componentes son dinamicos porque dependen de los parametros de la ruta y
      queryParams o searchParams */}
      {/* 
        <Title
          // title={`Articulos de ${labels[id]}`}
          title={`Articulos de ${labels[gender]}`}
          subtitle="Todos los productos"
          className="mb-2"
        />
        <ProductGrid products={products} />
        <Pagination totalPages={totalPages} />
      */}

      {/* Pasale los parametros como props al componente */}
      <ProductSection params={params} searchParams={searchParams} />
    </Suspense>
  );
}

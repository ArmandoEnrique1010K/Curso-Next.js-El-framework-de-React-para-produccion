import { Gender } from "../../../../generated/prisma/client";
import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid } from "../product-grid/ProductGrid";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { redirect } from "next/navigation";
import { Title } from "@/components/ui/title/Title";

// No olvides que en Next.js 14, los parametros de ruta son promesas, además de
// los searchParams
type Props = {
  params?: Promise<{
    gender?: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export const ProductSection = async ({ params, searchParams }: Props) => {
  // Extraer los parametros de la ruta
  const resolvedParams = await params;

  // Toma el gender de los parametros de la ruta
  const gender = resolvedParams?.gender;
  // console.log(gender);

  // Extrae el page de los searchParams
  const { page } = await searchParams;

  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Unisex",
  };

  const pageNumber = page ? parseInt(page) : 1;

  // Obtener los productos con imagenes
  const { products, totalPages } = await getPaginatedProductsWithImages({
    gender: gender as Gender | undefined,
    page: pageNumber,
  });

  // Dependiendo de la cantidad de productos y si hay un gender, se redirige a la pagina correspondiente
  if (products.length === 0) {
    if (!gender) {
      redirect("/");
    }

    redirect(`/gender/${gender}`);
  }

  return (
    <>
      <Title
        // Coloca un signo "!" al final de gender para indicar que no es null (solamente en caso de que gender exista)
        title={`${!gender ? "Todos los productos " : `Articulos de ${labels[gender!]}`}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
};

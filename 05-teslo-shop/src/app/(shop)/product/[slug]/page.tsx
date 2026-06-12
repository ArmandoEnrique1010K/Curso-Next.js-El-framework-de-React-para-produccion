// No funciona la revalidación de cache
// export const revalidate = 604800; // 7 dias

// No se debe revalidar cada vez que se recarga la página sino que se
// debe revalidar en tiempo real, por ejemplo al hacer un cambio en un registro
// desde la base de datos y mantener en cache

import {
  ProductBySlug,
  ProductSlideshow,
  ProductSlideshowMobile,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions";
import type { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Metadata y OG images
// https://nextjs.org/docs/app/getting-started/metadata-and-og-images

// El problema es que para obtener el producto necesitamos el slug
// pero el metadata se ejecuta antes de la página
// export const metadata: Metadata = {
//   title: "Producto",
//   description: "Descripción del producto",
// };
// Para aquello se utiliza una función llamada "generateMetadata"

// Código obtenido de: https://nextjs.org/docs/app/getting-started/metadata-and-og-images#generated-metadata
// La metadata dinamica no es afectada por el cache de Next.js
// Puedes usar async/await para obtener datos
export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = (await params).slug;

  const product = await getProductBySlug(slug);

  // Construye la metadata
  return {
    // Puedes concatenar condiciones
    // title: (product?.title ?? "Producto no encontrado") + " TESLO|SHOP",
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    // Se usa en redes sociales como cuando se comparte en Facebook, Twitter, etc.
    // Se define el titulo, descripción y una imagen que se muestran en un card al
    // momento de compartir
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",

      // Como se requiere la URL absoluta, se debe usar la URL del sitio
      // Puedes usar una variable de entorno
      // https://misitioweb.com/products/image.png

      // Toma la segunda imagen (la más optima)
      images: [`/products/${product?.images[1]}`],

      // Para probar openGraph tendrias que desplegar la aplicacion web, pero en su lugar
      // podrias verificar las etiquetas metas desde las herramientas de desarrollo de chrome
      // En el atributo name de una etiqueta meta, puede tener uno de estos valores:
      // og:title, og: description, twitter:card, twitter:title, twitter:description, twitter:image, etc

      // Recordar que desde los datos se obtienen los valores de las meta etiquetas
    },
  };

  // Ahora ya tienes un titulo en el navegador y en las redes sociales
}

export default async function ({ params }: Props) {
  // const { slug } = await params;

  // Temporalmente se omite el slug para evitar el error de data no cacheada
  // const slug = "test-slug";

  // Busca el producto por slug (etiqueta de SEO)
  // const product = initialData.products.find((product) => product.slug === slug);

  //

  // Llama al server action
  // const product = await getProductBySlug(slug);
  // console.log(product);

  // si no existe el producto, redirige a not-found
  // Debes importarlo de next/navigation
  // if (!product) {
  //   notFound();
  // }

  return (
    // El punto de corte 'md' significa que en pantallas menores a 768px (móvil)
    // se mostrará en una sola columna, y en pantallas mayores o iguales a 768px
    // (desktop) se mostrará en 3 columnas
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Recordar que Suspense es un componente que permite mostrar un fallback 
      mientras se carga el componente hijo, como se usa cache components, ese
      componente debe contener los server actions que se ejecutan en el servidor */}
      <Suspense fallback={<div>Cargando...</div>}>
        <ProductBySlug params={params} />
      </Suspense>
    </div>
  );
}

import {
  ProductSlideshow,
  ProductSlideshowMobile,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ({ params }: Props) {
  const { slug } = await params;

  // Busca el producto por slug (etiqueta de SEO)
  const product = initialData.products.find((product) => product.slug === slug);

  // si no existe el producto, redirige a not-found
  if (!product) {
    // Debes importarlo de next/navigation
    notFound();
  }

  {
    /* El punto de corte 'md' significa que en pantallas menores a 768px (móvil) 
    se mostrará en una sola columna, y en pantallas mayores o iguales a 768px 
    (desktop) se mostrará en 3 columnas */
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Sildeshow, construido con Swiper.js */}
      <div className="col-span-1 md:col-span-2">
        {/* Slideshow de dispositivos moviles */}
        {/* Se recomienda crear otro Slideshow si se desea que sea diferente al de escritorio */}
        <ProductSlideshowMobile
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Con tailwind puedes ocultar un componente dependiendo del ancho de la pantalla */}
        {/* hidden md:block oculta el componente en pantallas menores a 768px (móvil) 
        y lo muestra en pantallas mayores o iguales a 768px (desktop) */}

        {/* Slideshow de escritorio */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        {/* Los bots de Google identifican el elemento <h1> como el título principal de la página */}
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Selector de tallas */}
        {/* En initialData.products, los productos tienen tallas, pero diferentes, la propiedad 
        'sizes' es un array de strings */}
        {/* Por ejemplo: ['XS', 'S', 'M', 'L', 'XL'] */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Selector de cantidad */}
        {/* Se pasa la cantidad como prop, la cantidad maxima debe ser 5 */}
        <QuantitySelector quantity={1} />

        {/* Botón para agregar al carrito */}
        {/* btn-primary es una clase personalizada que se define en globals.css */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}

import { getProductBySlug } from "@/actions";
import { notFound } from "next/navigation";
import { ProductSlideshowMobile } from "../slideshow/ProductSlideshowMobile";
import { ProductSlideshow } from "../slideshow/ProductSlideshow";
import { StockLabel } from "../stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { SizeSelector } from "../size-selector/SizeSelector";
import { QuantitySelector } from "../quantity-selector/QuantitySelector";
import { AddToCart } from "@/app/(shop)/product/[slug]/ui/AddToCart";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const ProductBySlug = async ({ params }: Props) => {
  const { slug } = await params;

  // Llama al server action
  const product = await getProductBySlug(slug);
  //   console.log(product);

  // si no existe el producto, redirige a not-found
  if (!product) {
    // Debes importarlo de next/navigation
    notFound();
  }

  return (
    <>
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
        <StockLabel slug={product.slug} />

        {/* Los bots de Google identifican el elemento <h1> como el título principal de la página */}
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Los siguientes 3 elementos se definiran en un client component */}
        {/* <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        <QuantitySelector quantity={1} />

        <button className="btn-primary my-5">Agregar al carrito</button> */}
        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </>
  );
};

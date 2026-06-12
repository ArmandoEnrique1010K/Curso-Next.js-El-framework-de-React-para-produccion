"use server";

import prisma from "@/lib/prisma";

// Se recomienda que la URL de un producto por slug sea indexable por los bots de Google
// Ejemplo: http://localhost:3000/product/men_chill_quarter_zip_pullover_-_white

// Busca el producto por slug
export const getProductBySlug = async (slug: string) => {
  try {
    // Puedes usar findUnique o findFirst
    const product = await prisma.product.findFirst({
      include: {
        // Debe incluir las imagenes del producto
        productImages: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    // Validar que el producto exista
    if (!product) return null;

    // Devuelve el producto
    // Se recomienda 'aplanar' el producto igual que un producto de la lista
    // de productos con imagenes
    return {
      ...product,
      // Las imagenes se deben aplanar
      images: product.productImages.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por slug");
  }
};

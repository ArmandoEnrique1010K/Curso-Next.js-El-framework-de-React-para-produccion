import prisma from "@/lib/prisma";
import { Gender } from "../../../generated/prisma/client";

// Utiliza un server action para obtener la paginación de productos
// Este código es del lado del servidor

// PAGINACIÓN DEL LADO DEL SERVIDOR
// La función debe manejar la paginación del lado del servidor, tomando
// los parametros de número de página y la cantidad de productos a mostrar
interface PaginationOptions {
  page?: number;
  take?: number;

  // Genero
  // Importa gender de prisma/client (generado luego de ejecutar 'npx prisma generate')
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  // Validaciones si no es un número o es menor a 1
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      // Take: cantidad de registros a obtener
      // take: 12,
      take,

      // Skip: cantidad de registros a saltar
      // si page es 1 se omiten 0 registros, si page es 2 se omiten 12 registros, etc.
      skip: (page - 1) * take,

      // Include sirve para incluir relaciones
      include: {
        // Nombre del campo: productImages
        productImages: {
          // Redundancia: cada producto tiene hasta 2 imagenes
          take: 2,
          // Select: campos a obtener de esa relación
          select: {
            // Toma el campo url
            url: true,
          },
        },
      },

      // 3. Filtrar por género (solamente si se proporciona)
      where: {
        gender: gender,
      },
    });
    // console.log({ gender });

    // 2. Obtener el total de productos

    // Si hay 40 productos, y tenemos 10 páginas, las páginas tendran 4 productos
    // Pero si hubiera 41 productos, la ultima pagina tendria 1 producto, ocupan 4.1 páginas
    // Por lo tanto, necesitamos redondear hacia arriba

    // El método ceil toma el número entero mas cercano hacia arriba
    // Math.ceil(41/10) = 5

    const totalCount = await prisma.product.count({
      // No olvidar que debe contar por género
      where: {
        gender: gender,
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    // Imprime en la consola del servidor los productos obtenidos
    // Pero en el campo productImages se tiene: [ [Object], [Object] ]
    // console.log(products);
    // return products;

    // En lugar de regresar los productos con la relación productImages,
    // se incluye la propiedad images con un array de strings, es por ello
    // que se ven las urls de las imagenes
    return {
      products: products.map((product) => ({
        ...product,
        images: product.productImages.map((image) => image.url),
      })),

      // Paginación, página actual y el total de páginas
      // Debes retornar estos valores para que el cliente pueda saber
      // cuántas páginas hay en total y cuál es la página actual
      currentPage: page,
      totalPages: totalPages,
    };
  } catch (error) {
    throw new Error("No se pudo obtener los productos");
  }
};

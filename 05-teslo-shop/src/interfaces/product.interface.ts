// Las interfaces de los productos ya habia sido definida en seed.ts
export interface Product {
  // Solamente si se trae los productos de la base de datos, se añade la propiedad id
  id: string;

  description: string;
  images: string[];
  inStock: number;
  price: number;

  // Para renombrar nombre de una constante o propiedad, pulsa F2 para cambiarlas
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;

  // NOTA:
  // En un archivo de data, hay ciertos campos que no se deben modificar, por ejemplo si el campo
  // type contiene la categoria que a su vez esta relacionada con la tabla Categories, entonces
  // no se debe modificar el valor de ese campo en el archivo de data

  // En su lugar se debe transformar el valor de ese campo cuando se introducen los datos en la base de datos
  // type: Types;

  // Como el campo gender es un string que es el mismo que el campo type en la data porque tienen los mismos
  // valores de Categories (men, women, kid, unisex)
  // gender: Categories;

  // Se recomienda que si una propiedad puede tener un conjunto específico de valores,
  // se defina un tipo para esa propiedad
  gender: Categories;
}

// Categorias permitidas
export type Categories = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Types = "shirts" | "pants" | "hoodies" | "hats";

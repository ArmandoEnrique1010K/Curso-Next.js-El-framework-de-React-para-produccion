// Las interfaces de los productos ya habia sido definida en seed.ts
export interface Product {
  description: string;
  images: string[];
  inStock: number;
  price: number;

  // Para renombrar nombre de una constante o propiedad, pulsa F2 para cambiarlas
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Types;
  // Se recomienda que si una propiedad puede tener un conjunto específico de valores,
  // se defina un tipo para esa propiedad
  gender: Categories;
}

// Categorias permitidas
export type Categories = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Types = "shirts" | "pants" | "hoodies" | "hats";

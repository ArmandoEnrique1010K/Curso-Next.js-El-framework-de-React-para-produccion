// Node por defecto ejecuta archivos de js

import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

// import { initialData } from "./seed";

// Debes instalar 'npm install -D tsx' para ejecutar archivos de ts
// Crea un nuevo script en 'package.json'
// "seed": "tsx --env-file=.env src/seed/seed-database.ts"
// --env-file='.env' es para que tsx pueda leer el archivo .env

// Luego ejecuta 'cd src/seed/' y 'npx tsc --init' para crear un nuevo
// archivo 'tsconfig.json' en ese directorio

async function main() {
  // Demostración, imprimir en consola los datos
  //   console.log(initialData);
  //   console.log("Semilla ejecutada correctamenete");

  // 1. Borrar todos los datos existentes
  //   await prisma.productImage.deleteMany();
  //   await prisma.product.deleteMany();
  //   await prisma.category.deleteMany();

  // Puedes ejecutar los 3 deleteMany en paralelo
  // Si una de ellas fallas, todas fallan, pero solamente se utiliza
  // Si no hubiera relaciones entre las tablas
  //   await Promise.all([
  //     prisma.productImage.deleteMany(),
  //     prisma.product.deleteMany(),
  //     prisma.category.deleteMany(),
  //   ]);

  // Es por ello que el orden importa al eliminar los datos, primero
  // elimina la tabla que no tiene dependencias con otras como user y productImage
  // Porque si eliminas primero category, entonces no se podra porque la tabla product
  // tiene un campo que contiene el ID de la categoria

  // Borrar todas las direcciones de usuarios
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Toma la propiedad users
  const { categories, products, users } = initialData;

  // Inserta todos los usuarios definidos en la semilla
  await prisma.user.createMany({
    data: users,
  });

  // Insertar paises
  await prisma.country.createMany({
    // countries se obtiene desde seed-countries
    data: countries,
  });

  // Recordar que en entornos de desarrollo, los datos iniciales que se tienen que
  // insertar se tienen que 'transformar' para que se ajusten al modelo de datos
  // que se tiene en la base de datos

  // 2. Insertar las categorías
  // Una categoria
  //   await prisma.category.create({
  //     data: {
  //       name: "Shirts",
  //     },
  //   });

  // Todas las categorias
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  // Devuelve el array de categorias
  // console.log(categoriesData);

  await prisma.category.createMany({
    data: categoriesData,
  });

  // Para crear un producto, necesitamos saber a que categoria pertenece
  // Por lo tanto, necesitamos saber el id de la categoria

  // En la data inicial la propiedad product.type tiene el nombre de la categoria
  // Por lo tanto, necesitamos buscar el id de la categoria por el nombre

  // Toma las categorias insertadas en la base de datos
  const categoriesDB = await prisma.category.findMany();
  // console.log(categoriesDB);

  // Debes crear un mapa <string, categoryId> para poder buscar el id de la categoria por el nombre
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    },
    {} as Record<string, string>,
  ); // <string, categoryId>

  //   console.log(categoriesMap);
  // POSIBLE RESULTADO:
  // {
  //   shirts: 'b9717ce1-5d11-4800-acf2-c0854d061546',
  //   pants: '89540ef1-15d5-422f-b8f1-6d32d0996e65',
  //   hoodies: '35713346-85c4-4c96-a1b8-089ceab4e906',
  //   hats: '553d5134-1487-4918-a55f-c71f20a8a129'
  // }

  // 3. Insertar productos

  // Insertar un solo producto
  // Cada vez que aparezca un error al insertar el producto, revisar el nombre del campo que aparece
  // en consola
  //   const { images, type, ...product1 } = products[0];
  //   await prisma.product.create({
  //     data: {
  //       ...product1,
  //       // Buscar el id de la categoria por el nombre
  //       // Existe una relación foránea entre product y category
  //       categoryId: categoriesMap["shirts"] as string,
  //     },
  //   });

  // El problema es que los campos de los productos iniciales deben coincidir con los campos de la tabla product
  // Se utiliza un bloque for...of en lugar de forEach para poder usar await
  for (const product of products) {
    // Se omiten estas propiedades porque no existen en la tabla product
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type] as string,
      },
    });

    // 4. Imagenes de producto
    // Insertar las imagenes del producto
    // Toma las imagenes del producto y crea un array de objetos
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    // Insertar las imagenes del producto
    await prisma.productImage.createMany({
      data: imagesData,
    });
  }
}

// Luego ejecuta 'npm run seed' para ejecutar la semilla
// Cada vez que se ejecuta se tendra nuevos identificadores

//

// Función que se autoinvocara
// No se va a ejecutar si estamos en producción
(async () => {
  if (process.env.NODE_ENV === "production") return;

  try {
    await main();

    console.log("Semilla ejecutada correctamente");
  } catch (error) {
    console.error("Error ejecutando la semilla:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

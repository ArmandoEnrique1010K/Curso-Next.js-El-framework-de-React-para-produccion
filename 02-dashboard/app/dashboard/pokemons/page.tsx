// ==========================================
// FETCH EN NEXT.JS
// ==========================================
// Obtener datos desde una API o base de datos.
// https://nextjs.org/docs/app/getting-started/fetching-data

import { PokemonGrid, PokemonResponse, SimplePokemon } from "@/pokemons";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
// import { notFound } from "next/navigation";
// import Image from "next/image";

// En documentación actual de Next.js 16, todo lo relacionado a
// fetch se encuentra en:
// https://nextjs.org/docs/app/api-reference/functions/fetch

// Next.js añade funcionalidades adicionales a la función fetch

// Next.js extiende la API nativa de fetch para permitir
// control de caché, revalidación e invalidación de datos.

// IMPORTANTE:
// Desde Next.js 15+, las peticiones fetch NO se almacenan
// en la Data Cache por defecto.
//
// Si no especificas ninguna estrategia de caché,
// la solicitud se considera dinámica.
//
// Ejemplo:
// const data = await fetch(url);

// CACHE EXPLÍCITO

// Si deseas almacenar la respuesta en la Data Cache:
//
// await fetch(url, {
//   cache: 'force-cache'
// });

// REVALIDACIÓN POR TIEMPO

// Mantiene la respuesta cacheada durante una cantidad
// específica de segundos.
//
// Después de ese tiempo, Next.js obtiene datos nuevos
// y actualiza el caché.
//
// await fetch(url, {
//   next: {
//     revalidate: 10
//   }
// });

// SIN CACHÉ

// Fuerza una nueva solicitud en cada request.
//
// await fetch(url, {
//   cache: 'no-store'
// });

// REVALIDACIÓN POR TAGS

// Permite invalidar datos manualmente mediante tags.
//
// await fetch(url, {
//   next: {
//     tags: ['pokemons']
//   }
// });
//
// Luego:
//
// revalidateTag('pokemons');

// DESARROLLO VS PRODUCCIÓN

// En desarrollo, Next.js utiliza cachés adicionales
// para mejorar la experiencia de Hot Reload (HMR).
//
// Por ello, incluso usando cache: 'no-store',
// podrías observar datos cacheados temporalmente
// hasta navegar o recargar completamente la página.
//
// El comportamiento real de caché debe verificarse
// ejecutando la aplicación en producción:
//
// npm run build
// npm run start

// ==========================================
// API DE POKEMON
// ==========================================

// https://pokeapi.co/

// Endpoint para obtener primeros 151 pokemons
// https://pokeapi.co/api/v2/pokemon?limit=151&offset=0

// Puedes hacer la petición desde el navegador o desde Postman
// Se obtiene el siguiente objeto en la respuesta:
// {
//   "count": 1350,
//   "next": "https://pokeapi.co/api/v2/pokemon?offset=152&limit=151",
//   "previous": "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1",
//   "results": [
//     {
//       "name": "ivysaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/2/"
//     },
//     {
//       "name": "venusaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/3/"
//     }

//     // ...
//   ]
// }

// Función para obtener los pokemons de la API de Pokemon

// Primero se crea la interface para manejar el tipo de respuesta de la API
// En este caso se crea un archivo de definiciones de tipos en la ruta
// app/dashboard/pokemons/interfaces/pokemons-response.ts

// Se especifica el tipo devuelto por la función que es un Promise (una promesa) que contiene
// un array de objetos de tipo SimplePokemon
const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<SimplePokemon[]> => {
  // Se especifica el tipo de la variable data como PokemonResponse
  const data: PokemonResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  ).then((res) => res.json());

  // Como se espera que devuelva un array de objetos de tipo SimplePokemon
  // se retorna solo la propiedad results del objeto data
  const pokemons = data.results.map((pokemon) => {
    return {
      // El problema es que un elemento de tipo 'SimplePokemon' no tiene
      // la propiedad id, pero se ve que tiene un 'ID' en la URL
      // Ejemplo de valor en la propiedad url: https://pokeapi.co/api/v2/pokemon/2/

      // Para aquello se puede usar lo siguiente:

      // split('/'): Divide la URL en elementos de un array separados por el caracter '/'
      // id: pokemon.ulr.split('/')
      // ['https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '2', '']

      // at(-2): Obtiene el penúltimo elemento del array, que es el ID
      id: pokemon.url.split("/").at(-2)!,
      // 2
      name: pokemon.name,
    };
  });

  // Fuerza a lanzar un error (recuerda que es un componente del lado del servidor)
  // throw new Error("Esto es un error que no debería de suceder");
  // throw notFound();

  // Cuando se crea la página o contenido estatico puede ocurrir un error
  // https://nextjs.org/docs/app/getting-started/error-handling

  // Si un archivo se llama 'error.tsx' sirve para manejar errores en la página

  return pokemons;
};

export const metadata = {
  title: "151 Pokemons",
  description: "Todos los pokemons",
};

// Si vas a utilizar un await dentro de una función, debes declararla como async
export default async function PokemonsPage() {
  // CACHE COMPONENTS
  // Next.js 16 ofrece otras opciones para el manejo del cache
  // 'use cache' es una directiva como 'use client' o 'use server'
  // https://nextjs.org/docs/app/getting-started/caching

  // Permite basicamente hacer cualquier función cacheable, es decir que
  // se pueda ejecutar una sola vez y luego se cachea, la solicitud se obtiene
  // del cache en lugar de ejecutar la función nuevamente

  // Se puede usar para data que no cambia con frecuencia, como por ejemplo
  // la lista de pokemons

  // Hay 3 formas:
  // A nivel de archivo: coloca 'use cache' en la primera linea de codigo,
  // A nivel de componente: coloca 'use cache' antes de definir el procedimiento
  // de la función principal del componente
  // A nivel de función; coloca 'use cache' en la primera linea de una función
  // como por ejemplo, una función fetch

  // Primero se realiza una configuración en next.config.ts
  // const nextConfig: NextConfig = {
  //   cacheComponents: true,
  // };

  "use cache";

  // La primera vez que se genera el HTML, se cachea y luego se usa el cache
  // en lugar de volver a generar el HTML

  // Añade un componente <Suspense> al componente padre que es layout.tsx si vas
  // a usar 'use cache' en esta página

  // Más información en el archivo 'app\dashboard\random\page.tsx'
  cacheLife({
    stale: 10,
    revalidate: 60,
  });

  // Permite asignar una 'etiqueta' al cache
  // Se mantiene en cache la parte que tiene la etiqueta
  // Hasta que en alguna otra parte se tenga que revalidar
  // cacheTag("pokemons");

  // Función para revalidar cache por etiqueta
  // max = El contenido obsoleto se sirve mientras que el contenido nuevo se obtiene en segundo plano
  // revalidateTag("pokemons", "max");

  // No puedes usar 'use cache' y 'cacheTag' en la misma página o componente al mismo tiempo

  //

  // Llamada a la API
  const pokemons = await getPokemons(151);

  // Si deshabilitas JavaScript, verás que se realiza la petición al servidor
  // y se muestra la respuesta en el navegador

  return (
    <div className="flex flex-col p-2 ">
      <span className="text-5xl my-2">
        Listado de Pokemons <small>estático</small>
      </span>

      <div className="flex flex-wrap gap-10 items-center justify-center">
        {/* {JSON.stringify(pokemons, null, 2)} */}

        {/* Para obtener los datos de un solo Pokemon se hace una petición a la API
        con el ID del Pokemon, ejemplo (ID 2):
        https://pokeapi.co/api/v2/pokemon/2
        En la respuesta hay una propiedad que viene de la siguiente forma:
        [
        // ...
          "sprites": {
            // ...
            "other": {
              "dream_world": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg",
                // ...
              },
              // ...
            }
          }
        ]
        La propiedad front_default es la URL de la imagen del Pokemon, se induce que el número 2 es el ID del Pokemon,
        por lo cual es una URL dinámica */}

        {/* <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg`}
          width={100}
          height={100}
          alt="Pokemon"
        /> */}

        <PokemonGrid pokemons={pokemons} />
      </div>
    </div>
  );
}

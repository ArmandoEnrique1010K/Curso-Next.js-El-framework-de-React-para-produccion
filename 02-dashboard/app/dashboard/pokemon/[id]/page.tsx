// Nombrar una carpeta con corchetes [] significa que es un parámetro dinámico
// como el ID de un pokemon

import { Pokemon } from "@/pokemons";
import Image from "next/image";
import { notFound } from "next/navigation";

// Para recibir los parametros dinamicos se debe usar el objeto 'params'
// Además estas páginas deben ser si o si asincronas
// export default async function PokemonPage(props: any) {}

// export default async function PokemonPage(props: any) {
//
// Obtiene un objeto con todos los parametros dinamicos
// console.log(await props.params);
// Ejemplo: {id: "7"}

// En el caso de tener query parameters, se pueden obtener con props.searchParams
// URL: http://localhost:3000/dashboard/pokemon/7?name=hola
// console.log(await props.searchParams);
// Ejemplo: {name: "hola"}

// En versiones anteriores de NextJS imprimias directamente los parametros dinamicos
// sin hacer el uso de async/await y obtenias un objeto con 2 propiedades:
// - params: objeto con los parametros dinamicos
// - searchParams: objeto con los query parameters
// console.log(props);

// Pero si quieres obtener ambos parametros, la unica forma seria la siguiente
//   const { params, searchParams } = await props;
//   console.log({
//     props: {
//       params: await params,
//       searchParams: await searchParams,
//     },
//   });
//   return <div>{await params.id}</div>
// }

// En Next.js 15, los parametros dinamicos son objetos Promise

// Considera definir un interface para los parametros dinamicos
interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Función para obtener los datos de un pokemon
// No olvidar el tipo de dato que devuelve la función: Promise<Pokemon>
const getPokemon = async (id: string): Promise<Pokemon> => {
  // Coloca un try-catch porque puede haber el caso de que no exista un pokemon con ese ID
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      // Establecemos el cache force-cache para que no se vuelva a consultar la API
      // cache: "force-cache",
      // Revalidamos cada 30 días, luego de ese tiempo se revalida la información sin
      // necesidad de hacer un hard refresh
      next: {
        revalidate: 60 * 60 * 24 * 30,
      },

      // No mezclar force-cache con revalidate porque el revalidate sobrescribe el force-cache
    }).then((res) => res.json());

    // Imprime en la consola del servidor el nombre del pokemon
    console.log("Se cargó:", pokemon.name);

    // Recuerda que imprime 2 veces en consola, tanto en la del cliente como en el de
    // servidor, por lo que es normal ver el mensaje 2 veces en un entorno de desarrollo

    // DEPURAR CÓDIGO

    // En Windsurf o VSCode, puedes colocar un breakpoint (punto rojo) en una línea de código, a la izquierda
    // del numero de linea, para pausar la ejecución y ver el valor de las variables

    // Luego ve a package.json y sobre la sección de scripts hay un botón "Debug" que te permitirá depurar el código
    // Haz clic en ese botón y selecciona la opción 'dev next dev'

    // Cuando se llega a la ejecución del breakpoint, en el panel izquierdo de Windsurf puedes ver las variables
    // y sus valores, así como el stack de llamadas
    // id = '14'
    // pokemon = { ... }
    // this = undefined

    // Pulsa la tecla F5 2 veces para continuar la ejecución luego del breakpoint

    // Para detener la depuración pulsa Shift + F5
    // Una forma más rapida de depurar código es pulsar F1 y escribir "Debug: Debug npm script" y selecciona "dev next dev"

    return pokemon;
  } catch (error) {
    // Llama a notFound() para mostrar la página 404 (definida en app/not-found.tsx)
    notFound();
  }
};

// GENERACIÓN ESTATICA DE PÁGINAS
// Si se tiene una base de datos con 1000 pokemones, se puede generar las páginas de forma
// estática, para que esten generadas en el servidor y no se tengan que generar en tiempo de ejecución
// Carga más rápida, mejor SEO, mejor UX

// Genera un arreglo con 151 elementos undefined
// Array.from({length: 151})

// Genera un arreglo, donde cada elemento es un numero incremental desde 1 hasta 151
// Array.from({length: 151}).map((_, i) => i + 1)

// Generar 151 páginas antes de que la persona la solicite
// generateStaticParams es una función de next.js, se ejecuta en build time (tiempo de compilación)

// Escribe gsp y pulsa enter para generar código en Windsurf
export async function generateStaticParams() {
  // Generar 10 páginas de ejemplo
  // return [
  //   { id: "1" },
  //   { id: "2" },
  //   { id: "3" },
  //   { id: "4" },
  //   { id: "5" },
  //   { id: "6" },
  //   { id: "7" },
  //   { id: "8" },
  //   { id: "9" },
  //   { id: "10" },
  // ];

  // Luego de ejecutar un npm run build, ve a la siguiente carpeta:
  // .next/server/app/dashboard/pokemon y veras que hay 10 archivos html generados

  // Si ejecutas npm run start y haces scroll hacia abajo, veras que en la carpeta pokemon
  // (de la misma ruta anterior) se crean archivos HTML de forma dinamica, es decir, antes
  // de que el usuario visite la página que muestre un pokemon por ID, estos archivos ya
  // estan generados

  // Esto mejora la experiencia del usuario

  // Generar las 151 páginas de los pokemones
  const static151Pokemons = Array.from({ length: 151 }).map(
    (_, i) => `${i + 1}`,
  );

  return static151Pokemons.map((id) => ({
    // id: id
    id,
  }));

  // Pero hay un problema, cuando el usuario ingresa a una página que no existe,
  // por ejemplo /dashboard/pokemon/999, la página se genera dinamicamente
  // en el servidor como '999.html' en '.next/server/app/dashboard/pokemon'

  // Si otro usuario ingresa a la misma página, la página ya existe y se muestra
  // inmediatamente, sin necesidad de generarla de nuevo

  // Si hay un 'revalidate', en la función global fetch, la página se vuelve
  // a generar después del tiempo especificado
  //   next: {
  //   revalidate: 60 * 60 * 24 * 30,
  // },
}

// La metadata tambien debe ser dinamica
// La función generateMetadata es asincrona y recibe los parametros dinamicos
// Obviamente es una función de Next.js
export async function generateMetadata({ params }: Props) {
  try {
    const { id, name } = await getPokemon((await params).id);

    // Comprueba el resultado pulsando F12 en el navegador, seccion Elements,
    // busca el elemento <meta name="description" content="..." />
    return {
      title: `#${id} - ${name}`,
      description: `Página del Pokemon: ${name}`,
    };
  } catch (error) {
    // Metadadata por defecto cuando el pokemon no se encuentra
    return {
      title: "Pokemon no encontrado",
      description: "Página del Pokemon no encontrada",
    };
  }
}

export default async function PokemonPage({ params }: Props) {
  //   const { id } = await params;
  //   console.log(id);

  const pokemon = await getPokemon((await params).id);

  //   return (
  //     <div>
  //       <h1>Pokemon: {(await params).id}</h1>
  //       <div>{JSON.stringify(pokemon, null, 2)}</div>
  //     </div>
  //   );

  // Código fuente obtenido de:
  // https://www.creative-tim.com/twcomponents/component/profile-information-card-horizon-ui-tailwind/landing
  // https://gist.githubusercontent.com/Klerith/67e34298b2eb6e680514e8d16b44b328/raw/c5c27913bca591db64a5412537f9cce634875743/page.tsx
  return (
    <div className="flex mt-5 flex-col items-center text-slate-800 p-2 ">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            {/* No olvidar hacer una configuración en 'next.config.ts' para permitir imágenes de un dominio externo */}
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ""}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />

            <div className="flex flex-wrap">
              {pokemon.moves.map((move) => (
                <p key={move.move.name} className="mr-2 capitalize">
                  {move.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {pokemon.types.map((type) => (
                <p key={type.slot} className="mr-2 capitalize">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {pokemon.weight}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

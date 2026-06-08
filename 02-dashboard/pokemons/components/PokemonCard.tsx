"use client";

// Componente generado de TailwindComponents, obtenido de
// https://www.creative-tim.com/twcomponents/component/user-card-7
// Pulsa el botón de Show Code para ver el código

import Link from "next/link";
import Image from "next/image";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { SimplePokemon } from "../interfaces/simple-pokemon";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/pokemons/pokemonsSlice";

interface Props {
  pokemon: SimplePokemon;
}

// Recordar que los componentes no deben ser exportados por defecto
export const PokemonCard = ({ pokemon }: Props) => {
  const { id, name } = pokemon;

  // Recordar que las interacciones con redux, contextAPI o cualquier libreria de state management
  // Se realizan a traves de los reducers y deben encontrase en componentes del lado del cliente

  // Verifica si el pokemon con el id especificado esta en el estado de los favoritos
  // Coloca doble negación (!!) para convertir el valor a booleano
  // const isFavorite = useAppSelector((state) => !!state.pokemons[id]);
  const isFavorite = useAppSelector((state) => !!state.pokemons.favorites[id]);

  // Prueba a imprimir y veras que sale un error si no tienes un 'use client' en el componente
  // Si no hay un error debe imprimir 1 (true) o varios (false) dependiendo de la cantidad de veces
  // que se renderiza el componente PokemonCard (por cada pokemon)
  // console.log(isFavorite);

  const dispatch = useAppDispatch();

  // Función auxiliar para alternar el favorito
  const onToggle = () => {
    // Imprime el objeto con el pokemon completo
    // console.log("click", pokemon);

    // Llama al reducer para alternar el favorito
    dispatch(toggleFavorite(pokemon));
  };

  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <Image
            key={id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            width={100}
            height={100}
            alt={name}
            // Pulsa F12 en el navegador y en la pestaña de Network, veras que se cargan las 151 imagenes
            // Aunque el usuario no haya hecho un scroll hacia abajo, todas las imagenes se cargan de una vez

            // Esto es un problema de rendimiento, ya que se están cargando todas las imagenes de una vez
            // y no se están utilizando todas al mismo tiempo

            // Cuando los bots de Google pasen por la pantalla, van a ver todas las imagenes cargadas
            // y van a pensar que el sitio web es muy pesado

            // https://nextjs.org/docs/app/api-reference/components/image#priority
            // La propiedad 'priority' en false indica a Next.js que esta imagen debe ser cargada bajo demanda
            // De lo contrario si es true, la imagen se carga primero
            priority={false}

            // Ahora pulsa F12 y ve a la pestaña de Network, veras que las imagenes se cargan bajo demanda a
            // medida que haces scroll hacia abajo

            // Para hacer un hard refresh, presiona Ctrl + Shift + R en el navegador si quieres eliminar
            // completamente la caché
          />

          {/* La clase 'capitalize' convierte la primera letra de cada palabra en mayúscula */}
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
            {name}
          </p>
          <div className="mt-5">
            {/* Enlace para ver más información del pokémon */}
            <Link
              // href={`/dashboard/pokemon/${id}`}
              href={`/dashboard/pokemons/${name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Más información
            </Link>
            {/* En un entorno de producción, si esas páginas no existen, mostrara un error
            de tipo Not Found (404) en la consola */}
          </div>
        </div>
        <div className="">
          {/* En NextJS 13+ no se puede usar <a> dentro de <Link> (de next/link) */}
          {/* cursor-pointer cambia el tipo de cursor a mano cuando se pasa el mouse sobre el elemento */}
          <div
            // Llama a la acción
            onClick={onToggle}
            className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
          >
            <div className="text-red-600">
              {/* Icono con borde y con color de relleno  */}
              {/* <IoHeartOutline /> */}
              {/* <IoHeart /> */}

              {isFavorite ? <IoHeart /> : <IoHeartOutline />}
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                {isFavorite ? "Es favorito" : "No es favorito"}
              </p>
              <p className="text-xs text-gray-500">Click para cambiar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

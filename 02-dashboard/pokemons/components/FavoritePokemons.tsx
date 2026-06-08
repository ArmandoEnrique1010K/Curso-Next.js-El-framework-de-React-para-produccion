"use client";

import { useAppSelector } from "@/store";
import { PokemonGrid } from "./PokemonGrid";
import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";

export const FavoritePokemons = () => {
  //   const favoritePokemons = useAppSelector((state) => state.pokemons);

  // Imprime un objeto cuyas claves son los id de los pokemons favoritos
  // console.log(favoritePokemons);

  // Por lo cual debe ser convertido a un arreglo de tal manera que tome los
  // valores del objeto favoritePokemons y sean los elementos del arreglo
  //   console.log(Object.values(favoritePokemons));

  const favoritePokemons = useAppSelector((state) =>
    // Object.values(state.pokemons),

    // Usar el valor de los pokemons favoritos
    Object.values(state.pokemons.favorites),
  );

  // Para mantener el pokemon en la página de pokemons favoritos al hacer clic en el botón, de tal
  // manera que se pueda ver en la vista del usuario, se tiene que hacer el uso de un state local
  const [pokemons, setPokemons] = useState(favoritePokemons);

  // Cada vez que cambie favoritePokemons debe cambiar el state local, pero esto hace un bucle infinito
  //   useEffect(() => {
  //     // console.log(favoritePokemons);
  //     setPokemons(favoritePokemons);
  //   }, [favoritePokemons]);

  // Solamente se pasa el arreglo de pokemons favoritos para mostrarlos en la
  // vista del usuario
  // return <PokemonGrid pokemons={favoritePokemons} />;

  return (
    <>
      {/* Verifica si hay al menos un pokemon favorito */}
      {/* 0 es un valor falsy, se evalua como false */}
      {/* {pokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <PokemonGrid pokemons={pokemons} />
      )} */}

      {/* Aunque se ha perdido la funcionalidad de mantener los pokemons favoritos
        en la página de pokemons favoritos, cuando se ha quitado de favoritos,
        sigue funcionando */}
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <PokemonGrid pokemons={favoritePokemons} />
      )}
    </>
  );
};

// Componente auxiliar para mostrar cuando no hay pokemons favoritos
export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay favoritos</span>
    </div>
  );
};

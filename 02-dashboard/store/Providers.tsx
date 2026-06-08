"use client";

import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { setFavoritePokemons } from "./pokemons/pokemonsSlice";

interface Props {
  children: React.ReactNode;
}

// Se define el provider de Redux aqui en lugar de un componente del lado del servidor
export const Providers = ({ children }: Props) => {
  // UseEffect se ejecuta en un componente del lado del cliente
  useEffect(() => {
    // Se obtiene los pokemones favoritos del localStorage
    // Fue definido en getInitialState en el slice de pokemonsSlice como una
    // forma alternativa
    const favorites = JSON.parse(
      localStorage.getItem("favorite-pokemons") ?? "{}",
    );
    // console.log(favorites);

    // Llama a la accion para establecer los pokemones favoritos
    store.dispatch(setFavoritePokemons(favorites));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

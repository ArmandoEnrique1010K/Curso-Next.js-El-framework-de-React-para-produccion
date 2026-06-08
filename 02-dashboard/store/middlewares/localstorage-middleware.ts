// Crear un middleware de redux toolkit
// https://redux-toolkit.js.org/api/getDefaultMiddleware

import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "../index";

// Se utiliza el tipado de MiddlewareAPI para el state
export const localStorageMiddleware = (state: MiddlewareAPI) => {
  // Necesita devolver una función que ejecuta la siguiente acción
  // Se especifican los tipados
  return (next: Dispatch) => (action: Action) => {
    // Se puede ejecutar lógica antes de la acción
    // console.log({ state });

    // Al hacer un cambio en el estado, no hace nada pero se imprime un objeto que contiene
    // el key 'state'

    // Para ver el estado actual, se puede acceder a state.getState()
    // console.log({ state: state.getState() });

    // Si comentas el código a partir de aqui a abajo, el middleware no hará nada
    // y la acción se ejecutará normalmente

    // Lógica del middleware
    // next(action) ejecuta la siguiente acción
    next(action);

    // Se puede ejecutar lógica después de la acción
    // Con ello por cada cambio en el estado, se imprime el estado actual
    // console.log({ state: state.getState() });

    // Imprime la acción que se está ejecutando
    // Un objeto con las propiedades 'type' (el nombre de la acción) y
    // 'payload' (el valor que se pasa en la acción)
    // console.log(action);

    // Si se realiza la acción de 'pokemon/toggleFavorite', entonces se guarda
    // el estado actual en el localStorage
    if (action.type === "pokemon/toggleFavorite") {
      const { pokemons } = state.getState() as RootState;
      localStorage.setItem("favorite-pokemon", JSON.stringify(pokemons));
    }

    // Con ello se hizo que el estado se guardara en el localStorage
  };
};

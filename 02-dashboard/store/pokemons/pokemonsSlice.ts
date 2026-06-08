// Detalle: las librerias de terceros se importan primero y luego las locales como interfaces,componentes, slices, etc.
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SimplePokemon } from "@/pokemons";

/*
Puedes usar un arreglo de objetos para almacenar los pokemons favoritos
[{}, {}]
Pero para obtener un pokemon debes iterar en el arreglo y buscar uno cuya propiedad id sea igual al id que buscas

Para simplificar eso puedes usar un objeto, cuya llave sea la ID del pokemon, para buscar por ID
{
    '1': {id: 1, name: 'bulbasaur'},
    '2': {id: 2, name: 'ivysaur'},
}

O un objeto con la propiedad 'favorites' que sea un objeto con las llaves de tipo ID (string)
{
    favorites: {
        '1': {id: 1, name: 'bulbasaur'},
        '2': {id: 2, name: 'ivysaur'},
    }
}
*/

// Con esta interface podemos tipar el estado de los pokemons favoritos
// Se tiene 'x' cantidad de llaves de tipo ID (string) cuyo valor es un SimplePokemon
interface PokemonState {
  favorites: {
    [key: string]: SimplePokemon;
  };
}

// Función para establecer el estado inicial
const getInitialState = (): PokemonState => {
  // Al ejecutar npm run build aparece un error en la consola
  // ReferenceError: localStorage is not defined
  // Esto se debe a que el código se ejecuta en el servidor y no en el cliente
  // Por lo tanto, no existe el objeto localStorage

  // Se recomienda llamarlo por medio de un efecto
  // Todas las funciones de Next.js se ejecutan del lado del servidor

  // Si no existe el objeto localStorage, se retorna un objeto vacío
  // Cuando se ejecuta esto en el lado del servidor, no existe el objeto localStorage
  // if (typeof localStorage === "undefined") return {};

  // Escribe en la consola del navegador en un entorno de desarrollo
  // typeof window.localstorage === undefined
  // Te devuelve false porque existe el objeto localStorage en el navegador

  // Si ejecutas npm run build ahora ya no aparece el error
  // Pero si ejecutas npm run start, aparece el error 'Text content does not match
  // server-rendered HTML' o 'Minified React error #418',

  // https://react.dev/errors/418?args[]=text&args[]=
  // A server/client branch `if (typeof window !== 'undefined')`.

  // Sucedio el problema porque lo que se genero en el lado del cliente no coincide
  // con lo que se genero en el lado del servidor

  //

  //

  // Obten el estado inicial desde el local storage por el key "favorite-pokemons"
  // En el caso que sea nulo, se establece un objeto vacio
  // Recordar que JSON.parse() convierte un string a un objeto
  const favorites = JSON.parse(
    localStorage.getItem("favorite-pokemons") ?? "{}",
  );

  return favorites;
};

const initialState: PokemonState = {
  // Se establece un pokemon favorito inicial
  // "1": {
  //   id: "1",
  //   name: "bulbasaur",
  // },

  // Se carga el estado inicial desde el local storage
  // ...getInitialState(),

  favorites: {},
};

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    // Acción para agregar o eliminar un pokemon de favoritos

    // En lugar de crear 2 acciones para agregar y eliminar de favoritos, se
    // puede crear una sola acción que agregue o elimine un pokemon de favoritos
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;

      // Si el id del pokemon ya existe en el estado, se elimina
      // if (!!state[id]) {
      // Elimina la propiedad del objeto
      // delete state[id];
      // return;

      // La ventaja de redux toolkit es que el codigo puede mutar el state
      // y no necesita retornar un nuevo estado porque se encarga de emitir
      // un nuevo estado automaticamente
      // }

      // Si el id del pokemon no existe en el estado, se agrega
      // state[id] = pokemon;

      // Como se va a utilizar localstorage, entonces se coloca un bloque else
      // else {
      //   state[id] = pokemon;
      // }

      // LOCALSTORAGE
      // Espacio reservado por dominio en el navegador para almacenar datos de forma local
      // Ve a la pestaña Application en las herramientas de desarrollo del navegador, en
      // la seccion Storage se tiene la opción de Local Storage para ver las variables guardadas
      // Se almacenan en formato de clave-valor

      // Las acciones de redux toolkit deben ser funciones puras, no deben tener interacciones con el
      // mundo exterior, por ejemplo: no se debe guardar en localstorage dentro de una accion
      // Como el siguiente código
      // localStorage.setItem("favorite-pokemons", JSON.stringify(state));

      // Recarga el navegador web y observa que no se pierden los datos almacenados en el local storage

      // No es una buena practica disparar un efecto secundario dentro de un reducer
      // Si se necesita disparar un efecto secundario, se debe usar un middleware

      // Un middleware sirve para ejecutar código cuando el store cambia, para interceptarla el cambio,
      // se tiene que pasar por el middleware, existen los middlewares en Next.js
      // Crea el archivo middlewares/localstorage-middleware.ts

      // CAMBIO EN EL TIPADO DE POKEMONSTATE
      if (!!state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = pokemon;
      }

      // Se utilizara un localStorage sin el middleware definido previamente
      localStorage.setItem(
        "favorite-pokemons",
        JSON.stringify(state.favorites),
      );
    },

    // Establecer pokemones favoritos
    setFavoritePokemons(
      state,
      action: PayloadAction<{ [key: string]: SimplePokemon }>,
    ) {
      state.favorites = action.payload;
    },
  },
});

export const { toggleFavorite, setFavoritePokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;

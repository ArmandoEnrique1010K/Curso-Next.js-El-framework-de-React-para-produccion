// Fuente central del estado global
// Código fuente obtenido de: https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-store
import { configureStore, Middleware } from "@reduxjs/toolkit";

// Importa el slice de contador
import counterReducer from "./counter/counterSlice";

// Importa el slice de pokemons
import pokemonsReducer from "./pokemons/pokemonsSlice";

import { useDispatch, useSelector } from "react-redux";
import { localStorageMiddleware } from "./middlewares/localstorage-middleware";

export const store = configureStore({
  reducer: {
    // Aquí se definirán los reducers, que son como los slices o hojas del estado
    // Sintaxis recomentada: nombreDelSlice: reducerRespectivo
    counter: counterReducer,
    pokemons: pokemonsReducer,
  },

  // Aqui se ejecutan los middlewares
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware as Middleware),

  // Forma alternativa de definir los middlewares
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     thunk: {
  //       // Aqui se especifica el argumento extra que se pasa a los thunks
  //       extraArgument: localStorageMiddleware,
  //     },
  //     // Desactiva la verificación de serialización para permitir objetos no serializables
  //     serializableCheck: false,
  //   }),
});

// En las herramientas del navegador, se puede ver el estado de la aplicación

// Pulsa F12 y ve a la pestaña Redux, vuelve a cargar la página
// Podras ver el counterReducer que es un objeto con la propiedad count

// Tipado estricto del store
export type RootState = ReturnType<typeof store.getState>;

// Tipado estricto de las acciones que se pueden hacer en el store
export type AppDispatch = typeof store.dispatch;

// Se utiliza los hooks useDispatch y useSelector
// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks

// Hooks para la gestión del estado global
// useDispatch es un hook que devuelve la función dispatch y permite enviar acciones al store
// useSelector es un hook que devuelve el estado y permite leer el estado del store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

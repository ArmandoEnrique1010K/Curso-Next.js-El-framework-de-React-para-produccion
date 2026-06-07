// Slice de contador
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Tipado del estado
interface CounterState {
  count: number;
  isReady: boolean; // Carga
}

// Estado inicial
const initialState: CounterState = {
  count: 5,
  isReady: false,
};

export const counterSlice = createSlice({
  // Nombre del slice
  name: "counter",

  // Valores iniciales
  initialState,

  // Reducers (acciones que modifican el estado)
  reducers: {
    // Carga inicial
    initCounterState: (state, action: PayloadAction<number>) => {
      if (state.isReady) return;

      state.count = action.payload;
      state.isReady = true;
    },

    // Agrega uno al contador
    addOne: (state) => {
      // state sirve para acceder al estado actual y modificarlo
      // state.count += 1;
      state.count++;
    },

    // Decrementa el contador
    substractOne: (state) => {
      // Validar
      if (state.count === 0) return;

      state.count--;
    },

    // Reinicia el contador
    // Se utiliza una action para recibir el valor a reiniciar
    // No olvidar el tipado de PayloadAction y el tipo de dato que se espera
    resetCount: (state, action: PayloadAction<number>) => {
      // Importante, el state debe cambiar de alguna forma que utilice el valor de la action
      if (action.payload < 0) action.payload = 0;

      state.count = action.payload;
    },
  },
});

// Exporta las acciones, permite usarlas en los componentes
export const { addOne, substractOne, resetCount, initCounterState } =
  counterSlice.actions;

// Exporta el reducer
export default counterSlice.reducer;

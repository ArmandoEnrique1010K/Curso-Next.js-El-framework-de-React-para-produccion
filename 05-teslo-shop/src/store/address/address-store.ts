import { create } from "zustand";
import { persist } from "zustand/middleware";

// Estado de dirección
interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  // Métodos
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  // El middleware persist sirve para guardar el estado en el localStorage
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },

      // Métodos
      // Establecer dirección
      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    },
  ),
);

// Recordar que para ver el estado almacenado en localstorage
// Pulsa F12, ve a la pestaña Application y busca LocalStorage
// Selecciona tu dominio (http://localhost:3000) y verás el estado almacenado
// en address-storage, un objeto con la estructura del estado

// Para borrar un key del localStorage, desde las herramientas de desarrollo
// seleccionalo y pulsa la tecla SUPR

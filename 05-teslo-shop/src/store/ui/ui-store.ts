// ZUSTAND
// https://zustand.docs.pmnd.rs/learn/getting-started/introduction

import { create } from "zustand";

// Es un gestor de estado global para React, funciona con Next.js
// Ejecuta: npm install zustand

interface State {
  isSideMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

// Crea el store de Zustand
export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  openMenu: () => set({ isSideMenuOpen: true }),
  closeMenu: () => set({ isSideMenuOpen: false }),
}));

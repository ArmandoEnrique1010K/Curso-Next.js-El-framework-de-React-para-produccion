"use client";

import { Provider } from "react-redux";
import { store } from "./";

interface Props {
  children: React.ReactNode;
}

// Se define el provider de Redux aqui en lugar de un componente del lado del servidor
export const Providers = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

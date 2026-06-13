// Función para formatear números como moneda
export const currencyFormat = (value: number) => {
  // Formato de dólares estadounidenses
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // Número de decimales
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

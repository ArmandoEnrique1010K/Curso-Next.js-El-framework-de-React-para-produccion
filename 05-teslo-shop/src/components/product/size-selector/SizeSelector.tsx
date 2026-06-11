import { Size } from "@/interfaces";
import clsx from "clsx";

// Necesita recibir la talla seleccionada y las tallas disponibles
interface Props {
  selectedSize: Size;
  availableSizes: Size[]; // ['XS', 'S', 'M', 'L', 'XL']
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas</h3>
      <div className="flex">
        {/* Itera sobre las tallas */}
        {availableSizes.map((size) => (
          <button
            key={size}
            // Utiliza clsx para aplicar la clase underline solo si la talla es la seleccionada
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

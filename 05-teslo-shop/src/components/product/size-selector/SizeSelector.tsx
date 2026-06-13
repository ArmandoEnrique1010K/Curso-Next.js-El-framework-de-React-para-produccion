import { Size } from "@/interfaces";
import clsx from "clsx";

// Necesita recibir la talla seleccionada y las tallas disponibles
interface Props {
  // Talla seleccionada, puede ser undefined si no hay ninguna seleccionada
  selectedSize?: Size;
  // Tallas disponibles
  availableSizes: Size[]; // ['XS', 'S', 'M', 'L', 'XL']

  // Método para actualizar
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas</h3>
      <div className="flex">
        {/* Itera sobre las tallas */}
        {availableSizes.map((size) => (
          <button
            key={size}
            // Utiliza clsx para aplicar la clase underline solo si la talla es la seleccionada
            className={clsx("mx-2 hover:underline text-lg cursor-pointer", {
              underline: size === selectedSize,
            })}
            // Llama al método onSizeChanged cuando se hace clic en la talla
            onClick={() => onSizeChanged(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

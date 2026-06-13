"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

// Contador para seleccionar la cantidad de un producto
export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  // const [count, setCount] = useState(quantity);

  // El estado de count no sirve, ahora quantity es un prop que se actualiza
  // desde el componente padre
  const onQuantityChangedHandler = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex">
      <button
        className="cursor-pointer"
        onClick={() => onQuantityChangedHandler(-1)}
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span
        className="w-20 mx-3 px-5 bg-gray-200 text-center rounded 
      flex items-center justify-center"
      >
        {quantity}
      </span>

      <button
        className="cursor-pointer"
        onClick={() => onQuantityChangedHandler(1)}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};

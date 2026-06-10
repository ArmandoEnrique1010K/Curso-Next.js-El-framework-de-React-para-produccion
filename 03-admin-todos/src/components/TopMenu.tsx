import { cookies } from "next/headers";
import Link from "next/link";
import {
  CiSearch,
  CiMenuBurger,
  CiChat1,
  CiShoppingBasket,
} from "react-icons/ci";

export const TopMenu = async () => {
  // Como es un server components, tienes acceso a las cookies
  // cookies es una promesa
  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");

  // Calcular el total de items en el carrito
  // const getTotalCount = (): number => {
  //   let items = 0;

  //   // Como el carrito es un objeto, recorremos sus propiedades
  //   Object.values(cart).forEach((value) => {
  //     items += value as number;
  //   });

  //   return items;
  // };

  // Función optimizada para calcular el total
  const getTotalCount = (cart: { [id: string]: number }): number => {
    let items = 0;

    Object.values(cart).forEach((value) => {
      items += value as number;
    });

    return items;
  };

  const totalItems = getTotalCount(cart);

  return (
    <div className="sticky z-10 top-0 h-16 bg-cyan-400 lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 className="text-2xl font-medium lg:block">Dashboard</h5>
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>
        <div className="flex space-x-2">
          {/* <div className="md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <CiSearch />
              </span>
              <input
                type="search"
                name="leadingIcon"
                id="leadingIcon"
                placeholder="Search here"
                className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm bg-white text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
              />
            </div>
          </div> */}

          {/* <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
            <CiSearch size={25} />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
            <CiChat1 size={25} />
          </button> */}

          {/* Botón para ver el carrito de compras */}
          <Link
            href={"/dashboard/cart"}
            className="p-2 flex items-center justify-center h-10 rounded-xl bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
          >
            {/* Cantidad de items */}
            {/* <span className="text-sm mr-2 text-blue-800 font-bold">
              {totalItems}
            </span> */}
            {totalItems > 0 && (
              <span className="text-sm mr-2 text-blue-800 font-bold">
                {totalItems}
              </span>
            )}
            <CiShoppingBasket size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";
import { CiLogout } from "react-icons/ci";

// Lista de items del menú
const menuItems = [
  {
    icon: <IoCalendarOutline size={24} />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline size={24} />,
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline size={24} />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoCodeWorkingOutline size={24} />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoBasketOutline size={24} />,
    title: "Productos",
    path: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline size={24} />,
    title: "Perfil",
    path: "/dashboard/profile",
  },
];

// Barra lateral del menú
export const Sidebar = async () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 w-full flex flex-col justify-between h-screen bg-white border-r-2 border-r-gray-500 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="px-6 py-4 bg-white">
          <Link href="#" title="home">
            {/* Recuerda modificar next.config.ts para permitir el dominio de la imagen */}
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s"
              alt="tailus logo"
              width={200}
              height={200}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src="https://avatars.githubusercontent.com/u/94113125"
            width={150}
            height={150}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
        </div>

        <ul className="space-y-2 tracking-wide mt-8 mx-4">
          {/* Items del menú */}
          {menuItems.map((item) => (
            // Usa el operador spread (...) solamente si todas las propiedades de item son
            // iguales que las props que recibe SidebarItem
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-4 pt-4 flex justify-between items-center border-t-2 border-t-gray-500">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout size={24} />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
        {/* <LogoutButton /> */}
      </div>
    </aside>
  );
};

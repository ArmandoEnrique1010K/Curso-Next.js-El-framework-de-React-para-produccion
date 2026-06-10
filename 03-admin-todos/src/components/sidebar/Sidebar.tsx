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

import { SidebarItem } from "./SidebarItem";
import { CiLogout } from "react-icons/ci";
import { auth } from "@/auth";
import { LogoutButton } from "./LogoutButton";

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
  const session = await auth();

  // No olvides la configuracion en next.config.ts para permitir el dominio de la imagen de github
  const avatarUrl = session?.user?.image
    ? session.user.image
    : "https://avatars.githubusercontent.com/u/94113125";
  const userName = session?.user?.name ?? "Sin nombre";

  // Roles del usuario
  const userRoles = session?.user?.roles ?? ["client"];

  return (
    <aside
      className="ml-[-100%] fixed z-10 top-0 pb-3 w-full flex flex-col justify-between 
    h-screen bg-white border-r-2 border-r-gray-500 transition duration-300 
    md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-y-auto"
    >
      <div className="pb-20">
        <div className="px-6 py-4 bg-white">
          <Link href="#" title="home">
            {/* Recuerda modificar next.config.ts para permitir el dominio de la imagen */}
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s"
              alt="tailus logo"
              width={500}
              height={200}
              // Como la imagen es grande se utiliza la propiedad loading
              loading="eager"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            // src="https://avatars.githubusercontent.com/u/94113125"
            src={avatarUrl}
            width={150}
            height={150}
            alt="Logo de tailus"
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            loading="eager"
          />

          {/* Nombre del usuario */}
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {userRoles.join(", ")}
          </span>
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
        {/* <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout size={24} />
          <span className="group-hover:text-gray-700">Logout</span>
        </button> */}

        {/* Boton para cerrar sesion */}
        <LogoutButton />
      </div>
    </aside>
  );
};

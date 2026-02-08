import Image from "next/image";
import Link from "next/link";
// import { CiLogout } from "react-icons/ci";
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

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const avatarUrl = session?.user?.image
    ? session.user.image
    : "https://avatars.githubusercontent.com/u/94113125?s=200&v=4";

  const userName = session?.user?.name ?? "No Name";
  const userRoles = session?.user?.roles ?? ["client"];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 w-full flex flex-col justify-between h-screen bg-white border-r-2 border-r-gray-500 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="px-6 py-4 bg-white">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="#" title="home">
            {/* Next/Image */}
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
            src={avatarUrl}
            width={150}
            height={150}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles.join(",")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8 mx-4">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-4 pt-4 flex justify-between items-center border-t-2 border-t-gray-500">
        {/* <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout size={24} />
          <span className="group-hover:text-gray-700">Logout</span>
        </button> */}
        <LogoutButton />
      </div>
    </aside>
  );
};

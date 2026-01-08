import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";

const navItems = [
  { path: '/about', text: 'About'},
  { path: '/pricing', text: 'Pricing'},
  { path: '/contact', text: 'Contact'},
]


export default async function Navbar() {
 
  return (
    // La opacidad en tailwind v4 se especifica colocando un / luego 
    // de un color de fondo seguido del nivel de opacidad (0 a 100)
    <nav className="flex bg-blue-800/30 p-2 m-2 rounded-md">
      
      <Link href={'/'} className="flex items-center">
        <HomeIcon size={20} className="mr-2"/>
        <span>Home</span>
      </Link>

      <div className="flex flex-1"></div>

        {
          navItems.map(navItem => (
            <ActiveLink key={navItem.path} {...navItem} />
          ))
        }
    </nav>
  );
}
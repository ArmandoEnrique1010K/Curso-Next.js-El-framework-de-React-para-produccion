import Image from "next/image";
import { IoBrowsersOutline, IoCalculator, IoLogoReact } from "react-icons/io5";
import { SidebarMenuItem } from "./SidebarMenuItem";

// Menú de la barra lateral
const menuItems = [
  {
    path: "/dashboard/main",
    // size especifica el tamaño del icono
    icon: <IoBrowsersOutline size={40} />,
    title: "Dashboard",
    subTitle: "Visualización",
  },
  {
    path: "/dashboard/counter",
    icon: <IoCalculator size={40} />,
    title: "Counter",
    subTitle: "Contador del lado del cliente",
  },
];

// Barra lateral del dashboard
export const Sidebar = () => {
  return (
    <div
      id="menu"
      // Ancho estático
      style={{ width: "400px" }}
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 h-screen overflow-y-scroll"
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
          {/* Obten el icono como un componente de React Icons */}
          <IoLogoReact className="mr-2" />
          <span>Dash</span>
          <span className="text-blue-500">8</span>.
        </h1>
        <p className="text-slate-500 text-sm">
          Manage your actions and activities
        </p>
      </div>
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Welcome back,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            {/* Recuerda que las etiquetas HTML abiertas deben cerrarse */}
            {/* Ejemplo: <img> a <img /> */}
            {/* <img
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt=""
            /> */}

            {/* Se recomienda usar Image de next/image, porque permite personalizar el tamaño de la imagen, optimizarla, etc. */}
            {/* Trabaja por el lado del servidor */}
            {/* https://nextjs.org/docs/app/api-reference/components/image */}

            {/* Requiere las propiedades necesarias: src, width, height y alt */}
            <Image
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              width={50}
              height={50}
              alt="ArmandoEnrique1010k"
              // Esto no es suficiente, necesitamos configurar el dominio en el archivo 'next.config.ts'
              // Evita posibles errores de dominio no permitido
            />

            {/* Al inspeccionar en las herramientas del navegador, en la pestaña 'Elements' veremos que la 
            imagen se ha reducido en tamaño, aunque no es el tamaño que le dimos */}
          </span>
          <span className="text-sm md:text-base font-bold">
            ArmandoEnrique1010k
          </span>
        </a>
      </div>

      {/* Barra de navegación, se tienen los enlaces por cada elemento <a></a> */}

      {/* Usa react icons para los iconos */}
      {/* https://react-icons.github.io/react-icons/ */}
      {/* Ejecuta npm install react-icons */}

      {/* Puedes utilizar un grupo de iconos especificos como Ionicons 5 */}
      {/* https://ionic.io/ionicons */}

      <div id="nav" className="w-full px-6">
        {
          // En lugar de mostrar varios elementos <a></a>, mapeamos el array de menuItems
          menuItems.map((item) => (
            // No olvidar el key para que React pueda identificar cada elemento
            // Y pasar las props restantes con el operador spread
            <SidebarMenuItem key={item.path} {...item} />
          ))
        }
      </div>
    </div>
  );
};

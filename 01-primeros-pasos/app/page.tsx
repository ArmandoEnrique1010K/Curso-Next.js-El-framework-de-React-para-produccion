import Link from "next/link";

// Primera página de la aplicación
export default function Home() {
  return (
    <main className="flex flex-col items-center p-24 gap-2">
      <span className="text-5xl font-bold">Hola Mundo</span>

      {/* Al igual que React, puedes ejectuar código JavaScript dentro de las llaves */}
      {/* {new Date().getTime()} */}

      {/* Un componente server component es un componente que se ejecuta en el servidor, y se le manda al cliente */}
      {/* Si desactivas JS en el navegador, se podra ver el cdigo JavaScript en la vista del usuario (la fecha mencionada)
      porque todos los componentes generados por defecto, todos son server components, generaods del lado del servidor */}

      {/* SOLAMENTE PARA PRUEBAS, desabilita JS desde las herramientas del navegador (pulsa F12), pulsa 
      CTRL + SHIFT + P, escribe "Disable JavaScript" y presiona Enter, luego vuelve a cargar la pagina, para 
      habilitarlo escribe "Enable JavaScript" y pulsa Enter */}

      <Link href={"/about"} className="text-blue-500 hover:underline">
        Acerca de
      </Link>
    </main>
  );
}

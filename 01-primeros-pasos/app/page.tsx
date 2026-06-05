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

      {/* En package.json se pueden ver los scripts que se pueden ejecutar en la terminal */}
      {/* npm run build -> crea una versión optimizada de la aplicación para producción */}
      {/* npm run start -> ejecuta la aplicación en modo producción (requiere que se haya ejecutado npm run build primero) */}

      {/* Al crear la versión optimizada de la aplicación, se crea una carpeta .next que contiene la aplicación optimizada */}
      {/* En la terminal se puede ver que se tienen páginas estáticas, por ejemplo: */}
      {/*
        Route (app)
        ┌ ○ /
        ├ ○ /_not-found
        ├ ○ /about
        ├ ○ /contact
        └ ○ /pricing


        ○  (Static)  prerendered as static content
      */}
      {/* Esto significa que las páginas se generan en tiempo de compilación, no en tiempo de ejecución */}
      {/* Al ejecutar la aplicacion en modo de producción y si te vas a localhost:3000 veras que la página se carga rápidamente
      como si fuera un SPA (Single Page Application), cuando en realidad es contenido generado en el lado del servidor */}

      {/* Recuerda que hace un prefetch al colocar el cursor sobre el enlace debido a una configuración en ActiveLink.tsx */}

      {/* Dentro de la carpeta ".next", en la ruta ".next/server/app" se pueden ver los archivos generados para cada página 
      como páginas HTML estáticas */}
    </main>
  );
}

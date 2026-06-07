// Código fuente obtenido de: https://www.creative-tim.com/twcomponents/component/404-page-not-found
import Link from "next/link";

// Este componente solamente se va a mostrar cuando el usuario intente acceder a un pokemon que no existe
// Porque esta en la carpeta [id] y si el pokemon no existe, Next.js va a buscar este archivo
export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Pokemon no encontrado
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            {/* Recuerda que al ir a '/dashboard', redirecciona a la página que se encuentra en la carpeta main, por lo cual
                  no va a funcionar si intentas ir a '/dashboard' directamente */}
            <Link href="/dashboard/main">Go Home</Link>
          </span>
        </div>
      </button>
    </main>
  );
}

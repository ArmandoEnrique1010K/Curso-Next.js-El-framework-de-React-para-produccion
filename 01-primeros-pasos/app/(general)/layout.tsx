import { Navbar } from "@/components";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Para crear un layout, se necesita crear una carpeta con el nombre del layout
    // y dentro de esa carpeta se coloca el archivo layout.tsx

    // Luego todas las paginas que se encuentren dentro de esa carpeta, heredaran el layout y podran ser accedidos desde
    // container/about --> layout container, pagina about
    // container/contact
    // container/pricing

    // Pero si quieres quitar el nombre de la carpeta del path, debes crear una carpeta cuyo nombre se encunetre en parentesis
    // por ejemplo: (general)/layout.tsx

    // y todas las paginas que se encuentren dentro de esa carpeta, heredaran el layout y podran ser accedidos desde
    // general/about --> layout general, pagina about
    // general/contact
    // general/pricing

    // Cada componente de Next.js debe devolver un unico elemento padre
    <>
      {/* Observa que al importar el componente Navbar, se acorta el path en import */}
      <Navbar />
      <main className="flex flex-col items-center p-24">
        <span className="text-lg">Hola Mundo</span>
        {/* Children es el contenido de la pagina que va a tener el layout */}
        {children}
      </main>
    </>
  );
}

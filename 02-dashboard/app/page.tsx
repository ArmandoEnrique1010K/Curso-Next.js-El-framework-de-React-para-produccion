import { redirect } from "next/navigation";

export default function Home() {
  // Puedes crear un archivo dentro de un directorio si el nombre del archivo es
  // por ejemplo: "dashboard/counter/page.tsx"
  // Crea el archivo contenido en las carpetas "dashboard" y "counter"

  // La función redirect de "next/navigation" redirige a otra página
  // Retorna un 'never', nunca retorna nada y detiene la ejecución del código
  redirect("/dashboard/main");

  // Es similar a un:
  // throw new Error('Error message')

  // Si hay un redirect, el código después de él no se ejecutará
  // Muestra una advertencia 'Unreachable code detected' en el IDE

  // return (
  //   <>
  //     <h1 className="text-3xl font-bold">Dashboard</h1>
  //   </>
  // );
}

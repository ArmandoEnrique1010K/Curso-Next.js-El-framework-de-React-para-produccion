import { redirect } from "next/navigation";

// Página de inicio (redirige al dashboard)
export default function Home() {
  // Lo hace porque al ir a dashboard se ve la pantalla de inicio de sesión
  // Solamente si no ha iniciado sesion
  redirect("/dashboard");

  return (
    <>
      <span className="text-5xl">Hola Mundo</span>
    </>
  );
}

// ACTUALIZAR DEPENDENCIAS CON UN COMANDO
// https://www.npmjs.com/package/npm-check-updates
// Puedes actualizar las dependencias si ejecutas:
// npm install -g npm-check-updates

// -g significa que se instala globalmente (no importa en qué carpeta estés)

// Ahora ve a la carpeta del proyecto y ejecuta:
// ncu
// Esto te mostrará las dependencias que se pueden actualizar

// ncu --upgrade
// Esto actualizará las dependencias

// Ahora ejecuta:
// npm install
// Esto instalará las dependencias actualizadas

//

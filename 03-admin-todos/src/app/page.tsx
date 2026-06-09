import { redirect } from "next/navigation";

// Página de inicio (redirige al dashboard)
export default function Home() {
  redirect("/dashboard");

  return (
    <>
      <span className="text-5xl">Hola Mundo</span>
    </>
  );
}

import { redirect } from "next/navigation";

export default function HomePage() {

  // Redirecciona hacia el main y no hacia el counter
  redirect('/dashboard/main')

  // Código muerto (no se utiliza)
  return (
    <h1> Hola mundo </h1>
  );
}

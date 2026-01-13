import { redirect } from "next/navigation";

export default function HomePage() {

  redirect('/dashboard/counter')

  // Código muerto (no se utiliza)
  return (
    <h1> Hola mundo </h1>
  );
}

import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// Toma los parametros de la ruta y los desestructura
export default async function ({ params }: Props) {
  const { id } = await params;

  if (id === "kids") {
    // Esta función de next/navigation redirige a la página 'not-found.tsx'
    // definida en este mismo directorio
    notFound();
  }

  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}

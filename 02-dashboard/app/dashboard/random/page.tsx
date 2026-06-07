// CASO ESPECIAL DE LOS VALORES ALEATORIOS NO CACHEABLES
// https://nextjs.org/docs/app/getting-started/caching#working-with-non-deterministic-operations
// En el lado del servidor cuando se genera un valor aleatorio y cuando el componente se vuelve a
// renderizar, se genera un valor diferente cada vez, por lo cual no se puede cachear y se tendra
// problemas de hidratación

import { cacheLife } from "next/cache";

// Si te vas a la URL: http://localhost:3000/dashboard/random para mostrar esta página, tendras un
// error:
// Error: Route "/dashboard/random" used `Math.random()` before accessing either uncached data
// (e.g. `fetch()`) or Request data (e.g. `cookies()`, `headers()`, `connection()`, and `searchParams`).
// Accessing random values synchronously in a Server Component requires reading one of these data sources
// first.

// Para acceder a valores aleatorios puedes mover este componente a un Componente del lado del cliente o
// componente cacheable

// Si es un componente del lado del cliente, va a mostrar un error porque los valores que se produjeron
// en el servidor no coinciden con los valores que se produjeron en el cliente
// "use client";

export default async function RandomPage() {
  // Use cache hace que todo el archivo sea cacheable
  // Si vas a usar 'use cache' el componente debe ser asincrono
  "use cache";

  // Y ya no hay error en la consola
  // Pulsa F5 y veras que se mantienen los mismos valores porque se obtuvieron del cache

  // TECNICA DE REVALICACIÓN DE CACHE
  // Pero si se quiere revalidarlo o forzar una nueva generación de valores aleatorios
  // Si trabajas con 'use cache', tienes la función cacheLife de 'next/cache' para revalidar
  // https://nextjs.org/docs/app/api-reference/directives/use-cache#customizing-cache-lifetime

  cacheLife({
    // tiempo para que funcione en cache y que sea considerado obsoleto luego de ese tiempo
    // 5 segundos antes de ser obsoleto
    stale: 5,

    // luego de ese tiempo se va a revalidar, volver a traer la data
    // 10 segundos antes de revalidar
    revalidate: 10,

    // Elimina todo lo que esta en cache luego de ese tiempo
    // 1 dia antes de eliminar
    expire: 86400,
  });

  // Luego de 10 datos se podra ver que se obtuvieron nuevos datos aleatorios

  // Valores aleatorios
  const random = Math.random();
  const now = Date.now();
  const date = new Date();
  const uuid = crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return (
    <div>
      <p>{random}</p>
      <p>{now}</p>
      <p>{date.getTime()}</p>
      <p>{uuid}</p>
      <p>{bytes}</p>
    </div>
  );
}

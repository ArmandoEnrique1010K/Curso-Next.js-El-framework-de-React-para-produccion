import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

// El proxy sirve para mostrar algun requerimiento antes de mostrar una página o pantalla
export async function proxy(request: NextRequest) {
  // Redirecciona si se accede a una ruta que no existe
  // return NextResponse.redirect(new URL("/home", request.url));

  // Si no existe una sesión, redirige al login
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Si existe una sesión, permite el acceso
  return NextResponse.next();
}

// El proxy se aplica para todas las paginas, pero aqui puedes especificar cuales paginas
export const config = {
  // Aplica a todas las paginas bajo /dashboard
  matcher: "/dashboard/:path*",

  // Pruebalo si no hay una sesion activa y te vas a http://localhost:3000/dashboard, te
  // redirigirá a /auth/login

  // El 'matcher' puede ser un arreglo de string para especificar varias rutas
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
};

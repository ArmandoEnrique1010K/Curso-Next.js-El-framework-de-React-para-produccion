import { auth } from "@/auth";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";

// Página del dashboard
export default async function DashboardPage() {
  // En lugar de utilizar getServerSession, utilizamos auth() de next-auth
  const session = await auth();

  // Validacion de sesion
  if (!session) {
    // Recuerda que redirect devuelve un never
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/*
          EL USUARIO AUTENTICADO
          Desde el lado del servidor o del lado del cliente, puedes acceder a la información del usuario autenticado
          Si quieres proteger rutas debes hacerlo del lado del servidor
          Si colocas la protección en el layout.tsx, todos los componentes hijos heredaran esa protección
      */}
      <WidgetItem title="Usuario conectado Server-Side">
        {/* <div className="flex flex-col">
          <span>Usuario conectado S-Side</span>
        </div> */}

        {/* Obtenemos la información del usuario autenticado: nombre e imagen de perfil */}
        <div className="text-xs whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </div>

        {/* En el caso de borrar todas las cookies y recargas el navegador web, la sesión se pierde */}

        {/* Puedes extraer el email si accedes a session.user.email */}
        <div className="flex flex-col whitespace-pre-wrap break-all">
          <span>{session.user?.name}</span>
          <span>{session.user?.email ?? "Sin email"}</span>

          {/* Solamente si haz creado una GitHub App en lugar de una OAuth App en GitHub */}
          {/* Si el email es null, y quieres mostrar el email del usuario que ha iniciado sesion */}
          {/* Debes hacer una configuracion en github con respecto a los permisos de la aplicación */}
          {/* 1. Ve a tu cuenta de GitHub, haz clic en tu perfil y selecciona Settings > Developer Settings > OAuth Apps.
              2. Selecciona tu aplicación (la que vinculaste a tu proyecto).
              3. Busca la sección de permisos Account Permissions.
              4. Cambia la opción Email addresses a Read-only y guarda los cambios. */}
          <span>{session.user?.image ?? "Sin imagen"}</span>
        </div>
      </WidgetItem>
    </div>
  );
}

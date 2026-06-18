import { auth } from "@/auth.config";
import { Title } from "@/components";
import { PrincipalUser } from "@/components/auth/PrincipalUser";
import { ProfileUser } from "@/components/profile/ProfileUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProfilePage() {
  // Recuerda que no puedes usar auth() en un server component si cacheComponents esta
  // habilitado

  //   const session = await auth();

  //   if (!session?.user) {
  //     // redirect('/auth/login?returnTo=/perfil');
  //     redirect("/");
  //   }

  return (
    <div>
      <Title title="Perfil" />

      {/* Muestra los datos del perfil del usuario */}
      <Suspense fallback={<div>Cargando...</div>}>
        <ProfileUser />
      </Suspense>
      {/* <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h3 className="text-3xl mb-10">{session.user.role}</h3> */}
    </div>
  );
}

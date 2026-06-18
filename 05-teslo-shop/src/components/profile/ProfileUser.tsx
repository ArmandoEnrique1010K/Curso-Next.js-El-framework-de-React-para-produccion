import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

// Datos del perfil del usuario
export const ProfileUser = async () => {
  const session = await auth();

  // Si no hay un usuario autenticado, redirige al login
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect("/");
  }

  return (
    <>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <h3 className="text-3xl mb-10">{session.user.role}</h3>
    </>
  );
};

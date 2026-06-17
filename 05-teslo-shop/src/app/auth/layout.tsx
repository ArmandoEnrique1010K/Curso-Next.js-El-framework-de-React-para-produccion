import { auth } from "@/auth.config";
import { PrincipalUser } from "@/components/auth/PrincipalUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // if (session?.user) {
  //   redirect("/");
  // }

  return (
    <main className="flex justify-center">
      <Suspense fallback={<div>Cargando...</div>}>
        <PrincipalUser />
      </Suspense>
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
}

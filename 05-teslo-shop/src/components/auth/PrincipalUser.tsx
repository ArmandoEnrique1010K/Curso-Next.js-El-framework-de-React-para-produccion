import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const PrincipalUser = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return null;
};

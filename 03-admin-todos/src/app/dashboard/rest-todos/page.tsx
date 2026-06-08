export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer();
  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  return (
    <>
      <span className="flex mb-4 text-3xl">Rest TODOS</span>
      <div className="w-full mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  );
}

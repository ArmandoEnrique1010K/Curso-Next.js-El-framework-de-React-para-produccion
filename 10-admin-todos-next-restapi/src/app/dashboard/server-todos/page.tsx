export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();
  if ( !user ) redirect('/api/auth/signin');
  
  const todos = await prisma.todo.findMany({ 
    where: { userId: user.id },
    orderBy: { description: 'asc' } 
  });
  // console.log('construido')
  // fetch('....', { next: { revalidate: 60 } })

  return (
    <>
      <span className="flex mb-4 text-3xl">Server Action</span>
      <div className="w-full  mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  );
}
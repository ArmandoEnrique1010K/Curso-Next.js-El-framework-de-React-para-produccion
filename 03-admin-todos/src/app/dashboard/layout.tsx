// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar, TopMenu } from "@/components";

// Layout de la página de dashboard/server-todos
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />

        <div className="px-6 pt-12 bg-white p-2 m-2 pb-5 rounded">
          {children}
        </div>
      </div>
    </>
  );
}

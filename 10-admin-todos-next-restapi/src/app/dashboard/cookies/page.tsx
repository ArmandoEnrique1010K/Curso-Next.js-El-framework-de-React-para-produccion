import { cookies } from "next/headers";

import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies Page",
  description: "SEO Title",
};

export default async function CookiesPage() {
  const cookieStore = await cookies();
  const cookieTab = cookieStore.get("selectedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4">
      <div className="flex flex-col">
        <h1 className="flex mb-4 text-3xl">Tabs</h1>
        <TabBar currentTab={+cookieTab} />
      </div>
    </div>
  );
}

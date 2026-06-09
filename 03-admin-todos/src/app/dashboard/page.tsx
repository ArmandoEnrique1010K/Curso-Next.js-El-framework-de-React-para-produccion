import { WidgetItem } from "@/components";

// Página del dashboard
export default async function DashboardPage() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col">
          <span>Usuario conectado S-Side</span>
        </div>
      </WidgetItem>
    </div>
  );
}

import { Sidebar } from "@/components/dashbord/Sidebar";
import { TopNavbar } from "@/components/dashbord/TopNavbar";
import { RoleProvider } from "@/context/RoleContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Navbar */}
          <TopNavbar />

          {/* Page Content */}
          <main className="flex-1 overflow-auto bg-slate-50/50 p-6">
            {children}
          </main>
        </div>
      </div>
    </RoleProvider>
  );
}
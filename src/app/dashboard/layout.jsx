import { getUserSession } from "@/lib/core/session";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }) {
    const user = await getUserSession();

    return (
        <div
            className="flex min-h-screen"
            style={{ backgroundColor: "#0A1A0F" }}
        >
            <DashboardSidebar user={user} />
            <div className="flex-1 p-6 lg:p-8">{children}</div>
        </div>
    );
}
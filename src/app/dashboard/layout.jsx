import { getUserSession } from "@/lib/core/session";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }) {
    const user = await getUserSession();

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "#0A1A0F" }}>
            <DashboardSidebar user={user} />
            {/* lg:pt-0 — desktop এ top padding নেই, mobile এ আছে (top bar এর জন্য) */}
            <div className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
                {children}
            </div>
        </div>
    );
}
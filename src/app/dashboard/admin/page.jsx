import { requireRole } from "@/lib/core/session";
import AdminStats from "./AdminStats";

export default async function AdminDashboardPage() {
    const user = await requireRole("admin");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`,
        { cache: "no-store" }
    );
    const stats = await res.json();

    return (
        <div className="space-y-8">

            {/* Welcome */}
            <div>
                <h2
                    className="text-2xl font-bold"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#F0FDF4",
                    }}
                >
                    Welcome back, {user?.name}
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    Here&apos;s an overview of the platform.
                </p>
            </div>

            <AdminStats stats={stats} />
        </div>
    );
}
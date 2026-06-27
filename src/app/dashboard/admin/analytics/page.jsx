import { requireRole } from "@/lib/core/session";
import AdminStats from "../AdminStats";

export default async function AdminAnalyticsPage() {
    await requireRole("admin");

    let stats = {};
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`,
            { cache: "no-store" }
        );
        if (res.ok) stats = await res.json();
    } catch {
        stats = {};
    }

    return (
        <div className="space-y-8">
            <div>
                <h2
                    className="text-2xl font-bold"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#F0FDF4",
                    }}
                >
                    Analytics
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    Platform performance overview
                </p>
            </div>
            <AdminStats stats={stats} />
        </div>
    );
}
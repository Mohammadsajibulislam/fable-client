import { requireRole } from "@/lib/core/session";
import AdminUsersTable from "./AdminUsersTable";

export default async function AdminUsersPage() {
    const user = await requireRole("admin");

    return (
        <div className="space-y-6">
            <div>
                <h2
                    className="text-2xl font-bold"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#F0FDF4",
                    }}
                >
                    Manage Users
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    View and manage all platform users
                </p>
            </div>
            <AdminUsersTable />
        </div>
    );
}
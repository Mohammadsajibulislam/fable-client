import { requireRole } from "@/lib/core/session";
import AdminEbooksTable from "./AdminEbooksTable";

export default async function AdminEbooksPage() {
    await requireRole("admin");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks`,
        { cache: "no-store" }
    );
    const { ebooks } = await res.json();

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
                    Manage All Ebooks
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    {ebooks?.length || 0} total ebooks
                </p>
            </div>
            <AdminEbooksTable ebooks={ebooks || []} />
        </div>
    );
}
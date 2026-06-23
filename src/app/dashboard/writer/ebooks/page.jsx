import { requireRole } from "@/lib/core/session";
import WriterEbooksTable from "./WriterEbooksTable";

export default async function WriterEbooksPage() {
    const user = await requireRole("writer");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/my/ebooks?writerId=${user.id}`,
        { cache: "no-store" }
    );
    const ebooks = await res.json();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2
                        className="text-2xl font-bold"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#F0FDF4",
                        }}
                    >
                        Manage Ebooks
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                        {ebooks?.length || 0} ebooks in your library
                    </p>
                </div>
                <a
                    href="/dashboard/writer/add-ebook"
                    className="px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                >
                    + Add Ebook
                </a>
            </div>

            <WriterEbooksTable ebooks={ebooks || []} />
        </div>
    );
}
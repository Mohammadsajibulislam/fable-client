import { requireRole } from "@/lib/core/session";
import EditEbookForm from "./EditEbookForm";

export default async function EditEbookPage({ params }) {
    await requireRole("writer");
    const { id } = await params;

    let ebook = null;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${id}`,
            { cache: "no-store" }
        );
        if (res.ok) ebook = await res.json();
    } catch {
        ebook = null;
    }

    if (!ebook) {
        return (
            <div className="text-center py-20">
                <p style={{ color: "#6B9E7A" }}>Ebook not found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}
                >
                    Edit Ebook
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    Update your ebook details
                </p>
            </div>
            <EditEbookForm ebook={ebook} />
        </div>
    );
}
import { requireRole } from "@/lib/core/session";
import AddEbookForm from "./AddEbookForm";

export default async function AddEbookPage() {
    const user = await requireRole("writer");
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
                    Add New Ebook
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    Fill in the details to publish your ebook
                </p>
            </div>
            <AddEbookForm writer={user} />
        </div>
    );
}
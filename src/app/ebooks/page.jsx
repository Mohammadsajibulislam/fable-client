import EbookListingContainer from "@/components/ebooks/EbookListingContainer";
import { getEbooks } from "@/lib/api/ebooks";

export default async function BrowseEbooksPage({ searchParams }) {
    const filters = await searchParams;
    const queryString = new URLSearchParams(filters).toString();

    let ebooks = [];
    let total = 0;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks?${queryString}`,
            { cache: "no-store" }
        );
        if (res.ok) {
            const data = await res.json();
            ebooks = data.ebooks || [];
            total = data.total || 0;
        }
    } catch {
        ebooks = [];
        total = 0;
    }

    return (
        <div style={{ backgroundColor: "#0A1A0F", minHeight: "100vh" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "#22C55E" }}
                    >
                        Library
                    </p>
                    <h1
                        className="text-4xl font-bold"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#F0FDF4",
                        }}
                    >
                        Browse Ebooks
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: "#6B9E7A" }}>
                        Discover your next favourite read
                    </p>
                </div>

                <EbookListingContainer
                    initialEbooks={ebooks}
                    total={total}
                    filters={filters}
                />
            </div>
        </div>
    );
}
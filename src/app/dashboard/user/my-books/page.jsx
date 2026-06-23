import { requireRole } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";
import Link from "next/link";

export default async function MyBooksPage() {
    const user = await requireRole("user");
    const purchases = await protectedFetch(
        `/api/purchases?userId=${user.id}`
    );

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
                    My Books
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    Your purchased ebooks
                </p>
            </div>

            {purchases?.length === 0 ? (
                <div
                    className="rounded-2xl p-12 text-center"
                    style={{
                        backgroundColor: "#111F16",
                        border: "1px solid #1E3A26",
                    }}
                >
                    <p className="text-sm mb-4" style={{ color: "#6B9E7A" }}>
                        No books yet.
                    </p>
                    <Link
                        href="/ebooks"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                    >
                        Browse Ebooks
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {purchases?.map((p) => (
                        <Link
                            key={p._id}
                            href={`/ebooks/${p.ebookId}`}
                            className="group block"
                        >
                            <div
                                className="rounded-xl overflow-hidden aspect-[2/3] mb-3"
                                style={{ border: "1px solid #1E3A26" }}
                            >
                                {p.coverImage ? (
                                    <img
                                        src={p.coverImage}
                                        alt={p.ebookTitle}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center"
                                        style={{ backgroundColor: "#111F16" }}
                                    >
                                        <span style={{ color: "#1E3A26" }}>
                                            No cover
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h3
                                className="text-sm font-semibold line-clamp-1"
                                style={{ color: "#F0FDF4" }}
                            >
                                {p.ebookTitle || "Ebook"}
                            </h3>
                            <p className="text-xs mt-0.5" style={{ color: "#6B9E7A" }}>
                                ${p.amount}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
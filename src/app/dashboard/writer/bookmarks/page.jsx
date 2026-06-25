import { requireRole } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";
import Link from "next/link";
import { MdBookmark } from "react-icons/md";

export default async function WriterBookmarksPage() {
    const user = await requireRole("writer");

    let bookmarks = [];
    try {
        bookmarks = await protectedFetch(
            `/api/bookmarks?userId=${user.id}`
        ) || [];
    } catch {
        bookmarks = [];
    }

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
                    Bookmarks
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    {bookmarks?.length || 0} saved ebooks
                </p>
            </div>

            {bookmarks?.length === 0 ? (
                <div
                    className="rounded-2xl p-12 text-center"
                    style={{
                        backgroundColor: "#111F16",
                        border: "1px solid #1E3A26",
                    }}
                >
                    <MdBookmark
                        size={40}
                        className="mx-auto mb-3"
                        style={{ color: "#1E3A26" }}
                    />
                    <p className="text-sm mb-4" style={{ color: "#6B9E7A" }}>
                        No bookmarks yet.
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
                    {bookmarks?.map((b) => (
                        <Link
                            key={b._id}
                            href={`/ebooks/${b.ebookId}`}
                            className="group block"
                        >
                            <div
                                className="rounded-xl overflow-hidden aspect-[2/3] mb-3"
                                style={{ border: "1px solid #1E3A26" }}
                            >
                                {b.coverImage ? (
                                    <img
                                        src={b.coverImage}
                                        alt={b.ebookTitle}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center"
                                        style={{ backgroundColor: "#111F16" }}
                                    >
                                        <MdBookmark size={24} style={{ color: "#1E3A26" }} />
                                    </div>
                                )}
                            </div>
                            <h3
                                className="text-sm font-semibold line-clamp-1"
                                style={{ color: "#F0FDF4" }}
                            >
                                {b.ebookTitle || "Ebook"}
                            </h3>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
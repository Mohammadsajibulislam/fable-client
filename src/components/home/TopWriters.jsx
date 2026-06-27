import Link from "next/link";
import { ArrowRight, BookOpen, TrendingUp } from "lucide-react";

const PLACEHOLDER_WRITERS = [
    {
        _id: "1",
        name: "Mohammad Sajibul Islam", 
        books: 32,
        totalSales: "12.5K",
        avatar: "https://i.ibb.co.com/67qbgSx8/Whats-App-Image-2026-06-07-at-11-52-07-AM.jpg", 
    },
    {
        _id: "2",
        name: "Stephen King", 
        books: 65,
        totalSales: "15.8K",
        avatar: "https://i.pravatar.cc/150?img=12", 
    },
    {
        _id: "3",
        name: "Brandon Sanderson", 
        books: 24,
        totalSales: "8.5K",
        avatar: "https://i.pravatar.cc/150?img=14", 
    },
];

const AVATAR_COLORS = ["#22C55E", "#16A34A", "#15803D"];

export default async function TopWriters() {
    let writers = [];

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/top`,
            { cache: "no-store" }
        );
        writers = await res.json();
    } catch {
        writers = [];
    }

    const displayWriters =
        writers.length > 0 ? writers : PLACEHOLDER_WRITERS;

    return (
        <section
            className="py-20 px-6 lg:px-8"
            style={{ backgroundColor: "#060F09" }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p
                            className="text-xs font-semibold uppercase tracking-widest mb-2"
                            style={{ color: "#22C55E" }}
                        >
                            Community
                        </p>
                        <h2
                            className="text-3xl font-bold"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "#F0FDF4",
                            }}
                        >
                            Top Writers
                        </h2>
                    </div>
                    <Link
                        href="/ebooks"
                        className="hidden sm:flex items-center gap-1.5 text-sm font-medium"
                        style={{ color: "#22C55E" }}
                    >
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Writers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {displayWriters.map((writer, i) => (
                        <div
                            key={writer._id}
                            className="rounded-2xl p-6 flex items-center gap-4 transition-all duration-200"
                            style={{
                                backgroundColor: "#111F16",
                                border: "1px solid #1E3A26",
                            }}
                        >
                            {/* Avatar */}
<div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
    {writer.avatar ? (
        <img
            src={writer.avatar}
            alt={writer.name || writer.writerName}
            className="w-full h-full object-cover"
        />
    ) : (
        <div
            className="w-full h-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: AVATAR_COLORS[i] || "#22C55E", color: "#0A1A0F" }}
        >
            {(writer.name || writer.writerName)?.[0]}
        </div>
    )}
</div>
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3
                                    className="font-semibold text-base truncate"
                                    style={{ color: "#F0FDF4" }}
                                >
                                    {writer.writerName || writer.name}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center gap-1">
                                        <BookOpen
                                            size={12}
                                            style={{ color: "#6B9E7A" }}
                                        />
                                        <span
                                            className="text-xs"
                                            style={{ color: "#6B9E7A" }}
                                        >
                                            {writer.books || 0} Books
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp
                                            size={12}
                                            style={{ color: "#22C55E" }}
                                        />
                                        <span
                                            className="text-xs"
                                            style={{ color: "#22C55E" }}
                                        >
                                            {writer.totalSales || 0} Sales
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
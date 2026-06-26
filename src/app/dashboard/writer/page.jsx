import { requireRole } from "@/lib/core/session";
import { MdOutlineMenuBook } from "react-icons/md";
import { BsBarChart } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi";
import Link from "next/link";
import { YAxis } from "recharts";

export default async function WriterDashboardPage() {
    const user = await requireRole("writer");

    // Real data fetch
    let ebooks = [];
    let sales = [];

    try {
        const ebooksRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/my/ebooks?writerId=${user.id}`,
            { cache: "no-store" }
        );
        if (ebooksRes.ok) ebooks = await ebooksRes.json() || [];
    } catch {
        ebooks = [];
    }

    try {
        const salesRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchases?writerId=${user.id}`,
            { cache: "no-store" }
        );
        if (salesRes.ok) sales = await salesRes.json() || [];
    } catch {
        sales = [];
    }

    const totalBooks     = ebooks.length;
    const published      = ebooks.filter(e => e.status === "published").length;
    const totalSales     = sales.length;
    const totalEarnings  = sales.reduce((sum, s) => sum + (s.amount || 0), 0);

    const stats = [
        {
            icon: MdOutlineMenuBook,
            label: "Total Books",
            value: totalBooks.toString(),
            color: "#22C55E",
        },
        {
            icon: BsBarChart,
            label: "Published",
            value: published.toString(),
            color: "#3B82F6",
        },
        {
            icon: HiOutlineUsers,
            label: "Total Sales",
            value: totalSales.toString(),
            color: "#F59E0B",
        },
        {
            icon: RiMoneyDollarCircleLine,
            label: "Total Earnings",
            value: `$${totalEarnings.toFixed(2)}`,
            color: "#8B5CF6",
        },
    ];

    return (
        <div className="space-y-8">

            {/* Welcome */}
            <div>
                <h2
                    className="text-2xl font-bold"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#F0FDF4",
                    }}
                >
                    Welcome back, {user?.name}
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    Manage your ebooks and track your sales.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl p-5"
                        style={{
                            backgroundColor: "#111F16",
                            border: "1px solid #1E3A26",
                        }}
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                            style={{
                                backgroundColor: `${stat.color}22`,
                                color: stat.color,
                            }}
                        >
                            <stat.icon size={20} />
                        </div>
                        <p className="text-2xl font-bold" style={{ color: "#F0FDF4" }}>
                            {stat.value}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "#6B9E7A" }}>
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* My Ebooks */}
            <div
                className="rounded-2xl p-6"
                style={{
                    backgroundColor: "#111F16",
                    border: "1px solid #1E3A26",
                }}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold" style={{ color: "#F0FDF4" }}>
                        My Ebooks
                    </h3>
                    <Link
                        href="/dashboard/writer/add-ebook"
                        className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                        style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                    >
                        + Add Ebook
                    </Link>
                </div>

                {ebooks.length === 0 ? (
                    <div className="text-center py-10">
                        <MdOutlineMenuBook
                            size={40}
                            className="mx-auto mb-3"
                            style={{ color: "#1E3A26" }}
                        />
                        <p className="text-sm" style={{ color: "#6B9E7A" }}>
                            No ebooks yet. Start publishing your first ebook.
                        </p>
                        <Link
                            href="/dashboard/writer/add-ebook"
                            className="inline-block mt-4 px-5 py-2 rounded-xl text-sm font-semibold"
                            style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                        >
                            Add First Ebook
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {ebooks.slice(0, 4).map((ebook) => (
                            <Link
                                key={ebook._id}
                                href={`/ebooks/${ebook._id}`}
                                className="group block"
                            >
                                <div
                                    className="rounded-xl overflow-hidden aspect-[2/3] mb-2"
                                    style={{ border: "1px solid #1E3A26" }}
                                >
                                    {ebook.coverImage ? (
                                        <img
                                            src={ebook.coverImage}
                                            alt={ebook.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center"
                                            style={{ backgroundColor: "#0A1A0F" }}
                                        >
                                            <MdOutlineMenuBook size={24} style={{ color: "#1E3A26" }} />
                                        </div>
                                    )}
                                </div>
                                <p
                                    className="text-xs font-semibold line-clamp-1"
                                    style={{ color: "#F0FDF4" }}
                                >
                                    {ebook.title}
                                </p>
                                <p
                                    className="text-xs mt-0.5"
                                    style={{ color: "#22C55E" }}
                                >
                                    ${ebook.price}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
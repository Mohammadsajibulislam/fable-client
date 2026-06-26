/* eslint-disable @next/next/no-html-link-for-pages */
import { requireRole } from "@/lib/core/session";
import { MdOutlineMenuBook, MdBookmark, MdPayment } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default async function UserDashboardPage() {
    const user = await requireRole("user");

    const stats = [
        {
            icon: MdOutlineMenuBook,
            label: "Books Purchased",
            value: "12",
            color: "#22C55E",
        },
        {
            icon: MdOutlineMenuBook,
            label: "Books in Library",
            value: "8",
            color: "#3B82F6",
        },
        {
            icon: MdBookmark,
            label: "Bookmarks",
            value: "5",
            color: "#F59E0B",
        },
        {
            icon: RiMoneyDollarCircleLine,
            label: "Total Spent",
            value: "$89.75",
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
                    Here&apos;s what&apos;s happening with your reading journey.
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
                        <p
                            className="text-2xl font-bold"
                            style={{ color: "#F0FDF4" }}
                        >
                            {stat.value}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "#6B9E7A" }}>
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Purchases */}
            <div
                className="rounded-2xl p-6"
                style={{
                    backgroundColor: "#111F16",
                    border: "1px solid #1E3A26",
                }}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3
                        className="font-semibold"
                        style={{ color: "#F0FDF4" }}
                    >
                        Recent Purchases
                    </h3>
                    <a
                        href="/dashboard/user/purchases"
                        className="text-xs"
                        style={{ color: "#22C55E" }}
                    >
                        View all
                    </a>
                </div>

                {/* Empty State */}
                <div className="text-center py-10">
                    <MdOutlineMenuBook
                        size={40}
                        className="mx-auto mb-3"
                        style={{ color: "#1E3A26" }}
                    />
                    <p className="text-sm" style={{ color: "#6B9E7A" }}>
                        No purchases yet. Browse ebooks to get started.
                    </p>
                    <a
                        href="/ebooks"
                        className="inline-block mt-4 px-5 py-2 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                    >
                        Browse Ebooks
                    </a>
                </div>
            </div>
        </div>
    );
}
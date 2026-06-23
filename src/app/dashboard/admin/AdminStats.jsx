"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie,
    Cell, Legend
} from "recharts";
import { MdOutlineMenuBook, MdPeople, MdPayment } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const COLORS = ["#22C55E", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminStats({ stats }) {
    const statCards = [
        {
            icon: MdPeople,
            label: "Total Users",
            value: stats?.totalUsers || "2,542",
            color: "#22C55E",
        },
        {
            icon: MdPeople,
            label: "Writers",
            value: stats?.totalWriters || "312",
            color: "#3B82F6",
        },
        {
            icon: MdOutlineMenuBook,
            label: "Ebooks",
            value: stats?.totalEbooks || "1,256",
            color: "#F59E0B",
        },
        {
            icon: RiMoneyDollarCircleLine,
            label: "Total Revenue",
            value: `$${stats?.totalRevenue?.toLocaleString() || "78,950"}`,
            color: "#8B5CF6",
        },
    ];

    const monthlySalesData = (stats?.monthlySales || []).map((item) => ({
        month: MONTHS[(item._id || 1) - 1],
        sales: item.sales || 0,
    }));

    const genreData = (stats?.ebooksByGenre || []).map((item) => ({
        name: item.genre,
        value: item.count,
    }));

    return (
        <div className="space-y-6">

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
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

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Monthly Sales Bar Chart */}
                <div
                    className="rounded-2xl p-6"
                    style={{
                        backgroundColor: "#111F16",
                        border: "1px solid #1E3A26",
                    }}
                >
                    <h3
                        className="font-semibold mb-5"
                        style={{ color: "#F0FDF4" }}
                    >
                        Monthly Sales
                    </h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={monthlySalesData.length ? monthlySalesData : [
                            { month: "Jan", sales: 400 },
                            { month: "Feb", sales: 800 },
                            { month: "Mar", sales: 600 },
                            { month: "Apr", sales: 1200 },
                            { month: "May", sales: 900 },
                            { month: "Jun", sales: 1500 },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A26" />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: "#6B9E7A", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#6B9E7A", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0A1A0F",
                                    border: "1px solid #1E3A26",
                                    borderRadius: "12px",
                                    color: "#F0FDF4",
                                }}
                            />
                            <Bar
                                dataKey="sales"
                                fill="#22C55E"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Ebooks by Genre Pie Chart */}
                <div
                    className="rounded-2xl p-6"
                    style={{
                        backgroundColor: "#111F16",
                        border: "1px solid #1E3A26",
                    }}
                >
                    <h3
                        className="font-semibold mb-5"
                        style={{ color: "#F0FDF4" }}
                    >
                        Ebooks by Genre
                    </h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={genreData.length ? genreData : [
                                    { name: "Fiction", value: 35 },
                                    { name: "Romance", value: 20 },
                                    { name: "Mystery", value: 15 },
                                    { name: "Sci-Fi", value: 10 },
                                    { name: "Fantasy", value: 12 },
                                    { name: "Others", value: 8 },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {(genreData.length
                                    ? genreData
                                    : [1, 2, 3, 4, 5, 6]
                                ).map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0A1A0F",
                                    border: "1px solid #1E3A26",
                                    borderRadius: "12px",
                                    color: "#F0FDF4",
                                }}
                            />
                            <Legend
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{
                                    color: "#6B9E7A",
                                    fontSize: "12px",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
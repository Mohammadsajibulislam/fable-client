import { requireRole } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";

export default async function SalesHistoryPage() {
    const user = await requireRole("writer");
    const sales = await protectedFetch(
        `/api/purchases?writerId=${user.id}`
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
                    Sales History
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    {sales?.length || 0} total sales
                </p>
            </div>

            <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #1E3A26" }}
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ backgroundColor: "#0A1A0F" }}>
                            {["Ebook Title", "Buyer", "Amount", "Date"].map(
                                (h) => (
                                    <th
                                        key={h}
                                        className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                                        style={{ color: "#6B9E7A" }}
                                    >
                                        {h}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {sales?.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-5 py-12 text-center text-sm"
                                    style={{ color: "#6B9E7A" }}
                                >
                                    No sales yet.
                                </td>
                            </tr>
                        ) : (
                            sales?.map((s, i) => (
                                <tr
                                    key={s._id}
                                    className="border-t"
                                    style={{
                                        borderColor: "#1E3A26",
                                        backgroundColor:
                                            i % 2 === 0 ? "#111F16" : "#0D1A11",
                                    }}
                                >
                                    <td
                                        className="px-5 py-4 font-medium"
                                        style={{ color: "#F0FDF4" }}
                                    >
                                        {s.ebookTitle || "Ebook"}
                                    </td>
                                    <td
                                        className="px-5 py-4"
                                        style={{ color: "#6B9E7A" }}
                                    >
                                        {s.userName}
                                    </td>
                                    <td
                                        className="px-5 py-4 font-semibold"
                                        style={{ color: "#22C55E" }}
                                    >
                                        ${s.amount}
                                    </td>
                                    <td
                                        className="px-5 py-4"
                                        style={{ color: "#6B9E7A" }}
                                    >
                                        {new Date(s.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
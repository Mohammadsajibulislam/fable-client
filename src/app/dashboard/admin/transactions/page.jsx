import { requireRole } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";

export default async function AdminTransactionsPage() {
    await requireRole("admin");

    let transactions = [];
    try {
        transactions = await protectedFetch("/api/transactions") || [];
    } catch {
        transactions = [];
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
                    All Transactions
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    {transactions?.length || 0} total transactions
                </p>
            </div>

            <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #1E3A26" }}
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ backgroundColor: "#0A1A0F" }}>
                            {["Transaction ID", "Type", "User", "Amount", "Date", "Status"].map((h) => (
                                <th
                                    key={h}
                                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: "#6B9E7A" }}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {!transactions || transactions.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-5 py-12 text-center text-sm"
                                    style={{ color: "#6B9E7A" }}
                                >
                                    No transactions yet.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((t, i) => (
                                <tr
                                    key={t._id}
                                    className="border-t"
                                    style={{
                                        borderColor: "#1E3A26",
                                        backgroundColor: i % 2 === 0 ? "#111F16" : "#0D1A11",
                                    }}
                                >
                                    <td className="px-5 py-4 font-mono text-xs" style={{ color: "#6B9E7A" }}>
                                        {t.stripeSessionId?.slice(0, 16)}...
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                                            style={{
                                                backgroundColor: "rgba(34,197,94,0.1)",
                                                color: "#22C55E",
                                            }}
                                        >
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4" style={{ color: "#6B9E7A" }}>
                                        {t.userEmail}
                                    </td>
                                    <td className="px-5 py-4 font-semibold" style={{ color: "#22C55E" }}>
                                        ${t.amount}
                                    </td>
                                    <td className="px-5 py-4" style={{ color: "#6B9E7A" }}>
                                        {new Date(t.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                backgroundColor: "rgba(34,197,94,0.1)",
                                                color: "#22C55E",
                                            }}
                                        >
                                            {t.status}
                                        </span>
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
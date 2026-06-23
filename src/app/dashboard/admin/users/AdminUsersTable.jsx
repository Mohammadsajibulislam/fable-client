"use client";

import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

export default function AdminUsersTable() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
            .then((r) => r.json())
            .then((data) => {
                setUsers(data || []);
                setIsLoading(false);
            });
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            }
        );
        if (res.ok) {
            setUsers((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, role: newRole } : u
                )
            );
        }
    };

    const handleDelete = async (userId) => {
        if (!confirm("Delete this user?")) return;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
            { method: "DELETE" }
        );
        if (res.ok) {
            setUsers((prev) => prev.filter((u) => u._id !== userId));
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-14 rounded-xl animate-pulse"
                        style={{ backgroundColor: "#111F16" }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #1E3A26" }}
        >
            <table className="w-full text-sm">
                <thead>
                    <tr style={{ backgroundColor: "#0A1A0F" }}>
                        {["Name", "Email", "Role", "Actions"].map((h) => (
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
                    {users.map((u, i) => (
                        <tr
                            key={u._id}
                            className="border-t"
                            style={{
                                borderColor: "#1E3A26",
                                backgroundColor:
                                    i % 2 === 0 ? "#111F16" : "#0D1A11",
                            }}
                        >
                            {/* Name */}
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                        style={{
                                            backgroundColor: "#22C55E",
                                            color: "#0A1A0F",
                                        }}
                                    >
                                        {u.name?.[0]?.toUpperCase()}
                                    </div>
                                    <span style={{ color: "#F0FDF4" }}>
                                        {u.name}
                                    </span>
                                </div>
                            </td>

                            {/* Email */}
                            <td
                                className="px-5 py-4"
                                style={{ color: "#6B9E7A" }}
                            >
                                {u.email}
                            </td>

                            {/* Role */}
                            <td className="px-5 py-4">
                                <select
                                    value={u.role || "user"}
                                    onChange={(e) =>
                                        handleRoleChange(u._id, e.target.value)
                                    }
                                    className="text-xs rounded-lg px-2.5 py-1.5 outline-none"
                                    style={{
                                        backgroundColor: "#0A1A0F",
                                        border: "1px solid #1E3A26",
                                        color: "#22C55E",
                                    }}
                                >
                                    <option value="user">User</option>
                                    <option value="writer">Writer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4">
                                <button
                                    onClick={() => handleDelete(u._id)}
                                    className="p-1.5 rounded-lg"
                                    style={{ color: "#FCA5A5" }}
                                >
                                    <MdDelete size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
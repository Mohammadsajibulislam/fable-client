"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

export default function AdminEbooksTable({ ebooks: initialEbooks }) {
    const [ebooks, setEbooks] = useState(initialEbooks);

    const handleToggle = async (id, status) => {
        const newStatus = status === "published" ? "unpublished" : "published";
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${id}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            }
        );
        if (res.ok) {
            setEbooks((prev) =>
                prev.map((e) =>
                    e._id === id ? { ...e, status: newStatus } : e
                )
            );
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this ebook?")) return;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${id}`,
            { method: "DELETE" }
        );
        if (res.ok) {
            setEbooks((prev) => prev.filter((e) => e._id !== id));
        }
    };

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #1E3A26" }}
        >
            <table className="w-full text-sm">
                <thead>
                    <tr style={{ backgroundColor: "#0A1A0F" }}>
                        {["Title", "Writer", "Price", "Status", "Actions"].map(
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
                    {ebooks.map((ebook, i) => (
                        <tr
                            key={ebook._id}
                            className="border-t"
                            style={{
                                borderColor: "#1E3A26",
                                backgroundColor:
                                    i % 2 === 0 ? "#111F16" : "#0D1A11",
                            }}
                        >
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    {ebook.coverImage && (
                                        <img
                                            src={ebook.coverImage}
                                            alt={ebook.title}
                                            className="w-8 h-10 rounded object-cover"
                                        />
                                    )}
                                    <span style={{ color: "#F0FDF4" }}>
                                        {ebook.title}
                                    </span>
                                </div>
                            </td>
                            <td
                                className="px-5 py-4"
                                style={{ color: "#6B9E7A" }}
                            >
                                {ebook.writerName}
                            </td>
                            <td
                                className="px-5 py-4 font-semibold"
                                style={{ color: "#22C55E" }}
                            >
                                ${ebook.price}
                            </td>
                            <td className="px-5 py-4">
                                <span
                                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor:
                                            ebook.status === "published"
                                                ? "rgba(34,197,94,0.1)"
                                                : "rgba(107,158,122,0.1)",
                                        color:
                                            ebook.status === "published"
                                                ? "#22C55E"
                                                : "#6B9E7A",
                                    }}
                                >
                                    {ebook.status}
                                </span>
                            </td>
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            handleToggle(ebook._id, ebook.status)
                                        }
                                        style={{
                                            color:
                                                ebook.status === "published"
                                                    ? "#22C55E"
                                                    : "#6B9E7A",
                                        }}
                                    >
                                        {ebook.status === "published" ? (
                                            <BsToggleOn size={20} />
                                        ) : (
                                            <BsToggleOff size={20} />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ebook._id)}
                                        style={{ color: "#FCA5A5" }}
                                    >
                                        <MdDelete size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
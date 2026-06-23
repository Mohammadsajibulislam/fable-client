"use client";

import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

export default function WriterEbooksTable({ ebooks }) {
    const [ebookList, setEbookList] = useState(ebooks);

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus =
            currentStatus === "published" ? "unpublished" : "published";

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${id}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            }
        );

        if (res.ok) {
            setEbookList((prev) =>
                prev.map((e) =>
                    e._id === id ? { ...e, status: newStatus } : e
                )
            );
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this ebook?")) return;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${id}`,
            { method: "DELETE" }
        );

        if (res.ok) {
            setEbookList((prev) => prev.filter((e) => e._id !== id));
        }
    };

    if (ebookList.length === 0) {
        return (
            <div
                className="rounded-2xl p-12 text-center"
                style={{
                    backgroundColor: "#111F16",
                    border: "1px solid #1E3A26",
                }}
            >
                <p className="text-sm" style={{ color: "#6B9E7A" }}>
                    No ebooks found.
                </p>
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
                        {[
                            "Book Title",
                            "Price",
                            "Status",
                            "Sales",
                            "Actions",
                        ].map((h) => (
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
                    {ebookList.map((ebook, i) => (
                        <tr
                            key={ebook._id}
                            className="border-t transition-colors"
                            style={{
                                borderColor: "#1E3A26",
                                backgroundColor:
                                    i % 2 === 0 ? "#111F16" : "#0D1A11",
                            }}
                        >
                            {/* Title */}
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    {ebook.coverImage && (
                                        <img
                                            src={ebook.coverImage}
                                            alt={ebook.title}
                                            className="w-8 h-10 rounded object-cover"
                                        />
                                    )}
                                    <span
                                        className="font-medium"
                                        style={{ color: "#F0FDF4" }}
                                    >
                                        {ebook.title}
                                    </span>
                                </div>
                            </td>

                            {/* Price */}
                            <td
                                className="px-5 py-4 font-semibold"
                                style={{ color: "#22C55E" }}
                            >
                                ${ebook.price}
                            </td>

                            {/* Status */}
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

                            {/* Sales */}
                            <td
                                className="px-5 py-4"
                                style={{ color: "#86EFAC" }}
                            >
                                {ebook.sales || 0}
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                    {/* Toggle */}
                                    <button
                                        onClick={() =>
                                            handleToggleStatus(
                                                ebook._id,
                                                ebook.status
                                            )
                                        }
                                        className="p-1.5 rounded-lg transition-all"
                                        style={{
                                            color:
                                                ebook.status === "published"
                                                    ? "#22C55E"
                                                    : "#6B9E7A",
                                        }}
                                        title="Toggle publish"
                                    >
                                        {ebook.status === "published" ? (
                                            <BsToggleOn size={20} />
                                        ) : (
                                            <BsToggleOff size={20} />
                                        )}
                                    </button>

                                    {/* Edit */}
                                 <a  
                                        href={`/dashboard/writer/ebooks/${ebook._id}/edit`}
                                        className="p-1.5 rounded-lg transition-all"
                                        style={{ color: "#3B82F6" }}
                                        title="Edit"
                                    >
                                        <MdEdit size={18} />
                                    </a>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(ebook._id)}
                                        className="p-1.5 rounded-lg transition-all"
                                        style={{ color: "#FCA5A5" }}
                                        title="Delete"
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
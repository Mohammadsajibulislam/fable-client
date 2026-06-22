"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { MdSell } from "react-icons/md";

export default function EbookCard({ ebook, viewMode = "grid", index = 0 }) {
    const ebookId = ebook._id?.toString();

    if (viewMode === "list") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
            >
                <Link
                    href={`/ebooks/${ebookId}`}
                    className="flex items-center gap-5 rounded-2xl p-4 transition-all"
                    style={{
                        backgroundColor: "#111F16",
                        border: "1px solid #1E3A26",
                    }}
                >
                    {/* Cover */}
                    <div
                        className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0"
                        style={{ border: "1px solid #1E3A26" }}
                    >
                        <img
                            src={ebook.coverImage}
                            alt={ebook.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h3
                            className="font-semibold text-sm truncate"
                            style={{ color: "#F0FDF4" }}
                        >
                            {ebook.title}
                        </h3>
                        <p className="text-xs mt-0.5" style={{ color: "#6B9E7A" }}>
                            {ebook.writerName}
                        </p>
                        <span
                            className="inline-block text-xs px-2 py-0.5 rounded-full mt-1.5"
                            style={{
                                backgroundColor: "rgba(34,197,94,0.1)",
                                color: "#86EFAC",
                            }}
                        >
                            {ebook.genre}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <p
                            className="font-bold text-base"
                            style={{ color: "#22C55E" }}
                        >
                            ${ebook.price}
                        </p>
                        {ebook.isSold && (
                            <span className="text-xs" style={{ color: "#FCA5A5" }}>
                                Sold
                            </span>
                        )}
                    </div>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
        >
            <Link href={`/ebooks/${ebookId}`} className="group block">

                {/* Cover */}
                <div
                    className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3"
                    style={{ border: "1px solid #1E3A26" }}
                >
                    <img
                        src={ebook.coverImage}
                        alt={ebook.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Sold Badge */}
                    {ebook.isSold && (
                        <div
                            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                                backgroundColor: "rgba(220,38,38,0.85)",
                                color: "#fff",
                            }}
                        >
                            <MdSell size={12} />
                            Sold
                        </div>
                    )}

                    {/* Genre Badge */}
                    <div
                        className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: "rgba(10,26,15,0.85)",
                            color: "#86EFAC",
                        }}
                    >
                        {ebook.genre}
                    </div>
                </div>

                {/* Info */}
                <h3
                    className="text-sm font-semibold leading-tight mb-0.5 line-clamp-1"
                    style={{ color: "#F0FDF4" }}
                >
                    {ebook.title}
                </h3>
                <p className="text-xs mb-2" style={{ color: "#6B9E7A" }}>
                    {ebook.writerName}
                </p>
                <p
                    className="text-sm font-bold"
                    style={{ color: "#22C55E" }}
                >
                    ${ebook.price}
                </p>
            </Link>
        </motion.div>
    );
}
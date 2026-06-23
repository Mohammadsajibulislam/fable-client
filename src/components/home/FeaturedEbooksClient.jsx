"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AiFillStar } from "react-icons/ai";
import { MdSell } from "react-icons/md";

const PLACEHOLDER_BOOKS = [
    {
        _id: "1",
        title: "The Midnight Library",
        writerName: "Matt Haig",
        price: 9.99,
        genre: "Fiction",
        coverImage: "https://covers.openlibrary.org/b/id/12547191-L.jpg",
    },
    {
        _id: "2",
        title: "Atomic Habits",
        writerName: "James Clear",
        price: 8.99,
        genre: "Self-Help",
        coverImage: "https://covers.openlibrary.org/b/id/10527843-L.jpg",
    },
    {
        _id: "3",
        title: "The Silent Patient",
        writerName: "Alex Michaelides",
        price: 7.99,
        genre: "Mystery",
        coverImage: "https://covers.openlibrary.org/b/id/10469870-L.jpg",
    },
    {
        _id: "4",
        title: "It Ends with Us",
        writerName: "Colleen Hoover",
        price: 6.99,
        genre: "Romance",
        coverImage: "https://covers.openlibrary.org/b/id/10984578-L.jpg",
    },
    {
        _id: "5",
        title: "Dune",
        writerName: "Frank Herbert",
        price: 8.99,
        genre: "Sci-Fi",
        coverImage: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    },
    {
        _id: "6",
        title: "The Alchemist",
        writerName: "Paulo Coelho",
        price: 5.99,
        genre: "Fiction",
        coverImage: "https://covers.openlibrary.org/b/id/8908189-L.jpg",
    },
];

export default function FeaturedEbooksClient({ ebooks }) {
    const displayBooks = ebooks.length > 0 ? ebooks : PLACEHOLDER_BOOKS;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayBooks.map((book, i) => (
                <motion.div
                    key={book._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                >
                    <Link
                        href={`/ebooks/${book._id}`}
                        className="group block"
                    >
                        {/* Cover */}
                        <div
                            className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3"
                            style={{ border: "1px solid #1E3A26" }}
                        >
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Sold Badge */}
                            {book.isSold && (
                                <div
                                    className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: "rgba(220,38,38,0.85)",
                                        color: "#fff",
                                    }}
                                >
                                    <MdSell size={11} />
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
                                {book.genre}
                            </div>
                        </div>

                        {/* Info */}
                        <h3
                            className="text-sm font-semibold leading-tight mb-0.5 line-clamp-1"
                            style={{ color: "#F0FDF4" }}
                        >
                            {book.title}
                        </h3>
                        <p
                            className="text-xs mb-1.5"
                            style={{ color: "#6B9E7A" }}
                        >
                            {book.writerName}
                        </p>
                        <p
                            className="text-sm font-bold"
                            style={{ color: "#22C55E" }}
                        >
                            ${book.price}
                        </p>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
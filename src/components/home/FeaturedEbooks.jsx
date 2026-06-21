"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

// Placeholder cards — পরে API থেকে আসবে
const PLACEHOLDER_BOOKS = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", price: "$9.99", rating: 4.8, genre: "Fiction", cover: "https://covers.openlibrary.org/b/id/12547191-L.jpg" },
  { id: 2, title: "Atomic Habits",        author: "James Clear", price: "$8.99", rating: 4.7, genre: "Self-Help", cover: "https://covers.openlibrary.org/b/id/10527843-L.jpg" },
  { id: 3, title: "The Silent Patient",   author: "Alex Michaelides", price: "$7.99", rating: 4.6, genre: "Mystery", cover: "https://covers.openlibrary.org/b/id/10469870-L.jpg" },
  { id: 4, title: "It Ends with Us",      author: "Colleen Hoover", price: "$6.99", rating: 4.7, genre: "Romance", cover: "https://covers.openlibrary.org/b/id/10984578-L.jpg" },
  { id: 5, title: "Dune",                 author: "Frank Herbert", price: "$8.99", rating: 4.8, genre: "Sci-Fi", cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
  { id: 6, title: "The Alchemist",        author: "Paulo Coelho", price: "$5.99", rating: 4.6, genre: "Fiction", cover: "https://covers.openlibrary.org/b/id/8908189-L.jpg" },
];

export default function FeaturedEbooks() {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#22C55E" }}>
              Handpicked for you
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}
            >
              Featured Ebooks
            </h2>
          </div>
          <Link
            href="/ebooks"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "#22C55E" }}
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PLACEHOLDER_BOOKS.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link href={`/ebooks/${book.id}`} className="group block">

                {/* Cover */}
                <div
                  className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3"
                  style={{ border: "1px solid #1E3A26" }}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Genre Badge */}
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "rgba(10,26,15,0.85)", color: "#86EFAC" }}
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
                <p className="text-xs mb-1.5" style={{ color: "#6B9E7A" }}>{book.author}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: "#22C55E" }}>
                    {book.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={11} fill="#FBBF24" color="#FBBF24" />
                    <span className="text-xs" style={{ color: "#6B9E7A" }}>{book.rating}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
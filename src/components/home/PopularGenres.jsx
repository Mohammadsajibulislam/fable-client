"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, Heart, Rocket, Sparkles, Skull, Zap, Leaf } from "lucide-react";

const GENRES = [
  { name: "Fiction",   Icon: BookOpen, color: "#7C3AED" },
  { name: "Mystery",   Icon: Search,   color: "#DC2626" },
  { name: "Romance",   Icon: Heart,    color: "#EC4899" },
  { name: "Sci-Fi",    Icon: Rocket,   color: "#2563EB" },
  { name: "Fantasy",   Icon: Sparkles, color: "#D97706" },
  { name: "Horror",    Icon: Skull,    color: "#6B7280" },
  { name: "Thriller",  Icon: Zap,      color: "#059669" },
  { name: "Self-Help", Icon: Leaf,     color: "#22C55E" },
];

export default function PopularGenres() {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#22C55E" }}>
              Explore
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}
            >
              Popular Genres
            </h2>
          </div>
          <Link
            href="/ebooks"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "#22C55E" }}
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {GENRES.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={`/ebooks?genre=${genre.name.toLowerCase()}`}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200"
                style={{ backgroundColor: "#111F16", border: "1px solid #1E3A26" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = genre.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1E3A26"}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${genre.color}22`, color: genre.color }}
                >
                  <genre.Icon size={22} />
                </div>
                <span className="text-xs font-medium text-center" style={{ color: "#F0FDF4" }}>
                  {genre.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "motion/react";
import { BookOpen, Users, PenLine, ShoppingBag } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "10K+", label: "Ebooks Available" },
  { icon: Users,    value: "5K+",  label: "Happy Readers" },
  { icon: PenLine,  value: "2K+",  label: "Talented Writers" },
  { icon: ShoppingBag, value: "50K+", label: "Books Sold" },
];

export default function StatsBar() {
  return (
    <section
      className="border-y"
      style={{ backgroundColor: "#060F09", borderColor: "#1E3A26" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22C55E" }}
              >
                <stat.icon size={20} />
              </div>
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "#6B9E7A" }}>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
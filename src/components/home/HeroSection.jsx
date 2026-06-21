"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.png"
          alt="Fable Hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient Overlay — left side dark, right side সামান্য দেখা যাবে */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,26,15,0.97) 40%, rgba(10,26,15,0.75) 70%, rgba(10,26,15,0.4) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{
              backgroundColor: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#86EFAC",
            }}
          >
            <Star size={12} fill="#86EFAC" />
            WELCOME TO FABLE
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}
          >
            Discover &amp; Read{" "}
            <span style={{ color: "#22C55E" }}>Original</span>{" "}
            Ebooks
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed mb-10"
            style={{ color: "#6B9E7A" }}
          >
            A digital platform for book lovers and talented writers.
            Discover stories that inspire you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
            >
              Browse Ebooks
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200"
              style={{
                border: "1px solid #1E3A26",
                color: "#86EFAC",
                backgroundColor: "transparent",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#22C55E"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1E3A26"}
            >
              Start Writing
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
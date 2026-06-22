"use client";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function Footer() {
  const quickLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  const forWriters = [
    { label: "Write & Earn", href: "/write" },
    { label: "Writer Guidelines", href: "/guidelines" },
    { label: "Publishing Fees", href: "/pricing" },
    { label: "Help Center", href: "/help" },
  ];

  const genres = [
    "Fiction", "Mystery", "Romance",
    "Sci-Fi", "Fantasy", "Self-Help",
  ];

  const socials = [
    { Icon: FaFacebook,  href: "#" },
    { Icon: FaTwitter,   href: "#" },
    { Icon: FaInstagram, href: "#" },
    { Icon: FaLinkedin,  href: "#" },
  ];

  return (
    <footer
      className="border-t mt-auto"
      style={{ backgroundColor: "#060F09", borderColor: "#1E3A26" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* TOP GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8">
                <Image src="/logo1.png" alt="Fable" fill className="object-contain" />
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}
              >
                Fable
              </span>
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: "#6B9E7A" }}>
              Discover, read and share amazing ebooks from talented writers around the world.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: "#111F16",
                    color: "#6B9E7A",
                    border: "1px solid #1E3A26",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = "#22C55E";
                    e.currentTarget.style.color = "#0A1A0F";
                    e.currentTarget.style.borderColor = "#22C55E";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = "#111F16";
                    e.currentTarget.style.color = "#6B9E7A";
                    e.currentTarget.style.borderColor = "#1E3A26";
                  }}
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#22C55E" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "#6B9E7A" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Writers */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#22C55E" }}
            >
              For Writers
            </h3>
            <ul className="space-y-3">
              {forWriters.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "#6B9E7A" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#22C55E" }}
            >
              Newsletter
            </h3>
            <p className="text-sm mb-4" style={{ color: "#6B9E7A" }}>
              Subscribe to get updates about new ebooks and offers.
            </p>

            <div
              className="flex items-center gap-2 rounded-xl p-1 pl-3"
              style={{ backgroundColor: "#111F16", border: "1px solid #1E3A26" }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "#F0FDF4" }}
              />
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
              >
                <IoSend size={14} />
              </button>
            </div>

            {/* Genre Tags */}
            <div className="mt-6">
              <p className="text-xs font-medium mb-3" style={{ color: "#6B9E7A" }}>
                Popular Genres
              </p>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <Link
                    key={g}
                    href={`/ebooks?genre=${g.toLowerCase()}`}
                    className="text-xs px-2.5 py-1 rounded-full transition-all hover:border-green-500"
                    style={{
                      backgroundColor: "#111F16",
                      color: "#6B9E7A",
                      border: "1px solid #1E3A26",
                    }}
                  >
                    {g}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t text-sm"
          style={{ borderColor: "#1E3A26", color: "#6B9E7A" }}
        >
          <p>© 2026 Fable. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
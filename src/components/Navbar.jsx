"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import { Menu, X, BookOpen, LayoutDashboard, LogOut, User } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Ebooks", href: "/ebooks" },
    ...(user ? [{ label: "Dashboard", href: `/dashboard/${user.role || "user"}` }] : []),
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(10, 26, 15, 0.92)",
        borderColor: "#1E3A26",
      }}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image src="/logo.png" alt="Fable Logo" fill className="object-contain" />
          </div>
          <span
            className="text-xl font-bold tracking-wide"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F0FDF4",
            }}
          >
            Fable
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">

          {/* Nav Links */}
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{ color: "#6B9E7A" }}
                  onMouseEnter={e => {
                    e.target.style.color = "#F0FDF4";
                    e.target.style.backgroundColor = "#1E3A26";
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = "#6B9E7A";
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="h-6 w-px" style={{ backgroundColor: "#1E3A26" }} />

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                >
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm" style={{ color: "#86EFAC" }}>
                  {user.name?.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{ color: "#6B9E7A", border: "1px solid #1E3A26" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#22C55E"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1E3A26"}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/signin"
                className="text-sm font-medium transition-colors"
                style={{ color: "#86EFAC" }}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                onMouseEnter={e => e.target.style.backgroundColor = "#16A34A"}
                onMouseLeave={e => e.target.style.backgroundColor = "#22C55E"}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg transition"
          style={{ color: "#86EFAC" }}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "#0A1A0F", borderColor: "#1E3A26" }}
        >
          <div className="px-4 py-5 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium transition"
                style={{ color: "#86EFAC" }}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t" style={{ borderColor: "#1E3A26" }}>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm"
                  style={{ color: "#6B9E7A" }}
                >
                  Sign Out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-center"
                    style={{ color: "#86EFAC", border: "1px solid #1E3A26" }}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-center"
                    style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
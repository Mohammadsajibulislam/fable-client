"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;
    const pathname = usePathname();

    const handleSignOut = async () => {
        await signOut();
        setIsMenuOpen(false);
    };

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Browse Ebooks", href: "/ebooks" },
        ...(user ? [{ label: "Dashboard", href: `/dashboard/${user.role || "user"}` }] : []),
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

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
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-9 h-9 flex-shrink-0">
                        <Image src="/logo1.png" alt="Fable Logo" fill className="object-contain" />
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
                    <ul className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                                    style={{
                                        color: isActive(link.href) ? "#22C55E" : "#6B9E7A",
                                        backgroundColor: isActive(link.href)
                                            ? "rgba(34,197,94,0.1)"
                                            : "transparent",
                                        borderBottom: isActive(link.href)
                                            ? "2px solid #22C55E"
                                            : "2px solid transparent",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="h-6 w-px" style={{ backgroundColor: "#1E3A26" }} />

                    {/* Auth Section */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            {/* User Avatar + Name + Email */}
                            <Link
                                href={`/dashboard/${user.role || "user"}/profile`}
                                className="flex items-center gap-2.5 group"
                            >
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                                    style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                                >
                                    {user.name?.[0]?.toUpperCase()}
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p
                                        className="text-xs font-semibold leading-none"
                                        style={{ color: "#F0FDF4" }}
                                    >
                                        {user.name?.split(" ")[0]}
                                    </p>
                                    <p
                                        className="text-xs leading-none mt-1"
                                        style={{ color: "#6B9E7A" }}
                                    >
                                        {user.email}
                                    </p>
                                </div>
                            </Link>

                            {/* Sign Out */}
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                                style={{ color: "#6B9E7A", border: "1px solid #1E3A26" }}
                            >
                                <LogOut size={14} /> Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/auth/signin"
                                className="text-sm font-medium"
                                style={{
                                    color: isActive("/auth/signin") ? "#22C55E" : "#86EFAC",
                                }}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                                style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                {/* MOBILE HAMBURGER */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg"
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

                        {/* Mobile Nav Links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-medium"
                                style={{
                                    color: isActive(link.href) ? "#22C55E" : "#86EFAC",
                                    backgroundColor: isActive(link.href)
                                        ? "rgba(34,197,94,0.1)"
                                        : "transparent",
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div
                            className="pt-3 border-t"
                            style={{ borderColor: "#1E3A26" }}
                        >
                            {user ? (
                                <div className="space-y-3">
                                    {/* Mobile User Info */}
                                    <Link
                                        href={`/dashboard/${user.role || "user"}/profile`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                                        style={{ backgroundColor: "rgba(34,197,94,0.05)" }}
                                    >
                                        <div
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                                            style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                                        >
                                            {user.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div>
                                            <p
                                                className="text-sm font-semibold"
                                                style={{ color: "#F0FDF4" }}
                                            >
                                                {user.name}
                                            </p>
                                            <p
                                                className="text-xs"
                                                style={{ color: "#6B9E7A" }}
                                            >
                                                {user.email}
                                            </p>
                                        </div>
                                    </Link>

                                    {/* Sign Out */}
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                                        style={{ color: "#6B9E7A" }}
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href="/auth/signin"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-4 py-2.5 rounded-xl text-sm font-medium text-center"
                                        style={{
                                            color: "#86EFAC",
                                            border: "1px solid #1E3A26",
                                        }}
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
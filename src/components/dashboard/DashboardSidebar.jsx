/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import {
    MdDashboard, MdOutlineMenuBook, MdBookmark,
    MdSettings, MdLogout, MdPeople, MdPayment, MdMenu, MdClose,
} from "react-icons/md";
import { BsBarChart, BsPlusCircle } from "react-icons/bs";
import { RiHistoryLine } from "react-icons/ri";

export default function DashboardSidebar({ user }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const userNavLinks = [
        { icon: MdDashboard,       href: "/dashboard/user",              label: "Dashboard" },
        { icon: MdOutlineMenuBook, href: "/dashboard/user/purchases",    label: "Purchase History" },
        { icon: MdOutlineMenuBook, href: "/dashboard/user/my-books",     label: "My Books" },
        { icon: MdBookmark,        href: "/dashboard/user/bookmarks",    label: "Bookmarks" },
        { icon: MdSettings,        href: "/dashboard/user/profile",      label: "Profile" },
    ];

    const writerNavLinks = [
        { icon: MdDashboard,       href: "/dashboard/writer",            label: "Dashboard" },
        { icon: MdOutlineMenuBook, href: "/dashboard/writer/ebooks",     label: "My Ebooks" },
        { icon: BsPlusCircle,      href: "/dashboard/writer/add-ebook",  label: "Add Ebook" },
        { icon: RiHistoryLine,     href: "/dashboard/writer/sales",      label: "Sales History" },
        { icon: MdBookmark,        href: "/dashboard/writer/bookmarks",  label: "Bookmarks" },
        { icon: MdSettings,        href: "/dashboard/writer/profile",    label: "Profile" },
    ];

    const adminNavLinks = [
        { icon: MdDashboard,       href: "/dashboard/admin",             label: "Dashboard" },
        { icon: MdPeople,          href: "/dashboard/admin/users",       label: "Users" },
        { icon: MdOutlineMenuBook, href: "/dashboard/admin/ebooks",      label: "Ebooks" },
        { icon: MdPayment,         href: "/dashboard/admin/transactions",label: "Transactions" },
        { icon: BsBarChart,        href: "/dashboard/admin/analytics",   label: "Analytics" },
        { icon: MdSettings,        href: "/dashboard/admin/settings",    label: "Settings" },
    ];

    const navMap = {
        user: userNavLinks,
        writer: writerNavLinks,
        admin: adminNavLinks,
    };

    const navItems = navMap[user?.role || "user"];

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: "#1E3A26" }}>
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8">
                        <Image src="/logo1.png" alt="Fable" fill className="object-contain" />
                    </div>
                    <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}>
                        Fable
                    </span>
                </Link>
                {/* Mobile close button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden p-1"
                    style={{ color: "#6B9E7A" }}
                >
                    <MdClose size={22} />
                </button>
            </div>

            {/* User Info */}
            <div className="px-5 py-4 border-b" style={{ borderColor: "#1E3A26" }}>
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                    >
                        {user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "#F0FDF4" }}>
                            {user?.name}
                        </p>
                        <p className="text-xs capitalize" style={{ color: "#22C55E" }}>
                            {user?.role}
                        </p>
                    </div>
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems?.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                            style={{
                                backgroundColor: isActive ? "rgba(34,197,94,0.12)" : "transparent",
                                color: isActive ? "#22C55E" : "#6B9E7A",
                                borderLeft: isActive ? "3px solid #22C55E" : "3px solid transparent",
                            }}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Sign Out */}
            <div className="px-3 py-4 border-t" style={{ borderColor: "#1E3A26" }}>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all"
                    style={{ color: "#6B9E7A" }}
                >
                    <MdLogout size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Top Bar */}
            <div
                className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b"
                style={{ backgroundColor: "#060F09", borderColor: "#1E3A26" }}
            >
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-7 h-7">
                        <Image src="/logo1.png" alt="Fable" fill className="object-contain" />
                    </div>
                    <span className="text-base font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}>
                        Fable
                    </span>
                </Link>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 rounded-lg"
                    style={{ color: "#86EFAC" }}
                >
                    <MdMenu size={22} />
                </button>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 flex"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="w-72 h-full flex flex-col"
                        style={{ backgroundColor: "#060F09" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SidebarContent />
                    </div>
                    <div className="flex-1 bg-black/50" />
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside
                className="hidden lg:flex flex-col w-64 min-h-screen border-r"
                style={{ backgroundColor: "#060F09", borderColor: "#1E3A26" }}
            >
                <SidebarContent />
            </aside>
        </>
    );
}
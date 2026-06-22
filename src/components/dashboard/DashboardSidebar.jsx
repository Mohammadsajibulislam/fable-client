"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
    MdDashboard, MdOutlineMenuBook, MdBookmark,
    MdSettings, MdLogout, MdPeople, MdPayment,
} from "react-icons/md";
import { BsBarChart, BsPlusCircle } from "react-icons/bs";
import { RiHistoryLine } from "react-icons/ri";

export default function DashboardSidebar({ user }) {
    const pathname = usePathname();
    const router = useRouter();

    const userNavLinks = [
        { icon: MdDashboard,      href: "/dashboard/user",              label: "Dashboard" },
        { icon: MdOutlineMenuBook,href: "/dashboard/user/purchases",    label: "Purchase History" },
        { icon: MdOutlineMenuBook,href: "/dashboard/user/my-books",     label: "My Books" },
        { icon: MdBookmark,       href: "/dashboard/user/bookmarks",    label: "Bookmarks" },
        { icon: MdSettings,       href: "/dashboard/user/profile",      label: "Profile" },
    ];

    const writerNavLinks = [
        { icon: MdDashboard,      href: "/dashboard/writer",            label: "Dashboard" },
        { icon: MdOutlineMenuBook,href: "/dashboard/writer/ebooks",     label: "My Ebooks" },
        { icon: BsPlusCircle,     href: "/dashboard/writer/add-ebook",  label: "Add Ebook" },
        { icon: RiHistoryLine,    href: "/dashboard/writer/sales",      label: "Sales History" },
        { icon: MdBookmark,       href: "/dashboard/writer/bookmarks",  label: "Bookmarks" },
        { icon: MdSettings,       href: "/dashboard/writer/profile",    label: "Profile" },
    ];

    const adminNavLinks = [
        { icon: MdDashboard,      href: "/dashboard/admin",             label: "Dashboard" },
        { icon: MdPeople,         href: "/dashboard/admin/users",       label: "Users" },
        { icon: MdOutlineMenuBook,href: "/dashboard/admin/ebooks",      label: "Ebooks" },
        { icon: MdPayment,        href: "/dashboard/admin/transactions",label: "Transactions" },
        { icon: BsBarChart,       href: "/dashboard/admin/analytics",   label: "Analytics" },
        { icon: MdSettings,       href: "/dashboard/admin/settings",    label: "Settings" },
    ];

    const navMap = {
        user:   userNavLinks,
        writer: writerNavLinks,
        admin:  adminNavLinks,
    };

    const navItems = navMap[user?.role || "user"];

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <aside
            className="hidden lg:flex flex-col w-64 min-h-screen border-r"
            style={{
                backgroundColor: "#060F09",
                borderColor: "#1E3A26",
            }}
        >
            {/* Logo */}
            <div
                className="flex items-center gap-2.5 px-5 py-5 border-b"
                style={{ borderColor: "#1E3A26" }}
            >
                <div className="relative w-8 h-8">
                    <Image src="/logo.png" alt="Fable" fill className="object-contain" />
                </div>
                <span
                    className="text-lg font-bold"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#F0FDF4",
                    }}
                >
                    Fable
                </span>
            </div>

            {/* User Info */}
            <div
                className="px-5 py-4 border-b"
                style={{ borderColor: "#1E3A26" }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                    >
                        {user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p
                            className="text-sm font-semibold truncate"
                            style={{ color: "#F0FDF4" }}
                        >
                            {user?.name}
                        </p>
                        <p
                            className="text-xs capitalize"
                            style={{ color: "#22C55E" }}
                        >
                            {user?.role}
                        </p>
                    </div>
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems?.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                            style={{
                                backgroundColor: isActive
                                    ? "rgba(34,197,94,0.12)"
                                    : "transparent",
                                color: isActive ? "#22C55E" : "#6B9E7A",
                                borderLeft: isActive
                                    ? "3px solid #22C55E"
                                    : "3px solid transparent",
                            }}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Sign Out */}
            <div
                className="px-3 py-4 border-t"
                style={{ borderColor: "#1E3A26" }}
            >
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all"
                    style={{ color: "#6B9E7A" }}
                >
                    <MdLogout size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
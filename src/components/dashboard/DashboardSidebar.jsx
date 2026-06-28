/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
    MdDashboard, MdOutlineMenuBook, MdBookmark,
    MdSettings, MdLogout, MdPeople, MdPayment, MdMenu, MdClose,
} from "react-icons/md";
import { BsBarChart, BsPlusCircle } from "react-icons/bs";
import { RiHistoryLine } from "react-icons/ri";

export default function DashboardSidebar({ user }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchActive, setTouchActive] = useState(false);

    const openSidebar = () => {
        setIsSidebarVisible(true);
        setTimeout(() => setIsSidebarActive(true), 10);
    };

    const closeSidebar = () => {
        setIsSidebarActive(false);
        setTimeout(() => setIsSidebarVisible(false), 250);
    };

    useEffect(() => {
        if (typeof window === "undefined") return;
        let lastScrollY = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            if (Math.abs(currentScrollY - lastScrollY) < 20) return;
            setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
            lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
        };

        const handleTouchStart = (event) => {
            if (window.innerWidth >= 1280) return;
            const startX = event.touches?.[0]?.clientX;
            if (startX === undefined) return;
            if (startX < 40) {
                setTouchStartX(startX);
                setTouchActive(true);
            }
        };

        const handleTouchMove = (event) => {
            if (!touchActive || touchStartX === null) return;
            const currentX = event.touches?.[0]?.clientX;
            if (currentX === undefined) return;
            if (currentX - touchStartX > 60) {
                openSidebar();
                setTouchActive(false);
                setTouchStartX(null);
            }
        };

        const handleTouchEnd = () => {
            setTouchActive(false);
            setTouchStartX(null);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("touchcancel", handleTouchEnd);
        };
    }, [touchActive, touchStartX]);

    const showHamburger = scrollDirection === "up" || isSidebarActive;

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
                    onClick={closeSidebar}
                    className="xl:hidden p-2 rounded-full hover:bg-white/5"
                    title="Close menu"
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
                            onClick={closeSidebar}
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
            <button
                onClick={openSidebar}
                className="xl:hidden fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full py-3 px-4 border border-[#1E3A26] bg-[#0A1A0F]/95 text-[#86EFAC] shadow-lg"
                style={{
                    transform: showHamburger ? "translateY(0)" : "translateY(140%)",
                    transition: "transform 0.3s ease-out",
                }}
                aria-label="Open dashboard menu"
                title="Open menu"
            >
                <MdMenu size={22} />
                <span className="text-sm font-semibold">Menu</span>
            </button>

            {/* Mobile Overlay */}
            {isSidebarVisible && (
                <div
                    className="xl:hidden fixed inset-0 z-50 flex justify-end"
                    onClick={closeSidebar}
                >
                    <div
                        className={`w-72 h-full flex flex-col transform bg-[#060F09] transition-transform duration-300 ease-out ${isSidebarActive ? "translate-x-0" : "translate-x-full"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SidebarContent />
                    </div>
                    <div className="flex-1 bg-black/60" />
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
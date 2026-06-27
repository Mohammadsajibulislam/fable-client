"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { BsBookmark, BsBookmarkFill, BsShare } from "react-icons/bs";
import { MdVerified, MdCheckCircle } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";
import { BiCalendar, BiWorld } from "react-icons/bi";
import { RiPagesLine } from "react-icons/ri";

// Simple Toast Component
function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium"
            style={{
                backgroundColor: type === "success" ? "rgba(34,197,94,0.15)" : "rgba(220,38,38,0.15)",
                border: `1px solid ${type === "success" ? "#22C55E" : "#DC2626"}`,
                color: type === "success" ? "#86EFAC" : "#FCA5A5",
            }}
        >
            <MdCheckCircle size={18} style={{ color: type === "success" ? "#22C55E" : "#DC2626" }} />
            {message}
        </div>
    );
}

export default function EbookDetailsClient({ ebook }) {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkId, setBookmarkId] = useState(null);
    const [activeTab, setActiveTab] = useState("description");
    const [toast, setToast] = useState(null);

    const isOwnBook = user?.id === ebook.writerId;

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
        });
    };

    const getToken = async () => {
        const s = await authClient.getSession();
        return s?.data?.session?.token || "";
    };

    // Page load এ bookmark check করো
    useEffect(() => {
        const checkBookmark = async () => {
            if (!user) return;
            try {
                const token = await getToken();
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmarks?userId=${user.id}`,
                    { headers: { authorization: `Bearer ${token}` } }
                );
                if (res.ok) {
                    const bookmarks = await res.json();
                    const found = bookmarks.find(b => b.ebookId === ebook._id?.toString());
                    if (found) {
                        setIsBookmarked(true);
                        setBookmarkId(found._id);
                    }
                }
            } catch { }
        };
        checkBookmark();
    }, [user, ebook._id]);

    const handleBuyNow = async () => {
        if (!user) {
            router.push(`/auth/signin?redirect=/ebooks/${ebook._id}`);
            return;
        }
        try {
            const res = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ebookId: ebook._id,
                    title: ebook.title,
                    price: ebook.price,
                    coverImage: ebook.coverImage,
                }),
            });
            const { url } = await res.json();
            if (url) window.location.href = url;
        } catch (err) {
            console.error('Checkout error:', err);
        }
    };

    const handleBookmark = async () => {
        if (!user) {
            router.push("/auth/signin");
            return;
        }

        const token = await getToken();
        const authHeaders = {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        };

        if (isBookmarked) {
            try {
                await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmarks/${bookmarkId}`,
                    { method: "DELETE", headers: authHeaders }
                );
                setIsBookmarked(false);
                setBookmarkId(null);
                showToast("Bookmark removed");
            } catch {
                showToast("Failed to remove bookmark", "error");
            }
        } else {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmarks`,
                    {
                        method: "POST",
                        headers: authHeaders,
                        body: JSON.stringify({
                            userId: user.id,
                            ebookId: ebook._id?.toString(),
                            ebookTitle: ebook.title,
                            coverImage: ebook.coverImage,
                        }),
                    }
                );
                const data = await res.json();
                if (data.insertedId) {
                    setIsBookmarked(true);
                    setBookmarkId(data.insertedId);
                    showToast("Bookmarked successfully!");
                }
            } catch {
                showToast("Failed to bookmark", "error");
            }
        }
    };

    return (
        <div style={{ backgroundColor: "#0A1A0F", minHeight: "100vh" }}>

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <Link href="/ebooks" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: "#6B9E7A" }}>
                    ← Back to Browse
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Cover */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <div className="rounded-2xl overflow-hidden sticky top-24" style={{ border: "1px solid #1E3A26" }}>
                            <img src={ebook.coverImage} alt={ebook.title} className="w-full object-cover" />
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Genre + Title */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#86EFAC", border: "1px solid rgba(34,197,94,0.2)" }}>
                                    {ebook.genre}
                                </span>
                                {ebook.isSold && (
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#FCA5A5", border: "1px solid rgba(220,38,38,0.2)" }}>
                                        Sold Out
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}>
                                {ebook.title}
                            </h1>

                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}>
                                    {ebook.writerName?.[0]}
                                </div>
                                <span className="text-sm" style={{ color: "#86EFAC" }}>{ebook.writerName}</span>
                                <MdVerified size={16} style={{ color: "#22C55E" }} />
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl" style={{ backgroundColor: "#111F16", border: "1px solid #1E3A26" }}>
                            {[
                                { icon: <RiPagesLine size={18} />, label: "Pages", value: ebook.pages || "N/A" },
                                { icon: <BiWorld size={18} />, label: "Language", value: ebook.language || "English" },
                                { icon: <BiCalendar size={18} />, label: "Published", value: ebook.createdAt ? formatDate(ebook.createdAt) : "N/A" },
                                { icon: <HiOutlineBookOpen size={18} />, label: "Genre", value: ebook.genre },
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <div className="flex justify-center mb-1" style={{ color: "#6B9E7A" }}>{item.icon}</div>
                                    <p className="text-xs" style={{ color: "#6B9E7A" }}>{item.label}</p>
                                    <p className="text-sm font-semibold mt-0.5" style={{ color: "#F0FDF4" }}>{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Price + Actions */}
                        <div className="p-5 rounded-2xl space-y-4" style={{ backgroundColor: "#111F16", border: "1px solid #1E3A26" }}>
                            <div>
                                <p className="text-xs" style={{ color: "#6B9E7A" }}>Price</p>
                                <p className="text-3xl font-bold" style={{ color: "#22C55E" }}>${ebook.price}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleBuyNow}
                                    disabled={isOwnBook || ebook.isSold}
                                    className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
                                    style={{
                                        backgroundColor: isOwnBook || ebook.isSold ? "#1E3A26" : "#22C55E",
                                        color: isOwnBook || ebook.isSold ? "#6B9E7A" : "#0A1A0F",
                                        cursor: isOwnBook || ebook.isSold ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {isOwnBook ? "Your Book" : ebook.isSold ? "Already Purchased" : `Buy Now — $${ebook.price}`}
                                </button>

                                {/* Bookmark Button */}
                                <button
                                    onClick={handleBookmark}
                                    className="p-3 rounded-xl transition-all"
                                    style={{
                                        backgroundColor: isBookmarked ? "rgba(34,197,94,0.1)" : "#0A1A0F",
                                        border: `1px solid ${isBookmarked ? "#22C55E" : "#1E3A26"}`,
                                        color: isBookmarked ? "#22C55E" : "#6B9E7A",
                                    }}
                                    title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                                >
                                    {isBookmarked ? <BsBookmarkFill size={18} /> : <BsBookmark size={18} />}
                                </button>

                                <button
                                    className="p-3 rounded-xl transition-all"
                                    style={{ backgroundColor: "#0A1A0F", border: "1px solid #1E3A26", color: "#6B9E7A" }}
                                >
                                    <BsShare size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div>
                            <div className="flex gap-1 p-1 rounded-xl mb-5" style={{ backgroundColor: "#111F16" }}>
                                {["description", "details"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className="flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                                        style={{
                                            backgroundColor: activeTab === tab ? "#22C55E" : "transparent",
                                            color: activeTab === tab ? "#0A1A0F" : "#6B9E7A",
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {activeTab === "description" && (
                                <div className="text-sm leading-relaxed" style={{ color: "#86EFAC" }}>
                                    {ebook.description || "No description available."}
                                </div>
                            )}

                            {activeTab === "details" && (
                                <div className="space-y-3">
                                    {[
                                        { label: "Title", value: ebook.title },
                                        { label: "Writer", value: ebook.writerName },
                                        { label: "Genre", value: ebook.genre },
                                        { label: "Price", value: `$${ebook.price}` },
                                        { label: "Language", value: ebook.language || "English" },
                                        { label: "Pages", value: ebook.pages || "N/A" },
                                        { label: "Published", value: ebook.createdAt ? formatDate(ebook.createdAt) : "N/A" },
                                        { label: "Status", value: ebook.isSold ? "Sold" : "Available" },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between py-2.5 border-b" style={{ borderColor: "#1E3A26" }}>
                                            <span className="text-sm" style={{ color: "#6B9E7A" }}>{item.label}</span>
                                            <span className="text-sm font-medium" style={{ color: "#F0FDF4" }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
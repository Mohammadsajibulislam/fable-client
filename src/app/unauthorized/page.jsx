import Link from "next/link";
import { MdOutlineBlock } from "react-icons/md";

export default function UnauthorizedPage() {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#0A1A0F" }}
        >
            <div className="text-center space-y-5">
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{
                        backgroundColor: "rgba(220,38,38,0.1)",
                        border: "1px solid rgba(220,38,38,0.3)",
                    }}
                >
                    <MdOutlineBlock size={36} style={{ color: "#FCA5A5" }} />
                </div>
                <h1
                    className="text-4xl font-bold"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#F0FDF4",
                    }}
                >
                    401 — Unauthorized
                </h1>
                <p className="text-sm" style={{ color: "#6B9E7A" }}>
                    You don&apos;t have permission to access this page.
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Link
                        href="/auth/signin"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                        style={{
                            backgroundColor: "#111F16",
                            border: "1px solid #1E3A26",
                            color: "#86EFAC",
                        }}
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
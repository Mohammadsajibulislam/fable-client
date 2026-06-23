import Link from "next/link";
import { MdOutlineSearchOff } from "react-icons/md";

export default function NotFoundPage() {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: "#0A1A0F" }}
        >
            <div className="text-center space-y-6 max-w-md">

                <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto"
                    style={{
                        backgroundColor: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.2)",
                    }}
                >
                    <MdOutlineSearchOff size={48} style={{ color: "#22C55E" }} />
                </div>

                <div>
                    <h1
                        className="text-7xl font-bold mb-3"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#F0FDF4",
                        }}
                    >
                        404
                    </h1>
                    <h2
                        className="text-xl font-semibold mb-2"
                        style={{ color: "#F0FDF4" }}
                    >
                        Page Not Found
                    </h2>
                    <p className="text-sm" style={{ color: "#6B9E7A" }}>
                        The page you are looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-block px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
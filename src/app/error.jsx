"use client";

import { MdOutlineErrorOutline } from "react-icons/md";

export default function ErrorPage({ error, reset }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: "#0A1A0F" }}
        >
            <div className="text-center space-y-5 max-w-md">
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{
                        backgroundColor: "rgba(220,38,38,0.1)",
                        border: "1px solid rgba(220,38,38,0.3)",
                    }}
                >
                    <MdOutlineErrorOutline
                        size={36}
                        style={{ color: "#FCA5A5" }}
                    />
                </div>

                <div>
                    <h2
                        className="text-2xl font-bold mb-2"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#F0FDF4",
                        }}
                    >
                        Something went wrong
                    </h2>
                    <p className="text-sm" style={{ color: "#6B9E7A" }}>
                        An unexpected error occurred. Please try again.
                    </p>
                </div>

                <button
                    onClick={reset}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
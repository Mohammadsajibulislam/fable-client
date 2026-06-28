"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { MdEmail, MdCheckCircle } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className="fixed z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium"
            style={{
                top: "80px",
                right: "16px",
                backgroundColor: type === "success"
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(220,38,38,0.15)",
                border: `1px solid ${type === "success" ? "#22C55E" : "#DC2626"}`,
                color: type === "success" ? "#86EFAC" : "#FCA5A5",
            }}
        >
            <MdCheckCircle size={18} style={{ color: type === "success" ? "#22C55E" : "#DC2626" }} />
            {message}
        </div>
    );
}

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);
    const router = useRouter();

    const showToast = (message, type = "success") => setToast({ message, type });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const { error: authError } = await signIn.email({ email, password });
            if (authError) {
                setError(authError.message || "Invalid email or password.");
                showToast(authError.message || "Sign in failed.", "error");
            } else {
                showToast("Welcome back! Signed in successfully.");
                setTimeout(() => router.push("/"), 1500);
            }
        } catch {
            setError("An unexpected error occurred.");
            showToast("An unexpected error occurred.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-16"
            style={{ backgroundColor: "#0A1A0F" }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-12 h-12 mb-3">
                        <Image src="/logo1.png" alt="Fable" fill className="object-contain" />
                    </div>
                    <h1
                        className="text-3xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}
                    >
                        Welcome back
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                        Sign in to your Fable account
                    </p>
                </div>

                <div
                    className="rounded-2xl p-8"
                    style={{ backgroundColor: "#111F16", border: "1px solid #1E3A26" }}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                                Email Address
                            </label>
                            <div
                                className="flex items-center gap-3 rounded-xl px-4 py-3"
                                style={{ backgroundColor: "#0A1A0F", border: "1px solid #1E3A26" }}
                            >
                                <MdEmail size={18} style={{ color: "#6B9E7A" }} />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 bg-transparent text-sm outline-none"
                                    style={{ color: "#F0FDF4" }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                                Password
                            </label>
                            <div
                                className="flex items-center gap-3 rounded-xl px-4 py-3"
                                style={{ backgroundColor: "#0A1A0F", border: "1px solid #1E3A26" }}
                            >
                                <RiLockPasswordLine size={18} style={{ color: "#6B9E7A" }} />
                                <input
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="flex-1 bg-transparent text-sm outline-none"
                                    style={{ color: "#F0FDF4" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}
                                    style={{ color: "#6B9E7A" }}
                                >
                                    {isVisible ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                className="p-3 rounded-xl text-xs font-medium"
                                style={{
                                    backgroundColor: "rgba(220,38,38,0.1)",
                                    border: "1px solid rgba(220,38,38,0.3)",
                                    color: "#FCA5A5",
                                }}
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl text-sm font-semibold transition-all mt-2"
                            style={{
                                backgroundColor: isLoading ? "#15803D" : "#22C55E",
                                color: "#0A1A0F",
                            }}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>

                        <p className="text-center text-sm" style={{ color: "#6B9E7A" }}>
                            New to Fable?{" "}
                            <Link href="/auth/signup" className="font-semibold" style={{ color: "#22C55E" }}>
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
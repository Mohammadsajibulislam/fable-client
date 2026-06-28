"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { MdEmail, MdCheckCircle } from "react-icons/md";
import { RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsPerson, BsPencil } from "react-icons/bs";

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

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);
    const router = useRouter();

    const showToast = (message, type = "success") => setToast({ message, type });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            showToast("Passwords do not match.", "error");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            showToast("Password too short.", "error");
            return;
        }

        setIsLoading(true);
        try {
            const { error: authError } = await signUp.email({
                name, email, password, role,
            });

            if (authError) {
                setError(authError.message || "Something went wrong.");
                showToast(authError.message || "Sign up failed.", "error");
            } else {
                showToast("Account created! Welcome to Fable.");
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
                        Create account
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                        Join thousands of readers and writers
                    </p>
                </div>

                <div
                    className="rounded-2xl p-8"
                    style={{ backgroundColor: "#111F16", border: "1px solid #1E3A26" }}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                                Full Name
                            </label>
                            <div
                                className="flex items-center gap-3 rounded-xl px-4 py-3"
                                style={{ backgroundColor: "#0A1A0F", border: "1px solid #1E3A26" }}
                            >
                                <RiUserLine size={18} style={{ color: "#6B9E7A" }} />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="flex-1 bg-transparent text-sm outline-none"
                                    style={{ color: "#F0FDF4" }}
                                />
                            </div>
                        </div>

                        {/* Email */}
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

                        {/* Password */}
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
                                    placeholder="Min 8 characters"
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

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                                Confirm Password
                            </label>
                            <div
                                className="flex items-center gap-3 rounded-xl px-4 py-3"
                                style={{ backgroundColor: "#0A1A0F", border: "1px solid #1E3A26" }}
                            >
                                <RiLockPasswordLine size={18} style={{ color: "#6B9E7A" }} />
                                <input
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="flex-1 bg-transparent text-sm outline-none"
                                    style={{ color: "#F0FDF4" }}
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                                I want to join as
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole("user")}
                                    className="flex items-center gap-3 p-4 rounded-xl transition-all"
                                    style={{
                                        backgroundColor: role === "user" ? "rgba(34,197,94,0.1)" : "#0A1A0F",
                                        border: `1px solid ${role === "user" ? "#22C55E" : "#1E3A26"}`,
                                    }}
                                >
                                    <BsPerson size={20} style={{ color: role === "user" ? "#22C55E" : "#6B9E7A" }} />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold" style={{ color: role === "user" ? "#22C55E" : "#F0FDF4" }}>
                                            Reader
                                        </p>
                                        <p className="text-xs" style={{ color: "#6B9E7A" }}>Browse & buy</p>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole("writer")}
                                    className="flex items-center gap-3 p-4 rounded-xl transition-all"
                                    style={{
                                        backgroundColor: role === "writer" ? "rgba(34,197,94,0.1)" : "#0A1A0F",
                                        border: `1px solid ${role === "writer" ? "#22C55E" : "#1E3A26"}`,
                                    }}
                                >
                                    <BsPencil size={20} style={{ color: role === "writer" ? "#22C55E" : "#6B9E7A" }} />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold" style={{ color: role === "writer" ? "#22C55E" : "#F0FDF4" }}>
                                            Writer
                                        </p>
                                        <p className="text-xs" style={{ color: "#6B9E7A" }}>Publish & earn</p>
                                    </div>
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
                            {isLoading ? "Creating account..." : "Create Account"}
                        </button>

                        <p className="text-center text-sm" style={{ color: "#6B9E7A" }}>
                            Already have an account?{" "}
                            <Link href="/auth/signin" className="font-semibold" style={{ color: "#22C55E" }}>
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
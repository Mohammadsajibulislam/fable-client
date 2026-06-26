"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdCloudUpload } from "react-icons/md";

const GENRES = [
    "Fiction", "Mystery", "Romance",
    "Sci-Fi", "Fantasy", "Horror",
    "Thriller", "Self-Help",
];

export default function EditEbookForm({ ebook }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [coverImage, setCoverImage] = useState(ebook.coverImage || "");
    const [error, setError] = useState("");

    const inputClass = {
        backgroundColor: "#0A1A0F",
        border: "1px solid #1E3A26",
        color: "#F0FDF4",
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be under 5MB");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: "POST", body: formData }
            );
            const data = await res.json();
            if (data.success) {
                setCoverImage(data.data.url);
            } else {
                setError("Image upload failed. Try again.");
            }
        } catch {
            setError("Network error during upload.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            ...data,
            price: parseFloat(data.price),
            coverImage,
        };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${ebook._id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (res.ok) {
                router.push("/dashboard/writer/ebooks");
            } else {
                setError("Failed to update ebook.");
            }
        } catch {
            setError("Failed to update ebook.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 space-y-5"
            style={{ backgroundColor: "#111F16", border: "1px solid #1E3A26" }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Title */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                        Title
                    </label>
                    <input
                        name="title"
                        required
                        defaultValue={ebook.title}
                        placeholder="Enter ebook title"
                        className="rounded-xl px-4 py-3 text-sm outline-none"
                        style={inputClass}
                    />
                </div>

                {/* Genre */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                        Genre
                    </label>
                    <select
                        name="genre"
                        required
                        defaultValue={ebook.genre}
                        className="rounded-xl px-4 py-3 text-sm outline-none"
                        style={inputClass}
                    >
                        <option value="">Select genre</option>
                        {GENRES.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                        Price ($)
                    </label>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        defaultValue={ebook.price}
                        className="rounded-xl px-4 py-3 text-sm outline-none"
                        style={inputClass}
                    />
                </div>

                {/* Pages */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                        Pages
                    </label>
                    <input
                        name="pages"
                        type="number"
                        defaultValue={ebook.pages}
                        className="rounded-xl px-4 py-3 text-sm outline-none"
                        style={inputClass}
                    />
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                    Description
                </label>
                <textarea
                    name="description"
                    required
                    rows={4}
                    defaultValue={ebook.description}
                    className="rounded-xl px-4 py-3 text-sm outline-none resize-none"
                    style={inputClass}
                />
            </div>

            {/* Cover Image */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: "#86EFAC" }}>
                    Cover Image
                </label>
                <div className="flex items-center gap-4">
                    <label
                        className="flex flex-col items-center justify-center w-28 h-36 rounded-xl cursor-pointer"
                        style={{ backgroundColor: "#0A1A0F", border: "2px dashed #1E3A26" }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        {coverImage ? (
                            <img
                                src={coverImage}
                                alt="Cover"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <>
                                <MdCloudUpload size={28} style={{ color: "#6B9E7A" }} />
                                <span className="text-xs mt-1" style={{ color: "#6B9E7A" }}>
                                    {isUploading ? "Uploading..." : "Upload"}
                                </span>
                            </>
                        )}
                    </label>
                    <p className="text-xs" style={{ color: "#6B9E7A" }}>
                        PNG, JPG up to 5MB.
                        <br />
                        Recommended: 400x600px
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div
                    className="p-3 rounded-xl text-xs"
                    style={{
                        backgroundColor: "rgba(220,38,38,0.1)",
                        border: "1px solid rgba(220,38,38,0.3)",
                        color: "#FCA5A5",
                    }}
                >
                    {error}
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium"
                    style={{
                        backgroundColor: "#0A1A0F",
                        border: "1px solid #1E3A26",
                        color: "#86EFAC",
                    }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading || isUploading}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold"
                    style={{
                        backgroundColor: isLoading || isUploading ? "#15803D" : "#22C55E",
                        color: "#0A1A0F",
                    }}
                >
                    {isLoading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}
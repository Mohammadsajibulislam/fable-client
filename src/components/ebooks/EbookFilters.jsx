"use client";

import { MdOutlineClear } from "react-icons/md";

const GENRES = [
    "Fiction", "Mystery", "Romance",
    "Sci-Fi", "Fantasy", "Horror",
    "Thriller", "Self-Help",
];

export default function EbookFilters({
    genre, setGenre,
    availability, setAvailability,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    onClear, setPage,
}) {
    return (
        <div
            className="rounded-2xl p-5 space-y-6"
            style={{
                backgroundColor: "#111F16",
                border: "1px solid #1E3A26",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3
                    className="text-sm font-semibold uppercase tracking-widest"
                    style={{ color: "#22C55E" }}
                >
                    Filters
                </h3>
                <button
                    onClick={onClear}
                    className="flex items-center gap-1 text-xs transition-colors"
                    style={{ color: "#6B9E7A" }}
                >
                    <MdOutlineClear size={14} />
                    Clear all
                </button>
            </div>

            {/* Genre */}
            <div>
                <p
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "#86EFAC" }}
                >
                    Genre
                </p>
                <div className="space-y-2">
                    {GENRES.map((g) => (
                        <label
                            key={g}
                            className="flex items-center gap-2.5 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="genre"
                                value={g}
                                checked={genre === g}
                                onChange={() => { setGenre(g); setPage(1); }}
                                className="accent-green-500"
                            />
                            <span
                                className="text-sm transition-colors"
                                style={{ color: genre === g ? "#22C55E" : "#6B9E7A" }}
                            >
                                {g}
                            </span>
                        </label>
                    ))}
                    {genre && (
                        <button
                            onClick={() => { setGenre(""); setPage(1); }}
                            className="text-xs mt-1"
                            style={{ color: "#6B9E7A" }}
                        >
                            Show all genres
                        </button>
                    )}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <p
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "#86EFAC" }}
                >
                    Price Range
                </p>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                        style={{
                            backgroundColor: "#0A1A0F",
                            border: "1px solid #1E3A26",
                            color: "#F0FDF4",
                        }}
                    />
                    <span style={{ color: "#6B9E7A" }}>—</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                        style={{
                            backgroundColor: "#0A1A0F",
                            border: "1px solid #1E3A26",
                            color: "#F0FDF4",
                        }}
                    />
                </div>
            </div>

            {/* Availability */}
            <div>
                <p
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "#86EFAC" }}
                >
                    Availability
                </p>
                <div className="space-y-2">
                    {[
                        { value: "all",       label: "All" },
                        { value: "available", label: "Available" },
                        { value: "sold",      label: "Purchased" },
                    ].map((opt) => (
                        <label
                            key={opt.value}
                            className="flex items-center gap-2.5 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name="availability"
                                value={opt.value}
                                checked={availability === opt.value}
                                onChange={() => { setAvailability(opt.value); setPage(1); }}
                                className="accent-green-500"
                            />
                            <span
                                className="text-sm"
                                style={{
                                    color: availability === opt.value ? "#22C55E" : "#6B9E7A",
                                }}
                            >
                                {opt.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
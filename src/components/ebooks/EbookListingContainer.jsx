"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EbookCard from "./EbookCard";
import EbookFilters from "./EbookFilters";
import { BsGrid, BsList } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

export default function EbookListingContainer({ initialEbooks, total, filters }) {
    const [search, setSearch]               = useState(filters.search || "");
    const [genre, setGenre]                 = useState(filters.genre || "");
    const [sort, setSort]                   = useState(filters.sort || "newest");
    const [availability, setAvailability]   = useState(filters.availability || "all");
    const [minPrice, setMinPrice]           = useState(filters.minPrice || "");
    const [maxPrice, setMaxPrice]           = useState(filters.maxPrice || "");
    const [page, setPage]                   = useState(parseInt(filters.page) || 1);
    const [viewMode, setViewMode]           = useState("grid");

    const router = useRouter();
    const perPage = 12;
    const totalPages = Math.ceil(total / perPage);

    useEffect(() => {
        const sp = new URLSearchParams();
        if (search)                    sp.set("search",       search);
        if (genre)                     sp.set("genre",        genre);
        if (sort !== "newest")         sp.set("sort",         sort);
        if (availability !== "all")    sp.set("availability", availability);
        if (minPrice)                  sp.set("minPrice",     minPrice);
        if (maxPrice)                  sp.set("maxPrice",     maxPrice);
        if (page > 1)                  sp.set("page",         page);

        router.push(`?${sp.toString()}`);
    }, [search, genre, sort, availability, minPrice, maxPrice, page]);

    const handleClearFilters = () => {
        setSearch("");
        setGenre("");
        setSort("newest");
        setAvailability("all");
        setMinPrice("");
        setMaxPrice("");
        setPage(1);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
                <EbookFilters
                    genre={genre}             setGenre={setGenre}
                    availability={availability} setAvailability={setAvailability}
                    minPrice={minPrice}       setMinPrice={setMinPrice}
                    maxPrice={maxPrice}       setMaxPrice={setMaxPrice}
                    onClear={handleClearFilters}
                    setPage={setPage}
                />
            </aside>

            {/* Main Content */}
            <div className="flex-1">

                {/* Top Bar — Search + Sort + View Toggle */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">

                    {/* Search */}
                    <div
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 w-full sm:w-72"
                        style={{
                            backgroundColor: "#111F16",
                            border: "1px solid #1E3A26",
                        }}
                    >
                        <BiSearch size={18} style={{ color: "#6B9E7A" }} />
                        <input
                            type="text"
                            placeholder="Search by title or writer..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="bg-transparent text-sm outline-none flex-1"
                            style={{ color: "#F0FDF4" }}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Result count */}
                        <span className="text-sm" style={{ color: "#6B9E7A" }}>
                            {total} results
                        </span>

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => { setSort(e.target.value); setPage(1); }}
                            className="text-sm rounded-xl px-3 py-2.5 outline-none"
                            style={{
                                backgroundColor: "#111F16",
                                border: "1px solid #1E3A26",
                                color: "#F0FDF4",
                            }}
                        >
                            <option value="newest">Newest First</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>

                        {/* View Toggle */}
                        <div
                            className="flex items-center rounded-xl overflow-hidden"
                            style={{ border: "1px solid #1E3A26" }}
                        >
                            <button
                                onClick={() => setViewMode("grid")}
                                className="p-2.5 transition-all"
                                style={{
                                    backgroundColor: viewMode === "grid" ? "#22C55E" : "#111F16",
                                    color: viewMode === "grid" ? "#0A1A0F" : "#6B9E7A",
                                }}
                            >
                                <BsGrid size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className="p-2.5 transition-all"
                                style={{
                                    backgroundColor: viewMode === "list" ? "#22C55E" : "#111F16",
                                    color: viewMode === "list" ? "#0A1A0F" : "#6B9E7A",
                                }}
                            >
                                <BsList size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ebook Grid/List */}
                {initialEbooks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <p
                            className="text-lg font-semibold mb-2"
                            style={{ color: "#F0FDF4" }}
                        >
                            No ebooks found
                        </p>
                        <p className="text-sm" style={{ color: "#6B9E7A" }}>
                            Try adjusting your filters
                        </p>
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5"
                                : "flex flex-col gap-4"
                        }
                    >
                        {initialEbooks.map((ebook, i) => (
                            <EbookCard
                                key={ebook._id}
                                ebook={ebook}
                                viewMode={viewMode}
                                index={i}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10">
                        <button
                            onClick={() => setPage(p => p - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{
                                backgroundColor: "#111F16",
                                border: "1px solid #1E3A26",
                                color: page === 1 ? "#2D4A35" : "#86EFAC",
                            }}
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className="w-9 h-9 rounded-xl text-sm font-medium transition-all"
                                style={{
                                    backgroundColor: page === p ? "#22C55E" : "#111F16",
                                    border: `1px solid ${page === p ? "#22C55E" : "#1E3A26"}`,
                                    color: page === p ? "#0A1A0F" : "#86EFAC",
                                }}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{
                                backgroundColor: "#111F16",
                                border: "1px solid #1E3A26",
                                color: page === totalPages ? "#2D4A35" : "#86EFAC",
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
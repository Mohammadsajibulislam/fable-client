import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedEbooksClient from "./FeaturedEbooksClient";

export default async function FeaturedEbooks() {
    let ebooks = [];

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/featured`,
            { cache: "no-store" }
        );
        if (res.ok) {
            ebooks = await res.json();
        }
    } catch {
        ebooks = [];
    }

    return (
        <section className="py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p
                            className="text-xs font-semibold uppercase tracking-widest mb-2"
                            style={{ color: "#22C55E" }}
                        >
                            Handpicked for you
                        </p>
                        <h2
                            className="text-3xl font-bold"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                color: "#F0FDF4",
                            }}
                        >
                            Featured Ebooks
                        </h2>
                    </div>
                    <Link
                        href="/ebooks"
                        className="hidden sm:flex items-center gap-1.5 text-sm font-medium"
                        style={{ color: "#22C55E" }}
                    >
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                <FeaturedEbooksClient ebooks={ebooks} />
            </div>
        </section>
    );
}
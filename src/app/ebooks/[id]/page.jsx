import { getEbookById } from "@/lib/api/ebooks";
import EbookDetailsClient from "./EbookDetailsClient";
import { notFound } from "next/navigation";

export default async function EbookDetailsPage({ params }) {
    const { id } = await params;
    const ebook = await getEbookById(id);

    if (!ebook || ebook.message === "Ebook not found") {
        notFound();
    }

    return <EbookDetailsClient ebook={ebook} />;
}
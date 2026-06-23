export default function Loading() {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#0A1A0F" }}
        >
            <div className="flex flex-col items-center gap-4">
                <div
                    className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                    style={{ borderColor: "#1E3A26", borderTopColor: "#22C55E" }}
                />
                <p className="text-sm" style={{ color: "#6B9E7A" }}>
                    Loading...
                </p>
            </div>
        </div>
    );
}
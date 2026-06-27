import { requireRole } from "@/lib/core/session";

export default async function AdminSettingsPage() {
    const user = await requireRole("admin");

    return (
        <div className="space-y-6">
            <div>
                <h2
                    className="text-2xl font-bold"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#F0FDF4",
                    }}
                >
                    Settings
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    Platform configuration
                </p>
            </div>

            <div
                className="rounded-2xl p-6 max-w-lg"
                style={{
                    backgroundColor: "#111F16",
                    border: "1px solid #1E3A26",
                }}
            >
                <h3 className="font-semibold mb-4" style={{ color: "#F0FDF4" }}>
                    Admin Account
                </h3>
                <div className="space-y-3">
                    {[
                        { label: "Name", value: user?.name },
                        { label: "Email", value: user?.email },
                        { label: "Role", value: "Admin" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex justify-between py-2.5 border-b"
                            style={{ borderColor: "#1E3A26" }}
                        >
                            <span className="text-sm" style={{ color: "#6B9E7A" }}>
                                {item.label}
                            </span>
                            <span className="text-sm font-medium" style={{ color: "#F0FDF4" }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
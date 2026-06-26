import { requireRole } from "@/lib/core/session";
import { MdPerson, MdEmail, MdCalendarToday } from "react-icons/md";

export default async function WriterProfilePage() {
    const user = await requireRole("writer");

    const fields = [
        { icon: MdPerson, label: "Full Name", value: user?.name },
        { icon: MdEmail, label: "Email", value: user?.email },
        {
            icon: MdCalendarToday,
            label: "Member Since",
            value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                  })
                : "N/A",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#F0FDF4" }}
                >
                    Writer Profile
                </h2>
                <p className="text-sm mt-1" style={{ color: "#6B9E7A" }}>
                    Your writer account information
                </p>
            </div>

            <div
                className="rounded-2xl p-8 max-w-lg"
                style={{ backgroundColor: "#111F16", border: "1px solid #1E3A26" }}
            >
                {/* Avatar */}
                <div className="flex items-center gap-5 mb-8">
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold"
                        style={{ backgroundColor: "#22C55E", color: "#0A1A0F" }}
                    >
                        {user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold" style={{ color: "#F0FDF4" }}>
                            {user?.name}
                        </h3>
                        <span
                            className="text-xs px-2.5 py-1 rounded-full font-medium mt-1 inline-block"
                            style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22C55E" }}
                        >
                            Writer
                        </span>
                    </div>
                </div>

                {/* Info Fields */}
                <div className="space-y-4">
                    {fields.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-4 p-4 rounded-xl"
                            style={{ backgroundColor: "#0A1A0F" }}
                        >
                            <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22C55E" }}
                            >
                                <item.icon size={18} />
                            </div>
                            <div>
                                <p className="text-xs" style={{ color: "#6B9E7A" }}>{item.label}</p>
                                <p className="text-sm font-medium mt-0.5" style={{ color: "#F0FDF4" }}>
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
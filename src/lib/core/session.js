import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.user || null;
};

export const requireRole = async (role) => {
    const { redirect } = await import("next/navigation");
    const user = await getUserSession();

    if (!user) redirect("/auth/signin");
    if (user.role !== role) redirect("/unauthorized");

    return user;
};
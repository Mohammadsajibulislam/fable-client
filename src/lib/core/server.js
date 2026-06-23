import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
    const token = await getUserToken();
    return token ? { authorization: `Bearer ${token}` } : {};
};

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    if (res.status === 401) {
        const { redirect } = await import("next/navigation");
        redirect('/auth/signin');
    }
    return res.json();
};

export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: await authHeader(),
    });
    if (res.status === 401) {
        const { redirect } = await import("next/navigation");
        redirect('/auth/signin');
    }
    if (res.status === 403) {
        const { redirect } = await import("next/navigation");
        redirect('/unauthorized');
    }
    return res.json();
};

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader(),
        },
        body: JSON.stringify(data),
    });
    return res.json();
};
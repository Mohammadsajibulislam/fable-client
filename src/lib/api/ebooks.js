const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getEbooks = async (queryString = '') => {
    const res = await fetch(`${baseUrl}/api/ebooks?${queryString}`);
    return res.json();
};

export const getEbookById = async (id) => {
    const res = await fetch(`${baseUrl}/api/ebooks/${id}`);
    return res.json();
};

export const getFeaturedEbooks = async () => {
    const res = await fetch(`${baseUrl}/api/ebooks/featured`);
    return res.json();
};
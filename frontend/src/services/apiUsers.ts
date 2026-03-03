interface FetchUsersParams {
    search?: string;
    limit?: number;
}

export const getUsers = async ({ search, limit }: FetchUsersParams) => {
    const params = new URLSearchParams();

    if (search?.trim() === '') {
        if (typeof limit === 'number') {
            params.append('limit', limit.toString());
        }
    } else if (search) {
        params.append('search', search);
    }

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users?${params.toString()}`,
    );

    if (!res.ok) throw new Error('Failed to fetch users');

    return res.json();
};

import { authFetch } from '@/lib/fetcher';
import type { UsersResponse } from '@/types/api';

interface FetchUsersParams {
    search?: string;
    limit?: number;
}

export const getUsers = async (
    { search, limit }: FetchUsersParams,
    signal?: AbortSignal,
): Promise<UsersResponse> => {
    const params = new URLSearchParams();

    // Always send limit; only add search when non-empty.
    if (typeof limit === 'number') {
        params.append('limit', limit.toString());
    }
    if (search && search.trim() !== '') {
        params.append('search', search.trim());
    }

    const query = params.toString();
    return authFetch<UsersResponse>(
        `/api/users${query ? `?${query}` : ''}`,
        {},
        signal,
    );
};

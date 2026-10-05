import type { LoginFormValues, SignUpFormValues } from '@/types/form';
import type { AuthTokenResponse, AuthUser } from '@/types/api';
import { authFetch } from '@/lib/fetcher';

export const getUser = async (signal?: AbortSignal): Promise<AuthUser> => {
    return authFetch<AuthUser>(`/api/auth/user`, {}, signal);
};

export const loginUser = async (
    data: LoginFormValues,
): Promise<AuthTokenResponse> => {
    return authFetch<AuthTokenResponse>(`/api/auth/login`, {
        requireAuth: false,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};

export const registerUser = async (
    data: SignUpFormValues,
): Promise<AuthTokenResponse> => {
    return authFetch<AuthTokenResponse>(`/api/auth/signup`, {
        requireAuth: false,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};

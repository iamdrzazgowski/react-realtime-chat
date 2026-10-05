const API_URL = import.meta.env.VITE_API_URL as string;

export function getAuthToken(): string | null {
    try {
        return localStorage.getItem("token");
    } catch {
        return null;
    }
}

interface AuthFetchOptions extends RequestInit {
    requireAuth?: boolean;
}

interface ErrorBody {
    message?: string;
}

export async function authFetch<T = unknown>(
    path: string,
    options: AuthFetchOptions = {},
    signal?: AbortSignal,
): Promise<T> {
    const { requireAuth = true, headers, ...rest } = options;

    const token = getAuthToken();
    if (requireAuth && !token) {
        throw new Error("No token found!");
    }

    const res = await fetch(`${API_URL}${path}`, {
        ...rest,
        signal,
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
    });

    if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
            const error = (await res.json()) as ErrorBody;
            if (error?.message) message = error.message;
        } catch {
            // Keep default message when body is not JSON.
        }
        throw new Error(message);
    }

    return res.json() as Promise<T>;
}

export { API_URL };

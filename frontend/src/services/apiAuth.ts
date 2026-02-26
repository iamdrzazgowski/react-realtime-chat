import type { LoginFormValues, SignUpFormValues } from '@/types/form';

export const getUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found!');
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Unauthorized');

    return res.json();
};

export const loginUser = async (data: LoginFormValues) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Login failed');

    return res.json();
};

export const registerUser = async (data: SignUpFormValues) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Register failed!');
    }

    return res.json();
};

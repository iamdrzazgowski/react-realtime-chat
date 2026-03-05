const API_URL = import.meta.env.VITE_API_URL;

export const createDirectConversation = async (otherUserId: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found!');
    }

    const res = await fetch(`${API_URL}/api/conversation/direct`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otherUserId }),
    });

    if (!res.ok) {
        throw new Error('Unauthorized');
    }

    return res.json();
};

export const getConversations = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found!');
    }

    const res = await fetch(`${API_URL}/api/conversation/allConversations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch user conversations');
    }

    return res.json();
};

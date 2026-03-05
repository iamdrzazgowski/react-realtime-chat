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

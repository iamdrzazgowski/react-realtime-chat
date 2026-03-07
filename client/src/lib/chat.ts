import type { UiMessage } from '@/components/chat-area';

export function groupMessagesByDate(messages: UiMessage[]) {
    const grouped: { date: string; messages: UiMessage[] }[] = [];

    for (const msg of messages) {
        const dateStr = msg.timestamp.toLocaleDateString('pl-PL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
        const lastGroup = grouped[grouped.length - 1];
        if (lastGroup && lastGroup.date === dateStr) {
            lastGroup.messages.push(msg);
        } else {
            grouped.push({ date: dateStr, messages: [msg] });
        }
    }

    return grouped;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
    read: boolean;
}

export interface Conversation {
    id: string;
    participants: User[];
    messages: Message[];
    lastMessage: Message;
}

export const currentUser: User = {
    id: 'me',
    name: 'Ty',
    avatar: 'T',
    online: true,
};

export function formatTime(date: Date): string {
    return date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatRelativeTime(date?: Date | string | null) {
    if (!date) return '';

    const d = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(d.getTime())) return '';

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec}s temu`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m temu`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH}h temu`;
    const diffD = Math.floor(diffH / 24);
    return `${diffD}d temu`;
}

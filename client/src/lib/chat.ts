import type { UiMessage } from "@/components/chat-area";

// Hoisted formatters: created once per module instead of per message per render.
// (js-cache-function-results / js-hoist-regexp)
const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
});

const timeFormatter = new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
});

export function groupMessagesByDate(messages: UiMessage[]) {
    if (messages.length === 0) return [];

    const grouped: { date: string; messages: UiMessage[] }[] = [];

    for (const msg of messages) {
        // Single pass: format once per message, compare against last group only.
        const dateStr = dateFormatter.format(msg.timestamp);
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
    read?: boolean;
    senderName?: string;
}

export interface Conversation {
    id: string;
    participants: User[];
    messages: Message[];
    lastMessage: Message;
}

export function formatTime(date: Date): string {
    return timeFormatter.format(date);
}

const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

export function formatRelativeTime(date?: Date | string | null) {
    if (!date) return "";

    const time = typeof date === "string" ? Date.parse(date) : date.getTime();
    if (Number.isNaN(time)) return "";

    const diffMs = Date.now() - time;
    // Future timestamps and sub-minute diffs share the same cheap path.
    if (diffMs < MINUTE_MS) return "now";
    if (diffMs < HOUR_MS) return `${Math.floor(diffMs / MINUTE_MS)}m ago`;
    if (diffMs < DAY_MS) return `${Math.floor(diffMs / HOUR_MS)}h ago`;
    return `${Math.floor(diffMs / DAY_MS)}d ago`;
}

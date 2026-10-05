import { authFetch } from '@/lib/fetcher';
import type {
    ConversationDetailsResponse,
    ConversationsResponse,
} from '@/types/api';

export const createDirectConversation = async (
    otherUserId: string,
): Promise<ConversationDetailsResponse> => {
    return authFetch<ConversationDetailsResponse>(`/api/conversation/direct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otherUserId }),
    });
};

export const createGroupConversation = async (
    name: string,
    userIds: string[],
): Promise<ConversationDetailsResponse> => {
    return authFetch<ConversationDetailsResponse>(`/api/conversation/group`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, userIds }),
    });
};

export const getConversations = async (
    signal?: AbortSignal,
): Promise<ConversationsResponse> => {
    return authFetch<ConversationsResponse>(
        `/api/conversation/allConversations`,
        {},
        signal,
    );
};

export const getConversationById = async (
    conversationId: string,
    signal?: AbortSignal,
): Promise<ConversationDetailsResponse> => {
    return authFetch<ConversationDetailsResponse>(
        `/api/conversation/${conversationId}`,
        {},
        signal,
    );
};

export const deleteConversationById = async (
    conversationId: string,
): Promise<{ success: boolean }> => {
    return authFetch<{ success: boolean }>(`/api/conversation/${conversationId}`, {
        method: 'DELETE',
    });
};

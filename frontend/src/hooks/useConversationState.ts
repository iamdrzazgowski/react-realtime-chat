import { useState } from 'react';

export function useConversationState() {
    const [deletedIds, setDeletedIds] = useState(new Set());

    const deleteConversation = (id: string) =>
        setDeletedIds((prev) => new Set(prev).add(id));

    return {
        deletedIds,
        deleteConversation,
    };
}

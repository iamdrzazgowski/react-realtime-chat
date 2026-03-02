import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarHeader } from './sidebar-header';
import { ConversationSearch } from './conversation-search';
import { ConversationItem } from './conversation-item';
import { useConversationState } from '../hooks/useConversationState';

export function ConversationList({
    conversations,
    activeId,
    onSelect,
    onCreateDirectConversation,
    onCreateGroup,
    onOpenProfile,
    user,
}) {
    const [search, setSearch] = useState('');
    const { deletedIds, deleteConversation } = useConversationState();

    const filtered = conversations
        .filter((c) => !deletedIds.has(c.id))
        .filter((c) =>
            c.participants[0].name.toLowerCase().includes(search.toLowerCase()),
        );

    const renderItem = (conversation) => (
        <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={activeId === conversation.id}
            onSelect={onSelect}
            onDelete={() => deleteConversation(conversation.id)}
        />
    );

    return (
        <TooltipProvider>
            <div className='flex h-full flex-col border-r border-border bg-card'>
                <SidebarHeader
                    onCreateDirectConversation={onCreateDirectConversation}
                    onCreateGroup={onCreateGroup}
                    onOpenProfile={onOpenProfile}
                    user={user}
                />

                <ConversationSearch value={search} onChange={setSearch} />

                <ScrollArea className='flex-1'>
                    <div className='flex flex-col'>
                        {conversations.map(renderItem)}

                        {filtered.length === 0 && (
                            <div className='py-12 text-center'>
                                <p className='text-sm text-muted-foreground'>
                                    Brak wyników
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </TooltipProvider>
    );
}

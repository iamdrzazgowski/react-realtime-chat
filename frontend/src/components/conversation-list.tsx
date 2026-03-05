import { useState, useMemo } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarHeader } from './sidebar-header';
import { ConversationSearch } from './conversation-search';
import { ConversationItem } from './conversation-item';
import { useGetConversations } from '@/hooks/useConversation';

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
    const { conversationsData } = useGetConversations();

    const filteredConversations = useMemo(() => {
        if (!conversationsData?.conversations) return [];

        const lowerSearch = search.toLowerCase();

        return conversationsData.conversations.filter((conv) => {
            if (conv.type === 'DIRECT' && conv.user) {
                const fullName =
                    `${conv.user.firstName} ${conv.user.lastName}`.toLowerCase();
                return fullName.includes(lowerSearch);
            } else if (conv.type === 'GROUP') {
                return (conv.name ?? '').toLowerCase().includes(lowerSearch);
            }
            return false;
        });
    }, [conversationsData, search]);

    const renderItem = (conversation) => (
        <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={activeId === conversation.id}
            onSelect={onSelect}
            currentUserId={user.id}
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
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map(renderItem)
                        ) : (
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

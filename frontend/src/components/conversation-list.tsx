import { useState } from 'react';
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

    const renderItem = (conversation) => (
        <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={activeId === conversation.id}
            onSelect={onSelect}
            currentUserId={user.id}
            // onDelete={() => deleteConversation(conversation.id)}
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
                        {(conversationsData?.conversations ?? []).map(
                            renderItem,
                        )}

                        {/* {filtered.length === 0 && (
                            <div className='py-12 text-center'>
                                <p className='text-sm text-muted-foreground'>
                                    Brak wyników
                                </p>
                            </div>
                        )} */}
                    </div>
                </ScrollArea>
            </div>
        </TooltipProvider>
    );
}

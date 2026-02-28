import { ConversationList } from '@/components/conversation-list';
import { conversations } from '@/lib/chat-data';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProfileSheet } from '@/components/profile-sheet';
import { useUser } from '@/hooks/useAuth';
import { Outlet } from 'react-router';

export default function HomePage() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [mobileShowChat, setMobileShowChat] = useState(false);
    const { user } = useUser();

    // Dialog states
    const [addFriendOpen, setAddFriendOpen] = useState(false);
    const [createGroupOpen, setCreateGroupOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    // const activeConversation =
    //     conversations.find((c) => c.id === activeId) ?? null;

    const handleSelect = (id: string) => {
        setActiveId(id);
        setMobileShowChat(true);
    };

    const handleBack = () => {
        setMobileShowChat(false);
    };

    return (
        <>
            <main className='flex h-dvh overflow-hidden bg-background'>
                {/* Sidebar - conversation list */}
                <div
                    className={cn(
                        'w-full md:w-80 lg:w-96 shrink-0 transition-transform duration-200',
                        mobileShowChat
                            ? '-translate-x-full md:translate-x-0'
                            : 'translate-x-0',
                    )}>
                    <ConversationList
                        conversations={conversations}
                        activeId={activeId}
                        onSelect={handleSelect}
                        onAddFriend={() => setAddFriendOpen(true)}
                        onCreateGroup={() => setCreateGroupOpen(true)}
                        onOpenProfile={() => setProfileOpen(true)}
                        user={user}
                    />
                </div>

                {/* Chat area */}
                <div
                    className={cn(
                        'absolute inset-0 md:relative md:inset-auto flex-1 transition-transform duration-200',
                        mobileShowChat
                            ? 'translate-x-0'
                            : 'translate-x-full md:translate-x-0',
                    )}>
                    <Outlet />
                </div>
            </main>

            <ProfileSheet
                open={profileOpen}
                onOpenChange={setProfileOpen}
                user={user}
            />
        </>
    );
}

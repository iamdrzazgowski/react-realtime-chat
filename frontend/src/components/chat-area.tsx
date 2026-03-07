import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatHeader } from './chat-header';
import { MessageBubble } from './message-bubble';
import { MessageInput } from './message-input';
import { TypingIndicator } from './typing-indicator';
import { useRef, useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useGetConversationById } from '@/hooks/useConversation';
import { useUser } from '@/hooks/useAuth';
import type { Message as ChatMessage } from '@/lib/chat-data';
import { ConversationSkeleton } from './conversation-skeleton';

interface UiMessage extends ChatMessage {
    senderName: string;
}

export function ChatArea() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [isTyping] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const { conversationData, isLoading } = useGetConversationById();
    const conversation = conversationData?.conversation;

    const { user } = useUser();

    useEffect(() => {
        if (conversation?.messages?.length) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation?.messages]);

    if (isLoading) return <ConversationSkeleton />;

    if (!conversation) {
        return (
            <div className='flex h-full flex-col items-center justify-center bg-background'>
                <div className='flex flex-col items-center gap-3 text-muted-foreground'>
                    <div className='rounded-full bg-secondary p-4'>
                        <MessageCircle className='h-8 w-8' />
                    </div>
                    <div className='text-center'>
                        <p className='text-sm font-medium text-foreground'>
                            Wybierz konwersacje
                        </p>
                        <p className='text-xs text-muted-foreground mt-1'>
                            Kliknij na rozmowe, aby wyswietlic wiadomosci
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const participant = conversation.members
        ?.map(
            (m: {
                user: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    isOnline: boolean;
                };
            }) => m.user,
        )
        .find((u: { id: string }) => u.id !== user.id);

    const chatTitle =
        conversation.type === 'GROUP'
            ? conversation.name || 'Grupa'
            : participant
              ? `${participant.firstName} ${participant.lastName}`
              : 'Rozmowa';

    const avatar =
        conversation.type === 'GROUP'
            ? (() => {
                  // Weź pierwsze litery pierwszych 2 wyrazów nazwy grupy
                  if (!chatTitle) return 'G';
                  const words = chatTitle.split(' ');
                  const initials = words
                      .slice(0, 1)
                      .map((w) => w[0]?.toUpperCase() ?? '')
                      .join('');
                  return initials || 'G';
              })()
            : participant
              ? `${participant.firstName?.[0].toUpperCase() ?? ''}${participant.lastName?.[0].toUpperCase() ?? ''}`.trim() ||
                'U'
              : 'U';

    const groupedMessages: { date: string; messages: UiMessage[] }[] = [];
    if (conversation.messages?.length) {
        for (const msg of conversation.messages) {
            const mappedMsg: UiMessage = {
                id: msg.id,
                senderId: msg.sender.id,
                text: msg.content,
                timestamp: new Date(msg.createdAt),
                read: true,
                senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
            };

            const dateStr = mappedMsg.timestamp.toLocaleDateString('pl-PL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
            });

            const lastGroup = groupedMessages[groupedMessages.length - 1];
            if (lastGroup && lastGroup.date === dateStr) {
                lastGroup.messages.push(mappedMsg);
            } else {
                groupedMessages.push({ date: dateStr, messages: [mappedMsg] });
            }
        }
    }

    return (
        <div className='flex h-full'>
            <div className='flex flex-1 flex-col bg-background'>
                <ChatHeader
                    participant={{
                        id:
                            conversation.type === 'GROUP'
                                ? 'group'
                                : (participant?.id ?? 'user'),
                        name: chatTitle,
                        avatar: avatar,
                        online:
                            conversation.type === 'GROUP'
                                ? false
                                : (participant?.isOnline ?? false),
                    }}
                    onToggleInfo={() => setShowInfo(!showInfo)}
                />

                <ScrollArea className='flex-1 px-4'>
                    <div className='flex flex-col gap-1.5 py-4'>
                        {groupedMessages.map((group) => (
                            <div
                                key={group.date}
                                className='flex flex-col gap-1.5'>
                                <div className='flex items-center gap-3 py-3'>
                                    <div className='flex-1 h-px bg-border' />
                                    <span className='text-[11px] text-muted-foreground font-medium capitalize'>
                                        {group.date}
                                    </span>
                                    <div className='flex-1 h-px bg-border' />
                                </div>

                                {group.messages.map((msg, index) => {
                                    const isOwn = msg.senderId === user.id;
                                    const prevMsg =
                                        index > 0
                                            ? group.messages[index - 1]
                                            : null;
                                    const showGap =
                                        prevMsg &&
                                        prevMsg.senderId !== msg.senderId;
                                    return (
                                        <div
                                            key={msg.id}
                                            className={showGap ? 'mt-3' : ''}>
                                            <MessageBubble
                                                message={msg}
                                                isOwn={isOwn}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        {participant && (
                            <TypingIndicator
                                name={participant.firstName}
                                visible={isTyping}
                            />
                        )}

                        <div ref={bottomRef} />
                    </div>
                </ScrollArea>

                <MessageInput onSend={() => {}} />
            </div>
        </div>
    );
}

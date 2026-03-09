import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '../lib/chat';
import { ConversationActionsMenu } from './conversation-actions-menu';
import { useParams } from 'react-router';

interface ConversationItemProps {
    conversation: {
        id: string;
        type: 'DIRECT' | 'GROUP';
        user?: {
            firstName?: string;
            lastName?: string;
            online?: boolean;
        } | null;
        name?: string | null;
        lastMessage?: {
            id: string;
            senderId: string;
            content: string;
            createdAt?: string | Date;
            timestamp?: string | Date;
        } | null;
        lastReadAt?: string | Date | null;
    };
    currentUserId: string;
}

export function ConversationItem({
    conversation,
    currentUserId,
}: ConversationItemProps) {
    const { conversationID } = useParams();

    const isActive = conversationID === conversation.id;

    const participant =
        conversation.type === 'DIRECT'
            ? (conversation.user ?? null)
            : (conversation.name ?? null);

    const lastMsg = conversation.lastMessage ?? null;

    const rawLastMsgDate = lastMsg?.createdAt ?? lastMsg?.timestamp ?? null;

    const lastMsgDate = rawLastMsgDate ? new Date(rawLastMsgDate) : null;

    const lastReadDate = conversation.lastReadAt
        ? new Date(conversation.lastReadAt)
        : null;

    const unread =
        !!lastMsg &&
        !!lastMsgDate &&
        lastMsg.senderId !== currentUserId &&
        (!lastReadDate || lastMsgDate > lastReadDate);

    return (
        <div className='group relative'>
            <button
                type='button'
                className={cn(
                    'flex items-center gap-3 w-full px-4 py-3 text-left transition-colors hover:bg-secondary/80',
                    isActive && 'bg-secondary',
                )}>
                <div className='relative shrink-0'>
                    <Avatar className='h-10 w-10'>
                        <AvatarFallback
                            className={cn(
                                'text-xs font-medium',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground',
                            )}>
                            {typeof participant === 'string'
                                ? participant[0]?.toUpperCase()
                                : participant
                                  ? `${participant.firstName?.[0] ?? ''}${participant.lastName?.[0] ?? ''}`.toUpperCase()
                                  : '?'}
                        </AvatarFallback>
                    </Avatar>
                    {typeof participant !== 'string' && participant?.online && (
                        <span className='absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-online' />
                    )}
                </div>

                <div className='flex-1 overflow-hidden'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1.5 min-w-0'>
                            <span
                                className={cn(
                                    'text-sm truncate',
                                    unread
                                        ? 'font-semibold text-foreground'
                                        : 'font-medium text-foreground',
                                )}>
                                {typeof participant === 'string'
                                    ? participant
                                    : participant
                                      ? `${participant.firstName} ${participant.lastName}`
                                      : 'Unknown User'}
                            </span>
                        </div>
                        <span
                            className={cn(
                                'text-[11px] shrink-0 ml-2 group-hover:hidden',
                                unread
                                    ? 'text-primary font-medium'
                                    : 'text-muted-foreground',
                            )}>
                            {lastMsg
                                ? formatRelativeTime(
                                      lastMsg.createdAt ?? lastMsg.timestamp,
                                  )
                                : ''}
                        </span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <p
                            className={cn(
                                'text-[13px] truncate leading-relaxed',
                                unread
                                    ? 'text-foreground font-medium'
                                    : 'text-muted-foreground',
                            )}>
                            {lastMsg
                                ? (lastMsg.senderId === currentUserId
                                      ? 'Ty: '
                                      : '') + lastMsg.content
                                : 'No messages yet'}
                        </p>
                    </div>
                </div>
            </button>

            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                <ConversationActionsMenu conversationId={conversation.id} />
            </div>
        </div>
    );
}

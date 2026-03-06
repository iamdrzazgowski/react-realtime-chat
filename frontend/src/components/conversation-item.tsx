import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '../lib/chat-data';
import { ConversationActionsMenu } from './conversation-actions-menu';

export function ConversationItem({
    conversation,
    isActive,
    onSelect,
    currentUserId,
}) {
    const participant =
        conversation.type === 'DIRECT'
            ? (conversation.user ?? null)
            : (conversation.name ?? null);

    const lastMsg = conversation.lastMessage ?? null;

    const unread = lastMsg
        ? lastMsg.senderId !== currentUserId && !lastMsg.read
        : false;

    return (
        <div className='group relative'>
            <button
                type='button'
                onClick={() => onSelect(conversation.id)}
                className={cn(
                    'flex items-center gap-3 w-full px-4 py-3 text-left transition-colors hover:bg-secondary/80',
                    isActive && 'bg-secondary',
                )}>
                {/* Avatar */}
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
                    {participant?.online && (
                        <span className='absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-online' />
                    )}
                </div>

                {/* Content */}
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
                                'text-[11px] shrink-0 ml-2',
                                unread
                                    ? 'text-primary font-medium'
                                    : 'text-muted-foreground',
                            )}>
                            {lastMsg
                                ? formatRelativeTime(lastMsg.timestamp)
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
                                      : '') + lastMsg.text
                                : 'No messages yet'}
                        </p>
                    </div>
                </div>
            </button>

            {/* Hover actions */}
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                <ConversationActionsMenu conversationId={conversation.id} />
            </div>
        </div>
    );
}

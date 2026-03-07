import { cn } from '@/lib/utils';
import type { Message } from '@/lib/chat-data';
import { formatTime } from '@/lib/chat-data';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
    showTimestamp?: boolean;
}

export function MessageBubble({
    message,
    isOwn,
    showTimestamp = true,
}: MessageBubbleProps) {
    return (
        <div className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
            <div
                className={cn(
                    'max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                    isOwn
                        ? 'bg-message-own text-message-own-foreground rounded-br-md'
                        : 'bg-message-other text-message-other-foreground rounded-bl-md',
                )}>
                <p>{message.text}</p>
                {showTimestamp && (
                    <div
                        className={cn(
                            'flex items-center justify-end gap-1 mt-1',
                            isOwn
                                ? 'text-message-own-foreground/70'
                                : 'text-muted-foreground',
                        )}>
                        <span className='text-[10px]'>
                            {formatTime(message.timestamp)}
                        </span>
                        {isOwn &&
                            (message.read ? (
                                <CheckCheck className='h-3 w-3' />
                            ) : (
                                <Check className='h-3 w-3' />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

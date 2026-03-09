import { cn } from '@/lib/utils';
import type { Message } from '@/lib/chat';
import { formatTime } from '@/lib/chat';

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
                {!isOwn && message?.senderName && (
                    <p className='text-[11px] font-medium mb-0.5 opacity-70'>
                        {message?.senderName}
                    </p>
                )}

                <p
                    className={cn(
                        'px-3 py-2 rounded-2xl text-sm leading-relaxed',
                        isOwn
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-900',
                    )}
                    style={{
                        width: 'fit-content',
                        wordBreak: 'break-word',
                    }}>
                    {message.text}
                </p>

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
                    </div>
                )}
            </div>
        </div>
    );
}

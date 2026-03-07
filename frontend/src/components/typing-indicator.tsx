import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
    name: string;
    visible: boolean;
}

export function TypingIndicator({ name, visible }: TypingIndicatorProps) {
    if (!visible) return null;

    return (
        <div className='flex justify-start'>
            <div className='bg-message-other text-message-other-foreground rounded-2xl rounded-bl-md px-3.5 py-2.5'>
                <div className='flex items-center gap-2'>
                    <span className='text-xs text-muted-foreground'>
                        {name} pisze
                    </span>
                    <div className='flex gap-0.5'>
                        <span className='h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]' />
                        <span className='h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]' />
                        <span className='h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]' />
                    </div>
                </div>
            </div>
        </div>
    );
}

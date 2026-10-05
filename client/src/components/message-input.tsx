import React, { lazy, memo, Suspense, useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';

const EmojiPicker = lazy(() =>
    import('./emoji-picker').then((m) => ({ default: m.EmojiPicker })),
);

interface MessageInputProps {
    onSend: (text: string) => void;
}

const MAX_TEXTAREA_HEIGHT = 120;

function MessageInputInner({ onSend }: MessageInputProps) {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const rafRef = useRef<number>(0);

    // Batch DOM writes (js-batch-dom-css): coalesce autoresize into one
    // rAF per frame instead of a synchronous layout per keystroke.
    const scheduleResize = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const el = textareaRef.current;
            if (!el) return;
            el.style.height = 'auto';
            el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
        });
    }, []);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);
            scheduleResize();
        },
        [scheduleResize],
    );

    const handleSend = useCallback(() => {
        if (!value.trim()) return;
        onSend(value.trim());
        setValue('');
        requestAnimationFrame(() => {
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        });
    }, [value, onSend]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        },
        [handleSend],
    );

    const handleEmojiSelect = useCallback((emoji: string) => {
        setValue((prev) => prev + emoji);
        textareaRef.current?.focus();
        scheduleResize();
    }, [scheduleResize]);

    const canSend = value.trim().length > 0;

    return (
        <footer className='border-t border-border bg-card px-4 py-3'>
            <div className='flex items-center gap-2'>
                <Suspense fallback={null}>
                    <EmojiPicker onSelect={handleEmojiSelect} />
                </Suspense>

                <div className='flex-1 relative'>
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder='Write a message...'
                        rows={1}
                        className='w-full resize-none overflow-hidden rounded-xl border border-input bg-secondary px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 leading-relaxed'
                    />
                </div>

                <Button
                    size='icon'
                    className='h-8 w-8 shrink-0 rounded-full'
                    onClick={handleSend}
                    disabled={!canSend}>
                    <SendHorizontal className='h-4 w-4' />
                    <span className='sr-only'>Send</span>
                </Button>
            </div>
        </footer>
    );
}

export const MessageInput = memo(MessageInputInner);

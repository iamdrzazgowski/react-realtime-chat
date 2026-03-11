import React from 'react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { EmojiPicker } from './emoji-picker';
import { TooltipProvider } from '@/components/ui/tooltip';

interface MessageInputProps {
    onSend: (text: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [value]);

    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value.trim());
        setValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        setValue((prev) => prev + emoji);
        textareaRef.current?.focus();
    };

    return (
        <TooltipProvider>
            <footer className='border-t border-border bg-card px-4 py-3'>
                <div className='flex items-center gap-2'>
                    <EmojiPicker onSelect={handleEmojiSelect} />

                    <div className='flex-1 relative'>
                        <textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
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
                        disabled={!value.trim()}>
                        <SendHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Send</span>
                    </Button>
                </div>
            </footer>
        </TooltipProvider>
    );
}

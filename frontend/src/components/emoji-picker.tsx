import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Smile } from 'lucide-react';
import { useState } from 'react';

const emojiCategories = [
    {
        label: 'Popularne',
        emojis: [
            '😊',
            '😂',
            '❤️',
            '👍',
            '🔥',
            '😍',
            '🎉',
            '💪',
            '🤔',
            '😢',
            '😮',
            '🙌',
        ],
    },
    {
        label: 'Twarze',
        emojis: [
            '😀',
            '😃',
            '😄',
            '😁',
            '😆',
            '🥹',
            '😅',
            '🤣',
            '🥲',
            '😇',
            '🙂',
            '😉',
        ],
    },
    {
        label: 'Gesty',
        emojis: [
            '👋',
            '🤚',
            '✋',
            '🖐️',
            '👌',
            '🤌',
            '✌️',
            '🤞',
            '🫰',
            '🤙',
            '👏',
            '🙏',
        ],
    },
    {
        label: 'Obiekty',
        emojis: [
            '💬',
            '💭',
            '📎',
            '📷',
            '🎵',
            '🎮',
            '☕',
            '🍕',
            '🚀',
            '⭐',
            '💡',
            '🔔',
        ],
    },
];

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
    const [open, setOpen] = useState(false);

    const handleSelect = (emoji: string) => {
        onSelect(emoji);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground'>
                    <Smile className='h-4 w-4' />
                    <span className='sr-only'>Emoji</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-64 p-2' align='start' side='top'>
                <div className='flex flex-col gap-2'>
                    {emojiCategories.map((cat) => (
                        <div key={cat.label}>
                            <p className='text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1 mb-1'>
                                {cat.label}
                            </p>
                            <div className='grid grid-cols-6 gap-0.5'>
                                {cat.emojis.map((emoji) => (
                                    <button
                                        key={emoji}
                                        type='button'
                                        onClick={() => handleSelect(emoji)}
                                        className='flex items-center justify-center h-8 w-8 rounded-md text-lg hover:bg-secondary transition-colors'>
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

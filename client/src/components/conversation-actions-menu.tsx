import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';

interface ConversationActionsMenuProps {
    conversationId: string;
    onDelete?: () => void;
}

export function ConversationActionsMenu({
    onDelete,
}: ConversationActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground'
                    onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal className='h-3.5 w-3.5' />
                    <span className='sr-only'>Opcje konwersacji</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem
                    onClick={onDelete}
                    className='gap-2 text-sm text-destructive focus:text-destructive'>
                    <Trash2 className='h-3.5 w-3.5' />
                    Usun rozmowe
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

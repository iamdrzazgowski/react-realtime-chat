import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useDeleteConversationById } from '@/hooks/useConversation';

interface ConversationActionsMenuProps {
    conversationId: string;
    onDelete?: () => void;
}

export function ConversationActionsMenu({
    conversationId,
}: ConversationActionsMenuProps) {
    const { deleteConversationById } = useDeleteConversationById();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground'
                    onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal className='h-3.5 w-3.5' />
                    <span className='sr-only'>Conversation options</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteConversationById(conversationId);
                    }}
                    className='gap-2 text-sm text-destructive focus:text-destructive'>
                    <Trash2 className='h-3.5 w-3.5' />
                    Delete conversation
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

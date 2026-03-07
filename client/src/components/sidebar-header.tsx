import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { MessageSquarePlus, Users } from 'lucide-react';

const ACTIONS = [
    {
        icon: Users,
        label: 'Utwórz grupę',
        onClick: (handlers) => handlers.onCreateGroup(),
    },
    {
        icon: MessageSquarePlus,
        label: 'Nowa konwersacja',
        onClick: (handlers) => handlers.onCreateDirectConversation(),
    },
];

export function SidebarHeader({
    onCreateGroup,
    onOpenProfile,
    onCreateDirectConversation,
    user,
}) {
    const handlers = { onCreateDirectConversation, onCreateGroup };

    return (
        <div className='flex items-center justify-between border-b border-border px-4 py-4'>
            <button
                type='button'
                onClick={onOpenProfile}
                className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                <Avatar className='h-8 w-8'>
                    <AvatarFallback className='bg-primary text-primary-foreground text-xs font-medium'>
                        {user.firstName[0]}
                        {user.lastName[0]}
                    </AvatarFallback>
                </Avatar>
                <h1 className='text-lg font-semibold text-foreground tracking-tight'>
                    Wiadomości
                </h1>
            </button>

            <div className='flex items-center gap-0.5'>
                {ACTIONS.map(({ icon: Icon, label, onClick }) => (
                    <Tooltip key={label}>
                        <TooltipTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-muted-foreground hover:text-foreground'
                                onClick={() => onClick(handlers)}>
                                <Icon className='h-4 w-4' />
                                <span className='sr-only'>{label}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <p className='text-xs'>{label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}

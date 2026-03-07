import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import type { User } from '@/lib/chat-data';
import {
    Phone,
    Video,
    MoreVertical,
    ArrowLeft,
    Search,
    BellOff,
    UserX,
    Trash2,
    PanelRightOpen,
} from 'lucide-react';

interface ChatHeaderProps {
    participant: User;
    onBack?: () => void;
    onToggleInfo?: () => void;
}

export function ChatHeader({
    participant,
    onBack,
    onToggleInfo,
}: ChatHeaderProps) {
    console.log(participant);
    return (
        <TooltipProvider>
            <header className='flex items-center justify-between border-b border-border bg-card px-4 py-3'>
                <div className='flex items-center gap-3'>
                    {onBack && (
                        <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 md:hidden text-muted-foreground'
                            onClick={onBack}>
                            <ArrowLeft className='h-4 w-4' />
                            <span className='sr-only'>Wstecz</span>
                        </Button>
                    )}
                    <div className='relative'>
                        <Avatar className='h-9 w-9'>
                            <AvatarFallback className='bg-primary text-primary-foreground text-xs font-medium'>
                                {participant.avatar}
                            </AvatarFallback>
                        </Avatar>
                        {participant.online && (
                            <span className='absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-card bg-online' />
                        )}
                    </div>
                    <div>
                        <p className='text-sm font-semibold text-foreground leading-none'>
                            {participant.name}
                        </p>
                        <p className='text-[12px] text-muted-foreground mt-0.5'>
                            {participant.online ? 'online' : 'offline'}
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-0.5'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-muted-foreground hover:text-foreground'>
                                <Phone className='h-4 w-4' />
                                <span className='sr-only'>
                                    Polaczenie glosowe
                                </span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <p className='text-xs'>Polaczenie glosowe</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-muted-foreground hover:text-foreground'>
                                <Video className='h-4 w-4' />
                                <span className='sr-only'>
                                    Polaczenie wideo
                                </span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <p className='text-xs'>Polaczenie wideo</p>
                        </TooltipContent>
                    </Tooltip>

                    {onToggleInfo && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    className='h-8 w-8 text-muted-foreground hover:text-foreground hidden lg:flex'
                                    onClick={onToggleInfo}>
                                    <PanelRightOpen className='h-4 w-4' />
                                    <span className='sr-only'>Szczegoly</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side='bottom'>
                                <p className='text-xs'>Szczegoly rozmowy</p>
                            </TooltipContent>
                        </Tooltip>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 text-muted-foreground hover:text-foreground'>
                                <MoreVertical className='h-4 w-4' />
                                <span className='sr-only'>Wiecej opcji</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-48'>
                            <DropdownMenuItem className='gap-2 text-sm'>
                                <Search className='h-3.5 w-3.5' />
                                Szukaj w rozmowie
                            </DropdownMenuItem>
                            <DropdownMenuItem className='gap-2 text-sm'>
                                <BellOff className='h-3.5 w-3.5' />
                                Wycisz powiadomienia
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='gap-2 text-sm'>
                                <UserX className='h-3.5 w-3.5' />
                                Zablokuj uzytkownika
                            </DropdownMenuItem>
                            <DropdownMenuItem className='gap-2 text-sm text-destructive focus:text-destructive'>
                                <Trash2 className='h-3.5 w-3.5' />
                                Usun rozmowe
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </TooltipProvider>
    );
}

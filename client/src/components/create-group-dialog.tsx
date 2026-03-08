import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Users, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useUsers } from '@/hooks/useUsers';
import type { User } from './direct-conversation-dialog';
import { Spinner } from './ui/spinner';
import { useCreateGroupConversation } from '@/hooks/useConversation';

interface CreateGroupDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateGroupDialog({
    open,
    onOpenChange,
}: CreateGroupDialogProps) {
    const [groupName, setGroupName] = useState('');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const { createGroupConversation, isPending } = useCreateGroupConversation();

    const { isLoading, usersData } = useUsers({
        search,
        initialLimit: 5,
    });

    const toggleUser = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const removeUser = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    const selectedUsers = (usersData?.usersData ?? []).filter((u) =>
        selected.has(u.id),
    );

    const handleCreate = () => {
        console.log(selected);
        if (groupName.trim() && selected.size >= 2) {
            createGroupConversation({
                groupName,
                userIds: Array.from(selected),
            });
            onOpenChange(false);
            setGroupName('');
            setSelected(new Set());
            setSearch('');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>Utworz grupe</DialogTitle>
                    <DialogDescription>
                        Nadaj nazwe grupie i wybierz co najmniej 2 osoby.
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col gap-3'>
                    <Input
                        placeholder='Nazwa grupy...'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className='h-9 text-sm'
                    />

                    {selectedUsers.length > 0 && (
                        <div className='flex flex-wrap gap-1.5'>
                            {selectedUsers.map((user) => (
                                <Badge
                                    key={user.id}
                                    variant='secondary'
                                    className='gap-1 pr-1 text-xs font-normal'>
                                    {user.firstName}
                                    <button
                                        type='button'
                                        onClick={() => removeUser(user.id)}
                                        className='ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors'>
                                        <X className='h-2.5 w-2.5' />
                                        <span className='sr-only'>
                                            Usun {user.name}
                                        </span>
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className='relative'>
                        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input
                            placeholder='Szukaj kontaktow...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='pl-8 h-9 text-sm bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/30'
                        />
                    </div>

                    <ScrollArea className='max-h-48'>
                        <div className='flex flex-col gap-0.5'>
                            {isLoading && <Spinner />}

                            {(usersData?.usersData ?? []).map((user: User) => {
                                const isSelected = selected.has(user.id);
                                return (
                                    <button
                                        key={user.id}
                                        type='button'
                                        onClick={() => toggleUser(user.id)}
                                        className={cn(
                                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                                            isSelected
                                                ? 'bg-primary/10'
                                                : 'hover:bg-secondary/80',
                                        )}>
                                        <div className='relative'>
                                            <Avatar className='h-8 w-8'>
                                                <AvatarFallback
                                                    className={cn(
                                                        'text-xs font-medium',
                                                        isSelected
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted text-muted-foreground',
                                                    )}>
                                                    {user.firstName[0]}
                                                    {user.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            {/* {user.online && (
                                                <span className='absolute bottom-0 right-0 h-2 w-2 rounded-full border border-card bg-online' />
                                            )} */}
                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-sm font-medium text-foreground'>
                                                {user.firstName} {user.lastName}
                                            </p>
                                            {/* <p className='text-xs text-muted-foreground'>
                                                {user.online
                                                    ? 'online'
                                                    : 'offline'}
                                            </p> */}
                                        </div>
                                        <div
                                            className={cn(
                                                'h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors',
                                                isSelected
                                                    ? 'border-primary bg-primary'
                                                    : 'border-muted-foreground/30',
                                            )}>
                                            {isSelected && (
                                                <svg
                                                    width='8'
                                                    height='8'
                                                    viewBox='0 0 8 8'
                                                    fill='none'>
                                                    <path
                                                        d='M1 4L3 6L7 2'
                                                        stroke='white'
                                                        strokeWidth='1.5'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>

                <DialogFooter>
                    <Button
                        variant='outline'
                        onClick={() => onOpenChange(false)}
                        className='h-9 text-sm'>
                        Anuluj
                    </Button>
                    <Button
                        onClick={handleCreate}
                        disabled={
                            !groupName.trim() || selected.size < 2 || isPending
                        }
                        className='h-9 text-sm gap-1.5'>
                        <Users className='h-3.5 w-3.5' />
                        Utworz ({selected.size})
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

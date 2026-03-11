import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { Spinner } from './ui/spinner';
import { useCreateDirectConversation } from '@/hooks/useConversation';

interface DirectConversationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isOnline: boolean;
    createdAt: Date;
}

export function DirectConversationDialog({
    open,
    onOpenChange,
}: DirectConversationDialogProps) {
    const [search, setSearch] = useState('');
    const { createDirectConversation, isPending } =
        useCreateDirectConversation();
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const { isLoading, usersData = [] } = useUsers({
        search,
        initialLimit: 5,
    });

    const handleCreate = () => {
        if (!selectedUser) return;
        createDirectConversation(selectedUser);
        onOpenChange(false);
        setSelectedUser(null);
        setSearch('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>New conversation</DialogTitle>
                    <DialogDescription>
                        Select the person you want to start a conversation with.
                    </DialogDescription>
                </DialogHeader>

                <div className='relative'>
                    <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='pl-8 h-9 text-sm bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/30'
                    />
                </div>

                <ScrollArea className='max-h-64'>
                    <div className='flex flex-col gap-1'>
                        {isLoading && <Spinner />}

                        {(usersData?.usersData ?? []).map((user: User) => {
                            const isSelected = selectedUser === user.id;
                            return (
                                <button
                                    key={user.id}
                                    onClick={() => setSelectedUser(user.id)}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-left ${
                                        isSelected
                                            ? 'bg-primary/10'
                                            : 'hover:bg-secondary/80'
                                    }`}>
                                    <Avatar className='h-9 w-9'>
                                        <AvatarFallback className='bg-muted text-muted-foreground text-xs font-medium'>
                                            {user.firstName[0]}
                                            {user.lastName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className='text-sm font-medium text-foreground truncate'>
                                        {user.firstName} {user.lastName}
                                    </p>
                                </button>
                            );
                        })}

                        {usersData.length === 0 && (
                            <div className='py-8 text-center'>
                                <p className='text-sm text-muted-foreground'>
                                    No users found
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <Button
                    onClick={handleCreate}
                    disabled={!selectedUser || isPending}
                    className='w-full mt-2 gap-2'>
                    <MessageCircle className='h-4 w-4' />
                    Start a conversation
                </Button>
            </DialogContent>
        </Dialog>
    );
}

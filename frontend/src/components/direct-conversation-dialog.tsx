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

const users = [
    { id: 'u1', name: 'Julia Mazur', avatar: 'JM' },
    { id: 'u2', name: 'Jakub Krawczyk', avatar: 'JK' },
    { id: 'u3', name: 'Natalia Szymczak', avatar: 'NS' },
    { id: 'u4', name: 'Adam Wojcik', avatar: 'AW' },
    { id: 'u5', name: 'Marta Duda', avatar: 'MD' },
    { id: 'u6', name: 'Filip Borkowski', avatar: 'FB' },
];

interface DirectConversationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreateConversation: (userId: string) => void;
}

export function DirectConversationDialog({
    open,
    onOpenChange,
    onCreateConversation,
}: DirectConversationDialogProps) {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
    );

    const handleCreate = () => {
        if (!selectedUser) return;
        onCreateConversation(selectedUser);
        onOpenChange(false);
        setSelectedUser(null);
        setSearch('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>Nowa konwersacja</DialogTitle>
                    <DialogDescription>
                        Wybierz osobę, z którą chcesz rozpocząć rozmowę.
                    </DialogDescription>
                </DialogHeader>

                <div className='relative'>
                    <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                        placeholder='Szukaj użytkownika...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='pl-8 h-9 text-sm bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/30'
                    />
                </div>

                <ScrollArea className='max-h-64'>
                    <div className='flex flex-col gap-1'>
                        {filtered.map((user) => {
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
                                            {user.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className='text-sm font-medium text-foreground truncate'>
                                        {user.name}
                                    </p>
                                </button>
                            );
                        })}

                        {filtered.length === 0 && (
                            <div className='py-8 text-center'>
                                <p className='text-sm text-muted-foreground'>
                                    Nie znaleziono użytkowników
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <Button
                    onClick={handleCreate}
                    disabled={!selectedUser}
                    className='w-full mt-2 gap-2'>
                    <MessageCircle className='h-4 w-4' />
                    Rozpocznij rozmowę
                </Button>
            </DialogContent>
        </Dialog>
    );
}

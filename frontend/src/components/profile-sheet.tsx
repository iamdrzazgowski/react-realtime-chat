import React from 'react';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from './ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Bell, Moon } from 'lucide-react';
import LogoutBtn from './ui/logout-btn';

interface ProfileSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
}

export function ProfileSheet({ open, onOpenChange, user }: ProfileSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side='left' className='w-80 p-0'>
                <SheetHeader className='sr-only'>
                    <SheetTitle>Profil</SheetTitle>
                    <SheetDescription>
                        Ustawienia profilu uzytkownika
                    </SheetDescription>
                </SheetHeader>

                <div className='flex flex-col h-full'>
                    {/* Profile header */}
                    <div className='flex flex-col items-center gap-3 px-6 pt-10 pb-6'>
                        <div className='relative group'>
                            <Avatar className='h-20 w-20'>
                                <AvatarFallback className='bg-primary text-primary-foreground text-2xl font-semibold'>
                                    {user.firstName[0]}
                                    {user.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='text-center'>
                            <div className='flex items-center gap-1.5'>
                                <h2 className='text-base font-semibold text-foreground'>
                                    {user.firstName} {user.lastName}
                                </h2>
                            </div>
                            <p className='text-xs text-muted-foreground mt-0.5'>
                                @{user.firstName.toLowerCase()}
                                {user.lastName.toLowerCase()}
                            </p>
                            <Badge
                                variant='secondary'
                                className='mt-2 text-[10px] font-normal'>
                                online
                            </Badge>
                        </div>
                    </div>

                    <Separator />

                    <div className='flex-1 overflow-y-auto px-2 py-2'>
                        <nav className='flex flex-col gap-0.5'>
                            <SettingsItem
                                icon={Bell}
                                label='Powiadomienia'
                                detail='Wlaczone'
                            />
                            <SettingsItem
                                icon={Moon}
                                label='Motyw'
                                detail='Jasny'
                            />
                        </nav>
                    </div>

                    <Separator />

                    <div className='p-3'>
                        <LogoutBtn />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function SettingsItem({
    icon: Icon,
    label,
    detail,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    detail?: string;
}) {
    return (
        <button
            type='button'
            className='flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left hover:bg-secondary transition-colors'>
            <Icon className='h-4 w-4 text-muted-foreground shrink-0' />
            <span className='flex-1 text-sm text-foreground'>{label}</span>
            {detail && (
                <span className='text-xs text-muted-foreground'>{detail}</span>
            )}
        </button>
    );
}

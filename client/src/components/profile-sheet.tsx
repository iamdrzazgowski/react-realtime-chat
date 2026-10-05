import React, { memo } from 'react';

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
import { useSettings } from '@/context/settings-contex';

interface ProfileSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: {
        firstName?: string;
        lastName?: string;
    };
}

function ProfileSheetInner({ open, onOpenChange, user }: ProfileSheetProps) {
    const { theme, notification, setTheme, setNotification } = useSettings();

    const firstName = user?.firstName ?? '';
    const lastName = user?.lastName ?? '';
    const initials =
        `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || '?';

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side='left' className='w-80 p-0'>
                <SheetHeader className='sr-only'>
                    <SheetTitle>Profile</SheetTitle>
                    <SheetDescription>User profile settings</SheetDescription>
                </SheetHeader>

                <div className='flex flex-col h-full'>
                    <div className='flex flex-col items-center gap-3 px-6 pt-10 pb-6'>
                        <div className='relative group'>
                            <Avatar className='h-20 w-20'>
                                <AvatarFallback className='bg-primary text-primary-foreground text-2xl font-semibold'>
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='text-center'>
                            <div className='flex items-center gap-1.5'>
                                <h2 className='text-base font-semibold text-foreground'>
                                    {firstName} {lastName}
                                </h2>
                            </div>
                            <p className='text-xs text-muted-foreground mt-0.5'>
                                @{firstName.toLowerCase()}
                                {lastName.toLowerCase()}
                            </p>
                            <Badge
                                variant='secondary'
                                className='mt-2 text-[10px] font-normal bg-green-400'>
                                online
                            </Badge>
                        </div>
                    </div>

                    <Separator />

                    <div className='flex-1 overflow-y-auto px-2 py-2'>
                        <nav className='flex flex-col gap-0.5'>
                            <SettingsItem
                                icon={Bell}
                                label='Notifications'
                                detail={notification ? 'On' : 'Off'}
                                onClick={setNotification}
                            />
                            <SettingsItem
                                icon={Moon}
                                label='Dark theme'
                                detail={theme === 'light' ? 'Off' : 'On'}
                                onClick={setTheme}
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

// Hoisted out of the sheet render path (rerender-no-inline-components):
// defining it at module level keeps its identity stable across opens.
function SettingsItem({
    icon: Icon,
    label,
    detail,
    onClick,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    detail?: string;
    onClick: () => void;
}) {
    return (
        <button
            type='button'
            onClick={onClick}
            className='flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left hover:bg-secondary transition-colors cursor-pointer'>
            <Icon className='h-4 w-4 text-muted-foreground shrink-0' />
            <span className='flex-1 text-sm text-foreground'>{label}</span>
            {detail ? (
                <span className='text-xs text-muted-foreground'>{detail}</span>
            ) : null}
        </button>
    );
}

export const ProfileSheet = memo(ProfileSheetInner);

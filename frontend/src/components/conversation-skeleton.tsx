import { ScrollArea } from '@/components/ui/scroll-area';

export function ConversationSkeleton() {
    return (
        <div className='flex h-full flex-col bg-background'>
            {/* Header */}
            <div className='flex items-center gap-3 border-b px-4 py-3'>
                <div className='h-9 w-9 rounded-full bg-muted animate-pulse' />
                <div className='flex flex-col gap-1.5'>
                    <div className='h-3.5 w-32 rounded-full bg-muted animate-pulse' />
                    <div className='h-2.5 w-16 rounded-full bg-muted animate-pulse' />
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className='flex-1 px-4'>
                <div className='flex flex-col gap-4 py-4'>
                    <MessageSkeletonRow
                        align='left'
                        widths={['w-48', 'w-64']}
                    />
                    <MessageSkeletonRow align='right' widths={['w-56']} />
                    <MessageSkeletonRow
                        align='left'
                        widths={['w-72', 'w-40']}
                    />
                    <MessageSkeletonRow
                        align='right'
                        widths={['w-48', 'w-60']}
                    />
                    <MessageSkeletonRow align='left' widths={['w-52']} />
                    <MessageSkeletonRow
                        align='right'
                        widths={['w-36', 'w-56', 'w-44']}
                    />
                    <MessageSkeletonRow
                        align='left'
                        widths={['w-64', 'w-48']}
                    />
                </div>
            </ScrollArea>

            {/* Input */}
            <div className='border-t px-4 py-3'>
                <div className='h-10 w-full rounded-lg bg-muted animate-pulse' />
            </div>
        </div>
    );
}

function MessageSkeletonRow({
    align,
    widths,
}: {
    align: 'left' | 'right';
    widths: string[];
}) {
    return (
        <div
            className={`flex flex-col gap-1 ${align === 'right' ? 'items-end' : 'items-start'}`}>
            {widths.map((w, i) => (
                <div
                    key={i}
                    className={`h-8 ${w} rounded-2xl bg-muted animate-pulse ${
                        align === 'right' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                    }`}
                />
            ))}
        </div>
    );
}

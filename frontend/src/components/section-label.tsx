export function SectionLabel({ label }: { label: string }) {
    return (
        <div className='px-4 py-1.5'>
            <p className='text-[10px] font-medium text-muted-foreground uppercase tracking-wider'>
                {label}
            </p>
        </div>
    );
}

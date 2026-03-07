export default function LoadingScreen() {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-background'>
            <div className='h-10 w-10 rounded-full border-4 border-muted border-t-primary animate-spin' />
        </div>
    );
}

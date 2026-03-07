export default function FormErrorLabel({
    error,
}: {
    error: string | undefined;
}) {
    return (
        <span>
            {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
        </span>
    );
}

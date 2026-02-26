import { Navigate } from 'react-router';
import { useUser } from '../hooks/useAuth';

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, isError } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (isError || !user) return <Navigate to='/login' />;

    return <>{children}</>;
}

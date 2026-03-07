import { Navigate } from 'react-router';
import { useUser } from '../hooks/useAuth';
import LoadingScreen from '@/pages/loading-page';

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, isError } = useUser();

    if (isLoading) return <LoadingScreen />;
    if (isError || !user) return <Navigate to='/login' />;

    return <>{children}</>;
}

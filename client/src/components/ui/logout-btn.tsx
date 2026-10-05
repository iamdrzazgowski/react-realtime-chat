import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './button';
import { LogOut } from 'lucide-react';

export default function LogoutBtn() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
        } catch {
            // Storage unavailable: still navigate away.
        }
        // Clear cached user/conversations so the next login starts clean.
        queryClient.removeQueries({ queryKey: ['user'] });
        queryClient.removeQueries({ queryKey: ['conversations'] });
        navigate('/login');
    };

    return (
        <Button
            onClick={handleLogout}
            variant='ghost'
            className='w-full justify-start gap-2.5 h-10 text-destructive hover:text-destructive hover:bg-destructive/10 text-sm font-normal'>
            <LogOut className='h-4 w-4' />
            Log out
        </Button>
    );
}

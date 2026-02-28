import { useNavigate } from 'react-router';
import { Button } from './button';
import { LogOut } from 'lucide-react';

export default function LogoutBtn() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Button
            onClick={() => handleLogout()}
            variant='ghost'
            className='w-full justify-start gap-2.5 h-10 text-destructive hover:text-destructive hover:bg-destructive/10 text-sm font-normal'>
            <LogOut className='h-4 w-4' />
            Wyloguj sie
        </Button>
    );
}

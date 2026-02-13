import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { RouterProvider } from 'react-router';
import { router } from './routes/router.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App>
            <RouterProvider router={router} />
        </App>
    </StrictMode>,
);

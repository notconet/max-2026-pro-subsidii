import { createRootRoute, Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar';
import styles from './RootLayout.module.css';

export const Route = createRootRoute({
    component: () => (
        <main className={styles.layout}>
            <Outlet />
            <NavBar />
        </main>
    ),
});

import { Outlet, useRouterState } from '@tanstack/react-router';
import NavBar from './NavBar';
import styles from '../routes/RootLayout.module.css';

export default function AppShell() {
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    });
    const isMatcherPage = pathname === '/subsidy-matcher';

    return (
        <main className={isMatcherPage ? styles.fullscreen : styles.layout}>
            <Outlet />
            {!isMatcherPage && <NavBar />}
        </main>
    );
}

import { PiStackBold, PiBellBold, PiUserBold } from 'react-icons/pi';

import styles from './NavBar.module.css';
import { Ripple, Typography } from '@maxhub/max-ui';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export default function NavBar() {
    const buttons = [
        {
            icon: <PiBellBold size={24} />,
            text: 'Напоминания',
            to: '/notifications',
        },
        {
            icon: <PiStackBold size={24} />,
            text: 'Субсидии',
            to: '/',
        },
        {
            icon: <PiUserBold size={24} />,
            text: 'Профиль',
            to: '/profile',
        },
    ] as const;
    return (
        <div className={styles.bar}>
            {buttons.map((b) => (
                <NavBarButton
                    key={b.to}
                    icon={b.icon}
                    text={b.text}
                    to={b.to}
                />
            ))}
        </div>
    );
}

type ButtonProps = {
    icon: ReactNode;
    text: string;
    to: '/' | '/profile' | '/notifications';
};

function NavBarButton({ icon, text, to }: ButtonProps) {
    return (
        <Link
            to={to}
            className={styles.button}
            activeProps={{ className: `${styles.button} ${styles.active}` }}
        >
            <div className={styles.icon}>{icon}</div>
            <Typography.Label>{text}</Typography.Label>
            <Ripple />
        </Link>
    );
}

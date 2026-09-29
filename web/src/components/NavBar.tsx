import { PiStackBold, PiBellBold, PiUserBold } from 'react-icons/pi';

import styles from './NavBar.module.css';
import { Ripple, Typography } from '@maxhub/max-ui';
import { useState, type ReactNode } from 'react';

type Props = {};

export default function NavBar({}: Props) {
    const [activeIdx, setActiveIdx] = useState<number>(1);

    const buttons = [
        {
            icon: <PiBellBold size={24} />,
            text: 'Напоминания',
            onClick: () => setActiveIdx(0),
        },
        {
            icon: <PiStackBold size={24} />,
            text: 'Субсидии',
            onClick: () => setActiveIdx(1),
        },
        {
            icon: <PiUserBold size={24} />,
            text: 'Профиль',
            onClick: () => setActiveIdx(2),
        },
    ];
    return (
        <div className={styles.bar}>
            {buttons.map((b, i) => (
                <NavBarButton
                    key={i}
                    active={i == activeIdx}
                    icon={b.icon}
                    text={b.text}
                    onClick={b.onClick}
                />
            ))}
        </div>
    );
}

type ButtonProps = {
    active: boolean;
    icon: ReactNode;
    text: string;
    onClick: () => void;
};

function NavBarButton({ active, icon, text, onClick }: ButtonProps) {
    const classActive = active ? styles.active : '';
    const className = `${styles.button} ${classActive}`;
    return (
        <button onClick={onClick} className={className}>
            <div className={styles.icon}>{icon}</div>
            <Typography.Label>{text}</Typography.Label>
            <Ripple>
            </Ripple>
        </button>
    );
}

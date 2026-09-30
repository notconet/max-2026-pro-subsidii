import { useRef, useState } from 'react';
import {
    PiBellRingingBold,
    PiCalendarDotsBold,
    PiCaretRightBold,
    PiClockBold,
} from 'react-icons/pi';

import PageHeading from '../components/PageHeading';
import { subsidies } from '../lib/subsidies';
import styles from './NotificationsPage.module.css';

export default function NotificationsPage() {
    const [date, setDate] = useState('2026-10-15');
    const [time, setTime] = useState('10:00');
    const [isSet, setIsSet] = useState(false);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);
    const subsidy = subsidies[0];

    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString(
        'ru-RU',
        { day: 'numeric', month: 'long', year: 'numeric' },
    );

    const openPicker = (input: HTMLInputElement | null) => {
        if (!input) return;

        if (typeof input.showPicker === 'function') {
            input.showPicker();
        } else {
            input.click();
        }
    };

    return (
        <>
            <PageHeading text="Напоминание" />
            <div className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.bellBadge} aria-hidden="true">
                        <PiBellRingingBold />
                    </div>
                    <h1>Не пропустите срок подачи</h1>
                    <p>
                        Напомним заранее собрать документы для субсидии на
                        развитие бизнеса.
                    </p>
                </section>

                <section
                    className={styles.settings}
                    aria-label="Параметры напоминания"
                >
                    <div className={styles.picker}>
                        <button
                            className={styles.settingRow}
                            type="button"
                            onClick={() => openPicker(dateInputRef.current)}
                            aria-label={`Дата напоминания: ${formattedDate}`}
                        >
                            <PiCalendarDotsBold
                                className={styles.settingIcon}
                                aria-hidden="true"
                            />
                            <span className={styles.settingText}>
                                <span className={styles.settingLabel}>
                                    Дата напоминания
                                </span>
                                <strong>{formattedDate}</strong>
                            </span>
                            <PiCaretRightBold
                                className={styles.chevron}
                                aria-hidden="true"
                            />
                        </button>
                        <input
                            ref={dateInputRef}
                            className={styles.hiddenInput}
                            type="date"
                            value={date}
                            onChange={(event) => {
                                setDate(event.target.value);
                                setIsSet(false);
                            }}
                            aria-label="Дата напоминания"
                            tabIndex={-1}
                        />
                    </div>

                    <div className={styles.picker}>
                        <button
                            className={styles.settingRow}
                            type="button"
                            onClick={() => openPicker(timeInputRef.current)}
                            aria-label={`Время напоминания: ${time}`}
                        >
                            <PiClockBold
                                className={styles.settingIcon}
                                aria-hidden="true"
                            />
                            <span className={styles.settingText}>
                                <span className={styles.settingLabel}>
                                    Время
                                </span>
                                <strong>{time}</strong>
                            </span>
                            <PiCaretRightBold
                                className={styles.chevron}
                                aria-hidden="true"
                            />
                        </button>
                        <input
                            ref={timeInputRef}
                            className={styles.hiddenInput}
                            type="time"
                            value={time}
                            onChange={(event) => {
                                setTime(event.target.value);
                                setIsSet(false);
                            }}
                            aria-label="Время напоминания"
                            tabIndex={-1}
                        />
                    </div>
                </section>

                <section
                    className={styles.program}
                    aria-label="Выбранная программа"
                >
                    <span className={styles.programLabel}>Программа</span>
                    <h2>{subsidy.title}</h2>
                </section>

                <div className={styles.actionArea}>
                    <button
                        className={styles.submitButton}
                        type="button"
                        onClick={() => setIsSet(true)}
                    >
                        <PiBellRingingBold aria-hidden="true" />
                        <span>
                            {isSet
                                ? 'Напоминание установлено'
                                : 'Установить напоминание'}
                        </span>
                    </button>
                    <p className={styles.confirmation} role="status">
                        {isSet ? `Напомним ${formattedDate} в ${time}` : ''}
                    </p>
                </div>
            </div>
        </>
    );
}

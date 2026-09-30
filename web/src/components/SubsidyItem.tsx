import styles from './SubsidyItem.module.css';
import { useState } from 'react';
import {
    PiBookmarkSimple,
    PiBookmarkSimpleFill,
    PiCaretRight,
} from 'react-icons/pi';

type Props = {
    id: number;
    title: string;
    description: string;
    sum: number;
    months: number;
    initiallyBookmarked?: boolean;
    onBookmarkChange?: (id: number, isBookmarked: boolean) => void;
    onDetails?: (id: number) => void;
};

export default function SubsidyItem({
    id,
    title,
    description,
    sum,
    months,
    initiallyBookmarked = false,
    onBookmarkChange,
    onDetails,
}: Props) {
    const [isBookmarked, setIsBookmarked] = useState(initiallyBookmarked);
    const monthForm = new Intl.PluralRules('ru-RU').select(months);
    const monthLabel =
        monthForm === 'one'
            ? 'месяц'
            : monthForm === 'few'
              ? 'месяца'
              : 'месяцев';
    const formattedSum = new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 0,
    }).format(sum);

    const toggleBookmark = () => {
        const nextBookmarked = !isBookmarked;
        setIsBookmarked(nextBookmarked);
        onBookmarkChange?.(id, nextBookmarked);
    };

    const openDetails = () => onDetails?.(id);

    return (
        <article id={`subsidy-${id}`} className={styles.item}>
            <div className={styles.heading}>
                <h2 className={styles.title}>{title}</h2>
                <button
                    className={styles.bookmark}
                    type="button"
                    aria-label={
                        isBookmarked
                            ? 'Убрать из сохранённых'
                            : 'Сохранить субсидию'
                    }
                    aria-pressed={isBookmarked}
                    onClick={toggleBookmark}
                >
                    {isBookmarked ? (
                        <PiBookmarkSimpleFill aria-hidden="true" />
                    ) : (
                        <PiBookmarkSimple aria-hidden="true" />
                    )}
                </button>
            </div>

            <div className={styles.badges}>
                <span className={styles.amount}>До {formattedSum} ₽</span>
                <span className={styles.term}>
                    До {months} {monthLabel}
                </span>
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.footer}>
                <button
                    className={styles.details}
                    type="button"
                    onClick={openDetails}
                >
                    Подробнее
                </button>
                <button
                    className={styles.arrow}
                    type="button"
                    aria-label={`Подробнее: ${title}`}
                    onClick={openDetails}
                >
                    <PiCaretRight aria-hidden="true" />
                </button>
            </div>
        </article>
    );
}

import { Link } from '@tanstack/react-router';
import PageHeading from '../components/PageHeading';
import SubsidyItem from '../components/SubsidyItem';
import { savedSubsidyIds, subsidies } from '../lib/subsidies';
import styles from './SubsidiiPage.module.css';

export default function SubsidiiPage() {
    return (
        <div className={styles.page}>
            <PageHeading text="Субсидии" />
            <section className={styles.intro}>
                <p className={styles.introText}>
                    Мы поможем подобрать субсидию специально для вашего бизнеса
                    👇
                </p>
                <Link className={styles.matchButton} to="/subsidy-matcher">
                    Подобрать субсидии
                </Link>
            </section>
            <section
                className={styles.list}
                id="available-subsidies"
                aria-label="Доступные субсидии"
            >
                <h2 className={styles.listTitle}>Все субсидии</h2>
                <div className={styles.items}>
                    {subsidies.map((subsidy) => (
                        <SubsidyItem
                            key={subsidy.id}
                            {...subsidy}
                            initiallyBookmarked={savedSubsidyIds.includes(
                                subsidy.id,
                            )}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

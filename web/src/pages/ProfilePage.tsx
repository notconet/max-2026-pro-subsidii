import { parseInitData } from '../lib/parser';
import PageHeading from '../components/PageHeading';
import { Avatar, Typography } from '@maxhub/max-ui';
import SubsidyItem from '../components/SubsidyItem';
import { savedSubsidyIds, subsidies } from '../lib/subsidies';

import styles from './ProfilePage.module.css';

export default function ProfilePage() {
    const webApp = (window as any).WebApp;
    console.log(webApp);

    const initData = parseInitData(webApp.initDataManager.rawInitData);

    const _user = initData?.user;

    const userFullName = _user
        ? `${_user?.first_name} ${_user?.last_name}`
        : 'Загадочный Вупсень';
    return (
        <div className={styles.page}>
            <PageHeading text="Профиль" />
            <div className={styles.content}>
                <div className={styles.avatar}>
                    <Avatar.Container size={128}>
                        <Avatar.Image
                            src={_user?.photo_url}
                            alt={userFullName}
                            fallback={'AV'}
                        />
                    </Avatar.Container>
                    <Typography.Display>{userFullName}</Typography.Display>
                </div>
                <section className={styles.section}>
                    <div className={styles.sectionHeading}>
                        <Typography.Display>
                            Сохранённые субсидии
                        </Typography.Display>
                    </div>
                    <div className={styles.savedList}>
                        {subsidies
                            .filter((subsidy) =>
                                savedSubsidyIds.includes(subsidy.id),
                            )
                            .map((subsidy) => (
                                <SubsidyItem
                                    key={subsidy.id}
                                    {...subsidy}
                                    initiallyBookmarked
                                />
                            ))}
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.sectionHeading}>
                        <Typography.Display>История поиска</Typography.Display>
                    </div>
                </section>
            </div>
        </div>
    );
}

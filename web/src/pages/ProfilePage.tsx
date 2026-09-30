import { parseInitData } from '../lib/parser';
import PageHeading from '../components/PageHeading';
import { Avatar, Flex, Panel, Typography } from '@maxhub/max-ui';
import SubsidyItem from '../components/SubsidyItem';

import styles from './ProfilePage.module.css';

const savedSubsidies = [
    {
        id: 1,
        title: 'Субсидия на развитие бизнеса в сфере услуг',
        description:
            'Компенсация части затрат на развитие и продвижение бизнеса.',
        sum: 500_000,
        months: 12,
    },
    {
        id: 2,
        title: 'Грант на запуск собственного дела',
        description:
            'Финансовая поддержка для открытия и развития собственного бизнеса.',
        sum: 350_000,
        months: 6,
    },
    {
        id: 3,
        title: 'Субсидия на цифровизацию малого бизнеса',
        description:
            'Возмещение расходов на внедрение цифровых сервисов и автоматизацию.',
        sum: 1_000_000,
        months: 12,
    },
];

export default function ProfilePage() {
    const webApp = (window as any).WebApp;
    console.log(webApp);

    const initData = parseInitData(webApp.initDataManager.rawInitData);

    const _user = initData?.user;

    const userFullName = _user
        ? `${_user?.first_name} ${_user?.last_name}`
        : 'Загадочный Вупсень';
    return (
        <>
            <PageHeading text="Профиль" />
            <Panel className={styles.avatarPanel}>
                <Flex direction="column" align="center" gap={28}>
                    <Avatar.Container size={128}>
                        <Avatar.Image
                            src={_user?.photo_url}
                            alt={userFullName}
                            fallback={'AV'}
                        />
                    </Avatar.Container>
                    <Typography.Display>{userFullName}</Typography.Display>
                </Flex>
            </Panel>
            <Panel className={styles.savedPanel}>
                <Flex direction="column" gap={16}>
                    <Typography.Display>
                        Сохранённые субсидии
                    </Typography.Display>
                    {savedSubsidies.map((subsidy) => (
                        <SubsidyItem
                            key={subsidy.id}
                            {...subsidy}
                            initiallyBookmarked
                        />
                    ))}
                </Flex>
            </Panel>
            <Panel className={styles.historyPanel}>
                <Flex direction="column" gap={16}>
                    <Typography.Display>История поиска</Typography.Display>
                </Flex>
            </Panel>
        </>
    );
}

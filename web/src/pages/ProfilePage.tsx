import { parseInitData } from '../lib/parser';
import PageHeading from '../components/PageHeading';
import { Avatar, Flex, Panel, Typography } from '@maxhub/max-ui';

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
        <>
            <PageHeading text="Профиль" />
            <Panel className={styles.panel}>
                <Flex direction="column" align="center" gap={28}>
                    <Avatar.Container
                        size={128}
                    >
                        <Avatar.Image
                            src={_user?.photo_url}
                            alt={userFullName}
                            fallback={'AV'}
                        />
                    </Avatar.Container>
                    <Typography.Display>{userFullName}</Typography.Display>
                </Flex>
            </Panel>
        </>
    );
}

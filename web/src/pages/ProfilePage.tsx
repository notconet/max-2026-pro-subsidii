import { parseInitData } from '../lib/parser';
import PageHeading from '../components/PageHeading';
import { PiPenBold } from 'react-icons/pi';
import { Button, IconButton } from '@maxhub/max-ui';

export default function ProfilePage() {
    const webApp = (window as any).WebApp;
    console.log(webApp);

    const initData = parseInitData(webApp.initDataManager.rawInitData);

    const _user = initData?.user;
    return (
        <PageHeading text="Профиль">
        </PageHeading>
    );
}

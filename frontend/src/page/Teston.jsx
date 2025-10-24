import { useLaunchParams } from '@telegram-apps/sdk-react';

const Teston = () => {

    const lp = useLaunchParams();
    return (
        <div>
            <h1>Параметры запуска</h1>
            <p>Имя: {lp.user?.first_name}</p>
            <p>ID: {lp.user?.id}</p>
            <p>Язык: {lp.initDataUnsafe?.user?.language_code}</p>
            <p>Тема: {JSON.stringify(lp.themeParams)}</p>
            <p>Платформа: {lp.platform}</p>
        </div>
    );
};

export default Teston;
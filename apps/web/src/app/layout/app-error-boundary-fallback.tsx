import { useTranslation } from 'react-i18next';

export const AppErrorBoundaryFallback = () => {
    const { t } = useTranslation();
    return <div>{t('app-error-mssage')}</div>;
};

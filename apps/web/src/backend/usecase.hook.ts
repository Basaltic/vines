import { useInject } from '@vines/core';
import { AppUseCaseToken } from './usecase.interface';

export const useAppUseCases = () => {
    const vinesNodeUseCases = useInject(AppUseCaseToken);
    return vinesNodeUseCases;
};

import { useInject } from '@viness/core';
import { AppUseCaseToken } from './usecase.interface';

export const useAppUseCases = () => {
    const vinesNodeUseCases = useInject(AppUseCaseToken);
    return vinesNodeUseCases;
};

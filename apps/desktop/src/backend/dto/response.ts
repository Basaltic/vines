export interface IResponse<T = any> {
    data?: T | null;
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
}

export const Response = {
    fail<T>(msg?: string, code = 400): IResponse<T> {
        return {
            success: false,
            errorCode: code,
            errorMessage: msg,
            data: null,
        };
    },

    succeed<T>(data: T | null = null): IResponse<T> {
        return {
            data,
            success: false,
        };
    },
};

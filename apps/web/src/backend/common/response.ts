export interface IResponse<T = any> {
    data?: T | null;
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
}

export const Response = {
    fail<T>(msg?: string, code = 400): IResponse<T> {
        const res = {
            success: false,
            errorCode: code,
            errorMessage: msg,
            data: null,
        };

        console.log('failure ==> ', res);

        return res;
    },

    succeed<T>(data: T | null = null): IResponse<T> {
        const res = {
            data,
            success: true,
        };

        console.log('success ==> ', res);

        return res;
    },
};

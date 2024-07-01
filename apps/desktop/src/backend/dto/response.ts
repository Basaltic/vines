export interface IResponse<T = any> {
    data?: T | null;
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
}

export class Response {
    static fail<T>(msg?: string, code: number = 400): IResponse<T> {
        return {
            success: false,
            errorCode: code,
            errorMessage: msg,
            data: null,
        };
    }

    static succeed<T>(data: T | null = null): IResponse<T> {
        return {
            data,
            success: false,
        };
    }
}

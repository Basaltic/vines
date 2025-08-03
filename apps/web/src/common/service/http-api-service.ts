import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export interface IServiceResponse<T> extends AxiosResponse<T> {
    $data: T;
    $error: null | {
        code: string | number;
        message: string;
    };
    $success: boolean;
}

/**
 * 接口返回类型
 */
export interface IServicePromise<T = any> extends Promise<IServiceResponse<T>> {
    /**
     * 接口发送取消
     */
    cancel: () => void;
}

/**
 * Http Api Service
 */
export default class HttpApi {
    private instance: AxiosInstance;

    constructor(config?: AxiosRequestConfig) {
        if (!config) {
            config = { withCredentials: true };
        } else {
            config = Object.assign(config, { withCredentials: true });
        }

        this.instance = axios.create(config);

        /**
         * 把发生错误的请求拦截统一格式
         */
        this.instance.interceptors.response.use(
            (resp) => resp,
            (error) => {
                const result: any = {};
                if (error.response) {
                    result.data = null;
                    result.error = {
                        code: error.response.status,
                        message: error.message,
                    };
                } else {
                    result.data = null;
                    result.error = {
                        code: -999999,
                        message: error.message,
                    };
                }

                return Promise.resolve({ data: result });
            },
        );

        // Response Interceptor 1
        this.instance.interceptors.response.use((resp: any) => {
            const response = resp as IServiceResponse<{ data?: any; error?: any; message: any; code: number | string }>;

            response.$error = response.data.error;
            response.$data = response.data.data;
            response.$success = !response.$error;

            if (response.$error && response.$error.code === 401) {
                this.toLogin();
            }

            return response;
        });
    }

    /**
     * Get Request
     * @param url
     * @param config
     */
    get<P = any, T = any>(url: string, config?: AxiosRequestConfig) {
        return (params?: P) => {
            const source = axios.CancelToken.source();

            if (config) {
                config.cancelToken = source.token;
            } else {
                config = { cancelToken: source.token };
            }

            config.params = params;

            const promise = this.instance.get(url, config) as any;
            promise.cancel = () => source.cancel();

            return promise as IServicePromise<T>;
        };
    }

    /**
     * Post Request
     * @param url
     * @param data
     * @param config
     */
    post<P = any, T = any>(url: string, config?: AxiosRequestConfig) {
        return (params?: P) => {
            const source = axios.CancelToken.source();
            if (config) {
                config.cancelToken = source.token;
            } else {
                config = { cancelToken: source.token };
            }

            const promise = this.instance.post(url, params, config) as any;
            promise.cancel = () => source.cancel();

            return promise as IServicePromise<T>;
        };
    }

    /**
     * 跳转到登录界面
     */
    private toLogin() {
        Cookies.remove('p_auth_uid');
        Cookies.remove('p_auth_key');
        // TODO: 这里可以触发弹出一个登录弹框来登录
        window.history.pushState({}, '', '/#/login');
    }
}

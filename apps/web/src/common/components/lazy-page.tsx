import React, { lazy, Suspense } from 'react';
import { PageLoading } from './page-loading';

export default function LazyPage(loader: any) {
    const Page = lazy(loader);
    return (props: any) => (
        <PageErrorBoundary>
            <Suspense fallback={<PageLoading />}>
                <Page {...props} />
            </Suspense>
        </PageErrorBoundary>
    );
}

/**
 * 处理页面发生错误的 fallback 组件
 */
class PageErrorBoundary extends React.Component<
    { children: any },
    {
        hasError: boolean;
    }
> {
    public static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public override componentDidCatch(error: any, info: any) {
        console.error(error, info);
    }

    /**
     * render
     */
    public override render() {
        // 由于对于IE浏览器支持有限，错误的时候，这里加上一个判断，如果是IE的话直接展示一段话提示用户。
        // Internet Explorer 6-11
        const doc: any = document;
        const isIE = /*@cc_on!@*/ false || !!doc.documentMode;

        if (this.state.hasError) {
            return (
                <div style={{ paddingTop: '100px' }}>
                    <p>发生意外错误，请稍后尝试</p>
                    <p>{isIE ? '检测到IE浏览器！对于IE浏览器的支持暂不完整，请使用其他浏览器比如QQ浏览器，Chrome等' : ''}</p>
                </div>
            );
        }
        return this.props?.children;
    }
}

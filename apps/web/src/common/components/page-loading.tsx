/**
 * 页面级加载
 */
export function PageLoading() {
    return (
        <div className="w-full h-full center">
            <div className="radial-progress animate-spin" style={{ '--value': 50, '--size': '3rem' } as any} />
        </div>
    );
}

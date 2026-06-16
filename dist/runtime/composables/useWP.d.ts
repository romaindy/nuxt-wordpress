type WPFetchOptions<T> = Parameters<typeof $fetch<T>>[1];
type WPFetchResult<T> = ReturnType<typeof $fetch<T>>;
interface UseWPComposable {
    fetchWP: <T>(endpoint: string, options?: WPFetchOptions<T>) => WPFetchResult<T>;
    find: <T>(endpoint: string, options?: WPFetchOptions<T>) => WPFetchResult<T>;
    findOne: <T>(slug: string, type?: string, options?: WPFetchOptions<T>) => WPFetchResult<T>;
}
export declare const useWP: () => UseWPComposable;
export {};

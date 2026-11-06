import { type Ref } from '#imports';
export declare const useWPSlug: (slug: string | Ref<string>, options?: {
    type?: "posts" | "pages" | string;
    applySEO?: boolean;
}) => {
    data: any;
    error: Ref<Error | null, Error | null>;
    loading: Ref<boolean, boolean>;
    refresh: () => Promise<void>;
};

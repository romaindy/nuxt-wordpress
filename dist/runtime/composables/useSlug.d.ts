import { type Ref } from '#imports';
import type { WPPost } from '../types/WPPost.js';
export declare const useWPSlug: (slug: string | Ref<string>, options?: {
    type?: "posts" | "pages" | string;
    applySEO?: boolean;
}) => {
    data: Ref<{
        [x: string]: unknown;
        id: number;
        slug: string;
        title: {
            rendered: string;
        };
        content: {
            rendered: string;
        };
        excerpt?: {
            rendered: string;
        } | undefined;
        featured_media?: number | undefined;
        yoast_head_json?: YoastHeadJson;
    } | null, WPPost | {
        [x: string]: unknown;
        id: number;
        slug: string;
        title: {
            rendered: string;
        };
        content: {
            rendered: string;
        };
        excerpt?: {
            rendered: string;
        } | undefined;
        featured_media?: number | undefined;
        yoast_head_json?: YoastHeadJson;
    } | null>;
    error: Ref<Error | null, Error | null>;
    loading: Ref<boolean, boolean>;
    refresh: () => Promise<void>;
};

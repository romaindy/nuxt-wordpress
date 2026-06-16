import { ref, watchEffect, unref } from "#imports";
import { useYoastSEO } from "#imports";
import { useWP } from "./useWP.js";
export const useWPSlug = (slug, options = {}) => {
  const type = options.type ?? "pages";
  const applySEO = options.applySEO ?? true;
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const { findOne } = useWP();
  const fetchData = async () => {
    loading.value = true;
    try {
      const slugValue = unref(slug);
      const post = await findOne(slugValue, type);
      if (!post) {
        data.value = null;
        error.value = new Error(`No ${type} found with slug "${slugValue}"`);
      } else {
        data.value = post;
        error.value = null;
        if (applySEO && post.yoast_head_json) {
          useYoastSEO(post.yoast_head_json);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      } else {
        error.value = new Error(String(err));
      }
      data.value = null;
    } finally {
      loading.value = false;
    }
  };
  watchEffect(() => {
    if (unref(slug)) fetchData();
  });
  return { data, error, loading, refresh: fetchData };
};

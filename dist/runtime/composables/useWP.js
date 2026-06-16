import { useRuntimeConfig } from "#imports";
export const useWP = () => {
  const config = useRuntimeConfig();
  const { baseUrl } = config.public.wordpress;
  const fetchWP = (endpoint, options) => {
    return $fetch(`${baseUrl}/wp-json/wp/v2/${endpoint}`, options);
  };
  const findOne = (slug, type = "pages", options) => {
    return fetchWP(`${type}?slug=${slug}`, options);
  };
  return { fetchWP, find: fetchWP, findOne };
};

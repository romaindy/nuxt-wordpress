import { useRuntimeConfig, useFetch } from "#imports";
export const useWordPress = () => {
  const config = useRuntimeConfig();
  const { baseUrl } = config.public.wordpress;
  const findOne = (endpoint, slug, options = {}) => {
    return useFetch(
      `${baseUrl}/wp-json/wp/v2/${endpoint}`,
      {
        query: {
          slug
        },
        transform: (data) => {
          return data?.[0] ?? null;
        },
        ...options
      }
    );
  };
  const find = (endpoint, options = {}) => {
    return useFetch(`${baseUrl}/wp-json/wp/v2/${endpoint}`, options);
  };
  const post = (endpoint, options = {}) => {
    return useFetch(`${baseUrl}/wp-json/wp/v2/${endpoint}`, { method: "POST", ...options });
  };
  return {
    findOne,
    find,
    post
  };
};

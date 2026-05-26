import { useRuntimeConfig } from '#imports'

type WPFetchOptions<T> = Parameters<typeof $fetch<T>>[1]
type WPFetchResult<T> = ReturnType<typeof $fetch<T>>

interface UseWPComposable {
  fetchWP: <T>(endpoint: string, options?: WPFetchOptions<T>) => WPFetchResult<T>
  find: <T>(endpoint: string, options?: WPFetchOptions<T>) => WPFetchResult<T>
  findOne: <T>(slug: string, type?: string, options?: WPFetchOptions<T>) => WPFetchResult<T>
}

export const useWP = (): UseWPComposable => {
  const config = useRuntimeConfig()
  const { baseUrl } = config.public.wordpress

  const fetchWP = <T>(endpoint: string, options?: WPFetchOptions<T>): WPFetchResult<T> => {
    return $fetch<T>(`${baseUrl}/wp-json/wp/v2/${endpoint}`, options)
  }

  const findOne = <T>(
    slug: string,
    type = 'pages',
    options?: WPFetchOptions<T>,
  ): WPFetchResult<T> => {
    return fetchWP<T>(`${type}?slug=${slug}`, options)
  }

  return { fetchWP, find: fetchWP, findOne }
}

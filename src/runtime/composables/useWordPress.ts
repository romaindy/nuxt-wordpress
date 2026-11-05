import {useRuntimeConfig, useFetch} from '#imports'
import type {FetchOptions} from 'ofetch'

export const useWordPress = () => {
  const config = useRuntimeConfig()

  const {baseUrl} = config.public.wordpress

  const findOne = <T>(
    endpoint: string,
    slug: string,
    options: FetchOptions = {},
  ) => {
    return useFetch<T[]>(`${baseUrl}/wp-json/wp/v2/${endpoint}`,
      {
        query: {
          slug,
        },
        transform: (data) => {
          return data?.[0] ?? null
        },
        ...options,
      })
  }

  const find = <T>(
    endpoint: string,
    options = {},
  ) => {
    return useFetch<T[]>(`${baseUrl}/wp-json/wp/v2/${endpoint}`, options)
  }

  const post = <T>(
    endpoint: string,
    options = {},
  ) => {
    return useFetch<T>(`${baseUrl}/wp-json/wp/v2/${endpoint}`, {method: 'POST', ...options})
  }

  return {
    findOne,
    find,
    post,
  }
}

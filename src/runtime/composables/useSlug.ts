import { ref, watchEffect, unref, type Ref } from '#imports'
import { useYoastSEO } from '#imports'
import type { WPPost } from '../types/WPPost'
import { useWP } from './useWP'

export const useWPSlug = (
  slug: string | Ref<string>,
  options: {
    type?: 'posts' | 'pages' | string // default 'pages'
    applySEO?: boolean // default true
  } = {},
) => {
  const type = options.type ?? 'pages'
  const applySEO = options.applySEO ?? true

  const data = ref<WPPost | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const { findOne } = useWP()

  const fetchData = async () => {
    loading.value = true
    try {
      const slugValue = unref(slug)
      const post = await findOne<WPPost>(slugValue, type)
      if (!post) {
        data.value = null
        error.value = new Error(`No ${type} found with slug "${slugValue}"`)
      }
      else {
        data.value = post
        error.value = null

        if (applySEO && post.yoast_head_json) {
          useYoastSEO(post.yoast_head_json)
        }
      }
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err
      }
      else {
        error.value = new Error(String(err))
      }
      data.value = null
    }
    finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (unref(slug)) fetchData()
  })

  return { data, error, loading, refresh: fetchData }
}

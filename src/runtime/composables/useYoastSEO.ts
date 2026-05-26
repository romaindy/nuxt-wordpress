import { useHead } from '#imports'
import normalizeYoast from '../utils/normalizeYoast'
import type { YoastHeadJson } from '../types/YoastHeadJson'

export const useYoastSEO = (
  source: { yoast_head_json: YoastHeadJson } | YoastHeadJson | null | undefined,
) => {
  const yoast: YoastHeadJson | undefined
    = (source && 'yoast_head_json' in source && source.yoast_head_json)
      ? normalizeYoast(source.yoast_head_json)
      : normalizeYoast(source) as YoastHeadJson ?? undefined

  if (!yoast) return

  const meta = []

  if (yoast.description) {
    meta.push({
      name: 'description',
      content: yoast.description,
    })
  }

  if (yoast.robots) {
    meta.push({
      name: 'robots',
      content: `${yoast.robots.index ?? ''}, ${yoast.robots.follow ?? ''}`.trim(),
    })
  }

  if (yoast.og_title) {
    meta.push({ property: 'og:title', content: yoast.og_title })
  }

  if (yoast.og_description) {
    meta.push({ property: 'og:description', content: yoast.og_description })
  }

  if (yoast.og_image?.[0]?.url) {
    meta.push({ property: 'og:image', content: yoast.og_image[0].url })
  }

  if (yoast.twitter_title) {
    meta.push({ name: 'twitter:title', content: yoast.twitter_title })
  }

  if (yoast.twitter_description) {
    meta.push({ name: 'twitter:description', content: yoast.twitter_description })
  }

  if (yoast.twitter_image) {
    meta.push({ name: 'twitter:image', content: yoast.twitter_image })
  }

  useHead({
    title: yoast.title,
    link: yoast.canonical
      ? [{ rel: 'canonical', href: yoast.canonical }]
      : [],
    meta,
  })
}

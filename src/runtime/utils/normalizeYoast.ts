import { decode } from 'he'
import type { YoastHeadJson } from '#imports'

const decodeHtml = (value?: string) => {
  if (!value) return value

  return value.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, '\'')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&#8217;/g, '\'')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
}

export default function normalizeYoast(yoast: YoastHeadJson): YoastHeadJson {
  return {
    ...yoast,
    title: decodeHtml(yoast.title),
    description: decodeHtml(yoast.description),
    og_title: decodeHtml(yoast.og_title),
    og_description: decodeHtml(yoast.og_description),
    twitter_title: decodeHtml(yoast.twitter_title),
    twitter_description: decodeHtml(yoast.twitter_description),
    robots: yoast.robots
      ? {
          index: decodeHtml(yoast.robots.index),
          follow: decodeHtml(yoast.robots.follow),
        }
      : undefined,
  }
}

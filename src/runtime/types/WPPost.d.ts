export interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt?: { rendered: string }
  featured_media?: number
  yoast_head_json?: YoastHeadJson
  [key: string]: unknown
}

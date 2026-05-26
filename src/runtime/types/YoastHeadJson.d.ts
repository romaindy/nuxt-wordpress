export interface YoastHeadJson {
  title?: string
  description?: string
  canonical?: string
  robots?: {
    index?: string
    follow?: string
  }
  og_title?: string
  og_description?: string
  og_image?: Array<{ url: string }>
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
}

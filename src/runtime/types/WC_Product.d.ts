interface WC_Product {
  id: number
  slug: string
  name: string
  permalink: string
  sku: string
  description: string
  short_description: string
  on_sale: boolean
  price: unknown
  categories: {
    id: number
    name: string
    slug: string
    link: string
  }[]
  brands: {
    id: number
    name: string
    slug: string
    link: string
  }[]
  is_in_stock: boolean
  featured_media?: number
  yoast_head_json?: YoastHeadJson
  images: WCImage[]

  [key: string]: unknown
}

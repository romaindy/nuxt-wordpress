interface WC_Cart {
  items: CartItem[]
  coupons: Coupon[]
  fees: Fee[]
  totals: CartTotals
  shipping_address: Address
  billing_address: BillingAddress
  needs_payment: boolean
  needs_shipping: boolean
  payment_requirements: string[]
  has_calculated_shipping: boolean
  shipping_rates: ShippingRate[]
  items_count: number
  items_weight: number
  cross_sells: unknown[]
  errors: CartError[]
  payment_methods: string[]
  extensions: Record<string, unknown>
}

/**
 * Cart item
 */
interface CartItem {
  key: string
  id: number
  type: CartItemType
  quantity: number
  quantity_limits: QuantityLimits
  name: string
  short_description: string
  description: string
  sku: string
  low_stock_remaining: number | null
  backorders_allowed: boolean
  show_backorder_badge: boolean
  sold_individually: boolean
  permalink: string
  slug: string
  images: CartItemImage[]
  variation: CartItemVariation[]
  item_data: CartItemData[]
  prices: Prices
  totals: CartItemTotals
  catalog_visibility: CatalogVisibility
  extensions: Record<string, unknown>
}

type CartItemType = 'simple' | 'variation' | string

type CatalogVisibility = 'visible' | 'catalog' | 'search' | 'hidden' | string

/**
 * Quantity restrictions
 */
interface QuantityLimits {
  minimum: number
  maximum: number
  multiple_of: number
  editable: boolean
}

/**
 * Product images
 */
interface CartItemImage {
  id: number
  src: string
  thumbnail: string
  srcset: string
  sizes: string
  thumbnail_srcset: string
  thumbnail_sizes: string
  name: string
  alt: string
}

/**
 * Product variation data
 *
 * WooCommerce can return attributes here when the cart item
 * corresponds to a variable product.
 */
interface CartItemVariation {
  attribute: string
  value: string
}

/**
 * Additional cart item data.
 *
 * WooCommerce can populate this when extensions add custom data.
 */
interface CartItemData {
  key: string
  value: string
}

/**
 * Product prices
 */
interface Prices {
  price: string
  regular_price: string
  sale_price: string
  price_range: PriceRange | null
  currency_code: string
  currency_symbol: string
  currency_minor_unit: number
  currency_decimal_separator: string
  currency_thousand_separator: string
  currency_prefix: string
  currency_suffix: string
  raw_prices: RawPrices
}

interface PriceRange {
  min_amount: string
  max_amount: string
}

interface RawPrices {
  precision: number
  price: string
  regular_price: string
  sale_price: string
}

/**
 * Cart item totals
 */
interface CartItemTotals {
  line_subtotal: string
  line_subtotal_tax: string
  line_total: string
  line_total_tax: string
  currency_code: string
  currency_symbol: string
  currency_minor_unit: number
  currency_decimal_separator: string
  currency_thousand_separator: string
  currency_prefix: string
  currency_suffix: string
}

/**
 * Coupons
 */
interface Coupon {
  code: string
  discount_type: DiscountType
  totals: CouponTotals
}

type DiscountType = 'percent' | 'fixed_cart' | 'fixed_product' | string

interface CouponTotals {
  total_discount: string
  total_discount_tax: string
  currency_code: string
  currency_symbol: string
  currency_minor_unit: number
  currency_decimal_separator: string
  currency_thousand_separator: string
  currency_prefix: string
  currency_suffix: string
}

/**
 * Fees
 *
 * WooCommerce may add custom properties depending on
 * installed extensions.
 */
interface Fee {
  [key: string]: unknown
}

/**
 * Cart totals
 */
interface CartTotals {
  total_items: string
  total_items_tax: string
  total_fees: string
  total_fees_tax: string
  total_discount: string
  total_discount_tax: string
  total_shipping: string | null
  total_shipping_tax: string | null
  total_price: string
  total_tax: string
  tax_lines: TaxLine[]
  currency_code: string
  currency_symbol: string
  currency_minor_unit: number
  currency_decimal_separator: string
  currency_thousand_separator: string
  currency_prefix: string
  currency_suffix: string
}

interface TaxLine {
  [key: string]: unknown
}

/**
 * Addresses
 */
interface Address {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  phone: string
}

interface BillingAddress extends Address {
  email: string
}

/**
 * Shipping
 *
 * WooCommerce can return different structures depending
 * on the shipping extensions and configuration.
 */
interface ShippingRate {
  [key: string]: unknown
}

/**
 * Cart errors
 */
interface CartError {
  [key: string]: unknown
}

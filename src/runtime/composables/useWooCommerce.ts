import {
  useCookie,
  useFetch,
} from '#imports'

export const useWooCommerce = () => {
  const cartToken = useCookie<string | null>('woo_cart_token')

  /**
   * Store API request
   */
  const request = async <T>(
    endpoint: string,
    options: Parameters<typeof $fetch>[1] = {},
  ) => {
    const headers = new Headers(options?.headers)

    if (cartToken.value) {
      headers.set('Cart-Token', cartToken.value)
    }

    const response = await $fetch.raw<T>(
      `/api/woocommerce/${endpoint}`,
      {
        ...options,
        headers,
      },
    )

    const newCartToken = response.headers.get('Cart-Token')

    if (newCartToken) {
      cartToken.value = newCartToken
    }

    return response._data
  }

  /**
   * Find many resources
   */
  const find = <T = unknown>(
    endpoint: string,
    options?: object,
  ) => {
    return useFetch<T[]>(
      `/api/woocommerce/${endpoint}`,
      options,
    )
  }

  /**
   * Find one resource
   */
  const findOne = <T = unknown>(
    endpoint: string,
    slug: string,
  ) => {
    return useFetch<T>(`/api/woocommerce/${endpoint}/${slug}`,
    )
  }

  /**
   * Get current cart
   */
  const getCart = () => {
    return request<WC_Cart>('cart')
  }

  /**
   * Add product to cart
   */
  const addToCart = (
    productId: number,
    quantity = 1,
    variation?: Record<string, unknown>,
  ) => {
    return request<WC_Cart>('cart/add-item', {
      method: 'POST',
      query: {
        id: productId,
        quantity,
        ...(variation ? {variation} : {}),
      },
    })
  }

  /**
   * Update cart item
   */
  const updateCartItem = (
    key: string,
    quantity: number,
  ) => {
    return request<WC_Cart>('cart/update-item', {
      method: 'POST',
      query: {
        key,
        quantity,
      },
    })
  }

  /**
   * Remove cart item
   */
  const removeFromCart = (key: string) => {
    return request<WC_Cart>('cart/remove-item', {
      method: 'POST',
      query: {
        key,
      },
    })
  }

  /**
   * Apply coupon
   */
  const applyCoupon = (code: string) => {
    return request<WC_Cart>('cart/apply-coupon', {
      method: 'POST',
      query: {
        code,
      },
    })
  }

  /**
   * Remove coupon
   */
  const removeCoupon = (code: string) => {
    return request<WC_Cart>('cart/remove-coupon', {
      method: 'POST',
      query: {
        code,
      },
    })
  }

  return {
    find,
    findOne,

    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,

    applyCoupon,
    removeCoupon,

    cartToken,
  }
}

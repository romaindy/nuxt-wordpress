import {
  useCookie,
  useFetch
} from "#imports";
export const useWooCommerce = () => {
  const cartToken = useCookie("woo_cart_token");
  const request = async (endpoint, options = {}) => {
    const headers = new Headers(options?.headers);
    if (cartToken.value) {
      headers.set("Cart-Token", cartToken.value);
    }
    const response = await $fetch.raw(
      `/api/woocommerce/${endpoint}`,
      {
        ...options,
        headers
      }
    );
    const newCartToken = response.headers.get("Cart-Token");
    if (newCartToken) {
      cartToken.value = newCartToken;
    }
    return response._data;
  };
  const find = (endpoint, options) => {
    return useFetch(
      `/api/woocommerce/${endpoint}`,
      options
    );
  };
  const findOne = (endpoint, slug) => {
    return useFetch(
      `/api/woocommerce/${endpoint}/${slug}`
    );
  };
  const getCart = () => {
    return request("cart");
  };
  const addToCart = (productId, quantity = 1, variation) => {
    return request("cart/add-item", {
      method: "POST",
      query: {
        id: productId,
        quantity,
        ...variation ? { variation } : {}
      }
    });
  };
  const updateCartItem = (key, quantity) => {
    return request("cart/update-item", {
      method: "POST",
      query: {
        key,
        quantity
      }
    });
  };
  const removeFromCart = (key) => {
    return request("cart/remove-item", {
      method: "POST",
      query: {
        key
      }
    });
  };
  const applyCoupon = (code) => {
    return request("cart/apply-coupon", {
      method: "POST",
      query: {
        code
      }
    });
  };
  const removeCoupon = (code) => {
    return request("cart/remove-coupon", {
      method: "POST",
      query: {
        code
      }
    });
  };
  return {
    find,
    findOne,
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    cartToken
  };
};

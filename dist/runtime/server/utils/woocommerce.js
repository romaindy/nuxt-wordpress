import { createError, getCookie, setCookie } from "h3";
import { useRuntimeConfig } from "#imports";
const CART_COOKIE_NAME = "woo_cart_token";
const trimSlash = (value) => value.replace(/\/$/, "");
const getWooBaseUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  const baseUrl = runtimeConfig.public.wordpress?.baseUrl;
  if (!baseUrl) {
    throw createError({
      status: 500,
      message: "Missing public.wordpress.baseUrl runtime config."
    });
  }
  return trimSlash(baseUrl);
};
const getCartCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 30
});
export const requestWooCommerce = async (event, endpoint, options = {}) => {
  const baseUrl = getWooBaseUrl();
  const h3Event = event;
  const cartToken = getCookie(h3Event, CART_COOKIE_NAME);
  const headers = new Headers(options?.headers);
  if (cartToken) {
    headers.set("Cart-Token", cartToken);
  }
  const response = await $fetch.raw(`${baseUrl}/wp-json/wc/store/v1/${endpoint}`, {
    ...options,
    headers
  });
  const nextCartToken = response.headers.get("Cart-Token");
  if (nextCartToken) {
    setCookie(h3Event, CART_COOKIE_NAME, nextCartToken, getCartCookieOptions());
  }
  return response._data;
};

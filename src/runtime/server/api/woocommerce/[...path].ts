import {
  createError,
  defineEventHandler,
  getQuery,
  getRouterParam,
  readBody,
} from 'h3'

import { requestWooCommerce } from '../../utils/woocommerce'

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  const endpoint = Array.isArray(path) ? path.join('/') : path

  if (!endpoint) {
    throw createError({
      code: 400,
      message: 'Missing Woo endpoint path.',
    })
  }

  const { method } = event
  const query = getQuery(event)

  if (method === 'GET') {
    return requestWooCommerce(event, endpoint, { method, query })
  }

  const body = await readBody(event)

  return requestWooCommerce(event, endpoint, {
    method,
    query,
    ...(body ? { body } : {}),
  })
})

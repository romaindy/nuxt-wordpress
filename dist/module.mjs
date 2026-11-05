import { createJiti } from "file:///Users/romain/Sites/nuxt-wordpress/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@21pixels/nuxt-wordpress": "/Users/romain/Sites/nuxt-wordpress"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/Users/romain/Sites/nuxt-wordpress/src/module.js")} */
const _module = await jiti.import("/Users/romain/Sites/nuxt-wordpress/src/module.ts");

export default _module?.default ?? _module;
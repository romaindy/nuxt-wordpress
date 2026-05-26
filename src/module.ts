import { defineNuxtModule, createResolver, addImportsDir } from '@nuxt/kit'

export interface ModuleOptions {
  baseUrl?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@21pixels/nuxt-wordpress',
    configKey: 'wordpress',
  },
  defaults: {
    baseUrl: '',
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    _nuxt.options.runtimeConfig.public.wordpress = {
      baseUrl: _options.baseUrl ?? '',
    }

    addImportsDir(resolver.resolve('./runtime/composables'))
    addImportsDir(resolver.resolve('./runtime/types'))
    addImportsDir(resolver.resolve('./runtime/utils'))
  },
})

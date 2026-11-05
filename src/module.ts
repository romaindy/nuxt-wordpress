import {defineNuxtModule, createResolver, addImportsDir, addServerHandler} from '@nuxt/kit'

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

    const runtimeServerDir = resolver.resolve('./runtime/server')

    _nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.scanDirs = [
        ...(nitroConfig.scanDirs || []),
        runtimeServerDir,
      ]
    })
  },
})

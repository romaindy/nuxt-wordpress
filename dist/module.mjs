import { defineNuxtModule, createResolver, addImportsDir } from '@nuxt/kit';

const module$1 = defineNuxtModule({
  meta: {
    name: "@21pixels/nuxt-wordpress",
    configKey: "wordpress"
  },
  defaults: {
    baseUrl: ""
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    _nuxt.options.runtimeConfig.public.wordpress = {
      baseUrl: _options.baseUrl ?? ""
    };
    addImportsDir(resolver.resolve("./runtime/composables"));
    addImportsDir(resolver.resolve("./runtime/types"));
    addImportsDir(resolver.resolve("./runtime/utils"));
  }
});

export { module$1 as default };

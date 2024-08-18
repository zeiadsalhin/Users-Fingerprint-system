import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  sourcemap: true,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en-US'
      },
      title: 'User Data',
      link: [{ rel: 'icon', type: 'image/x-icon', href: "https://p1.hiclipart.com/preview/96/808/857/person-personal-data-logo-symbol-user-profile-head-text-line-png-clipart.jpg" }],
  meta: [
    { hid: 'description', name: 'description', content: 'Welcome to User Data' },
    { hid: 'og:image', name: 'og:image', content: 'https://p1.hiclipart.com/preview/96/808/857/person-personal-data-logo-symbol-user-profile-head-text-line-png-clipart.jpg' }
  ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    'nuxt-lazy-load',
    'nuxt-aos',
    'nuxt-security',
    '@nuxtjs/supabase',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  css: [`assets/css/main.css`],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  supabase: {
    // Options
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/admin(/*)?'],
      exclude: ['/'],
      cookieRedirect: false,
    }
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.NODE_ENV === 'production'
      ? 'https://chattokgaming.com/'
      : 'http://localhost:3000/',
      stripePk: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.ts'
      },
      // {
      //   code: 'ar',
      //   file: 'ar-AR.ts'
      // }
    ],
    lazy: true,
    langDir: 'lang',
    strategy: 'no_prefix',
    // skipSettingLocaleOnNavigate: true,
    defaultLocale: 'en'
  },
  gtag: {
    // id: 'G-4KL58X89LD'
  },
  site: {
    url: 'https://chattokgaming.com',
    name: 'Chattok Gaming'
  },
  lazyLoad: {
    iframes: false,
    directiveOnly: true,
  },
security: {
  nonce: true,
  headers: {
    contentSecurityPolicy: {
      'script-src': [
        "'self'",  // Allow scripts from the same origin
        "https:", // Allow scripts from any HTTPS source
        "'unsafe-inline'", // Allow inline scripts (unsafe)
        "'strict-dynamic'", // Allow scripts loaded using 'strict-dynamic' (modern browsers)
        "'nonce-{{nonce}}'" // Allow scripts with nonce attribute (SSR mode)
      ],
      'style-src': [
        "'self'", // Allow stylesheets from the same origin
        "https:", // Allow stylesheets from any HTTPS source
        "'unsafe-inline'", // Allow inline styles (unsafe)
        "https://apis.google.com",
      ],
      'base-uri': ["'none'"], // Allow no <base> URIs
      'img-src': ["'self'", "blob:", "data:", "http:", "https:"], // Allow images from the same origin and data URIs
      'font-src': ["*"], // Allow fonts from the same origin, HTTPS sources, and data URIs
      'object-src': ["'none'"], // Allow no plugins
      'script-src-attr': ["'unsafe-inline'"], // Disallow all script execution via attributes
      'upgrade-insecure-requests': true // Upgrade all insecure requests to HTTPS
    },
    crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'unsafe-none',
    crossOriginOpenerPolicy:process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'unsafe-none',
    xXSSProtection: '1; mode=block',
  },
},
})
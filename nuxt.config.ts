import checker from "vite-plugin-checker"

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "netlify",
  },

  compatibilityDate: "2025-07-22",

  devtools: { enabled: true },

  devServer: {
    port: 5173,
  },

  app: {
    head: {
      title: "Empatia",
      htmlAttrs: {
        lang: "it",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "robots",
          content: "all",
        },
        {
          name: "description",
          content:
            "Tutto il tuo studio terapeutico in un unico spazio",
        },
        {
          name: "format-detection",
          content: "telephone=no",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
      script: [],
    },
  },

  modules: [
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/seo",
    "@nuxtjs/storybook",
    "@nuxt/test-utils/module",
    "nuxt-security",
    "@nuxtjs/supabase",

    // Local TypeScript module
    "./modules/generateComponentsMapping",
  ],

  supabase: {
    redirect: false,
  },

  image: {
    // Options
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  css: ["~/assets/css/main.css"],

  site: {
    url: "https://martin-nuxt-starter.netlify.app",
  },

  ogImage: {
    enabled: false,
  },

  fonts: {
    experimental: {
      processCSSVariables: true, // Enable if using CSS variables for Tailwind CSS v4
    },
  },

  typescript: {
    typeCheck: true,
  },

  i18n: {
    defaultLocale: "it",
    strategy: "no_prefix",
    locales: [
      {
        code: "it",
        name: "Italian",
        file: "it.json",
      },
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
    ],
  },

  vite: {
    plugins: [checker({ vueTsc: true })],
  },
})

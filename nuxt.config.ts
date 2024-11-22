// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'https://api.cryptocurrencybulls.com', // Новый субдомен
    },
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css', // Подключаем стили Bootstrap
  ],
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
          integrity: 'sha384-BGk1SmeB6+gtbTRIGzxsTXQSYHfXLmU8eWkksNU6Q+E5/bEqie+G6lySyN6aG1j7',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  plugins: ["~/plugins/firebase.js"],
  nitro: {
    preset: 'node-server', // или другой подходящий preset
    server: {
      host: '0.0.0.0',
      port: [3001, 3002, 3003, 3004, 3005, ]
    },
    // plugins: ['~/server/middleware/cors.js'],
    routeRules: {
      '/api/**': {
        headers: {
          'Access-Control-Allow-Origin': 'https://cryptocurrencybulls.com', // Основной домен
        },
      },
    },
    prerender: {
      routes: ["/api/fetchNews"],
    },
  },
  hooks: {
    "nitro:config": () => {
      import("./server/schedule/fetchNewsScheduler");
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})

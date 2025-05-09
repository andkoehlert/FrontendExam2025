// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-tiptap-editor', 'nuxt-charts'],
  css: ['~/assets/css/tailwind.css'],
  tiptap: {
    prefix: 'Tiptap', 
  },
  
  app: {
    head: {
      title: 'Frontstack Exam',
      meta: [
        {
          name: 'description', content: 'My Frontstack Exam 2025'
        }
      ],
      link: [
        {
          rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  }

})
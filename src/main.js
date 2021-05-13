import { createApp } from 'vue'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'

import '@iconscout/unicons/css/line.css'
import './index.scss'

const head = createHead()

createApp(App)
  .use(head)
  .use(router)
  .mount('#app')

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'
import counter from './counter'

import './index.scss'

const head = createHead()

createApp(App)
  .use(head)
  .use(router)
  .use(counter)
  .mount('#app')

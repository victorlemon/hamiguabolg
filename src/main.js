import './assets/main.css'
import { Toast } from 'vant'
import { Icon } from 'vant'
import 'vant/lib/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import persist from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Icon)
app.use(ElementPlus)
app.use(Toast)
app.use(createPinia())
app.use(router)
app.use(createPinia().use(persist))
app.mount('#app')

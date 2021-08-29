import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import router from './router/router'
import appAxios from "./utils/appAxios"
import store from "./store/store"

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$appAxios = appAxios
app.mount('#app')

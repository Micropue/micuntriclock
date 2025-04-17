import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import { router } from './router/router'
import './main.css'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount("#app")


window.addEventListener('gestruestart', e => {
    e.preventDefault()
})

// main.js
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/en-US'
import quasarIconSet from 'quasar/icon-set/material-icons'
import 'quasar/src/css/index.sass'

// Create Vue app
const app = createApp(App)

// Create Pinia instance
const pinia = createPinia()

// Use Quasar with options
app.use(Quasar, {
  plugins: {}, // Add Quasar plugins here if needed
  lang: quasarLang,
  iconSet: quasarIconSet,
})

// Use Vue Router
app.use(router)

// Use Pinia
app.use(pinia)

// Mount the app
app.mount('#app')

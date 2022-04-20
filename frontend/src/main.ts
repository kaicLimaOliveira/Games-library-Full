import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/routes'
import { createPinia } from "pinia"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)
app.use(createPinia())
app.use(VueSweetalert2)
app.use(router)
app.mount('#app')

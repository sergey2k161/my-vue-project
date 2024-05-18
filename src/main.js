import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import router from "./router";
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// Make BootstrapVue available throughout your project
const app = createApp(App)

app.use(router)
app.use(BootstrapVue3)
app.use(ToastService)

app.mount('#app')

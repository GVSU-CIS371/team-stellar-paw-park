import './assets/main.scss'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";

const vuetify = createVuetify({
    components:{ 
        VDateInput , 
        ...components 
    }, 
    directives,
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
    defaultTheme: 'light',
  },
})
const pinia = createPinia()

createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mount('#app');

import './assets/index.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Lara from './presets/lara';
import App from './App.vue'
import router from './router'
import store from './store';

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara,
});
app.use(store)
app.mount('#app')

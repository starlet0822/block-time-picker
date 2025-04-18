import './assets/tailwind.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import BlockTimePicker from '../packages'
console.log(BlockTimePicker)

const app = createApp(App)

app.use(router).use(BlockTimePicker)

app.mount('#app')

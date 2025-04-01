import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import blockTimePicker from 'block-time-picker'

console.log('blockTimePicker', blockTimePicker)

const app = createApp(App)

app.use(router)

// app.use(blockTimePicker) // 全局引入

app.mount('#app')

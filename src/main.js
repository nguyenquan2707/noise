import { createApp } from 'vue'
import { createPinia } from 'pinia'
import http from '@/utils/http'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import './style/index.scss'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
})

const app = createApp(App)
app.config.globalProperties.$http = http

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
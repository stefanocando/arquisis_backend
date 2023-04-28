import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// const domain = 'dev-m7bbya2l02k3sm35.us.auth0.com'
// const clientId = 'ZkjSehy47B6Go5QTx7qEJ7nxytDutdql'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin
    },
    audience: 'this is a unique identifier',
    scope: 'openid profile email'
  })
)
app.mount('#app')

<script>
export default {
  methods: {
    handleLogin() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: '/profile'
        }
      })
    }
  }
}
</script>

<template>
  <button class="btn btn-primary mx-3" @click="handleLogin">Iniciar Sesión</button>
</template>

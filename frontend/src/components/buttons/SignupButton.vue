<script>
export default {
  methods: {
    handleSignup() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: '/profile'
        },
        authorizationParams: {
          screen_hint: 'signup'
        }
      })
    }
  }
}
</script>

<template>
  <button class="btn btn-secondary mx-3" @click="handleSignup">Registrarse</button>
</template>



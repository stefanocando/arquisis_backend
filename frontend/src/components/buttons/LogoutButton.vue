<script>
export default {
  methods: {
    handleLogout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      })
    }
  }
}
</script>

<template>
    <button class="btn btn-danger mx-3" @click="handleLogout">Cerrar Sesión</button>
</template>

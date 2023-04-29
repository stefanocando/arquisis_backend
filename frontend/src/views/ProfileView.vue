<script>
import LogoutButton from '@/components/buttons/LogoutButton.vue'

export default {
  components: {
    LogoutButton
  },
  data() {
    return {
      user: this.$auth0.user
    }
  },
  computed: {
    code() {
      return JSON.stringify(this.user, null, 2)
    }
  }
}
</script>
<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center">
      <h1>Profile</h1>
      <LogoutButton />
    </div>
  </div>
</template>

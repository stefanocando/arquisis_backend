<script>
import LoginButton from '@/components/buttons/LoginButton.vue'
import SignupButton from '@/components/buttons/SignupButton.vue'
import LogoutButton from '@/components/buttons/LogoutButton.vue'

export default {
  components: {
    LoginButton,
    SignupButton,
    LogoutButton
  },
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated
    }
  },
  mounted() {
    this.isAuthenticated = this.$auth0.isAuthenticated
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center">
      <h1>TicketSeller</h1>
      <div v-if="!isAuthenticated">
        <LoginButton />
        <SignupButton />
      </div>
      <div v-else>
        <LogoutButton />
      </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  },
  data() {
    return {
      isLoading: this.$auth0.isLoading
    }
  }
}
</script>

<template>
  <div v-if="isLoading">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="text-center spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <RouterView v-else />
</template>

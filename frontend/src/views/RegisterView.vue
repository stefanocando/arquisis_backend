<script>
import { RouterLink } from 'vue-router'
import { useAuth } from "@auth0/auth0-vue";

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      const { signup } = useAuth();
      try {
        await signup({ email: this.email, password: this.password })
      } catch (error) {
        this.errorMessage = error.message
      }
    }
  }
}
</script>

<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div>
      <h1 class="text-decoration-underline-primary">Ticket Seller</h1>
      <h4 class="my-4">Registrarse</h4>
      <form @submit.prevent="submitForm" class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="username" class="form-label">Nombre de usuario</label>
          <input
            type="text"
            maxlength="30"
            minlength="3"
            class="form-control"
            id="username"
            v-model="username"
            required
          />
          <div class="invalid-feedback">Por favor ingresa un nombre válido</div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
          <div class="invalid-feedback">Por favor ingresa un mail válido</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
          <div class="invalid-feedback">Por favor ingresa una contraseña</div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mx-3">Registrarse</button>
          <RouterLink class="link-primary" to="/">Volver a iniciar sesión</RouterLink>
        </div>
      </form>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 400px;
}

h1,
h2 {
  text-align: center;
}
</style>

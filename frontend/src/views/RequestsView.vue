<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  data() {
    return {
      data: [],
      loadingRequests: true,
      user: this.$auth0.user,
      currentPage: 1
    }
  },
  async mounted() {
    const token = await this.$auth0.getAccessTokenSilently()
    const userId = this.user.sub.split('|')[1]
    try {
      const response = await fetch(`https://stefanocando.me/request/user/${userId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.data = (await response.json()).request
      this.loadingRequests = false
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    state(request) {
      let state
      if (request.state === null) {
        state = {
          color: 'info',
          string: 'Pendiente'
        }
      } else if (request.state === 1) {
        state = {
          color: 'success',
          string: 'Aceptado'
        }
      } else if (request.state === 0) {
        state = {
          color: 'warning',
          string: 'Rechazado'
        }
      }
      return state
    }
  }
}
</script>
<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="container">
      <!-- User info section -->
      <div class="row mb-5">
        <div class="col-md-6 mx-auto text-center">
          <img
            :src="user.picture"
            alt="User profile picture"
            height="50"
            width="50"
            class="rounded"
          />
          <h3>{{ user.nickname }}</h3>
          <p class="lead">{{ user.email }}</p>
          <RouterLink class="btn btn-link" to="/profile">Volver a ver eventos</RouterLink>
        </div>
      </div>

      <!-- Events table section -->
      <div v-if="loadingRequests">
        <div class="d-flex flex-column justify-content-center align-items-center vh-100">
          <div class="text-center spinner-border" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <div>Cargando solicitudes</div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-md-10">
          <h4>Mis eventos</h4>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Código del evento</th>
                <th>Código de la reserva</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in data" :key="request.request_id">
                <td>{{ request.event_id }}</td>
                <td>{{ request.request_id }}</td>
                <td>
                  <button :class="'btn btn-' + state(request).color">
                    {{ state(request).string }}</button
                  >{{}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

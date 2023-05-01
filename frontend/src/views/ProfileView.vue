<script>
import LogoutButton from '@/components/buttons/LogoutButton.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    LogoutButton,
    RouterLink
  },
  data() {
    return {
      user: this.$auth0.user,
      data: '',
      loadingEvents: true,
      currentPage: 1
    }
  },
  methods: {
    fetchEvents(action) {
      this.loadingEvents = true
      action === 'prev' ? this.currentPage-- : this.currentPage++
      fetch(`https://stefanocando.me/events?page=${this.currentPage}`)
        .then((response) => response.json())
        .then((data) => {
          this.data = data.events
          this.loadingEvents = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    eventToQueryString(event) {
      const newParams = new URLSearchParams(event).toString()
      return newParams
    }
  },
  mounted() {
    fetch('https://stefanocando.me/events?page=0')
      .then((response) => response.json())
      .then((data) => {
        this.data = data.events
        this.loadingEvents = false
      })
      .catch((error) => console.log(error))
  },
  computed: {
    code() {
      return JSON.stringify(this.user, null, 2)
    },
    pages() {
      return Math.ceil(this.events.length / this.eventsPerPage)
    },
    totalPages() {
      return this.pages === 0 ? 1 : this.pages
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
          <LogoutButton />
          <RouterLink class="btn btn-link" to="/requests">Ir a tus solicitudes de compra</RouterLink>
        </div>
      </div>

      <!-- Events table section -->
      <div v-if="loadingEvents">
        <div class="d-flex flex-column justify-content-center align-items-center vh-100">
          <div class="text-center spinner-border" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <div>Cargando eventos</div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-md-10">
          <h4>Eventos</h4>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in data" :key="event.event_id">
                <td>{{ event.event_id }}</td>
                <td>
                  {{ event.name.length > 60 ? event.name.substring(0, 60) + '...' : event.name }}
                </td>
                <td>{{ event.date.split('T')[0] }}</td>
                <td>
                  <RouterLink
                    class="btn btn-outline-primary"
                    :to="'/event?' + eventToQueryString(event)"
                    >Más información</RouterLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="fetchEvents('prev')">Previo</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" @click.prevent="fetchEvents('next')">Siguiente</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

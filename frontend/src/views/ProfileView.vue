<script>
import LogoutButton from '@/components/buttons/LogoutButton.vue'

export default {
  components: {
    LogoutButton
  },
  data() {
    return {
      user: this.$auth0.user,
      data: '',
      token: '',
      currentPage: 1,
      eventsPerPage: 3,
      events: [
        { id: 1, name: 'Event 1', date: '2023-05-01', location: 'Location 1' },
        { id: 2, name: 'Event 2', date: '2023-05-02', location: 'Location 2' },
        { id: 3, name: 'Event 3', date: '2023-05-03', location: 'Location 3' },
        { id: 4, name: 'Event 4', date: '2023-05-04', location: 'Location 4' },
        { id: 5, name: 'Event 5', date: '2023-05-05', location: 'Location 5' },
        { id: 6, name: 'Event 6', date: '2023-05-06', location: 'Location 6' },
        { id: 7, name: 'Event 7', date: '2023-05-07', location: 'Location 7' },
        { id: 8, name: 'Event 8', date: '2023-05-08', location: 'Location 8' },
        { id: 9, name: 'Event 9', date: '2023-05-09', location: 'Location 9' },
        { id: 10, name: 'Event 10', date: '2023-05-09', location: 'Location 10' }
      ]
    }
  },
  methods: {
    async doSomethingWithToken() {
      const token = await this.$auth0.getAccessTokenSilently()
      // const response = await fetch('https://stefanocando.me/request/user', {
      //   mode: 'no-cors',
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // })
      const response = await fetch('https://stefanocando.me/events?page=1')
      this.token = token
      this.data = await response.json()
    },
    gotoPage(page) {
      this.currentPage = page
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
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
    },
    displayedEvents() {
      const startIndex = (this.currentPage - 1) * this.eventsPerPage
      const endIndex = startIndex + this.eventsPerPage
      return this.events.slice(startIndex, endIndex)
    }
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
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
          <button class="btn btn-primary" @click="doSomethingWithToken">Send request</button>
        </div>
      </div>

      <!-- Events table section -->
      <div class="row">
        <div class="col-md-12">
          <h4>Events</h4>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in displayedEvents" :key="event.id">
                <td>{{ event.name }}</td>
                <td>{{ event.date }}</td>
                <td>{{ event.location }}</td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
              </li>
              <li
                class="page-item"
                v-for="page in pages"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

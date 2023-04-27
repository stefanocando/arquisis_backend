<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">TicketSeller</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs>
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </main>
  <RouterView />
</template>

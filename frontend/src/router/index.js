import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CallbackView from '@/views/CallbackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/callback',
      name: 'callback',
      component: CallbackView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: authGuard
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('@/views/EventView.vue'),
      props: (route) => ({
        event_id: route.query.event_id,
        name: route.query.name,
        date: route.query.date,
        price: +route.query.price,
        quantity: +route.query.quantity,
        location: route.query.location,
        latitude: +route.query.latitude,
        longitude: +route.query.longitude,
        createdAt: route.query.createdAt,
        updatedAt: route.query.updatedAt
      }),
      beforeEnter: authGuard
    }
  ]
})

export default router

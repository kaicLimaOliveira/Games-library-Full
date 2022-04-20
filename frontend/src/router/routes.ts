import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Games from '@/components/views/Games.vue'
import PageNotFound from '@/components/views/PageNotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'games',
    component: Games
  },
  { path: '/:catchAll(.*)*', component: PageNotFound }

]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


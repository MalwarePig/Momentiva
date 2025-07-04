import { createRouter, createWebHistory } from 'vue-router'
import Lab from '../pages/Lab/Lab.vue'
import Tarjeta from '../pages/Tarjeta/Tarjeta.vue'

const routes = [
  { path: '/', component: Lab },
  { path: '/Tarjeta', component: Tarjeta },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

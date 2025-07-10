import { createRouter, createWebHistory } from 'vue-router'
import Lab from '../pages/Lab/Lab.vue'
import Tarjeta from '../pages/Tarjeta/Tarjeta.vue'
import MyPanel from '../pages/MyPanel/MyPanel.vue'
import Layout from '../layouts/Layout.vue'
import Invitacion from '../pages/Invitacion/Invitacion.vue'
import Home from '../pages/Home/Home.vue'

/* const routes = [
  { path: '/', component: Lab },
  { path: '/Tarjeta', component: Tarjeta },
  {path: '/MyParty', component: MyPanel}
]
 */


const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/PanelCreative',
    component: Layout,
    children: [
      { path: '', component: Lab },
      { path: '/MyParty', component: MyPanel }
    ]
  },
  {
    path: '/Tarjeta',
    component: Tarjeta // Aquí va sin layout, componente solo
  },{
    path: '/Invitacion/:id',
    component: Invitacion
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

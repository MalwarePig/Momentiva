import { createRouter, createWebHistory } from 'vue-router'
import Lab from '../pages/Free/Lab/Lab.vue'
import Tarjeta from '../pages/Free/Tarjeta/Tarjeta.vue'
import MyParty from '../pages/Free/MyParty/MyParty.vue'
import Layout from '../layouts/Layout.vue'
import LayoutAdmin from '../layouts/LayoutAdmin.vue'
import Invitacion from '../pages/Free/Invitacion/Invitacion.vue'
import Home from '../pages/Home/Home.vue'
import Solicitud from '../pages/Admin/Solicitud/Solicitud.vue'
import PanelAdmin from '../pages/Admin/PanelAdmin/PanelAdmin.vue'
import Asignacion from '../pages/Admin/Asignacion/Asignacion.vue'

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
      { path: '/MyParty', component: MyParty }
    ]
  },
  {
    path: '/Tarjeta',
    component: Tarjeta // Aquí va sin layout, componente solo
  }, {
    path: '/Invitacion/:id',
    component: Invitacion
  },
  {
    path: '/Solicitud',
    component: Solicitud
  }, {
    path: '/PanelAdmin',
    component: LayoutAdmin,
    children: [
      { path: '', component: PanelAdmin },
      { path: '/Asignacion', component: Asignacion }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
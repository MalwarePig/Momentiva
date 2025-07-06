<template>
  <div id="app">
    <BG/>
    <!-- Aquí se renderiza la página correspondiente según la ruta -->
    <router-view></router-view>
  </div>
</template>

<script>
import BG from './components/BG/BG.vue'

export default {
  name: 'App',
  components: {
    BG
  }
}
</script>

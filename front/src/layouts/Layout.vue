<!-- LayoutMain.vue -->
<template>
<div class="Nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/MyParty">MyPanel</a></li>
        <li><a href="/Tarjeta">Tarjeta</a></li> 
      </ul>
    </div>
    <main>
      <router-view /> <!-- Aquí carga el contenido dinámico -->
    </main>
    <footer>Pie de página</footer>
</template>

<style scoped>
.Nav {
position: fixed;
  width: 20%;
  background-color: #fbfbfe;
  color: #15163D; 
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly; 
 margin: 40px 0;
  height: 50px;
  left: 50%; 
    transform: translate(-50%, -50%);
}
 
</style>

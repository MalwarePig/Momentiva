<template>
  <div class="solicitudes-panel">
    <h2>Panel de Solicitudes</h2>

    <div class="menu-tools">
      <div class="filter">
        <label for="filtroEstado">Filtrar por estado:</label>
        <select id="filtroEstado" v-model="estadoFiltro">
          <option value="">-- Todos --</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Activo">Activo</option>
          <option value="Cerrado">Cerrado</option>
          <option value="Rechazado">Rechazado</option>
        </select>
      </div>

      <div class="input-group">
        <input type="text" placeholder="Enlace de invitación..." v-model="link">
        <a :href="link" target="_blank"><i class="fa-solid fa-square-arrow-up-right"></i></a>
      </div>
    </div>



    <table class="tabla-solicitudes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre Festejado</th>
          <th>Fecha Evento</th>
          <th>Estado</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Serial</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="solicitud in solicitudesFiltradas" :key="solicitud.id">
          <td>{{ solicitud.id }}</td>
          <td>{{ solicitud.nombre_festejado }}</td>
          <td>{{ formatDate(solicitud.fecha_evento) }}</td>
          <td>
            <span :class="getEstadoClass(solicitud.estado)">
              {{ solicitud.estado }}
            </span>
          </td>
          <td>{{ solicitud.telefono }}</td>
          <td>{{ solicitud.email }}</td>
          <td>{{ solicitud.serial }}</td>
          <td>
            <div class="acciones-grupo">
              <button v-if="solicitud.estado === 'Pendiente'" @click="cambiarEstado(solicitud.id, 'Activo')"
                class="btn-accion btn-activar" :disabled="cargando">
                Activar
              </button>
              <button v-if="solicitud.estado === 'Activo'" @click="cambiarEstado(solicitud.id, 'Cerrado')"
                class="btn-accion btn-cerrar" :disabled="cargando">
                Cerrar
              </button>
              <button v-if="solicitud.estado === 'Pendiente'" @click="cambiarEstado(solicitud.id, 'Rechazado')"
                class="btn-accion btn-rechazar" :disabled="cargando">
                Rechazar
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="solicitudesFiltradas.length === 0">
          <td colspan="8" style="text-align:center;">No hay solicitudes para mostrar</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const estadoFiltro = ref('')
const solicitudes = ref([])
const cargando = ref(false)
const link = ref('http://localhost:5173/Solicitud')
// Cargar solicitudes desde backend
async function cargarSolicitudes() {
  try {
    const res = await fetch('http://localhost:3000/getSolicitud/')
    if (!res.ok) throw new Error('Error al obtener solicitudes')
    solicitudes.value = await res.json()
  } catch (error) {
    console.error('Error al cargar solicitudes:', error)
  }
}

// Cambiar estado de solicitud
async function cambiarEstado(id, nuevoEstado) {
  cargando.value = true
  try {
    const res = await fetch(`http://localhost:3000/updateSolicitud/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: nuevoEstado })
    })

    if (!res.ok) throw new Error('Error al actualizar estado')

    // Actualizar el estado local
    const solicitudIndex = solicitudes.value.findIndex(s => s.id === id)
    if (solicitudIndex !== -1) {
      solicitudes.value[solicitudIndex].estado = nuevoEstado
    }

    console.log(`Solicitud ${id} actualizada a ${nuevoEstado}`)
  } catch (error) {
    console.error('Error al cambiar estado:', error)
    alert('Error al cambiar el estado de la solicitud')
  } finally {
    cargando.value = false
  }
}

// Filtrado por estado
const solicitudesFiltradas = computed(() => {
  if (!estadoFiltro.value) return solicitudes.value
  return solicitudes.value.filter(s => s.estado === estadoFiltro.value)
})

function formatDate(fechaStr) {
  if (!fechaStr) return ''
  const d = new Date(fechaStr)
  return d.toLocaleDateString()
}

function getEstadoClass(estado) {
  return {
    'estado-pendiente': estado === 'Pendiente',
    'estado-activo': estado === 'Activo',
    'estado-cerrado': estado === 'Cerrado',
    'estado-rechazado': estado === 'Rechazado'
  }
}

onMounted(() => {
  cargarSolicitudes()
})
</script>

<style scoped>
.menu-tools { 
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 1.5rem; 
}



.input-group {
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 40%;  
    border: 2px solid var(--sec-border);
    border-radius: 24px;
    padding: 2px 10px;
}

.input-group:hover{
    border: 2px solid var(--hover-links);
}

.input-group input {  
    border: none;
    background-color: transparent;
    color: var(--main-Font); 
    width: 100%;
}

.input-group input:focus {
  outline: none;
}

.input-group button {
    font-size: 1rem;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
}


.solicitudes-panel {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  color: #333;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 1.2px;
}

.filter { 
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 600;
  color: #34495e;
}

.filter select {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1.8px solid #3498db;
  font-size: 1rem;
  color: #2c3e50;
  background-color: #ecf0f1;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

.filter select:hover,
.filter select:focus {
  border-color: #2980b9;
  background-color: #d6eaf8;
  outline: none;
}

.tabla-solicitudes {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.tabla-solicitudes th,
.tabla-solicitudes td {
  padding: 1rem 1.2rem;
  text-align: left;
  font-size: 0.95rem;
}

.tabla-solicitudes th {
  background-color: var(--home-rosa);
  color: white;
  font-weight: 700;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  user-select: none;
}

.tabla-solicitudes tbody tr {
  background-color: #fefefe;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}

.tabla-solicitudes tbody tr:hover {
  background-color: #d6eaf8;
  box-shadow: 0 6px 20px rgba(41, 128, 185, 0.4);
  transform: translateY(-3px);
}

.tabla-solicitudes tbody tr td:first-child {
  font-weight: 600;
  color: #2980b9;
}

.tabla-solicitudes tbody tr td {
  border: none;
}

.tabla-solicitudes tbody tr td[colspan="8"] {
  text-align: center;
  font-style: italic;
  color: #7f8c8d;
  padding: 2rem 0;
}

/* Estilos para los estados */
.estado-pendiente {
  background-color: #fff3cd;
  color: #856404;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.estado-activo {
  background-color: #d4edda;
  color: #155724;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.estado-cerrado {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.estado-rechazado {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

/* Estilos para los botones de acción */
.acciones-grupo {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-accion {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 70px;
}

.btn-accion:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-activar {
  background-color: #28a745;
  color: white;
}

.btn-activar:hover:not(:disabled) {
  background-color: #218838;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.4);
}

.btn-cerrar {
  background-color: #17a2b8;
  color: white;
}

.btn-cerrar:hover:not(:disabled) {
  background-color: #138496;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(23, 162, 184, 0.4);
}

.btn-rechazar {
  background-color: #dc3545;
  color: white;
}

.btn-rechazar:hover:not(:disabled) {
  background-color: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.4);
}

/* Scroll horizontal para pantallas pequeñas */
@media (max-width: 768px) {
  .solicitudes-panel {
    padding: 1rem;
  }

  .tabla-solicitudes {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .acciones-grupo {
    min-width: 150px;
  }
}
</style>
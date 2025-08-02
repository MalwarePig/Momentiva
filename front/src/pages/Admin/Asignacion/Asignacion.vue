<template>
  <div class="solicitudes-panel">
    <h2>Gestión de Solicitudes Activas</h2>

    <div class="info-banner">
      <p>Total de solicitudes activas: <strong>{{ solicitudesActivas.length }}</strong></p>
    </div>

    <table class="tabla-solicitudes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre Festejado</th>
          <th>Fecha Evento</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Serial</th>
          <th>Temática</th>
          <th>Versión</th>
          <th>URL Imagen 1</th>
          <th>URL Imagen 2</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="solicitud in solicitudesActivas" :key="solicitud.id">
          <td>{{ solicitud.id }}</td>
          <td>{{ solicitud.nombre_festejado }}</td>
          <td>{{ formatDate(solicitud.fecha_evento) }}</td>
          <td>{{ solicitud.telefono }}</td>
          <td>{{ solicitud.email }}</td>
          <td>{{ solicitud.serial }}</td>
          <td>
            <select 
              v-model="solicitud.tematica" 
              class="select-genero"
              @change="marcarCambio(solicitud.id)"
            >
              <option value="">-- Seleccionar --</option>
              <option value="Boda">Boda</option>
              <option value="XV">XV Años</option>
              <option value="Infantil">Infantil</option>
              <option value="Religiosa">Religiosa</option>
              <option value="Laboral">Laboral</option>
              <option value="Otro">Otro</option>
            </select>
          </td>
          <td>
            <select 
              v-model="solicitud.version" 
              class="select-version"
              @change="marcarCambio(solicitud.id)"
            >
              <option value="">-- Seleccionar --</option>
              <option value="V1">V1</option>
              <option value="V2">V2</option>
              <option value="V3">V3</option>
              <option value="V4">V4</option>
              <option value="V5">V5</option>
            </select>
          </td>
          <td>
            <input 
              type="url" 
              v-model="solicitud.imgUno" 
              class="input-imagen"
              placeholder="https://ejemplo.com/imagen1.jpg"
              @input="marcarCambio(solicitud.id)"
            />
          </td>
          <td>
            <input 
              type="url" 
              v-model="solicitud.imgDos" 
              class="input-imagen"
              placeholder="https://ejemplo.com/imagen2.jpg"
              @input="marcarCambio(solicitud.id)"
            />
          </td>
          <td>
            <button 
              @click="actualizarSolicitud(solicitud)"
              class="btn-actualizar"
              :disabled="cargando || !tieneCambios(solicitud.id)"
              :class="{ 'btn-con-cambios': tieneCambios(solicitud.id) }"
            >
              {{ cargando ? 'Guardando...' : 'Actualizar' }}
            </button>
          </td>
        </tr>
        <tr v-if="solicitudesActivas.length === 0">
          <td colspan="11" style="text-align:center;">No hay solicitudes activas para mostrar</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const solicitudesActivas = ref([])
const cargando = ref(false)
const cambiosPendientes = ref(new Set())

// Cargar solicitudes activas desde backend
async function cargarSolicitudesActivas() {
  try {
    const res = await fetch('http://localhost:3000/getSolicitud/')
    if (!res.ok) throw new Error('Error al obtener solicitudes')
    
    const todasSolicitudes = await res.json()
    // Filtrar solo las solicitudes con estado "Activo"
    solicitudesActivas.value = todasSolicitudes.filter(s => s.estado === 'Activo')
    
    console.log('Solicitudes activas cargadas:', solicitudesActivas.value.length)
  } catch (error) {
    console.error('Error al cargar solicitudes activas:', error)
    alert('Error al cargar las solicitudes activas')
  }
}

// Actualizar temática, versión e imágenes de solicitud
async function actualizarSolicitud(solicitud) {
  if (!solicitud.tematica || !solicitud.version) {
    alert('Por favor selecciona tanto la temática como la versión')
    return
  }

  cargando.value = true
  try {
    const payload = { 
      genero_fiesta: solicitud.tematica,
      version: solicitud.version,
      imgUno: solicitud.imgUno || '',
      imgDos: solicitud.imgDos || ''
    }
    
    console.log('Enviando payload:', payload) // Para debug
    
    const res = await fetch(`http://localhost:3000/updateSolicitudDetalle/${solicitud.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error || 'Error al actualizar solicitud')
    }
    
    const resultado = await res.json()
    console.log('Solicitud actualizada:', resultado)
    
    // Remover de cambios pendientes
    cambiosPendientes.value.delete(solicitud.id)
    
    // Mostrar mensaje de éxito
    alert(`Solicitud ${solicitud.id} actualizada correctamente`)
    
  } catch (error) {
    console.error('Error al actualizar solicitud:', error)
    alert(`Error al actualizar la solicitud: ${error.message}`)
  } finally {
    cargando.value = false
  }
}

// Marcar que hay cambios pendientes
function marcarCambio(id) {
  cambiosPendientes.value.add(id)
}

// Verificar si hay cambios pendientes
function tieneCambios(id) {
  return cambiosPendientes.value.has(id)
}

function formatDate(fechaStr) {
  if (!fechaStr) return ''
  const d = new Date(fechaStr)
  return d.toLocaleDateString()
}

onMounted(() => {
  cargarSolicitudesActivas()
})
</script>

<style scoped>
.solicitudes-panel {
  max-width: 1600px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  color: #333;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 1.2px;
}

.info-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.1rem;
}

.info-banner strong {
  font-size: 1.3rem;
  color: #fff3cd;
}

.tabla-solicitudes {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.tabla-solicitudes th,
.tabla-solicitudes td {
  padding: 1rem 0.8rem;
  text-align: left;
  font-size: 0.9rem;
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
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tabla-solicitudes tbody tr:hover {
  background-color: #f8f9fa;
  box-shadow: 0 6px 20px rgba(41, 128, 185, 0.4);
  transform: translateY(-2px);
}

.tabla-solicitudes tbody tr td:first-child {
  font-weight: 600;
  color: #2980b9;
}

.tabla-solicitudes tbody tr td {
  border: none;
}

.tabla-solicitudes tbody tr td[colspan="11"] {
  text-align: center;
  font-style: italic;
  color: #7f8c8d;
  padding: 2rem 0;
}

/* Estilos para los selects */
.select-genero,
.select-version {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #495057;
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.select-genero:hover,
.select-version:hover {
  border-color: #80bdff;
}

.select-genero:focus,
.select-version:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.select-genero {
  min-width: 120px;
}

.select-version {
  min-width: 80px;
}

/* Estilos para los inputs de imagen */
.input-imagen {
  width: 100%;
  max-width: 200px;
  padding: 0.5rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #495057;
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-imagen:hover {
  border-color: #80bdff;
}

.input-imagen:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.input-imagen::placeholder {
  color: #adb5bd;
  font-size: 0.75rem;
}

/* Estilos para el botón actualizar */
.btn-actualizar {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #6c757d;
  color: white;
  min-width: 100px;
}

.btn-actualizar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-con-cambios {
  background-color: #28a745 !important;
  animation: pulse 2s infinite;
}

.btn-con-cambios:hover:not(:disabled) {
  background-color: #218838 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.btn-actualizar:hover:not(:disabled):not(.btn-con-cambios) {
  background-color: #5a6268;
  transform: translateY(-1px);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(40, 167, 69, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
  }
}

/* Responsividad */
@media (max-width: 768px) {
  .solicitudes-panel {
    padding: 1rem;
    max-width: 100%;
  }
  
  .tabla-solicitudes {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .tabla-solicitudes th,
  .tabla-solicitudes td {
    padding: 0.8rem 0.4rem;
    font-size: 0.8rem;
  }
  
  .select-genero,
  .select-version {
    min-width: 100px;
    font-size: 0.8rem;
  }
  
  .input-imagen {
    max-width: 150px;
    font-size: 0.75rem;
  }
  
  .btn-actualizar {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
    min-width: 80px;
  }
}

@media (max-width: 1200px) {
  .solicitudes-panel {
    max-width: 95%;
  }
  
  .input-imagen {
    max-width: 150px;
  }
}
</style>
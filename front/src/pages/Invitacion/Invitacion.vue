<style src="./Invitacion.css" scoped></style>


<template>
  <div v-if="config" class="Vista" :style="{
    backgroundColor: config.fondo.color,
    backgroundImage: config.fondo.imagen ? `url(${config.fondo.imagen})` : 'none',
    backgroundSize: config.fondo.estilo,
    backgroundRepeat: config.fondo.RepetirBG ? 'repeat' : 'no-repeat',
    filter: config.fondo?.bgGray ? 'grayscale(100%)' : 'none'
  }">

    <!-- Imagen principal -->
    <img class="foto-centralVista" :style="{
      backgroundImage: config.imagenPrincipal.archivo ? `url(${config.imagenPrincipal.archivo})` : 'none',
      width: config.imagenPrincipal.tamano + '%',
      height: (config.imagenPrincipal.altura - 15) + '%',
      borderRadius: config.imagenPrincipal.bordes + '%',
      opacity: (100 - config.imagenPrincipal.transparencia) / 100,
      top: config.imagenPrincipal.posicion + 'px',
      backgroundSize: config.imagenPrincipal.estilo,
      filter: config.imagenPrincipal.escalaGrises ? 'grayscale(100%)' : 'none',
      maskImage: config.imagenPrincipal.desvanecido > 0
        ? `linear-gradient(to bottom, black ${(100 - config.imagenPrincipal.desvanecido)}%, transparent 100%)`
        : 'none'
    }">
    </img>

    <!-- Anfitrión -->
    <div class="anfitrionVista" :style="{
      top: config.anfitrion.altura + 'px',
      fontSize: config.anfitrion.tamano + 'px',
      fontFamily: config.anfitrion.fuente,
      color: config.anfitrion.color,
      fontWeight: config.anfitrion.negrita ? 'bold' : 'normal',

      backgroundColor: config.anfitrion.bg ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
      backdropFilter: config.anfitrion.bg ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: config.anfitrion.bg ? 'blur(8px)' : 'none' // Safari
    }">
      {{ config.anfitrion.nombre }}
    </div>

    <!-- Evento -->
    <div class="eventoVista" :style="{
      top: config.evento.altura + 'px',
      fontSize: config.evento.tamano + 'px',
      fontFamily: config.evento.fuente,
      color: config.evento.color,
      fontWeight: config.evento.negrita ? 'bold' : 'normal',

      backgroundColor: config.evento.bg ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
      backdropFilter: config.evento.bg ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: config.evento.bg ? 'blur(8px)' : 'none' // Safari
    }">
      {{ config.evento.nombre }}
    </div>

    <!-- Título -->
    <div class="tituloVista" :style="{
      top: (config.titulo.altura - 15) + 'px',
      fontSize: config.titulo.tamano + 'px',
      fontFamily: config.titulo.fuente,
      color: config.titulo.color,
      fontWeight: config.titulo.negrita ? 'bold' : 'normal',

      backgroundColor: config.titulo.bg ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
      backdropFilter: config.titulo.bg ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: config.titulo.bg ? 'blur(8px)' : 'none' // Safari
    }">
      {{ config.titulo.nombre }}
    </div>

    <!-- Fecha -->
    <div class="fechaVista" :style="{
      top: (config.datos.fechaAltura - 50) + 'px',
      fontSize: config.datos.fechaTamano + 'px',
      fontFamily: config.datos.fechaFuente,
      color: config.datos.fechaColor,
      fontWeight: config.datos.fechaNegrita ? 'bold' : 'normal',

      backgroundColor: config.datos.fechaBg ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
      backdropFilter: config.datos.fechaBg ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: config.datos.fechaBg ? 'blur(8px)' : 'none' // Safari
    }">
      {{ fechaFormateada }}
    </div>

    <!-- Hora -->
    <div class="horaVista" :style="{
      top: (config.datos.horaAltura - 80) + 'px',
      fontSize: config.datos.horaTamano + 'px',
      fontFamily: config.datos.horaFuente,
      color: config.datos.horaColor,
      fontWeight: config.datos.horaNegrita ? 'bold' : 'normal',

      backgroundColor: config.datos.horaBg ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
      backdropFilter: config.datos.horaBg ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: config.datos.horaBg ? 'blur(8px)' : 'none' // Safari
    }">
      {{ config.datos.hora }}
    </div>

    <!-- Ubicación -->
    <div class="ubicacionVista" :style="{
      top: (config.datos.ubicacionAltura - 100) + 'px',
      fontSize: config.datos.ubicacionTamano + 'px',
      fontFamily: config.datos.ubicacionFuente,
      color: config.datos.ubicacionColor,
      fontWeight: config.datos.ubicacionNegrita ? 'bold' : 'normal',

      backgroundColor: config.datos.ubicacionBg ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
      backdropFilter: config.datos.ubicacionBg ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: config.datos.ubicacionBg ? 'blur(8px)' : 'none' // Safari
    }">
      {{ config.datos.ubicacion }}
    </div>

    <!-- Mensaje -->
    <div class="mensajeVista" :style="{
      top: (config.mensaje.mensajeAltura - 160) + 'px',
      fontSize: config.mensaje.mensajeTamano + 'px',
      fontFamily: config.mensaje.mensajeFuente,
      color: config.mensaje.mensajeColor,
      fontWeight: config.mensaje.mensajeNegrita ? 'bold' : 'normal',

      backgroundColor: config.mensaje.mensajeBg ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
      backdropFilter: config.mensaje.mensajeBg ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: config.mensaje.mensajeBg ? 'blur(8px)' : 'none' // Safari
    }">
      {{ config.mensaje.mensaje }}
    </div>



    <!-- Confirmación -->
    <div class="confirmacion">
      <div class="element">
        <label for="Familia">A nombre de:</label>
        <input type="text" id="Familia" placeholder="Familia Luna" required>
      </div>

      <div class="element">
        <label for="Cantidad">Confirmo:</label>
        <input type="text" id="Cantidad" placeholder="Cantidad de asistentes" required>
      </div>

      <div id="Botones">
        <button id="Confirmacion"> Confirmar</button>
      </div>
    </div>

  </div>
</template>


<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'


/* Manejar datos de url */
const route = useRoute()

// ✅ Parámetro dinámico de ruta
const id = route.params.id     

// Se crea una variable reactiva que va a guardar la configuración recibida
const config = ref(null)

const fechaFormateada = computed(() => {
  const fecha = config.value?.datos?.fecha
  const formato = config.value?.datos?.fechaFormato 

  if (formato === 'corto') {
    return fecha
      ? new Intl.DateTimeFormat('es-MX', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(new Date(fecha + 'T00:00:00'))
      : ''
  } else {
    return fecha
      ? new Intl.DateTimeFormat('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date(fecha + 'T00:00:00'))
      : ''
  }

})
 
// Esta función recibe una configuración nueva (nuevaConfig) y la aplica a la variable reactiva 'config'
// Se asegura de que cada propiedad importante tenga un valor por defecto si no está definida
const aplicarConfiguracion = (nuevaConfig) => {
  config.value = {
    ...nuevaConfig
  }
}

onMounted(() => {

  // También, al cargar la página, se intenta obtener una configuración guardada en el backend
  // Aquí podrías cambiarlo por un valor dinámico si lo necesitas
  fetch(`http://localhost:3000/cargarInvitacionLab/${id}`)
    .then(res => res.json())                 // Convierte la respuesta en JSON
    .then(data => aplicarConfiguracion(data)) // Aplica esa configuración
    .catch(err => console.error('Error cargando configuración:', err)) // Muestra error si falla la carga
})

</script>

<template>
  <div v-if="config" class="tarjeta"
       :style="{
        backgroundColor: config.fondo.color,
        backgroundImage: config.fondo.imagen ? `url(${config.fondo.imagen})` : 'none',
        backgroundSize: config.fondo.estilo,
        backgroundRepeat: config.fondo.RepetirBG ? 'repeat' : 'no-repeat',
        filter: config.fondo?.bgGray ? 'grayscale(100%)' : 'none'
      }">

    <!-- Título -->
    <div class="titulo"
         :style="{
          top: config.titulo.altura + 'px',
          fontSize: config.titulo.tamano + 'px',
          fontFamily: config.titulo.fuente,
          color: config.titulo.color
        }">
      {{ "Este es el titulo" }}
    </div>

    <!-- Evento -->
    <div class="evento"
         :style="{
          top: config.evento.altura + 'px',
          fontSize: config.tamano + 'px',
          fontFamily: config.fuente,
          color: config.evento.color
        }">
      {{ config.evento.nombre}}
    </div>

    <!-- Anfitrión -->
    <div class="anfitrion"
         :style="{
          top: config.anfitrion.altura + 'px',
          fontSize: config.anfitrion.tamano + 'px',
          fontFamily: config.anfitrion.fuente,
          color: config.anfitrion.color
        }">
      {{ config.anfitrion.nombre }}
    </div>

    <!-- Mensaje -->
    <div class="mensaje"
         :style="{
          top: config.mensaje.mensajeAltura + 'px',
          fontSize: config.mensaje.mensajeTamano + 'px',
          fontFamily: config.mensaje.mensajeFuente,
          color: config.mensaje.mensajeColor
        }">
      {{ config.mensaje.mensaje }}
    </div>

    <!-- Fecha -->
    <div class="fecha"
         :style="{
          top: config.datos.fechaAltura + 'px',
          fontSize: config.datos.fechaTamano + 'px',
          fontFamily: config.datos.fechaFuente,
          color: config.datos.fechaColor
        }">
      {{ config.datos.fecha }}
    </div>

    <!-- Hora -->
    <div class="hora"
         :style="{
          top: config.datos.horaAltura + 'px',
          fontSize: config.datos.horaTamano + 'px',
          fontFamily: config.datos.horaFuente,
          color: config.datos.horaColor
        }">
      {{ config.datos.hora }}
    </div>

    <!-- Ubicación -->
    <div class="ubicacion"
         :style="{
          top: config.datos.ubicacionAltura + 'px',
          fontSize: config.datos.ubicacionTamano + 'px',
          fontFamily: config.datos.ubicacionFuente,
          color: config.datos.ubicacionColor
        }">
      {{ config.datos.ubicacion }}
    </div>

    <!-- Imagen principal -->
    <div class="foto-central"
         :style="{
          backgroundImage: config.imagenPrincipal.archivo ? `url(${config.imagenPrincipal.archivo})` : 'none',
          width: config.imagenPrincipal.tamano + '%',
          height: config.imagenPrincipal.altura + '%',
          borderRadius: config.imagenPrincipal.bordes + '%',
          opacity: (100 - config.imagenPrincipal.transparencia) / 100,
          top: config.imagenPrincipal.posicion + 'px',
          backgroundSize: config.imagenPrincipal.estilo,
          filter: config.imagenPrincipal.escalaGrises ? 'grayscale(100%)' : 'none',
          maskImage: config.imagenPrincipal.desvanecido > 0
            ? `linear-gradient(to bottom, black ${(100 - config.imagenPrincipal.desvanecido)}%, transparent 100%)`
            : 'none'
        }">
    </div>

    <!-- Galería -->
    <div class="galeria" v-if="config.fotos && config.fotos.length">
      <div v-for="(foto, i) in config.fotos" :key="i"
           class="foto-galeria"
           :style="{ backgroundImage: `url(${foto})` }">
      </div>
    </div>

    <!-- Confirmación -->
    <div class="rsvp">Confirmar Asistencia</div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'

const config = ref(null)

onMounted(async () => {
  const usuario = '1' // O dynamic desde ruta
  const res = await fetch(`http://localhost:3000/cargar/${usuario}`)
  const data = await res.json()
  console.table(data)
  config.value = data
})

</script>


<style src="../Lab/Lab.css"></style>

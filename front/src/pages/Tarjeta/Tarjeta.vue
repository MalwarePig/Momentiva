<style src="./Tarjeta.css"></style>


<template>
  <div v-if="config" class="Vista" :style="{
    backgroundColor: config.fondo.color,
    backgroundImage: config.fondo.imagen ? `url(${config.fondo.imagen})` : 'none',
    backgroundSize: config.fondo.estilo,
    backgroundRepeat: config.fondo.RepetirBG ? 'repeat' : 'no-repeat',
    filter: config.fondo?.bgGray ? 'grayscale(100%)' : 'none'
  }">

    <!-- Anfitrión -->
    <div class="anfitrionVista" :style="{
      top: config.anfitrion.altura + 'px',
      fontSize: 'clamp(2rem, ' + config.anfitrion.tamano + 'vw, 10vw)',
      fontFamily: config.anfitrion.fuente,
      color: config.anfitrion.color
    }">
      {{ config.anfitrion.nombre }}
    </div>

    <!-- Evento -->
    <div class="eventoVista" :style="{
      top: config.evento.altura + 'px',
      fontSize: 'clamp(2rem, ' + config.evento.tamano + 'vw, 10vw)',
      fontFamily: config.evento.fuente,
      color: config.evento.color
    }">
      {{ config.evento.nombre }}
    </div>

    <!-- Título -->
    <div class="tituloVista" :style="{
      top: (config.titulo.altura - 15) + 'px',
      fontSize: 'clamp(2rem, ' + config.titulo.tamano + 'vw, 9vw)',
      fontFamily: config.titulo.fuente,
      color: config.titulo.color
    }">
      {{ config.titulo.texto }}
    </div> 

    <!-- Fecha -->
    <div class="fechaVista" :style="{
      top: (config.datos.fechaAltura- 50) + 'px',
      fontSize: config.datos.fechaTamano + 'px',
      fontFamily: config.datos.fechaFuente,
      color: config.datos.fechaColor
    }">
      {{ config.datos.fecha }}
    </div>

    <!-- Hora -->
    <div class="horaVista" :style="{
      top: (config.datos.horaAltura - 80) + 'px',
      fontSize: config.datos.horaTamano + 'px',
      fontFamily: config.datos.horaFuente,
      color: config.datos.horaColor
    }">
      {{ config.datos.hora }}
    </div>

    <!-- Ubicación -->
    <div class="ubicacionVista" :style="{
      top: (config.datos.ubicacionAltura -100) + 'px',
      fontSize: config.datos.ubicacionTamano + 'px',
      fontFamily: config.datos.ubicacionFuente,
      color: config.datos.ubicacionColor
    }">
      {{ config.datos.ubicacion }}
    </div>

        <!-- Mensaje -->
    <div class="mensajeVista" :style="{
      top: (config.mensaje.mensajeAltura -160 )+ 'px',
      fontSize: config.mensaje.mensajeTamano + 'px',
      fontFamily: config.mensaje.mensajeFuente,
      color: config.mensaje.mensajeColor
    }">
      {{ config.mensaje.mensaje }}
    </div>

    <!-- Imagen principal -->
    <div class="foto-centralVista" :style="{
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
    </div>

    <!-- Galería -->
    <div class="galeriaVista" v-if="config.fotos && config.fotos.length">
      <div v-for="(foto, i) in config.fotos" :key="i" class="foto-galeria" :style="{ backgroundImage: `url(${foto})` }">
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
  const usuario = '02' // O dynamic desde ruta
  const res = await fetch(`http://localhost:3000/cargar/${usuario}`)
  const data = await res.json()
  console.table(data)
  config.value = data
})

</script>

<template>
    <div class="evento-wrapper">
        <div v-if="htmlContent" class="invitacion-sandbox" v-html="htmlContent"></div>
        <div v-else class="loading">Cargando evento...</div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const config = ref(null)
const htmlContent = ref('')

// Establecer fondo del body al montar el componente
onMounted(() => {
    document.body.style.backgroundColor = '#fbfbfe'
    document.documentElement.style.backgroundColor = '#fbfbfe'

    fetch(`http://localhost:3000/Evento/${id}`)
        .then(res => res.json())
        .then(data => aplicarConfiguracion(data))
        .catch(err => console.error('Error cargando configuración:', err))
})

// Limpiar al desmontar
onBeforeUnmount(() => {
    document.body.style.backgroundColor = ''
    document.documentElement.style.backgroundColor = ''
})

const aplicarConfiguracion = (data) => {
    config.value = data.datos
    htmlContent.value = data.htmlPersonalizado
}
</script>

<style scoped>
.evento-wrapper {
    background-color: transparent !important;
    min-height: 100vh;
    
    /* CAMBIO CLAVE: Usar flex solo en desktop */
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* Padding mínimo */
    padding: 10px;
    
    /* IMPORTANTE: Scroll management mejorado */
    overflow-y: auto;
    overflow-x: hidden;
    
    box-sizing: border-box;
    margin: 0;
    width: 100vw;
    max-width: 100vw; /* IMPORTANTE: No sobrepasar viewport */
}

.invitacion-sandbox {
    width: 100%;
    max-width: 800px;
    padding: 5px;
    border-radius: 8px;
    box-sizing: border-box;
    
    /* CAMBIO CLAVE: Resetear posicionamiento de elementos internos */
    position: relative;
    overflow-x: hidden; /* IMPORTANTE: Prevenir scroll horizontal en sandbox */
}

.loading {
    color: white;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
}

/* CAMBIOS CLAVE: Sobrescribir estilos problemáticos de los HTMLs inyectados */

/* Corregir contenedores con margin-top excesivo */
.invitacion-sandbox :deep(.contentBody) {
    margin-top: 0 !important;
    padding-top: 20px !important;
    min-height: auto !important;
    height: auto !important;
}

/* Corregir body interno si existe */
.invitacion-sandbox :deep(body) {
    margin-top: 0 !important;
    padding-top: 20px !important;
    min-height: auto !important;
}

/* Corregir contenedores principales de invitaciones */
.invitacion-sandbox :deep(.invitation-container) {
    margin-top: 0 !important;
    margin-bottom: 20px !important;
    position: relative !important;
    transform: none !important;
}

/* Asegurar que elementos con flexbox interno funcionen */
.invitacion-sandbox :deep(.invitation-container),
.invitacion-sandbox :deep(.contentBody) {
    display: block !important;
}

/* Media queries */
@media (max-width: 768px) {
    .evento-wrapper {
        /* CAMBIO CLAVE: En móvil, cambiar a layout vertical */
        align-items: flex-start;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .invitacion-sandbox {
        max-width: 100%;
        border-radius: 6px;
        padding: 10px;
    }
    
    /* Corregir contenedores en móvil */
    .invitacion-sandbox :deep(.contentBody) {
        margin-top: 0 !important;
        padding-top: 10px !important;
    }
}

@media (max-width: 480px) {
    .evento-wrapper {
        min-height: 100dvh;
        align-items: flex-start;
        padding: 15px 10px;
        justify-content: center;
    }

    .invitacion-sandbox {
        padding: 5px;
        border-radius: 4px;
        width: 100%;
    }

    .loading {
        font-size: 16px;
    }
    
    /* CAMBIO CLAVE: Forzar reset en móviles */
    .invitacion-sandbox :deep(.contentBody) {
        margin-top: 0 !important;
        padding-top: 5px !important;
        align-items: flex-start !important;
    }
    
    .invitacion-sandbox :deep(body) {
        margin-top: 0 !important;
        padding-top: 5px !important;
        align-items: flex-start !important;
    }
}

@media (max-width: 320px) {
    .evento-wrapper {
        padding: 10px 5px;
    }

    .invitacion-sandbox {
        padding: 5px;
        width: 100%;
        margin: 0;
    }
}

@media (min-width: 1200px) {
    .invitacion-sandbox {
        max-width: 900px;
        padding: 0px;
    }
}

/* Elementos internos generales */
.invitacion-sandbox :deep(*) {
    max-width: 100%;
    box-sizing: border-box;
}

.invitacion-sandbox :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}
</style>
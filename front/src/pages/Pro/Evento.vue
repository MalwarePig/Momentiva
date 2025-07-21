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
    min-height: 100vh; 
    /* Flexbox para centrado perfecto */
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* Padding responsivo */
    padding: 20px; 
    /* Para scroll cuando sea necesario */
    overflow-y: auto;
    overflow-x: hidden; /* Evita scroll horizontal innecesario */
    
    /* Box sizing para incluir padding en el cálculo */
    box-sizing: border-box; 
    /* Asegurar que no haya márgenes por defecto */
    margin: 0;
    width: 100%;
}

.invitacion-sandbox {
    /* Centrado y responsividad */
    width: 100%;
    max-width: 800px; /* Ancho máximo en desktop */
    
    /* Espaciado interno */
    padding: 20px;
    
    /* Estilo visual */
    background-color: white;
    border-radius: 8px; 
    /* Centrar contenido interno */
    text-align: center;
    
    /* Flexibilidad para contenido */
    box-sizing: border-box;
    
    /* Resetear estilos heredados */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
}

.loading {
    /* Estilo para el estado de carga */
    color: white;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
}

/* Media queries para diferentes dispositivos */

/* Tablet y dispositivos medianos */
@media (max-width: 768px) {
    .evento-wrapper {
        padding: 15px;
    }
    
    .invitacion-sandbox {
        max-width: 100%;
        padding: 15px;
        border-radius: 6px;
    }
}

/* Móviles */
@media (max-width: 480px) {
    .evento-wrapper {
        padding: 10px;
        /* Asegurar que use toda la altura en móvil */
        min-height: 100dvh; /* dvh es mejor para móviles */
        
        /* Forzar centrado perfecto en móvil */
        margin: 0;
        left: 0;
        right: 0;
        position: relative;
    }
    
    .invitacion-sandbox {
        padding: 12px;
        border-radius: 4px; 
        /* Centrado forzado para móvil */
        margin-left: auto;
        margin-right: auto;
        transform: translateX(0);
        position: relative;
        left: 0;
        right: 0;
    }
    
    .loading {
        font-size: 16px;
    }
}

/* Pantallas muy pequeñas */
@media (max-width: 320px) {
    .evento-wrapper {
        padding: 8px;
        /* Centrado forzado en pantallas muy pequeñas */
        justify-content: center;
        align-items: center;
    }
    
    .invitacion-sandbox {
        padding: 10px;
        width: calc(100% - 0px); /* Usar todo el ancho disponible menos margen mínimo */
        margin: 0 auto;
    }
}

/* Para pantallas grandes */
@media (min-width: 1200px) {
    .invitacion-sandbox {
        max-width: 900px;
        padding: 30px; 
    }
}

/* Asegurar que elementos internos también se centren */
.invitacion-sandbox :deep(*) {
    max-width: 100%;
    box-sizing: border-box;
}

/* Centrar imágenes si las hay */
.invitacion-sandbox :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}
</style>
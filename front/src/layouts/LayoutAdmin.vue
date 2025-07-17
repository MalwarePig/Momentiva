<!-- LayoutMain.vue -->
<template>
    <div class="Nav">
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/PanelAdmin">Solicitudes</a></li>
            <li><a href="/Asignacion">Asignacion</a></li>

            <button class="theme-toggle" @click="toggleTheme" v-html="theme === 'Dark' ?
                '<i class=\'fa-solid fa-sun\'></i>' :
                '<i class=\'fa-solid fa-moon\'></i>'"> </button>
        </ul>

    </div>
    <main>
        <router-view /> <!-- Aquí carga el contenido dinámico -->
    </main>
</template>

<style scoped>
.Nav {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--bg-color-prim);
    color: var(--main-Font);
    border-radius: 16px;
    box-shadow: var(--box-shadow);
    padding: 10px 20px;
    overflow: hidden;
    /* importante */
}

ul {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    padding: 5px 10px;
    border-radius: 8px;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

li:hover {
    background-color: #e4e4f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

li a {
    font-family: "Montserrat";
}


footer {
    margin-top: 60px;
    height: 160px;
    background-color: #13111c;
    mask-image: linear-gradient(to top, black 70%, transparent);
    color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


.footer-content {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

footer .redes {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    font-size: 30px;
}

footer .redes i {
    color: #f8f8f8;
    padding: 5px;
    transition: tranform 0.2s ease;
}

footer .redes i:hover {
    transform: scale(1.2);
}

.links {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer-content a {
    color: #f8f8f8;
}

.footer-content a:hover {
    color: var(--hover-links);
}



.theme-toggle {
    background-color: var(--main-Font);
    color: var(--bg-color-prim);
    border: none;
    border-radius: 20px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        filter: brightness(90%);
        transform: scale(1.08);
    }
}
</style>


<script setup>
import { onMounted, ref } from 'vue'

const theme = ref('Light')

function toggleTheme() {
    if (theme.value === 'Dark') {
        theme.value = 'Light'
        document.documentElement.classList.remove('dark-mode')
    } else {
        theme.value = 'Dark'
        document.documentElement.classList.add('dark-mode')
    }

    // Guardar en localStorage
    localStorage.setItem('theme', theme.value)
}

onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'Dark') {
        theme.value = 'Dark'
        document.documentElement.classList.add('dark-mode')
    } else {
        theme.value = 'Light'
        document.documentElement.classList.remove('dark-mode')
    }
})
</script>

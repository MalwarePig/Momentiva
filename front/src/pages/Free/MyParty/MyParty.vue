<script setup>
import Modal from '../../../components/Modals/ModalCarga/ModalCarga.vue'
import dateFormat from '../../../scripts/dateFormat.js'
import { ref, onMounted, nextTick } from 'vue' 

const modalLogin = ref(null)
const datosRecibidos = ref(null)
const invitados = ref([])
const link = ref(null)

const familias = ref(0)
const TotalInvitados = ref(0)
function handleDatos(datos) {
    datosRecibidos.value = datos  
    var id = datos.id
    link.value = 'http://localhost:5173/Invitacion/' + id

    fetch(`http://localhost:3000/cargarInvitadosLab/${id}`)
        .then(res => res.json())                 // Convierte la respuesta en JSON
        .then(data => { 
            console.log(data) // Muestra los datos en la consola
            invitados.value = data
            familias.value = data.length
            var Total = 0

             data.forEach(element => {
                Total = Total + parseInt(element.cantidad) 
            });

            TotalInvitados.value = Total  
        })
        .catch(err => console.error('Error cargando configuración:', err)) // Muestra error si falla la carga
}

onMounted(async () => {
    await nextTick()
    if (modalLogin.value && modalLogin.value.showModal) {
        modalLogin.value.showModal() // ¡OJO! Aquí con paréntesis para llamar la función
    } else {
        console.error('modalLogin no tiene showModal')
    }
})
</script>

<template>
    <h1>Mi evento</h1>
    <div class="dashboard">
        <div class="Familias">
            <div class="widget">
                <h3>Familias</h3>
                <span>{{ familias }}</span>
            </div>
        </div>
        <div class="PanelPrincipal">
            <h2>Invitados confirmados</h2>

            <div class="input-group">
                <input type="text" placeholder="Enlace de invitación..." v-model="link">
                <a :href="link" target="_blank"><i class="fa-solid fa-square-arrow-up-right"></i></a>
            </div>

            <div class="tarjeta tarjetaHeader">
                <div class="datos">
                    <span>Invitiados</span>
                </div>
                <div class="datos">
                    <span>Cantidad</span>
                </div>
                <div class="datos">
                    <span>Fecha de confirmación</span>
                </div>
            </div>


            <div class="tarjeta" v-for="(invitado, index) in invitados" :key="index">
                <div class="datos familia">
                    <span>{{ invitado.familia }}</span>
                </div>
                <div class="datos cantidad">
                    <span>{{
                        invitado.cantidad }}</span>
                </div>
                <div class="datos fecha">
                    <span>{{ dateFormat(invitado.fechaConfirmacion)  }}</span>
                </div>
            </div>
        </div>

        <div class="Invitados">
            <div class="widget">
                <h3>Invitados</h3>
                <span>{{ TotalInvitados }}</span>
            </div>
        </div>
    </div>



    <Modal ref="modalLogin" @enviar-datos="handleDatos" />

</template>

<style scoped>
.dashboard {
    display: flex;
    gap: 10px;
    padding: 0 20px;
}

.Familias,
.Invitados {
    width: 400px;
}

.widget {
    margin: 20px auto;
    background-color: var(--bg-color-prim);
    color: #fff;
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: var(--box-shadow);
    border-radius: 16px;
    background: var(--Widget)
        /* 
    background: radial-gradient( #aa4b6b, #3b8d99); */
}

.widget h3 {
    font-size: 2rem;
    margin: 15px 0;
    color: var(--font-gradient);
}

.widget span {
    font-size: 5rem;
    color: var(--main-Font);
    font-weight: 900;
}

.PanelPrincipal {
    min-height: 85vh;
    max-height: 80vh;
    overflow-y: auto;
    width: 50%;
    background-color: var(--bg-color-prim);
    color: var(--main-Font);
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: var(--box-shadow);
    border-radius: 16px;
    justify-content: start;
}

h1,
h2,
h3 {
    text-align: center;
    color: var(--main-Font);
}

.tarjeta {
    width: 80%;
    height: 55px;
    background-color: var(--Bg-color-sec);
    color: var(--main-Font);
    margin: 5px auto;
    border-radius: 16px;
    box-shadow: var(--box-shadow);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

}

.tarjetaHeader {
    padding: 0px 20px;
    background-color: var(--main-Font);
    color: var(--main-Font-inverter);
}

.datos {
    padding: 10px 0;
    flex: 1;
    font-weight: bold;
    font-size: 1.2rem;
}

.familia {
    text-align: start;
    padding-left: 10%;
    border-radius: 16px;

}

.tarjeta:not(.tarjetaHeader) div:nth-child(2) span {
    background-color: #e6c50a;
    padding: 6px;
    border-radius: 8px;
    margin: 8px 0;
}

.tarjeta:last-child {
    margin-bottom: 20px;
}

#app {
    overflow-y: hidden !important;
}


.input-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    padding: 3px 10px;
    margin: 0 auto;
    border: 2px solid var(--sec-border);
    border-radius: 24px;
}

.input-group:hover{
    border: 2px solid var(--hover-links);
}

.input-group input {
    flex: 1;
    padding: 0.5em;
    border: none;
    background-color: transparent;
    color: var(--main-Font); 
}

.input-group input:focus {
  outline: none;
}

.input-group button {
    font-size: 1.3rem;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

 


.input-group a {
    font-size: 1.4rem;
    text-decoration: none;
    padding: 0;
    margin-right: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}



</style>
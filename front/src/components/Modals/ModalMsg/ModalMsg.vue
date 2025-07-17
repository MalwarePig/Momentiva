<script setup>
import { ref, defineExpose } from 'vue'
const modalLogin = ref(null)
const msg = ref(null)
const estado = ref(null)


function showModal(valores, status) {
  console.log(" desde modal" + valores, status)
  msg.value = valores
  estado.value = status
  modalLogin.value?.showModal()
}

function closeModal() {
  modalLogin.value?.close()
}



defineExpose({
  showModal,
  closeModal
})
</script>

<template>
  <dialog ref="modalLogin">
    <div class="dialog-content">
      <button @click="closeModal" id="btnClose">
        <i class="fas fa-times"></i>
      </button>
      <div class="formElement">
        <p>{{ msg }}</p>
      </div>

      <div class="formElement">
        <button @click="closeModal">
          <i v-if="estado" class="fa-solid fa-check"></i>
          <i v-else class="fa-solid fa-xmark"></i>
        </button>

      </div>

    </div>
  </dialog>
</template>

<style scoped>
/* Estilos del <dialog> */
dialog {
  width: 450px; 
  border: none;
  border-radius: 10px;
  padding: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

/* Contenedor interno con flex */
.dialog-content { 
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  background: var(--Bg-color-sec, white);
  border-radius: 10px;
}

/* Difuminado del fondo */
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

/* Elementos de formulario */
.formElement {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 50px 0;
  text-align: center;
}

.formElement p {
  font-family: Poppins-Bold, "Lora", "Roboto Mono", sans-serif;
}


/* Botones */
button {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  font-size: 2rem;
  border-radius: 16px;
  border: none;
  background-color: var(--main-Font);
  color: var(--main-Font-inverter);
  box-shadow: var(--box-shadow);
  scale: 1;
}


#btnClose {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  background-color: transparent;
  box-shadow: none;
  margin: 5px 5px 0 0;
}

button:hover {
  transform: scale(1.1);
  cursor: pointer;
}
</style>

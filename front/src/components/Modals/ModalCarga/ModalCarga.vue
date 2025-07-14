<script setup>
import { ref, defineExpose } from 'vue'
import revolverStrings from '../../../scripts/encript'

const modalLogin = ref(null)
const user = ref('')
const pass = ref('')

const emit = defineEmits(['enviar-datos'])

function showModal() {
  modalLogin.value?.showModal()
}

function Enviar() {
  var str1 = user?.value
  var str2 = pass?.value

  emit('enviar-datos', { id: revolverStrings(str1, str2) })
  modalLogin.value?.close()
}

defineExpose({
  showModal
})
</script>

<template>
  <!-- Fondo difuminado -->
  <!-- <div class="modal-backdrop"></div>
 -->


  <dialog ref="modalLogin">
    <div class="dialog-content">
      <div class="formElement">
        <label>Usuario</label>
        <input v-model="user" placeholder="Usuario" value="Yumiko" />
      </div>

      <div class="formElement">
        <label>Contraseña</label>
        <input type="password" v-model="pass" placeholder="Contraseña" value="1702" />
      </div>
      <div class="formElement">
        <button @click="Enviar" id="btnEnviar"><i class="fas fa-smile-wink"></i> </button>
      </div>


    </div>
    <button @click="modalLogin?.close()" id="btnClose"><i class="fas fa-times"></i></button>
  </dialog>
</template>

<style scoped>
dialog {
  width: 450px;
  height: 280px;
  padding: 0;
  gap: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 8px;
  
  overflow: hidden;
}

.dialog-content {
  margin: 20px auto; 
  display: flex;
  flex-direction: column;
 gap: 21px;
  position: relative;
  border-radius: 10px;

}


.formElement {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin-top: 10px;
  font-size: 1.1rem;
  border-radius: 8px;
  padding: 5px;
  font-family: Poppins-Bold, "Lora", "Roboto Mono", sans-serif;
  font-weight: 500;
  letter-spacing: -0.01rem;
  width: 200px;
  background-color: var(--Bg-color-sec);
  color: var(--main-Font);
  outline: none;
}



label {
  margin-top: 10px;
  font-size: 1.1rem;

  font-family: Poppins-Bold, "Lora", "Roboto Mono", sans-serif;
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -0.01rem;
}



.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  /* Oscurecido sin blur */
  z-index: 10;
}

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
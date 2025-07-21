<script setup>
import { ref } from 'vue';
import Modal from '../../../components/Modals/ModalMsg/ModalMsg.vue'

const modalMsg = ref(null);
// Objeto reactivo para almacenar todos los datos del formulario
const formData = ref({
    nombreFestejado1: '',
    nombreFestejado2: '',
    fechaEvento: '',
    fechaLimiteRespuesta: '', // Nuevo campo agregado
    lugarEvento: '',
    lugarCeremonia: '', // Nuevo campo agregado
    horaEvento: '', 
    horaShow: '',
    horaCeremonia: '', // Nuevo campo agregado
    codigoVestimenta: '',
    version: '',
    mensajeEspecial: '',
    cancionEntrada: '',
    tematica: 'Clásico', // Valor por defecto para el select
    estado: 'Pendiente',
    fechaSolicitud: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
    contacto: {
        telefono: '',
        email: '',
        contrasena: ''
    }
});

const resetForm = () => {
    formData.value = {
        nombreFestejado1: '',
        nombreFestejado2: '',
        fechaEvento: '',
        fechaLimiteRespuesta: '',
        lugarEvento: '',
        lugarCeremonia: '',
        horaEvento: '', 
        horaShow: '',
        horaCeremonia: '',
        codigoVestimenta: '',
        version: '',
        mensajeEspecial: '',
        cancionEntrada: '',
        tematica: 'Clásico',
        estado: 'Pendiente',
        fechaSolicitud: new Date().toISOString().split('T')[0],
        contacto: {
            telefono: '',
            email: '',
            contrasena: ''
        }
    };
    errors.value = {}; // También reseteamos los errores
};

// Objeto reactivo para almacenar los errores de validación
const errors = ref({});

// Función para validar el formulario
const validateForm = () => {
    const newErrors = {};

    // --- Reglas de validación ---

    // Campos obligatorios
    if (!formData.value.nombreFestejado1.trim()) newErrors.nombreFestejado1 = 'El primer nombre es obligatorio.';
    // El segundo festejado es opcional, pero si se llena, validamos que no esté vacío
    if (formData.value.nombreFestejado2.trim() === '' && formData.value.nombreFestejado2 !== '') {
        newErrors.nombreFestejado2 = 'Complete el segundo nombre o déjelo vacío.';
    }
    if (!formData.value.fechaEvento) newErrors.fechaEvento = 'La fecha es obligatoria.';
    if (!formData.value.lugarEvento.trim()) newErrors.lugarEvento = 'El lugar es obligatorio.';
    if (!formData.value.horaEvento) newErrors.horaEvento = 'La hora de inicio es obligatoria.';

    // Validación de Correo Electrónico (solo si se ingresó uno)
    const email = formData.value.contacto.email.trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = 'El formato del correo no es válido.';
    }

    // Validación de Teléfono (solo si se ingresó uno)
    // Permite números, espacios, guiones y paréntesis, con un mínimo de 7 dígitos.
    const phone = formData.value.contacto.telefono.trim();
    if (phone && !/^(?:\d[\s-()]?){7,}$/.test(phone)) {
        newErrors.telefono = 'El formato del teléfono no es válido.';
    }

    errors.value = newErrors;
    // Devuelve true si no hay errores, de lo contrario false
    return Object.keys(newErrors).length === 0;
};

// Función que se ejecuta al enviar el formulario
const handleSubmit = () => {
    // Primero, valida el formulario
    const isFormValid = validateForm();

    if (isFormValid) {
        fetch('http://localhost:3000/setSolicitud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData.value)
        })
            .then(res => {
                return res.json().then(data => {
                    const exito = res.status === 200 // Verificamos si la respuesta fue exitosa
                    /*   alert(exito ? "Invitación guardada exitosamente" : "Error al guardar la invitación"); */
                    modalMsg.value.showModal('Invitación guardada exitosamente, recibira un correo con los detalles', exito)
                     resetForm();  // ← resetea el formulario solo si fue exitoso
                })
            })
            .catch(err => {
                console.error("❌ Error de red:", err)
                if (modalMsg.value?.showModal) {
                    modalMsg.value.showModal("Error al guardar invitación", false)
                }
            });
    } else {
        // Si no es válido, muestra una alerta. Los errores ya estarán visibles en el formulario
        console.log('El formulario contiene errores:', errors.value);
        alert('Por favor, corrige los errores marcados en el formulario.');
    }
};

</script>


<template>
    <div class="invitation-form-container">
        <!-- Usamos novalidate para deshabilitar la validación nativa del navegador y usar la nuestra -->
        <form @submit.prevent="handleSubmit" novalidate>
            <h2>Detalles de la Invitación</h2>

            <!-- Datos del Evento -->
            <div class="form-section">
                <h3>Información del Evento</h3>

                <div class="form-row">
                    <div class="form-group">
                        <label for="nombre-festejado1">Nombre del primer festejado(a):</label>
                        <input type="text" id="nombre-festejado1" v-model="formData.nombreFestejado1"
                            :class="{ 'has-error': errors.nombreFestejado1 }"
                            placeholder="Primer nombre o nombre completo">
                        <p v-if="errors.nombreFestejado1" class="error-message">{{ errors.nombreFestejado1 }}</p>
                    </div>
                    <div class="form-group">
                        <label for="nombre-festejado2">Nombre del segundo festejado(a) (opcional):</label>
                        <input type="text" id="nombre-festejado2" v-model="formData.nombreFestejado2"
                            :class="{ 'has-error': errors.nombreFestejado2 }"
                            placeholder="Segundo nombre (opcional para bodas o eventos conjuntos)">
                        <p v-if="errors.nombreFestejado2" class="error-message">{{ errors.nombreFestejado2 }}</p>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="fecha-evento">Fecha del evento:</label>
                        <input type="date" id="fecha-evento" v-model="formData.fechaEvento"
                            :class="{ 'has-error': errors.fechaEvento }">
                        <p v-if="errors.fechaEvento" class="error-message">{{ errors.fechaEvento }}</p>
                    </div>
                    <div class="form-group">
                        <label for="fecha-limite-respuesta">Fecha límite de respuesta:</label>
                        <input type="date" id="fecha-limite-respuesta" v-model="formData.fechaLimiteRespuesta"
                            :class="{ 'has-error': errors.fechaLimiteRespuesta }">
                        <p v-if="errors.fechaLimiteRespuesta" class="error-message">{{ errors.fechaLimiteRespuesta }}</p>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="lugar-evento">Lugar del evento:</label>
                        <input type="text" id="lugar-evento" v-model="formData.lugarEvento"
                            placeholder="Ej: Salón de Fiestas 'El Roble'" :class="{ 'has-error': errors.lugarEvento }">
                        <p v-if="errors.lugarEvento" class="error-message">{{ errors.lugarEvento }}</p>
                    </div>
                    <div class="form-group">
                        <label for="lugar-ceremonia">Lugar de la ceremonia:</label>
                        <input type="text" id="lugar-ceremonia" v-model="formData.lugarCeremonia"
                            placeholder="Ej: Iglesia San José" :class="{ 'has-error': errors.lugarCeremonia }">
                        <p v-if="errors.lugarCeremonia" class="error-message">{{ errors.lugarCeremonia }}</p>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="hora-inicio">Hora del evento:</label>
                        <input type="time" id="hora-inicio" v-model="formData.horaEvento"
                            :class="{ 'has-error': errors.horaEvento }">
                        <p v-if="errors.horaEvento" class="error-message">{{ errors.horaEvento }}</p>
                    </div>
                    <div class="form-group">
                        <label for="hora-ceremonia">Hora de la ceremonia:</label>
                        <input type="time" id="hora-ceremonia" v-model="formData.horaCeremonia">
                    </div>
                    <div class="form-group">
                        <label for="hora-show">Hora del show:</label>
                        <input type="time" id="hora-show" v-model="formData.horaShow">
                    </div>
                </div>
            </div>

            <!-- Detalles Adicionales -->
            <div class="form-section">
                <h3>Detalles Adicionales</h3>
                <div class="form-group">
                    <label for="codigo-vestimenta">Código de vestimenta:</label>
                    <input type="text" id="codigo-vestimenta" v-model="formData.codigoVestimenta"
                        placeholder="Ej: Formal, Casual, Etiqueta">
                </div>
                <div class="form-group">
                    <label for="cancion-entrada">Canción de entrada:</label>
                    <input type="text" id="cancion-entrada" v-model="formData.cancionEntrada"
                        placeholder="Ej: 'Viva La Vida' - Coldplay">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="tematica-invitacion">Temática de invitación:</label>
                        <select id="tematica-invitacion" v-model="formData.tematica">
                            <option value="Clásico">Clásico</option>
                            <option value="Boda">Boda</option>
                            <option value="XV">XV Años</option>
                            <option value="Infantil">Infantil</option>
                            <option value="Religiosa">Religiosa</option>
                            <option value="Laboral">Laboral</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="version-invitacion">Versión de invitación:</label>
                        <select id="version-invitacion" v-model="formData.version">
                            <option value="">Seleccionar versión</option>
                            <option value="V1">V1</option>
                            <option value="V2">V2</option>
                            <option value="V3">V3</option>
                            <option value="V4">V4</option>
                            <option value="V5">V5</option>
                            <option value="V6">V6</option>
                            <option value="V7">V7</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="mensaje-especial">Mensaje especial o dedicatoria:</label>
                    <textarea id="mensaje-especial" v-model="formData.mensajeEspecial" rows="4"></textarea>
                </div>
            </div>

            <!-- Datos de Contacto -->
            <div class="form-section">
                <h3>Datos de Contacto (para confirmaciones)</h3>
                <div class="form-group">
                    <label for="telefono">Número de teléfono:</label>
                    <input type="tel" id="telefono" v-model="formData.contacto.telefono" placeholder="Ej: 55 1234 5678"
                        :class="{ 'has-error': errors.telefono }">
                    <p v-if="errors.telefono" class="error-message">{{ errors.telefono }}</p>
                </div>
                <div class="form-group">
                    <label for="email">Correo electrónico:</label>
                    <input type="email" id="email" v-model="formData.contacto.email" placeholder="ejemplo@correo.com"
                        :class="{ 'has-error': errors.email }">
                    <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
                </div>
                <div class="form-group">
                    <label for="pass">Contraseña:</label>
                    <input type="password" id="pass" v-model="formData.contacto.contrasena"
                        placeholder="Escribe una contraseña segura" :class="{ 'has-error': errors.contrasena }">
                    <p v-if="errors.contrasena" class="error-message">{{ errors.contrasena }}</p>
                </div>
            </div>

            <button type="submit" class="submit-btn">Crear Invitación</button>
        </form>
    </div>

    <Modal ref="modalMsg" />
</template>



<style scoped>
.invitation-form-container {
    max-width: 100%;
    width: 100%;
    margin: 1rem auto;
    padding: 1rem;
    background: linear-gradient(145deg, #ffffff, #f3f3f3);
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
    font-family: 'Segoe UI', Roboto, sans-serif;
    color: #333;
    box-sizing: border-box;
}

form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

h2 {
    font-family: "Faculty Glyphic", serif;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #222;
}

.form-section {
    padding: 1rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);

    @media (width >=600px) {
        margin: 0 12rem;
    }
}

h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--home-rosa);
    border-left: 4px solid var(--home-rosa);
    padding-left: 0.75rem;
}

.form-group {
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
}

.form-group label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 600;
    color: #444;
}

input[type="text"],
input[type="date"],
input[type="time"],
input[type="tel"],
input[type="email"],
input[type="password"],
/* ← esto falta */
textarea,
select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fdfdfd;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
}

input:focus,
textarea:focus,
select:focus {
    border-color: var(--home-rosa);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
    outline: none;
}

textarea {
    resize: vertical;
}

/* FORM ROW: 1 columna en mobile, se convierte en fila en pantallas grandes */
.form-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-row .form-group {
    flex: 1;
    min-width: 100%;
}

@media (min-width: 640px) {
    .form-row {
        flex-direction: row;
    }

    .form-row .form-group {
        min-width: 150px;
    }
}

.submit-btn {
    padding: 1rem;
    width: 300px;
    background: linear-gradient(to right, var(--home-rosa), var(--home-rojo));
    color: white;
    margin: 0 auto;
    font-size: 1.2rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(3, 3, 3, 0.24);
    transition: transform 0.2s ease, background-color 0.3s ease;
}

.submit-btn:hover {
    background: linear-gradient(to right, var(--home-naranja), var(--home-rosa));
    transform: translateY(-1px);
}

/* Errores */
.has-error {
    border-color: #e74c3c !important;
}

.has-error:focus {
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
}

.error-message {
    margin-top: 0.25rem;
    color: #e74c3c;
    font-size: 0.875rem;
}
</style>
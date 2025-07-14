<script setup>
// Importa funciones necesarias de Vue
import { onMounted, nextTick, ref } from 'vue'
// Importa funciones personalizadas desde tu archivo Lab.js
import { iniciarConfigurador, Exportar, obtenerConfig, initSelectorFondo } from './Lab.js'
import Modal from '../../components/Modals/ModalMsg/ModalMsg.vue'


const modalMsg = ref(null)
//Define el componente Vue usando la función setup, que se ejecuta cuando el componente se monta.
const iframeRef = ref(null);//Crea una referencia reactiva para acceder al <iframe> desde el DOM (lo usarás para comunicarte con él usando postMessage).

const enviarConfiguracionAlIframe = () => {
    if (iframeRef.value && iframeRef.value.contentWindow) {
        const config = obtenerConfig();
        iframeRef.value.contentWindow.postMessage({
            type: 'ACTUALIZAR_CONFIGURACION',
            payload: config
        }, 'http://localhost:5173'); //  origen del iframe receptor
    }
};

onMounted(async () => {
    initSelectorFondo();  // <--- Aquí la llamas para que agregue los event listeners a las imágenes

    await nextTick(); // Espera a que el DOM esté completamente listo
    iniciarConfigurador(enviarConfiguracionAlIframe); // Inicia el configurador con la función de actualización

    // Agrega un evento al botón Exportar si existe en el DOM
    document.getElementById('Exportar')?.addEventListener('click', () => {
        Exportar(modalMsg); // Ejecuta la exportación
        enviarConfiguracionAlIframe(); // Reenvía la configuración al iframe
    });

});



</script>

<template>
    <Modal ref="modalMsg" />


    <div class="Laboratorio">
        <!-- Panel izquierdo -->
        <div class="panel opciones">
            <h2>Personaliza tu invitación aquí</h2>

            <details>
                <summary>Sección 1: Fondo</summary>
                <div class="control">
                    <div class="element">
                        <label for="colorFondo">Color de Fondo</label>
                        <input type="color" id="colorFondo" value="#000">
                    </div>
                    <div class="sub">
                        <!-- <div class="element">
                            <label>Elige un fondo</label>
                            <div class="galeria-scroll" id="galeriaFondos">
                                <img v-for="i in 16" :key="i" :src="`../../../public/img/bg/Fondo${i}.webp`"
                                     :alt="`Fondo ${i}`"
                                     @click="seleccionarFondo(`../../../public/img/bg/Fondo${i}.webp`)"
                                     class="miniatura-fondo" />
                            </div>
                        </div> -->

                        <div class="element">
                            <label>Elige un fondo</label>
                            <div class="galeria-scroll" id="galeriaFondos">
                                <img src="../../../public/img/bg/Fondo1.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo2.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo3.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo4.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo5.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo6.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo7.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo8.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo9.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo10.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo11.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo12.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo13.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo14.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo15.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo17.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo18.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo19.webp" alt="" class="miniatura-fondo">
                                <img src="../../../public/img/bg/Fondo20.webp" alt="" class="miniatura-fondo">
                            </div>
                            <input type="hidden" id="imagenFondo" value="" />
                        </div>
                    </div>

                    <div class="sub">
                        <!-- <div class="element">
                            <label for="imagenFondo">Imagen de Fondo</label>
                            <select id="imagenFondo">
                                <option value="">(Sin imagen)</option>
                                <option value="../../../public/img/bg/Fondo1.webp">Fondo 1</option>
                                <option value="../../../public/img/bg/fondo2.webp">Fondo 2</option>
                                <option value="../../../public/img/bg/Fondo3.webp">Fondo 3</option>
                                <option value="../../../public/img/bg/Fondo4.webp">Fondo 4</option>
                                <option value="../../../public/img/bg/Fondo5.webp">Fondo 5</option>
                                <option value="../../../public/img/bg/Fondo6.webp">Fondo 6</option>
                                <option value="../../../public/img/bg/Fondo7.webp">Fondo 7</option>
                                <option value="../../../public/img/bg/Fondo8.webp">Fondo 8</option>
                                <option value="../../../public/img/bg/Fondo9.webp">Fondo 9</option>
                                <option value="../../../public/img/bg/Fondo10.webp">Fondo 10</option>
                                <option value="../../../public/img/bg/Fondo11.webp">Fondo 11</option>
                                <option value="../../../public/img/bg/Fondo12.webp">Fondo 12</option>
                                <option value="../../../public/img/bg/Fondo13.webp">Fondo 13</option>
                                <option value="../../../public/img/bg/Fondo16.webp">Fondo 16</option>
                                <option value="../../../public/img/bg/Fondo14.webp">Fondo 14</option>
                                <option value="../../../public/img/bg/Fondo15.webp">Fondo 15</option>
                            </select>
                        </div> -->

                        <div class="element">
                            <label for="bgEstilo">Estilo</label>
                            <select id="bgEstilo">
                                <option value="cover" selected>Mantener proporción</option>
                                <option value="contain ">Contener </option>
                                <option value="auto ">Automático </option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="RepetirBG">Repetir</label>
                            <input type="checkbox" name="RepetirBG" id="RepetirBG">
                        </div>

                        <div class="element">
                            <label for="bgGray">Grises</label>
                            <input type="checkbox" name="bgGray" id="bgGray">
                        </div>

                    </div>
                </div>
            </details>

            <details>
                <summary>Sección 2: Imagen principal</summary>

                <div class="control">

                    <div class="sub">
                        <!--  <div class="element">
                            <label for="">Imagen central</label>
                            <label class="file-input">
                           <span><i class="fa-solid fa-image"></i></span>
                                <input type="file" accept="image/*" id="fotoCentral">
                            </label>
                        </div>   -->


                        <div class="element">
                            <label for="fotoCentral">Link de imagen</label>
                            <input type="text" id="fotoCentral" name="fotoCentral" placeholder="Link de imagen">
                        </div>

                        <!-- <div class="element">
                            <label for="fotoCentral">Imagen principal</label>
                            <select id="fotoCentral">
                                <option value="">(Sin imagen)</option>
                                <option value="../../../public/img/perfil/Yumi.jpg">Yumi</option>
                                <option value="../../../public/img/perfil/fiesta.webp">fiesta</option>
                                <option value="../../../public/img/perfil/niño.webp">niño</option>
                                <option value="../../../public/img/perfil/niña.webp">niña</option>
                                <option value="../../../public/img/perfil/xv.webp">XVS</option>
                            </select>
                        </div> -->


                        <div class="element">
                            <label for="imgPrimEstilo">Estilo</label>
                            <select id="imgPrimEstilo">
                                <option value="fill">por defecto</option>
                                <option value="contain">manteniendo proporción</option>
                                <option value="cover">Escalar la imagen</option>
                                <option value="scale-down">Automático</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="imgPrimGray">Escala de grises</label>
                            <input type="checkbox" name="imgPrimGray" id="imgPrimGray">
                        </div>

                        <div class="element">
                            <label for="imgPrimSize">Tamaño</label>
                            <input type="range" name="imgPrimSize" id="imgPrimSize" min="0" max="100" value="100">
                        </div>

                        <div class="element">
                            <label for="imgPrimHeight">Altura</label>
                            <input type="range" name="imgPrimHeight" id="imgPrimHeight" min="0" max="100" value="50">
                        </div>

                        <div class="element">
                            <label for="imgPrimPosicion">Posicion</label>
                            <input type="range" name="imgPrimPosicion" id="imgPrimPosicion" min="-200" max="1000"
                                value="0">
                        </div>

                        <div class="element">
                            <label for="imgPrimborder">Bordes</label>
                            <input type="range" name="imgPrimborder" id="imgPrimborder" min="0" max="100" value="0">
                        </div>

                        <div class="element">
                            <label for="imgPrimGradient">Desvanecido</label>
                            <input type="range" name="imgPrimGradient" id="imgPrimGradient" min="0" max="100" value="0">
                        </div>

                        <div class="element">
                            <label for="imgPrimTransparencia">Transparencia</label>
                            <input type="range" name="imgPrimTransparencia" id="imgPrimTransparencia" min="0" max="100"
                                value="0">
                        </div>





                    </div>
                </div>
            </details>

            <details>
                <summary>Sección 3: Título</summary>
                <div class="control">
                    <div class="sub">
                        <div class="element">
                            <label for="anfitrion">Anfitrión</label>
                            <input type="text" id="anfitrion" placeholder="Ej: Familia García">
                        </div>

                        <div class="element">
                            <label for="anfitrionSize">Tamaño</label>
                            <input type="range" name="anfitrionSize" id="anfitrionSize">
                        </div>

                        <div class="element">
                            <label for="anfitrionHeight">Altura</label>
                            <input type="range" name="anfitrionHeight" id="anfitrionHeight" min="0" max="1000"
                                value="300">
                        </div>

                        <div class="element">
                            <label for="fontAnfitrion">Tipografia</label>
                            <select id="fontAnfitrion">
                                <option value="Allura">Allura</option>
                                <option value="Comic Relief">Comic Relief</option>
                                <option value="Delius Swash Caps">Delius Swash Caps</option>
                                <option value="Kapakana">Kapakana</option>
                                <option value="Lora">Lora</option>
                                <option value="Meow Script">Meow Script</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Pinyon Script">Pinyon Script</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Roboto Mono">Roboto Mono</option>
                                <option value="Send Flowers">Send Flowers</option>
                                <option value="Twinkle Star">Twinkle Star</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="boldAnfitrion">Negrita</label>
                            <input type="checkbox" name="boldAnfitrion" id="boldAnfitrion" checked>
                        </div>

                        <div class="element">
                            <label for="colorAnfitrion">Color</label>
                            <input type="color" id="colorAnfitrion" value="#000">
                        </div>

                        <div class="element">
                            <label for="bgAnfitrion">Fondo para texto</label>
                            <input type="checkbox" name="bgAnfitrion" id="bgAnfitrion">
                        </div>
                    </div>

                    <div class="sub">
                        <div class="element">
                            <label for="nombreEvento">Nombre del Evento</label>
                            <input type="text" id="nombreEvento" placeholder="Ej: Fiesta de cumpleaños">
                        </div>

                        <div class="element">
                            <label for="EventoSize">Tamaño</label>
                            <input type="range" name="EventoSize" id="EventoSize" min="0" max="100" value="30">
                        </div>

                        <div class="element">
                            <label for="EventoHeight">Altura</label>
                            <input type="range" name="EventoHeight" id="EventoHeight" min="-100" max="1000" value="380">
                        </div>

                        <div class="element">
                            <label for="fontEvento">Tipografia</label>
                            <select id="fontEvento">
                                <option value="Allura">Allura</option>
                                <option value="Comic Relief">Comic Relief</option>
                                <option value="Delius Swash Caps">Delius Swash Caps</option>
                                <option value="Kapakana">Kapakana</option>
                                <option value="Lora">Lora</option>
                                <option value="Meow Script">Meow Script</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Pinyon Script">Pinyon Script</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Roboto Mono">Roboto Mono</option>
                                <option value="Send Flowers">Send Flowers</option>
                                <option value="Twinkle Star">Twinkle Star</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="boldEvento">Negrita</label>
                            <input type="checkbox" name="boldEvento" id="boldEvento">
                        </div>

                        <div class="element">
                            <label for="colorEvento">Color</label>
                            <input type="color" id="colorEvento" value="#000">
                        </div>

                        <div class="element">
                            <label for="bgEvento">Fondo para texto</label>
                            <input type="checkbox" name="bgEvento" id="bgEvento">
                        </div>
                    </div>

                    <div class="sub">
                        <div class="element">
                            <label for="titulo">Título</label>
                            <input type="text" id="titulo" placeholder="Ej: ¡Estás invitado!">
                        </div>

                        <div class="element">
                            <label for="TituloSize">Tamaño</label>
                            <input type="range" name="TituloSize" id="TituloSize" min="0" max="100" value="40">
                        </div>

                        <div class="element">
                            <label for="TituloHeight">Altura</label>
                            <input type="range" name="TituloHeight" id="TituloHeight" min="0" max="1000" value="450">
                        </div>

                        <div class="element">
                            <label for="fontTitulo">Tipografia</label>
                            <select id="fontTitulo">
                                <option value="Allura">Allura</option>
                                <option value="Comic Relief">Comic Relief</option>
                                <option value="Delius Swash Caps">Delius Swash Caps</option>
                                <option value="Kapakana">Kapakana</option>
                                <option value="Lora">Lora</option>
                                <option value="Meow Script">Meow Script</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Pinyon Script">Pinyon Script</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Roboto Mono">Roboto Mono</option>
                                <option value="Send Flowers">Send Flowers</option>
                                <option value="Twinkle Star">Twinkle Star</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="boldTitulo">Negrita</label>
                            <input type="checkbox" name="boldTitulo" id="boldTitulo">
                        </div>

                        <div class="element">
                            <label for="colorTitulo">Color</label>
                            <input type="color" id="colorTitulo" value="#000">
                        </div>

                        <div class="element">
                            <label for="bgTitulo">Fondo para texto</label>
                            <input type="checkbox" name="bgTitulo" id="bgTitulo">
                        </div>
                    </div>


                </div>
            </details>

            <details>
                <summary>Sección 4: Datos</summary>
                <div class="control">
                    <div class="sub">
                        <div class="element">
                            <label for="fecha">Fecha del evento</label>
                            <input type="date" id="fecha">
                        </div>

                        <div class="element">
                            <label for="fechaFormato">Tipografia</label>
                            <select id="fechaFormato">
                                <option value="corto">01/12/2020</option>
                                <option value="largo"> Diciembre 1, 2020</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="fechaFont">Tipografia</label>
                            <select id="fechaFont">
                                <option value="Allura">Allura</option>
                                <option value="Comic Relief">Comic Relief</option>
                                <option value="Delius Swash Caps">Delius Swash Caps</option>
                                <option value="Kapakana">Kapakana</option>
                                <option value="Lora">Lora</option>
                                <option value="Meow Script">Meow Script</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Pinyon Script">Pinyon Script</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Roboto Mono">Roboto Mono</option>
                                <option value="Send Flowers">Send Flowers</option>
                                <option value="Twinkle Star">Twinkle Star</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="fechaSize">Tamaño</label>
                            <input type="range" name="fechaSize" id="fechaSize" min="0" max="100" value="20">
                        </div>

                        <div class="element">
                            <label for="fechaHeight">Altura</label>
                            <input type="range" name="fechaHeight" id="fechaHeight" min="0" max="1300" value="550">
                        </div>


                        <div class="element">
                            <label for="boldFecha">Negrita</label>
                            <input type="checkbox" name="boldFecha" id="boldFecha">
                        </div>

                        <div class="element">
                            <label for="colorFecha">Color</label>
                            <input type="color" id="colorFecha" value="#000">
                        </div>

                        <div class="element">
                            <label for="bgFecha">Fondo para texto</label>
                            <input type="checkbox" name="bgFecha" id="bgFecha">
                        </div>
                    </div>
                    <div class="sub">
                        <div class="element inputLarge">
                            <label for="hora">Hora del evento</label>
                            <input type="time" id="hora">
                        </div>

                        <div class="element">
                            <label for="horaSize">Tamaño</label>
                            <input type="range" name="horaSize" id="horaSize" min="0" max="100" value="20">
                        </div>

                        <div class="element">
                            <label for="horaHeight">Altura</label>
                            <input type="range" name="horaHeight" id="horaHeight" min="0" max="1300" value="620">
                        </div>

                        <div class="element">
                            <label for="horaFont">Tipografia</label>
                            <select id="horaFont">
                                <option value="Allura">Allura</option>
                                <option value="Comic Relief">Comic Relief</option>
                                <option value="Delius Swash Caps">Delius Swash Caps</option>
                                <option value="Kapakana">Kapakana</option>
                                <option value="Lora">Lora</option>
                                <option value="Meow Script">Meow Script</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Pinyon Script">Pinyon Script</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Roboto Mono">Roboto Mono</option>
                                <option value="Send Flowers">Send Flowers</option>
                                <option value="Twinkle Star">Twinkle Star</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="boldHora">Negrita</label>
                            <input type="checkbox" name="boldHora" id="boldHora">
                        </div>

                        <div class="element">
                            <label for="colorHora">Color</label>
                            <input type="color" id="colorHora" value="#000">
                        </div>

                        <div class="element">
                            <label for="bgHora">Fondo para texto</label>
                            <input type="checkbox" name="bgHora" id="bgHora">
                        </div>
                    </div>
                    <div class="sub">
                        <div class="element inputLarge">
                            <label for="ubicacion">Ubicación</label>
                            <input type="text" id="ubicacion" placeholder="Ej: Salón Fiesta, CDMX">
                        </div>

                        <div class="element">
                            <label for="ubicacionSize">Tamaño</label>
                            <input type="range" name="ubicacionSize" id="ubicacionSize" min="0" max="100" value="25">
                        </div>

                        <div class="element">
                            <label for="ubicacionHeight">Altura</label>
                            <input type="range" name="ubicacionHeight" id="ubicacionHeight" min="0" max="1300"
                                value="800">
                        </div>

                        <div class="element">
                            <label for="ubicacionFont">Tipografia</label>
                            <select id="ubicacionFont">
                                <option value="Allura">Allura</option>
                                <option value="Comic Relief">Comic Relief</option>
                                <option value="Delius Swash Caps">Delius Swash Caps</option>
                                <option value="Kapakana">Kapakana</option>
                                <option value="Lora">Lora</option>
                                <option value="Meow Script">Meow Script</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Pinyon Script">Pinyon Script</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Roboto Mono">Roboto Mono</option>
                                <option value="Send Flowers">Send Flowers</option>
                                <option value="Twinkle Star">Twinkle Star</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="boldUbicacion">Negrita</label>
                            <input type="checkbox" name="boldUbicacion" id="boldUbicacion">
                        </div>

                        <div class="element">
                            <label for="colorUbicacion">Color</label>
                            <input type="color" id="colorUbicacion" value="#000">
                        </div>

                        <div class="element">
                            <label for="bgUbicacion">Fondo para texto</label>
                            <input type="checkbox" name="bgUbicacion" id="bgUbicacion">
                        </div>
                    </div>
                </div>
            </details>

            <details>
                <summary>Sección 5: Mensaje</summary>
                <div class="control">
                    <div class="sub">
                        <div class="element">
                            <label for="mensaje">Mensaje personalizado</label>
                            <textarea id="mensaje" rows="3" placeholder="¡Te esperamos con mucha alegría!"></textarea>
                        </div>
                    </div>
                    <div class="sub">
                        <div class="element">
                            <label for="mensajeSize">Tamaño</label>
                            <input type="range" name="mensajeSize" id="mensajeSize" min="0" max="100" value="25">
                        </div>

                        <div class="element">
                            <label for="mensajeHeight">Altura</label>
                            <input type="range" name="mensajeHeight" id="mensajeHeight" min="0" max="1300" value="900">
                        </div>

                        <div class="element">
                            <label for="mensajeFont">Tipografia</label>
                            <select id="mensajeFont">
                                <option value="Allura">Allura</option>
                                <option value="Comic Relief">Comic Relief</option>
                                <option value="Delius Swash Caps">Delius Swash Caps</option>
                                <option value="Kapakana">Kapakana</option>
                                <option value="Lora">Lora</option>
                                <option value="Meow Script">Meow Script</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Pacifico">Pacifico</option>
                                <option value="Pinyon Script">Pinyon Script</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Roboto Mono">Roboto Mono</option>
                                <option value="Send Flowers">Send Flowers</option>
                                <option value="Twinkle Star">Twinkle Star</option>
                            </select>
                        </div>

                        <div class="element">
                            <label for="boldMensaje">Negrita</label>
                            <input type="checkbox" name="boldMensaje" id="boldMensaje">
                        </div>

                        <div class="element">
                            <label for="colorMensaje">Color</label>
                            <input type="color" id="colorMensaje" value="#000">
                        </div>

                        <div class="element">
                            <label for="bgMensaje">Fondo para texto</label>
                            <input type="checkbox" name="bgMensaje" id="bgMensaje">
                        </div>
                    </div>
                </div>
            </details>

            <details>
                <summary>Sección 6: Registro</summary>
                <div class="control">
                    <div class="sub">
                        <div class="element">
                            <label for="user">Usuario</label>
                            <input type="text" id="user" placeholder="Registra un usuario" required min="4">
                        </div>

                        <div class="element">
                            <label for="pass">Contraseña</label>
                            <input type="text" id="pass" placeholder="Registra una contraseña" required>
                        </div>

                    </div>
                </div>
            </details>

            <div id="Botones">
                <button @click="Exportar()" id="Exportar">Exportar</button>
            </div>
        </div>
        <!-- Panel derecho -->
        <div class="panel preview">
            <div class="telefono">
                <iframe ref="iframeRef" src="http://localhost:5173/Tarjeta" width="360" height="780"></iframe>
            </div>
        </div>

    </div>




</template>

<style src="./Lab.css" scoped></style>
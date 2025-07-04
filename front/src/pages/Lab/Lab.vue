<script>
import { onMounted, nextTick } from 'vue'
import { iniciarConfigurador, Exportar } from './Lab.js'

export default {
    setup() {
        onMounted(async () => {
            await nextTick();
            iniciarConfigurador();
        });

        return {
            Exportar, // <- Esto permite usarlo en el template con @click
        };
    }
}
</script>


<template>
    <div class="Laboratorio">
        <!-- Panel izquierdo -->
        <div class="panel opciones">
            <h2>Personaliza tu invitación aquí</h2>

            <details>
                <summary>Sección 1: Fondo</summary>
                <div class="control">
                    <div class="element">
                        <label for="colorFondo">Color de Fondo</label>
                        <input type="color" id="colorFondo" value="#6a1b9a">
                    </div>

                    <div class="sub">
                        <div class="element">
                            <label for="imagenFondo">Imagen de Fondo</label>
                            <select id="imagenFondo">
                                <option value="">(Sin imagen)</option>
                                <option value="../../../public/img/bg/Fondo1.jpg">Fondo 1</option>
                                <option value="../../../public/img/bg/fondo2.jpg">Fondo 2</option>
                                <option value="../../../public/img/bg/Fondo3.jpg">Fondo 3</option>
                                <option value="../../../public/img/bg/Fondo4.jpg">Fondo 4</option>
                                <option value="../../../public/img/bg/Fondo5.jpg">Fondo 5</option>
                                <option value="../../../public/img/bg/Fondo6.jpg">Fondo 6</option>
                                <option value="../../../public/img/bg/Fondo7.jpg">Fondo 7</option>
                                <option value="../../../public/img/bg/Fondo8.jpg">Fondo 8</option>
                                <option value="../../../public/img/bg/Fondo9.jpg">Fondo 9</option>
                                <option value="../../../public/img/bg/Fondo10.jpg">Fondo 10</option>
                                <option value="../../../public/img/bg/Fondo11.jpg">Fondo 11</option>
                                <option value="../../../public/img/bg/Fondo12.jpg">Fondo 12</option>
                                <option value="../../../public/img/bg/Fondo13.jpg">Fondo 13</option>
                                <option value="../../../public/img/bg/Fondo16.jpg">Fondo 16</option>
                                <option value="../../../public/img/bg/Fondo14.jpg">Fondo 14</option>
                                <option value="../../../public/img/bg/Fondo15.jpg">Fondo 15</option>
                            </select>
                        </div>


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
                <summary>Seccion#: Imagen principal</summary>

                <div class="control">

                    <div class="sub">

                        <div class="element">
                            <label for="fotoCentral">Imagen principal</label>
                            <select id="fotoCentral">
                                <option value="">(Sin imagen)</option>
                                <option value="../../../public/img/perfil/fiesta.jpg">fiesta</option>
                                <option value="../../../public/img/perfil/niño.jpg">niño</option>
                                <option value="../../../public/img/perfil/niña.jpg">niña</option>
                                <option value="../../../public/img/perfil/xv.jpg">XVS</option>
                            </select>
                        </div>

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
                            <label for="imgPrimSize">Tamaño</label>
                            <input type="range" name="imgPrimSize" id="imgPrimSize" min="0" max="100" value="100">
                        </div>

                        <div class="element">
                            <label for="imgPrimHeight">Altura</label>
                            <input type="range" name="imgPrimHeight" id="imgPrimHeight" min="0" max="100" value="50">
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

                        <div class="element">
                            <label for="imgPrimPosicion">Posicion</label>
                            <input type="range" name="imgPrimPosicion" id="imgPrimPosicion" min="-100" max="300"
                                   value="0">
                        </div>

                        <div class="element">
                            <label for="imgPrimGray">Escala de grises</label>
                            <input type="checkbox" name="imgPrimGray" id="imgPrimGray">
                        </div>

                    </div>
                </div>
            </details>

            <details>
                <summary>Sección 2: Título</summary>
                <div class="control">

                    <div class="sub">
                        <div class="element">
                            <label for="anfitrion">Anfitrión</label>
                            <input type="text" id="anfitrion" placeholder="Ej: Familia García" value="Familia García">
                        </div>

                        <div class="element">
                            <label for="anfitrionSize">Tamaño</label>
                            <input type="range" name="anfitrionSize" id="anfitrionSize">
                        </div>

                        <div class="element">
                            <label for="anfitrionHeight">Altura</label>
                            <input type="range" name="anfitrionHeight" id="anfitrionHeight" min="0" max="700"
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
                            <label for="colorAnfitrion">Color</label>
                            <input type="color" id="colorAnfitrion" value="#000">
                        </div>
                    </div>

                    <div class="sub">
                        <div class="element">
                            <label for="nombreEvento">Nombre del Evento</label>
                            <input type="text" id="nombreEvento" placeholder="Ej: Fiesta de cumpleaños"
                                   value="Fiesta de cumpleaños">
                        </div>

                        <div class="element">
                            <label for="EventoSize">Tamaño</label>
                            <input type="range" name="EventoSize" id="EventoSize" min="0" max="100" value="30">
                        </div>

                        <div class="element">
                            <label for="EventoHeight">Altura</label>
                            <input type="range" name="EventoHeight" id="EventoHeight" min="-100" max="700" value="380">
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
                            <label for="colorEvento">Color</label>
                            <input type="color" id="colorEvento" value="#000">
                        </div>
                    </div>

                    <div class="sub">
                        <div class="element">
                            <label for="titulo">Título</label>
                            <input type="text" id="titulo" placeholder="Ej: ¡Estás invitado!" value="¡Estás invitado!">
                        </div>

                        <div class="element">
                            <label for="TituloSize">Tamaño</label>
                            <input type="range" name="TituloSize" id="TituloSize" min="0" max="100" value="40">
                        </div>

                        <div class="element">
                            <label for="TituloHeight">Altura</label>
                            <input type="range" name="TituloHeight" id="TituloHeight" min="0" max="700" value="450">
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
                            <label for="colorTitulo">Color</label>
                            <input type="color" id="colorTitulo" value="#000">
                        </div>
                    </div>


                </div>
            </details>

            <details>
                <summary>Sección 3: Datos</summary>
                <div class="control">
                    <div class="sub">
                        <div class="element">
                            <label for="fecha">Fecha del evento</label>
                            <input type="date" id="fecha">
                        </div>

                        <div class="element">
                            <label for="fechaSize">Tamaño</label>
                            <input type="range" name="fechaSize" id="fechaSize" min="0" max="100" value="20">
                        </div>

                        <div class="element">
                            <label for="fechaHeight">Altura</label>
                            <input type="range" name="fechaHeight" id="fechaHeight" min="0" max="700" value="550">
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
                            <label for="colorFecha">Color</label>
                            <input type="color" id="colorFecha" value="#000">
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
                            <input type="range" name="horaHeight" id="horaHeight" min="0" max="700" value="580">
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
                            <label for="colorHora">Color</label>
                            <input type="color" id="colorHora" value="#000">
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
                            <input type="range" name="ubicacionHeight" id="ubicacionHeight" min="0" max="700"
                                   value="600">
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
                            <label for="colorUbicacion">Color</label>
                            <input type="color" id="colorUbicacion" value="#000">
                        </div>
                    </div>
                </div>
            </details>

            <details>
                <summary>Sección 4: Mensaje</summary>
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
                            <input type="range" name="mensajeHeight" id="mensajeHeight" min="0" max="700" value="680">
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
                            <label for="colorMensaje">Color</label>
                            <input type="color" id="colorMensaje" value="#000">
                        </div>
                    </div>
                </div>
            </details>

            <details>
                <summary>Sección 5: Galería</summary>
                <div class="control">
                    <div class="sub">
                        <div class="element">
                            <label for="foto1">Foto 1 (URL)</label>
                            <input type="text" id="foto1" placeholder="URL foto 1">
                        </div>

                        <div class="element">
                            <label for="foto2">Foto 2 (URL)</label>
                            <input type="text" id="foto2" placeholder="URL foto 2">
                        </div>

                        <div class="element">
                            <label for="foto3">Foto 3 (URL)</label>
                            <input type="text" id="foto3" placeholder="URL foto 3">
                        </div>

                        <div class="element">
                            <label for="foto4">Foto 4 (URL)</label>
                            <input type="text" id="foto4" placeholder="URL foto 4">
                        </div>

                        <div class="element">
                            <label for="fofoto5to4">Foto 5 (URL)</label>
                            <input type="text" id="foto5" placeholder="URL foto 5">
                        </div>
                        <div class="element">
                            <label for="foto6">Foto 6 (URL)</label>
                            <input type="text" id="foto6" placeholder="URL foto 6">
                        </div>


                    </div>
                </div>
            </details>

            <div id="Botones">
                <button @click="Exportar()" id="Exportar">Exportar</button>
                <a href="Tarjeta">Google</a>

            </div>

        </div>

        <!-- Panel derecho -->
        <div class="panel preview">
            <div class="telefono">
                <div id="tarjeta" class="tarjeta">
                    <div id="vistaTitulo" class="titulo">Aquí va tu invitación</div>
                    <div id="vistaEvento" class="evento"></div>
                    <div id="vistaAnfitrion" class="anfitrion"></div>
                    <div id="vistaMensaje" class="mensaje"></div>
                    <div id="vistaFotoCentral" class="foto-central"></div>

                    <div class="galeria" id="galeria">
                        <div id="galeria1" class="foto-galeria"></div>
                        <div id="galeria2" class="foto-galeria"></div>
                        <div id="galeria3" class="foto-galeria"></div>
                        <div id="galeria4" class="foto-galeria"></div>
                        <div id="galeria5" class="foto-galeria"></div>
                        <div id="galeria6" class="foto-galeria"></div>
                    </div>

                    <div id="vistaFecha" class="fecha"></div>
                    <div id="vistaHora" class="hora"></div>
                    <div id="vistaUbicacion" class="ubicacion"></div>
                    <div id="vistaSpotify" class="spotify"></div>

                    <div id="rsvpBtn" class="rsvp">Confirmar Asistencia</div>
                </div>
            </div>
        </div>

    </div>
</template>

<style src="./Lab.css"></style>
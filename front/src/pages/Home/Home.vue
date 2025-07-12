<script setup>
import {animacionConCambioImagen} from './script'
import { onMounted, ref, onUnmounted } from 'vue';

const imgPortada = ref(null);
const imgFlipPhone = ref(null);
const sidebarRef = ref(null); // NUEVO



function burger(open) {
    if (!sidebarRef.value) return;
    if (open) {
        sidebarRef.value.classList.add('active');
    } else {
        sidebarRef.value.classList.remove('active');
    }
}

onMounted(() => {
   const imagenesPortada = [
  '/img/Home/Portada/Modelo.png',
  '/img/Home/Portada/Modelo2.png',
  '/img/Home/Portada/Modelo3.png'
];

// Para la animación de portada
animacionConCambioImagen(document.getElementById('imgPortada'), 'animarPortada', imagenesPortada);

// Para la animación flip
animacionConCambioImagen(imgFlipPhone.value, 'carril1', imagenesPortada);

    //Inicio animacion de tutorial
    const pasos = document.querySelectorAll('.step');
    let index = 0;

    setInterval(() => {
        // Quitar clase a todos
        pasos.forEach(p => p.classList.remove('stepActive'));

        // Agregar clase al paso actual
        pasos[index].classList.add('stepActive');

        // Avanzar al siguiente, o reiniciar al inicio
        index = (index + 1) % pasos.length;
    }, 2000); // Cada 2 segundos

    //Fin animacion de tutorial
});


onUnmounted(() => {
    clearInterval(intervaloPasos);
});



</script>


<template>
    <header role="banner">
        <!-- Navegación principal -->
        <nav class="navbar" role="navigation" aria-label="Navegación principal">
            <ul class="navbar-menu">
                <li class="navbar-logo">
                    <a href="#Portada">
                        <img src="/img/Home/Logo.png" alt="Logo de la página" />
                    </a>
                </li>
                <li class="navbar-item deskOnly">
                    <a href="#Galeria">Galería</a>
                </li>
                <li class="navbar-item deskOnly">
                    <a href="#Precios">Precios</a>
                </li>
                <li class="navbar-item deskOnly">
                    <a href="#Contacto">Contacto</a>
                </li>
                <li class="navbar-item deskOnly">
                    <a class="btnFree" href="/PanelCreative">Generar gratis</a>
                </li>
                <!-- Botón para abrir menú móvil -->
                <li id="Burguer">
                    <button
                            @click="burger(true)"
                            aria-label="Abrir menú de navegación"
                            aria-controls="sidebarMenu"
                            aria-expanded="false">
                        <i class="fas fa-bars"></i>
                    </button>
                </li>
            </ul>
        </nav>

        <!-- Menú lateral (sidebar) móvil -->
        <nav
             class="sidebar"
             ref="sidebarRef"
             id="sidebarMenu"
             role="navigation"
             aria-label="Menú móvil"
             aria-hidden="true">
            <ul class="sidebar-menu">
                <li class="navbar-item" id="btnCloseBgr">
                    <button
                            @click="burger(false)"
                            aria-label="Cerrar menú de navegación">
                        <i class="fas fa-times"></i>
                    </button>
                </li>
                <li class="navbar-item">
                    <a href="#Galeria">Galería</a>
                </li>
                <li class="navbar-item">
                    <a href="#Precios">Precios</a>
                </li>
                <li class="navbar-item">
                    <a href="#Contacto">Contacto</a>
                </li>
                <li class="navbar-item">
                    <a id="btnFree" href="/PanelCreative">Generar gratis</a>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Portada -->
        <section id="Portada">
            <div class="Ptd-album">
                <img ref="imgPortada" id="imgPortada" class="animarPortada" src="/img/Home/Portada/Modelo.png" alt="">
            </div>


            <div class="Slogan">
                <!-- <h1>Invitaciones <span>digitales</span></h1> -->
                <h1>Invitaciones
                    <span>d</span><span>i</span><span>g</span><span>i</span><span>t</span><span>a</span><span>l</span><span>e</span><span>s</span>
                </h1>
                <h2>comparte ese momento especial</h2>
                <div class="cardFree">
                    <p>La forma más autentica</p>
                    <a href="" class="btnFreeHome">Generar gratis</a>
                </div>
            </div>
        </section>

        <!-- Inicio de Galeria -->
        <section id="Galeria">
            <h2>Para todo tipo de <span>ocasion</span> y <span>estilo</span></h2>
            <p>¿Boda? ¿Cumpleaños? ¿Evento empresarial? Tenemos la invitación perfecta para cualquier evento.
                Personaliza al 100% o déjalo en nuestras manos.</p>
            <div class="contenedorGaleria">
                <img ref="imgFlipPhone" class="carril1" src="../../../public/img/Home/Portada/Modelo.png" alt="">
                <img class="carril2 galeriaNone" src="../../../public/img/Home/Portada/Modelo.png" alt="">
                <img class="carril3 galeriaNone" src="../../../public/img/Home/Portada/Modelo.png" alt="">
            </div>

        </section>
        <section id="Precios">
            <h2>Compara precios</h2>

            <div class="mainCards">
                <div class="cardPrice modFree">
                    <h3>Casual</h3>
                    <p>Dale tu toque, deja tu creatividad volar y haz que tu evento brille, sin costo!.</p>
                    <ul>
                        <li>
                            <p>1 Fondo</p> <i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>1 Fotografia</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Nombre de anfitrión</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Nombre del Evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Título</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Fecha del evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Hora del evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Ubicación</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Mensaje</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Panel de invitados</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>25 dias activa</p><i class="fas fa-check-square"></i>
                        </li>
                    </ul>
                </div>
                <div class="cardPrice modPro">
                    <h3>Evento</h3>
                    <p>Cuéntanos tu idea y nosotros creamos la invitación perfecta para tu evento.</p>
                    <ul>
                        <li>
                            <p>Fondo animados</p> <i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Fotografias necesarias</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Nombre de anfitrión</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Nombre del Evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Título</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Fecha del evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Hora del evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Ubicación</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Mensaje</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Tema especial (cancion sugerida)</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Lista de regalo</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Panel de invitados</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>100 dias activa</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Imagen panoramica</p><i class="fas fa-check-square"></i>
                        </li>
                    </ul>
                </div>
                <div class="cardPrice modCombo">
                    <h3>Paquete</h3>
                    <p>Tienes una empresa o eventos multiples?, ahorra más con un paquete de invitaciones.</p>
                    <ul>
                        <li>
                            <p>1 Fondo</p> <i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>1 Fotografia</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Nombre de anfitrión</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Nombre del Evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Título</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Fecha del evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Hora del evento</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Ubicación</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Mensaje</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Panel de invitados</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Tema especial (cancion sugerida)</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Lista de regalo</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Panel de invitados</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>100 dias activa</p><i class="fas fa-check-square"></i>
                        </li>
                        <li>
                            <p>Imagen panoramica</p><i class="fas fa-check-square"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section id="Contacto">
            <div class="manual">
                <div class="laptop">
                    <img src="../../../public/img/Home/SIGG-0.png" alt="">
                </div>

                <div class="steps">
                    <div class="step">
                        <div class="step-num">
                            <span>01</span>
                        </div>
                        <div class="step-info">
                            <h4>Abrir</h4>
                            <p>Ingresa a nuestro estudio</p>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-num">
                            <span>02</span>
                        </div>
                        <div class="step-info">
                            <h4>Fondo</h4>
                            <p>Selecciona una imagen o color de fondo</p>
                        </div>

                    </div>
                    <div class="step">
                        <div class="step-num"><span>03</span></div>
                        <div class="step-info">
                            <h4>Imagen</h4>
                            <p>Personaliza la fotografia principal</p>
                        </div>

                    </div>
                    <div class="step">
                        <div class="step-num"><span>04</span></div>
                        <div class="step-info">
                            <h4>Datos</h4>
                            <p>Agrega los datos de tu evento</p>
                        </div>

                    </div>
                    <div class="step">
                        <div class="step-num"><span>05</span></div>
                        <div class="step-info">
                            <h4>Compartir</h4>
                            <p>Revisa la lista de confirmacion</p>
                        </div>

                    </div>
                </div>
            </div>

            <div class="contact-info">
                <div class="idea-contact">
                    <h3>Contactanos</h3>
                    <p>Cuentanos tu idea, nosotros la disenamos</p>

                    <!-- WhatsApp Button -->
                    <a href="https://wa.me/521XXXXXXXXXX" target="_blank" class="whatsapp-button"
                       aria-label="Chatea por WhatsApp">
                        <svg class="whatsapp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                             fill="currentColor">
                            <path
                                  d="M16 .5A15.5 15.5 0 0 0 1 16c0 2.7.7 5.2 2 7.4L0 32l8.8-2.9A15.5 15.5 0 1 0 16 .5zm0 28.4c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-5.2 1.7 1.7-5.1-.3-.5A12.5 12.5 0 1 1 28.5 16 12.5 12.5 0 0 1 16 28.9zm7.3-9.4c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.5-.2.2-.5.3-.9.1s-1.8-.7-3.4-2.2c-1.3-1.2-2.2-2.7-2.4-3.2-.2-.4 0-.6.2-.9.2-.2.4-.5.6-.8.2-.3.3-.5.4-.8.2-.2.1-.6 0-.8-.2-.2-1-2.3-1.4-3.2-.3-.7-.7-.6-1-.6h-.9c-.3 0-.8.1-1.2.6-.4.4-1.6 1.5-1.6 3.7s1.7 4.2 2 4.5c.2.3 3.3 5 8.1 7 1.1.5 2 .7 2.7.9 1.1.3 2 .3 2.7.2.8-.1 2.4-1 2.8-1.9.3-.9.3-1.6.2-1.9-.2-.3-.5-.4-1-.6z" />
                        </svg>
                        <span class="whatsapp-text">Chatea con nosotros</span>
                    </a>
                </div>
                <div class="cel-contact">
                    <img src="../../../public/img/Home/Portada/Modelo.png" alt="">
                </div>
            </div>
        </section>
    </main>














    <footer>
        <div class="footer-content">
            <div class="links">
                <a href="/creditos">Créditos</a>
                <a href="/contacto">Contacto</a>
                <a href="/terminos">Términos y condiciones</a>

            </div>

            <div class="redes">
                <a href="/"><i class="fa-brands fa-facebook"></i></a>
                <a href=""><i class="fab fa-instagram"></i></a>
                <a href=""><i class="fab fa-tiktok"></i></a>
                <a href=""><i class="fab fa-whatsapp"></i></a>
            </div>

            <div class="copy">
                &copy; {{ new Date().getFullYear() }} TuNombre o Proyecto. Todos los derechos reservados.
            </div>
        </div>
        <!--  <h4>Siguenos en nuestras redes</h4>
 -->

    </footer>

</template>
<style src="./Home.css" scoped></style>
<style src="./HomePC.css" scoped></style>
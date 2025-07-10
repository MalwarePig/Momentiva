<script setup>
function burger(option) {
    const burguerBtn = document.querySelector('#Burguer button');
    const sidebar = document.querySelector('.sidebar');

    if (option) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.remove('active');
    }
}
</script>


<template>
    <header>
        <nav class="navbar">
            <ul class="navbar-menu">
                <li class="navbar-logo"><a href="#Portada"><img src="../../../public/img/Home/Logo.png" alt=""></a>
                </li>
                <li class="navbar-item deskOnly"><a href="#Galeria">Galeria</a></li>
                <li class="navbar-item deskOnly"><a href="#Precios">Precios</a></li>
                <li class="navbar-item deskOnly"><a href="#Contacto">Contacto</a></li>
                <li class="navbar-item deskOnly"><a class="btnFree" href="/PanelCreative">Generar gratis</a></li>
                <li id="Burguer"><button @click="burger(true)"><i class="fas fa-bars"></i></button></li>
            </ul>
        </nav>

        <nav class="sidebar">
            <ul class="sidebar-menu">
                <li class="navbar-item" id="btnCloseBgr"><button @click="burger(false)"><i
                            class="fas fa-times"></i></button></li>
                <li class="navbar-item"><a href="#Galeria">Galeria</a></li>
                <li class="navbar-item"><a href="#Precios">Precios</a></li>
                <li class="navbar-item"><a href="#Contacto">Contacto</a></li>
                <li class="navbar-item"><a id="btnFree" href="/PanelCreative">Generar gratis</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Portada -->
        <section id="Portada">
            <div class="Ptd-album">
                <!--  <img src="../../../public/img/Home/Portada/Cel1.webp" alt="">
                <img src="../../../public/img/Home/Portada/Cel2.webp" alt=""> -->
                <img src="../../../public/img/Home/Portada/Modelo.png" alt="">
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
            <h2>Para todo tipo de ocasion y estilos</h2>
            <div class="contenedorGaleria">
                <img src="../../../public/img/Home/Portada/Modelo.png" alt="">
                <img src="../../../public/img/Home/Portada/Modelo.png" alt="">
                <img src="../../../public/img/Home/Portada/Modelo.png" alt="">
            </div>

        </section>
        <section id="Precios">
            <h2>Compara precios</h2>

            <div class="mainCards">
                <div class="cardPrice">
                    <h3>Casual</h3>

                    <p>Dale tu toque, deja tu creatividad volar y haz que tu evento brille.</p>

                    <ul>
                        <li>
                            <i class="fas fa-check-square"></i><p>1 Fondo</p> 
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>1 Fotografia</p>
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>Nombre de anfitrión</p>
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>Nombre del Evento</p>
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>Título</p>
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>Fecha del evento</p>
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>Hora del evento</p>
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>Ubicación</p>
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>Mensaje</p>
                        </li>
                        <li>
                            <i class="fas fa-check-square"></i><p>Panel de invitados</p>
                        </li>
                    </ul>
                </div>
                <div class="cardPrice">
                    <h3>Evento</h3>
                    <p>Cuéntanos tu idea y nosotros creamos la invitación perfecta para tu evento.</p>
                </div>
                <div class="cardPrice">
                    <h3>Paquete</h3>
                    <p>Tienes una empresa o eventos multiples?, ahorra más con un paquete de invitaciones.</p>
                </div>
            </div>
        </section>
        <section id="Contacto"></section>
    </main>
















</template>
<style src="./Home.css" scoped></style>
<style src="./HomePC.css" scoped></style>
// src/scripts/configurador.js

export function obtenerConfig() {
  return {
    user: {
      id: 1 /* Math.floor(Math.random() * 99999) */
    },
    fondo: {
      color: document.getElementById("colorFondo").value,
      imagen: document.getElementById('imagenFondo').value,
      estilo: document.getElementById('bgEstilo').value,
      RepetirBG: document.getElementById('RepetirBG').checked,
      escalaGrises: document.getElementById('bgGray').checked,
    },
    imagenPrincipal: {
      archivo: document.getElementById('fotoCentral').value,
      estilo: document.getElementById('imgPrimEstilo').value,
      tamano: document.getElementById('imgPrimSize').value,
      altura: document.getElementById('imgPrimHeight').value,
      bordes: document.getElementById('imgPrimborder').value,
      transparencia: document.getElementById('imgPrimTransparencia').value,
      desvanecido: document.getElementById('imgPrimGradient').value,
      posicion: document.getElementById('imgPrimPosicion').value,
      escalaGrises: document.getElementById('imgPrimGray').checked
    },
    anfitrion: {
      nombre: document.getElementById('anfitrion').value,
      tamano: document.getElementById('anfitrionSize').value,
      altura: document.getElementById('anfitrionHeight').value,
      fuente: document.getElementById('fontAnfitrion').value,
      color: document.getElementById('colorAnfitrion').value
    },
    evento: {
      nombre: document.getElementById('nombreEvento').value,
      tamano: document.getElementById('EventoSize').value,
      altura: document.getElementById('EventoHeight').value,
      fuente: document.getElementById('fontEvento').value,
      color: document.getElementById('colorEvento').value
    },
    titulo: {
      nombre: document.getElementById('titulo').value,
      tamano: document.getElementById('TituloSize').value,
      altura: document.getElementById('TituloHeight').value,
      fuente: document.getElementById('fontTitulo').value,
      color: document.getElementById('colorTitulo').value
    },
    datos: {
      fecha: document.getElementById('fecha').value,
      fechaTamano: document.getElementById('fechaSize').value,
      fechaAltura: document.getElementById('fechaHeight').value,
      fechaFuente: document.getElementById('fechaFont').value,
      fechaColor: document.getElementById('colorFecha').value,
      hora: document.getElementById('hora').value,
      horaTamano: document.getElementById('horaSize').value,
      horaAltura: document.getElementById('horaHeight').value,
      horaFuente: document.getElementById('horaFont').value,
      horaColor: document.getElementById('colorHora').value,
      ubicacion: document.getElementById('ubicacion').value,
      ubicacionTamano: document.getElementById('ubicacionSize').value,
      ubicacionAltura: document.getElementById('ubicacionHeight').value,
      ubicacionFuente: document.getElementById('ubicacionFont').value,
      ubicacionColor: document.getElementById('colorUbicacion').value,
    },
    mensaje: {
      mensaje: document.getElementById('mensaje').value,
      mensajeTamano: document.getElementById('mensajeSize').value,
      mensajeAltura: document.getElementById('mensajeHeight').value,
      mensajeFuente: document.getElementById('mensajeFont').value,
      mensajeColor: document.getElementById('colorMensaje').value,
    },
    galeria: {
      foto1: document.getElementById('foto1').value,
      foto2: document.getElementById('foto2').value,
      foto3: document.getElementById('foto3').value,
      foto4: document.getElementById('foto4').value,
      foto5: document.getElementById('foto5').value,
      foto6: document.getElementById('foto6').value
    }
  };
}

export function iniciarConfigurador() {
  const actualizarVista = () => {
    const config = obtenerConfig();

    const tarjeta = document.getElementById("tarjeta");

    tarjeta.style.backgroundColor = config.fondo.color;
    tarjeta.style.backgroundImage = config.fondo.imagen ? `url(${config.fondo.imagen})` : "none";
    tarjeta.style.backgroundSize = config.fondo.estilo;
    tarjeta.style.backgroundRepeat = config.fondo.RepetirBG ? "repeat" : "no-repeat";
    tarjeta.style.filter = config.fondo.escalaGrises ? "grayscale(1)" : "none";

    const vistaFoto = document.getElementById("vistaFotoCentral");
    vistaFoto.style.backgroundImage = config.imagenPrincipal.archivo ? `url(${config.imagenPrincipal.archivo})` : "none";
    vistaFoto.style.backgroundSize = config.imagenPrincipal.estilo;
    vistaFoto.style.width = config.imagenPrincipal.tamano + "%";
    vistaFoto.style.height = config.imagenPrincipal.altura + "%";
    vistaFoto.style.filter = config.imagenPrincipal.escalaGrises ? "grayscale(1)" : "none";
    vistaFoto.style.borderRadius = config.imagenPrincipal.bordes + "%";
    vistaFoto.style.opacity = 1 - config.imagenPrincipal.transparencia / 100;
    vistaFoto.style.marginTop = config.imagenPrincipal.posicion + "%";
    vistaFoto.style.maskImage = "linear-gradient(white " + (100 - config.imagenPrincipal.desvanecido) + "%, transparent)";

    const vistaAnfitrion = document.getElementById("vistaAnfitrion");
    vistaAnfitrion.textContent = config.anfitrion.nombre;
    vistaAnfitrion.style.fontSize = config.anfitrion.tamano + "px";
    vistaAnfitrion.style.top = config.anfitrion.altura + "px";
    vistaAnfitrion.style.color = config.anfitrion.color;
    vistaAnfitrion.style.fontFamily = config.anfitrion.fuente;

    const vistaEvento = document.getElementById("vistaEvento");
    vistaEvento.textContent = config.evento.nombre;
    vistaEvento.style.fontSize = config.evento.tamano + "px";
    vistaEvento.style.top = config.evento.altura + "px";
    vistaEvento.style.color = config.evento.color;
    vistaEvento.style.fontFamily = config.evento.fuente;

    const vistaTitulo = document.getElementById("vistaTitulo");
    vistaTitulo.textContent = config.titulo.texto;
    vistaTitulo.style.fontSize = config.titulo.tamano + "px";
    vistaTitulo.style.top = config.titulo.altura + "px";
    vistaTitulo.style.color = config.titulo.color;
    vistaTitulo.style.fontFamily = config.titulo.fuente;

    const vistaFecha = document.getElementById("vistaFecha");
    vistaFecha.textContent = config.datos.fecha;
    vistaFecha.style.fontSize = config.datos.fechaTamano + "px";
    vistaFecha.style.top = config.datos.fechaAltura + "px";
    vistaFecha.style.fontFamily = config.datos.fechaFuente;
    vistaFecha.style.color = config.datos.fechaColor;

    const vistaHora = document.getElementById("vistaHora");
    vistaHora.textContent = config.datos.hora;
    vistaHora.style.fontSize = config.datos.horaTamano + "px";
    vistaHora.style.top = config.datos.horaAltura + "px";
    vistaHora.style.fontFamily = config.datos.horaFuente;
    vistaHora.style.color = config.datos.horaColor;

    const vistaUbicacion = document.getElementById("vistaUbicacion");
    vistaUbicacion.textContent = config.datos.ubicacion;
    vistaUbicacion.style.fontSize = config.datos.ubicacionTamano + "px";
    vistaUbicacion.style.top = config.datos.ubicacionAltura + "px";
    vistaUbicacion.style.fontFamily = config.datos.ubicacionFuente;
    vistaUbicacion.style.color = config.datos.ubicacionColor;

    const vistaMensaje = document.getElementById("vistaMensaje");
    vistaMensaje.textContent = config.mensaje.mensaje;
    vistaMensaje.style.fontSize = config.mensaje.mensajeTamano + "px";
    vistaMensaje.style.top = config.mensaje.mensajeAltura + "px";
    vistaMensaje.style.fontFamily = config.mensaje.mensajeFuente;
    vistaMensaje.style.color = config.mensaje.mensajeColor;

    ["foto1", "foto2", "foto3", "foto4", "foto5", "foto6"].forEach((id, i) => {
      const gal = document.getElementById(`galeria${i + 1}`);
      gal.style.backgroundImage = config.galeria[id] ? `url(${config.galeria[id]})` : "none";
    });

    document.getElementById('galeria').style.bottom = "5px";
  };

  // Escuchar cambios para actualizar la vista
  document.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", actualizarVista);
    input.addEventListener("change", actualizarVista);
  });

  // Actualiza la vista inicialmente
  actualizarVista();
}

export function Exportar() {
  const config = obtenerConfig();


  fetch('http://localhost:3000/Saludar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.mensaje); // Hola, Sergio!
    });
  console.table(config);
}

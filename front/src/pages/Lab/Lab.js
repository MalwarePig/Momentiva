// src/scripts/configurador.js

export function obtenerConfig() {
  return {
    user: {
      user: document.getElementById("user").value, /* Math.floor(Math.random() * 99999) */
      pass: document.getElementById("pass").value, /* Math.floor(Math.random() * 99999) */
      fechaCreacion: new Date().toISOString(),
      fechaVencimiento: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString()
    },
    fondo: {
      color: document.getElementById("colorFondo").value || "#ffffff",
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
      color: document.getElementById('colorAnfitrion').value,
      negrita: document.getElementById('boldAnfitrion').checked,
      bg: document.getElementById('bgAnfitrion').checked
    },
    evento: {
      nombre: document.getElementById('nombreEvento').value,
      tamano: document.getElementById('EventoSize').value,
      altura: document.getElementById('EventoHeight').value,
      fuente: document.getElementById('fontEvento').value,
      color: document.getElementById('colorEvento').value,
      negrita: document.getElementById('boldEvento').checked,
      bg: document.getElementById('bgEvento').checked
    },
    titulo: {
      nombre: document.getElementById('titulo').value,
      tamano: document.getElementById('TituloSize').value,
      altura: document.getElementById('TituloHeight').value,
      fuente: document.getElementById('fontTitulo').value,
      color: document.getElementById('colorTitulo').value,
      negrita: document.getElementById('boldTitulo').checked,
      bg: document.getElementById('bgTitulo').checked
    },
    datos: {
      fecha: document.getElementById('fecha').value,
      fechaFormato: document.getElementById('fechaFormato').value,
      fechaTamano: document.getElementById('fechaSize').value,
      fechaAltura: document.getElementById('fechaHeight').value,
      fechaFuente: document.getElementById('fechaFont').value,
      fechaColor: document.getElementById('colorFecha').value,
      fechaNegrita: document.getElementById('boldFecha').checked,
      fechaBg: document.getElementById('bgFecha').checked,
      hora: document.getElementById('hora').value,
      horaTamano: document.getElementById('horaSize').value,
      horaAltura: document.getElementById('horaHeight').value,
      horaFuente: document.getElementById('horaFont').value,
      horaColor: document.getElementById('colorHora').value,
      horaNegrita: document.getElementById('boldHora').checked,
      horaBg: document.getElementById('bgHora').checked,
      ubicacion: document.getElementById('ubicacion').value,
      ubicacionTamano: document.getElementById('ubicacionSize').value,
      ubicacionAltura: document.getElementById('ubicacionHeight').value,
      ubicacionFuente: document.getElementById('ubicacionFont').value,
      ubicacionColor: document.getElementById('colorUbicacion').value,
      ubicacionNegrita: document.getElementById('boldUbicacion').checked,
      ubicacionBg: document.getElementById('bgUbicacion').checked,
    },
    mensaje: {
      mensaje: document.getElementById('mensaje').value,
      mensajeTamano: document.getElementById('mensajeSize').value,
      mensajeAltura: document.getElementById('mensajeHeight').value,
      mensajeFuente: document.getElementById('mensajeFont').value,
      mensajeColor: document.getElementById('colorMensaje').value,
      mensajeNegrita: document.getElementById('boldMensaje').checked,
      mensajeBg: document.getElementById('bgMensaje').checked,
    }
  };
}

export function iniciarConfigurador(callbackActualizacion) {
  const actualizarVista = () => {
    const config = obtenerConfig();
    if (callbackActualizacion) callbackActualizacion(config);
  };

  // Escuchar cambios para actualizar la vista
  document.querySelectorAll("input, select, textarea, img").forEach(input => {
    input.addEventListener("input", actualizarVista);
    input.addEventListener("change", actualizarVista);
    input.addEventListener("click", actualizarVista);
  });

  // Actualiza la vista inicialmente
  actualizarVista();
}

export function Exportar(modalMsg) {
  const config = obtenerConfig();
  const validacion = validarInputs(config.user.user, config.user.pass)

  if (!validacion.valido) {
    if (modalMsg.value?.showModal) {
      modalMsg.value.showModal(validacion.mensaje, false)
    } else {
      console.error('modalMsg no tiene showModal')
    }
    return
  }else{
    fetch('http://localhost:3000/Exportar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  })
    .then(res => {
      return res.json().then(data => {
        const exito = res.status === 200 // Verificamos si la respuesta fue exitosa
        if (modalMsg.value?.showModal) {
          modalMsg.value.showModal(data.mensaje, exito)
          document.getElementById("user").value = ''
          document.getElementById("pass").value = ''
        } else {
          console.error('modalMsg no tiene showModal')
        }
      })
    })
    .catch(err => {
      console.error("❌ Error de red:", err)
      if (modalMsg.value?.showModal) {
        modalMsg.value.showModal("Error al guardar invitación", false)
      }
    });
  }

 
 
  /* console.table(config); */
}


// src/scripts/seleccionarFondo.js
export function initSelectorFondo() {
  const imagenes = document.querySelectorAll('#galeriaFondos img');

  imagenes.forEach(img => {
    img.addEventListener('click', () => {
      const urlImagen = img.src;
      document.getElementById('imagenFondo').value = urlImagen;
    });
  });
}

function validarInputs(valor1, valor2) {
  const regex = /^[a-zA-Z0-9]{4,}$/; // Solo letras y números, mínimo 4 caracteres
  let errores = [];

  if (!valor1) {
    errores.push("El primer campo está vacío.");
  } else if (!regex.test(valor1)) {
    errores.push("El primer campo debe tener al menos 4 caracteres y solo letras o números.");
  }

  if (!valor2) {
    errores.push("El segundo campo está vacío.");
  } else if (!regex.test(valor2)) {
    errores.push("El segundo campo debe tener al menos 4 caracteres y solo letras o números.");
  }

  if (errores.length > 0) {
    return {
      valido: false,
      mensaje: errores.join(" ")
    };
  }

  return {
    valido: true,
    mensaje: "Los campos son válidos."
  };
}

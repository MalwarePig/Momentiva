export function animacionConCambioImagen(elemento, claseAnimacion, imagenes) {
  if (!elemento) {
    console.error('Elemento proporcionado es nulo.');
    return;
  }

  let index = 0;

  const cambiarImagenYReiniciarAnimacion = () => {
    index = (index + 1) % imagenes.length;
    elemento.src = imagenes[index];

    elemento.classList.remove(claseAnimacion);
    void elemento.offsetWidth; // Forzar reflow
    elemento.classList.add(claseAnimacion);
  };

  elemento.addEventListener('animationend', () => {
    console.log('Animación terminada para:', elemento);
    cambiarImagenYReiniciarAnimacion();
  });

  const estilo = window.getComputedStyle(elemento);
  console.log('Animación CSS:', estilo.getPropertyValue('animation-name'));
  console.log('Duración:', estilo.getPropertyValue('animation-duration'));
}

function fechaEnFormatoLargo(fechaString) {
  const fecha = new Date(fechaString);

  const formato = new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(fecha);

  // Reemplazar " de 2025" por " del 2025"
  return formato.replace(/ de (\d{4})$/, ' del $1');
}


function Formato12h(horaStr) {
  const [horas, minutos, segundos] = horaStr.split(':');
  const fecha = new Date();
  fecha.setHours(horas, minutos, segundos);

  return new Intl.DateTimeFormat('es-MX', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(fecha);
}

module.exports = {
  fechaEnFormatoLargo,
  Formato12h
}

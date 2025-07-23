export default function dateFormat(fecha) {
    if (!fecha) return '';

    // Cortar la parte de la fecha, ignorando la hora
    const soloFecha = fecha.substring(0, 10); // '2025-07-17'
    const date = new Date(soloFecha + 'T00:00:00'); // En zona local

    return new Intl.DateTimeFormat('es-MX', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).format(date);
}
 
const Controller = {};
const pool = require('../db/db.js');
const fs = require('fs');
const path = require('path');
const { fechaEnFormatoLargo, Formato12h } = require('../functions/dateFormat.js');

Controller.renderEvento = async (req, res) => {
    const { id } = req.params;
    console.log('🔍 ID recibido para renderizar evento:', id);

    try {
        // Consulta todas las solicitudes
        const [rows] = await pool.query('SELECT * FROM solicitudes where serial = ?', [id]);
        console.log('📊 Datos de la BD:', rows);

        if (rows.length === 0) {
            console.log('❌ No se encontró evento con ID:', id);
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        const tematica = rows[0].tematica;
        const version = rows[0].version;
        console.log('🎨 Temática:', tematica, 'Versión:', version);

        // Ruta del archivo plantilla
        const rutaPlantilla = path.join(__dirname, '..', 'Modelos', tematica, version, `${version}.html`);
        console.log('📁 Ruta completa de plantilla:', rutaPlantilla);

        // Verificar si el archivo existe
        if (!fs.existsSync(rutaPlantilla)) {
            console.log('❌ El archivo no existe en:', rutaPlantilla);
            return res.status(404).json({ error: 'Plantilla no encontrada en el sistema' });
        }

        const datosCliente = {
            imgUno: rows[0].imgUno,
            imgDos: rows[0].imgDos,
            imgBgUno: rows[0].imgBgUno,
            imgBgDos: rows[0].imgBgDos,
            imgDecoraUno: rows[0].imgDecoraUno,
            imgDecoraDos: rows[0].imgDecoraDos,
            festejado1: rows[0].nombre_festejado1,
            festejado2: rows[0].nombre_festejado2,
            mensajeEspecial: rows[0].mensaje_especial,
            fechaEvento: fechaEnFormatoLargo(rows[0].fecha_evento),
            horaEvento: Formato12h(rows[0].hora_Evento),
            lugarCeremonia: rows[0].lugar_ceremonia,
            direccionCeremonia: rows[0].direccion_ceremonia,
            lugarEvento: rows[0].lugar_evento,
            direccionEvento: rows[0].direccion_evento,
            codigoVestimenta: rows[0].codigo_vestimenta,
            limiteRespuesta: fechaEnFormatoLargo(rows[0].fecha_limite_respuesta), 
             

            lugar: 'Salón Diamante',
            mensaje: '¡Te esperamos para celebrar juntos!',
        };

        // Leer plantilla HTML
        fs.readFile(rutaPlantilla, 'utf8', (err, html) => {
            if (err) {
                console.log('❌ Error leyendo archivo:', err);
                return res.status(404).json({ error: 'Error leyendo plantilla' });
            }

            console.log('✅ Plantilla leída correctamente, longitud:', html.length);

            // Reemplazar datos con placeholders
            const htmlPersonalizado = html
                .replace(/{{imgUno}}/g, datosCliente.imgUno)
                .replace(/{{imgDos}}/g, datosCliente.imgDos)
                .replace(/{{imgBgUno}}/g, datosCliente.imgBgUno)
                .replace(/{{imgBgDos}}/g, datosCliente.imgBgDos)
                .replace(/{{imgDecoraUno}}/g, datosCliente.imgDecoraUno)
                .replace(/{{imgDecoraDos}}/g, datosCliente.imgDecoraDos)
                .replace(/{{festejado1}}/g, datosCliente.festejado1)
                .replace(/{{festejado2}}/g, datosCliente.festejado2)
                .replace(/{{mensajeEspecial}}/g, datosCliente.mensajeEspecial)
                .replace(/{{fechaEvento}}/g, datosCliente.fechaEvento)
                .replace(/{{horaEvento}}/g, datosCliente.horaEvento)


                .replace(/{{lugarCeremonia}}/g, datosCliente.lugarCeremonia)
                .replace(/{{direccionCeremonia}}/g, datosCliente.direccionCeremonia)

                .replace(/{{lugarEvento}}/g, datosCliente.lugarEvento)
                .replace(/{{direccionEvento}}/g, datosCliente.direccionEvento)
                .replace(/{{codigoVestimenta}}/g, datosCliente.codigoVestimenta)
                .replace(/{{limiteRespuesta}}/g, datosCliente.limiteRespuesta)
 
            console.log('🎯 Enviando respuesta al frontend');

            // Enviar tanto los datos como el HTML
            res.status(200).json({
                datos: rows[0],
                htmlPersonalizado: htmlPersonalizado
            });
        });

    } catch (error) {
        console.error('💥 Error al obtener solicitudes:', error.message);
        res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
};

module.exports = Controller;
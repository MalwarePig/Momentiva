const Controller = {};
const pool = require('../db/db.js');
const fs = require('fs');
const path = require('path');

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
            nombre: 'Sofía',
            fecha: '2025-08-10',
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
                .replace(/{{nombre}}/g, datosCliente.nombre)
                .replace(/{{fecha}}/g, datosCliente.fecha)
                .replace(/{{lugar}}/g, datosCliente.lugar)
                .replace(/{{mensaje}}/g, datosCliente.mensaje);
           
            console.log(htmlPersonalizado);
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
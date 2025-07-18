const Controller = {};
const pool = require('../db/db.js'); // importa el pool de conexión
const fs = require('fs');
const path = require('path');
const revolverStrings = require('../functions/encript')
/* const EnviarCorreos = require('../functions/email') */
/* const iniciarWhatsApp = require('../functions/whatsapp'); */
Controller.Exportar = (req, res) => {
    const config = req.body;
    const id = revolverStrings(config.user.user, config.user.pass);

    // Ruta base donde guardar los archivos
    const userFolder = path.join(__dirname, '..', 'data', id);

    // Crear carpeta del usuario si no existe
    fs.mkdir(userFolder, { recursive: true }, (err) => {
        if (err) {
            console.error("❌ Error al crear carpeta:", err);
            return res.status(500).json({ mensaje: "Error al crear carpeta del usuario" });
        }

        // Ruta del archivo a guardar
        const filePath = path.join(userFolder, 'invitacion.json');

        // Guardar JSON en archivo
        fs.writeFile(filePath, JSON.stringify(config, null, 2), (err) => {
            if (err) {
                console.error("❌ Error al guardar archivo:", err);
                return res.status(500).json({ mensaje: "Error al guardar invitación" });
            }

            console.log("✅ Archivo guardado en:", filePath);
            return res.status(200).json({ mensaje: "Invitación guardada exitosamente" });
        });
    });
};

Controller.Cargar = async (req, res) => {
    const id = String(req.params.usuario || "desconocido");

    // Verificar que la solicitud existe
    const [existingSolicitud] = await pool.query(
        'SELECT * FROM Invitados WHERE serial = ?',
        [id]
    );

    res.status(200).json(existingSolicitud);

    console.log(existingSolicitud);
};

Controller.render = (req, res) => {
    const id = String(req.params.usuario || "desconocido");

    const filePath = path.join(__dirname, '..', 'data', id, 'invitacion.json');

    // Verifica si existe el archivo
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error al leer archivo:", err);
            return res.status(404).json({ mensaje: "Invitación no encontrada" });
        }

        try {
            const json = JSON.parse(data);
            res.json(json);
        } catch (e) {
            console.error("Error al parsear JSON:", e);
            res.status(500).json({ mensaje: "Error al interpretar el archivo" });
        }
    });
};


module.exports = Controller;
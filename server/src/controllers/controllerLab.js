const Controller = {};
const fs = require('fs');
const path = require('path');

Controller.Saludar = (req, res) => {

     const config = req.body;
     console.clear()
     console.log(config)
     const id = String(config.user.id || "desconocido");

     // Ruta base donde guardar los archivos
     const userFolder = path.join(__dirname, '..', 'data', id);

     // Crear carpeta del usuario si no existe
     fs.mkdir(userFolder, { recursive: true }, (err) => {
          if (err) {
               console.error("Error al crear carpeta:", err);
               return res.status(500).json({ mensaje: "Error al crear carpeta del usuario" });
          }

          // Ruta del archivo a guardar
          const filePath = path.join(userFolder, 'invitacion.json');

          // Guardar JSON en archivo
          fs.writeFile(filePath, JSON.stringify(config, null, 2), (err) => {
               if (err) {
                    console.error("Error al guardar archivo:", err);
                    return res.status(500).json({ mensaje: "Error al guardar invitación" });
               }

               console.log("Archivo guardado en:", filePath);
               res.json({ mensaje: '¡Invitación guardada correctamente!' });
          });
     });


     res.json({ mensaje: '¡Hola desde el servidor!' });
};


Controller.Cargar = (req, res) => {
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
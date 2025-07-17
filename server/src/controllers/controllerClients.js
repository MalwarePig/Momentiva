const Controller = {};
const pool = require('../db/db.js'); // importa el pool de conexión
const setSerial = require('../functions/serial');


Controller.setSolicitud = async (req, res) => {
  const config = req.body;
  const serial = setSerial();
  const idClient = config.contacto.email;
  console.log(config);
  console.log(idClient);
  console.log("Serial generado:", serial);

  try {
    const [result] = await pool.query(
      `INSERT INTO solicitudes (
                serial, nombre_festejado, fecha_evento, lugar_evento,
                hora_inicio, hora_finalizacion, hora_show, codigo_vestimenta,
                mensaje_especial, cancion_entrada, estilo_invitacion, estado, fecha_solicitud,
                telefono, email, contrasena, url,tematica
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        serial,                          // serial
        config.nombreFestejado,          // nombre_festejado
        config.fechaEvento,              // fecha_evento
        config.lugarEvento,              // lugar_evento
        config.horaInicio,               // hora_inicio
        config.horaFinalizacion,         // hora_finalizacion
        config.horaShow,                 // hora_show
        config.codigoVestimenta,         // codigo_vestimenta 
        config.mensajeEspecial,          // mensaje_especial
        config.cancionEntrada,           // cancion_entrada
        config.estiloInvitacion,         // estilo_invitacion
        config.estado || 'Pendiente',    // estado (con valor por defecto)
        config.fechaSolicitud || new Date(), // fecha_solicitud (con valor por defecto)
        config.contacto.telefono,        // telefono
        config.contacto.email,           // email
        config.contacto.contrasena,      // contrasena
        '',                               // url vacío
        config.tematica                 // tematica o personajes
      ]
    );

    console.log('Solicitud guardada exitosamente. ID:', result.insertId);
    res.status(201).json({
      message: 'Solicitud guardada con éxito',
      insertId: result.insertId,
      serial: serial
    });

  } catch (err) {
    console.error('Error al guardar solicitud:', err.message);
    console.error('Stack:', err.stack);

    // Manejo de errores específicos
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Ya existe una solicitud con este email o serial' });
    } else if (err.code === 'ER_BAD_NULL_ERROR') {
      res.status(400).json({ error: 'Faltan campos requeridos' });
    } else {
      res.status(500).json({ error: 'Error al guardar la solicitud' });
    }
  }
};


Controller.getSolicitud = async (req, res) => {
  try {
    // Consulta todas las solicitudes
    const [rows] = await pool.query('SELECT * FROM solicitudes');

    console.log('Solicitudes obtenidas:', rows);
    // Envía la respuesta con el arreglo de solicitudes
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error.message);
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
};


Controller.updateSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Validar que el ID sea un número válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID de solicitud inválido' });
    }

    // Validar que el estado sea válido
    const estadosValidos = ['Pendiente', 'Activo', 'Cerrado', 'Rechazado'];
    if (!estado || !estadosValidos.includes(estado)) {
      return res.status(400).json({
        error: 'Estado inválido. Estados permitidos: ' + estadosValidos.join(', ')
      });
    }

    // Verificar que la solicitud existe
    const [existingSolicitud] = await pool.query(
      'SELECT id, estado FROM solicitudes WHERE id = ?',
      [id]
    );

    if (existingSolicitud.length === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    // Actualizar el estado de la solicitud
    const [result] = await pool.query(
      'UPDATE solicitudes SET estado = ? WHERE id = ?',
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No se pudo actualizar la solicitud' });
    }

    console.log(`Solicitud ${id} actualizada de "${existingSolicitud[0].estado}" a "${estado}"`);

    // Respuesta exitosa
    res.status(200).json({
      message: 'Estado actualizado correctamente',
      id: parseInt(id),
      estadoAnterior: existingSolicitud[0].estado,
      estadoNuevo: estado
    });

  } catch (error) {
    console.error('Error al actualizar solicitud:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


Controller.updateSolicitudDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const { genero_fiesta, version } = req.body;

    // Validar que el ID sea un número válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID de solicitud inválido' });
    }

    // Validar género de fiesta
    const generosValidos = ['Boda', 'XV', 'Infantil', 'Religiosa', 'Laboral', 'Otro'];
    if (!genero_fiesta || !generosValidos.includes(genero_fiesta)) {
      return res.status(400).json({
        error: 'Género de fiesta inválido. Géneros permitidos: ' + generosValidos.join(', ')
      });
    }

    // Validar versión
    const versionesValidas = ['V1', 'V2', 'V3', 'V4'];
    if (!version || !versionesValidas.includes(version)) {
      return res.status(400).json({
        error: 'Versión inválida. Versiones permitidas: ' + versionesValidas.join(', ')
      });
    }

    // Verificar que la solicitud existe y está activa
    const [existingSolicitud] = await pool.query(
      'SELECT id, estado, genero_fiesta, version FROM solicitudes WHERE id = ?',
      [id]
    );

    if (existingSolicitud.length === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (existingSolicitud[0].estado !== 'Activo') {
      return res.status(400).json({
        error: 'Solo se pueden actualizar solicitudes con estado Activo'
      });
    }

    // Actualizar género y versión de la solicitud
    const [result] = await pool.query(
      'UPDATE solicitudes SET genero_fiesta = ?, version = ? WHERE id = ?',
      [genero_fiesta, version, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No se pudo actualizar la solicitud' });
    }

    console.log(`Solicitud ${id} actualizada - Género: ${genero_fiesta}, Versión: ${version}`);

    // Respuesta exitosa
    res.status(200).json({
      message: 'Solicitud actualizada correctamente',
      id: parseInt(id),
      genero_fiesta: genero_fiesta,
      version: version,
      anterior: {
        genero_fiesta: existingSolicitud[0].genero_fiesta,
        version: existingSolicitud[0].version
      }
    });

  } catch (error) {
    console.error('Error al actualizar detalle de solicitud:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};






Controller.setInvitados = async (req, res) => {
  const config = req.body;

  console.log(config);

  try {
    const [result] = await pool.query(
      `INSERT INTO Invitados (serial,familia,cantidad) VALUES (?, ?, ?)`,
      [
        config.id,                            // serial
        config.familia,                      // nombreo familia
        config.cantidad,                    // cantidad confirmada 
      ]
    );

    console.log('Solicitud guardada exitosamente. ID:', result.insertId);
    res.status(201).json({
      message: 'Solicitud guardada con éxito',
      insertId: result.insertId,
      serial:  config.id,  
    });

  } catch (err) {
    console.error('Error al guardar solicitud:', err.message);
    console.error('Stack:', err.stack);
  }
};

module.exports = Controller;
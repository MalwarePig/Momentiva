const Controller = {};
const pool = require('../db/db.js'); // importa el pool de conexión
const setSerial = require('../functions/serial');

/* 
Controller.setSolicitud = async (req, res) => {
  const config = req.body;
  const serial = setSerial();
  const idClient = config.contacto.email;
  console.log(config);
  console.log(idClient);
  console.log("Serial generado:", serial);
  
  try {
    // Concatenar los nombres de los festejados si ambos existen
    let nombresFestejados = config.nombreFestejado1;
    if (config.nombreFestejado2 && config.nombreFestejado2.trim()) {
      nombresFestejados += ` & ${config.nombreFestejado2}`;
    }
    
    const [result] = await pool.query(
      `INSERT INTO solicitudes (
                serial, nombre_festejado, fecha_evento, fecha_limite_respuesta, 
                lugar_evento, lugar_ceremonia, hora_inicio, hora_finalizacion, 
                hora_show, hora_ceremonia, codigo_vestimenta, mensaje_especial, 
                cancion_entrada, tematica, estado, fecha_solicitud, telefono, 
                email, contrasena, url, version
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        serial,                                    // serial
        nombresFestejados,                         // nombre_festejado (concatenado)
        config.fechaEvento,                        // fecha_evento
        config.fechaLimiteRespuesta || null,      // fecha_limite_respuesta (nuevo campo)
        config.lugarEvento,                        // lugar_evento
        config.lugarCeremonia || null,            // lugar_ceremonia (nuevo campo)
        config.horaInicio,                         // hora_inicio
        config.horaFinalizacion || null,          // hora_finalizacion
        config.horaShow || null,                  // hora_show
        config.horaCeremonia || null,             // hora_ceremonia (nuevo campo)
        config.codigoVestimenta || null,          // codigo_vestimenta
        config.mensajeEspecial || null,           // mensaje_especial
        config.cancionEntrada || null,            // cancion_entrada
        config.tematica || 'Clásico',             // tematica
        config.estado || 'Pendiente',             // estado (con valor por defecto)
        config.fechaSolicitud || new Date(),      // fecha_solicitud (con valor por defecto)
        config.contacto.telefono || null,         // telefono
        config.contacto.email,                    // email
        config.contacto.contrasena,               // contrasena
        '',                                       // url vacío
        config.version || null                    // version
      ]
    );
    
    console.log('Solicitud guardada exitosamente. ID:', result.insertId);
    res.status(201).json({
      message: 'Solicitud guardada con éxito',
      insertId: result.insertId,
      serial: serial,
      nombresFestejados: nombresFestejados  // Incluimos los nombres concatenados en la respuesta
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
 */
// Alternativa: Si prefieres almacenar los nombres por separado en la BD
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
                serial, nombre_festejado1, nombre_festejado2, fecha_evento, 
                fecha_limite_respuesta, lugar_evento, lugar_ceremonia, 
                hora_Evento, hora_Show, hora_Ceremonia, codigo_vestimenta, mensaje_especial, cancion_entrada, tematica, 
                estado, fecha_solicitud, telefono, email, contrasena, url, version
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        serial,                                    // serial
        config.nombreFestejado1,                   // nombre_festejado1
        config.nombreFestejado2 || null,          // nombre_festejado2 (puede ser null)
        config.fechaEvento,                        // fecha_evento
        config.fechaLimiteRespuesta || null,      // fecha_limite_respuesta
        config.lugarEvento,                        // lugar_evento
        config.lugarCeremonia || null,            // lugar_ceremonia
        config.horaEvento,                         // hora_inicio 
        config.horaShow || null,                  // hora_show
        config.horaCeremonia || null,             // hora_ceremonia
        config.codigoVestimenta || null,          // codigo_vestimenta
        config.mensajeEspecial || null,           // mensaje_especial
        config.cancionEntrada || null,            // cancion_entrada
        config.tematica || 'Clásico',             // tematica
        config.estado || 'Pendiente',             // estado
        config.fechaSolicitud || new Date(),      // fecha_solicitud
        config.contacto.telefono || null,         // telefono
        config.contacto.email,                    // email
        config.contacto.contrasena,               // contrasena
        '',                                       // url vacío
        config.version || null                    // version
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
    const { genero_fiesta, version, imgUno, imgDos } = req.body;
   
    // Validar que el ID sea un número válido
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID de solicitud inválido' });
    }
   
    // Validar género de fiesta (usando el campo tematica de la BD)
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
   
    // Simplemente convertir a string o null si está vacío
    const imgUnoLimpia = imgUno ? imgUno.toString() : null;
    const imgDosLimpia = imgDos ? imgDos.toString() : null;
    
    console.log('URLs recibidas:', { imgUno, imgDos });
    console.log('URLs que se guardarán:', { imgUnoLimpia, imgDosLimpia });
   
    // Verificar que la solicitud existe y está activa
    const [existingSolicitud] = await pool.query(
      'SELECT id, estado, tematica, version, imgUno, imgDos FROM solicitudes WHERE id = ?',
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
   
    console.log('Actualizando solicitud con valores:', {
      tematica: genero_fiesta,
      version: version,
      imgUno: imgUnoLimpia,
      imgDos: imgDosLimpia,
      id: id
    });
   
    // Actualizar temática (genero_fiesta), versión y URLs de imágenes de la solicitud
    const [result] = await pool.query(
      'UPDATE solicitudes SET tematica = ?, version = ?, imgUno = ?, imgDos = ? WHERE id = ?',
      [genero_fiesta, version, imgUnoLimpia, imgDosLimpia, id]
    );
   
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No se pudo actualizar la solicitud' });
    }
   
    console.log(`Solicitud ${id} actualizada exitosamente`);
    console.log(`- Temática: ${genero_fiesta}`);
    console.log(`- Versión: ${version}`);
    console.log(`- Imagen 1: ${imgUnoLimpia || 'Sin imagen'}`);
    console.log(`- Imagen 2: ${imgDosLimpia || 'Sin imagen'}`);
   
    // Respuesta exitosa
    res.status(200).json({
      message: 'Solicitud actualizada correctamente',
      id: parseInt(id),
      tematica: genero_fiesta,
      version: version,
      imgUno: imgUnoLimpia,
      imgDos: imgDosLimpia,
      anterior: {
        tematica: existingSolicitud[0].tematica,
        version: existingSolicitud[0].version,
        imgUno: existingSolicitud[0].imgUno,
        imgDos: existingSolicitud[0].imgDos
      }
    });
   
  } catch (error) {
    console.error('Error al actualizar detalle de solicitud:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
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
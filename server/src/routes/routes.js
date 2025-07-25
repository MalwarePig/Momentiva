const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const conLab = require('../controllers/controllerLab');
const conClients = require('../controllers/controllerClients');
const conRender = require('../controllers/controllerRender');


router.post('/Exportar', conLab.Exportar);//Registra una nueva invitación gratis
router.get('/cargarInvitadosLab/:usuario', conLab.Cargar);// Cargar invitados por usuario gratuito json
router.get('/cargarInvitacionLab/:usuario', conLab.render);// Cargar invitación por usuario gratuito json

//Invitación premium
router.post('/setSolicitud', conClients.setSolicitud);//Registra una nueva solicitud
router.get('/getSolicitud', conClients.getSolicitud);//Obtiene todas las solicitudes
router.put('/updateSolicitud/:id', conClients.updateSolicitud);//Actualiza estado de una solicitud por ID 
router.put('/updateSolicitudDetalle/:id', conClients.updateSolicitudDetalle);  //Actualiza detalle de una solicitud por ID (Modelo o version)

//Renderizar evento
router.get('/Evento/:id', conRender.renderEvento);  //Actualiza detalle de una solicitud por ID (Modelo o version)

/* Confirmacion Asistencia */
router.post('/setInvitados', conClients.setInvitados);











module.exports = router;
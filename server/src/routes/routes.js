const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const conLab = require('../controllers/controllerLab');

//Iniciar logueo
router.post('/Exportar', conLab.Exportar);

router.get('/cargar/:usuario', conLab.Cargar);

 

module.exports = router;
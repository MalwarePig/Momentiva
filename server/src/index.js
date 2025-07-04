const express = require('express');
const app = express();//servidor
const morgan = require('morgan');//ver las peticiones
const OS = require("os");
const cors = require('cors');

//Configuracion Servidor
app.set('port',process.env.PORT || 3000)//asignar puerto, si lo da el So que lo tome, sino el 3000 
 

// middlewares
app.use(cors({
  origin: 'http://localhost:5173', // puerto de Vite (Vue)
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

//routes o urls
app.use(require('./routes/routes.js'));//usar las rutas

//Escuchando el servidor
app.listen(app.get('port'),() => {
     console.log('servidor escuchando en puerto: ',app.get('port'));
     console.log('ip: ' +Object.values(OS.networkInterfaces())[0][0].address);
     console.log('Maquina: ' +OS.hostname());
});
 

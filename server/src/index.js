const express = require('express');
const app = express();//servidor
const morgan = require('morgan');//ver las peticiones
const OS = require("os");
const cors = require('cors');
const pool = require('./db/db.js'); // <-- importa el pool

//Configuracion Servidor
app.set('port',process.env.PORT || 3000)//asignar puerto, si lo da el So que lo tome, sino el 3000 
  

async function testDB() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa a MySQL (modo pool y async/await)');
    connection.release(); // ¡No olvides liberar la conexión!
  } catch (error) {
    console.error('❌ Error de conexión a MySQL:', error.message);
  }
}

testDB();

// middlewares
/* app.use(cors({
   origin: 'http://localhost:5173', // puerto de Vite (Vue)
  credentials: true
})); */


// Lista de orígenes permitidos
const whitelist = [
  'http://localhost:5173', // Vite
  'http://localhost:3000', // Otro frontend local
  'https://midominio.com', // Producción
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); // Permite la solicitud
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
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
 

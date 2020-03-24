const express = require('express');
const app = express();


const bodyParser = require('body-parser'); // Manejo de las request del Body.
const db = require('./db');
//const router = require('./components/message/network'); //Archivo de las rutas
const router = require('./network/routers'); //Archivo de las rutas


db('mongodb+srv://user:user1234@cluster0-wfcwo.mongodb.net/telegrom');


app.use(bodyParser.json()); // Manejo de las request del Body.
app.use(bodyParser.urlencoded({extended: false}));
//app.use(router); //Manejo de las RUTAS (GET, POST, PUT, etc)

router(app);

/* app.use('/', function(req, res){
    res.send('Hola');
}); */



app.use('/app', express.static('public'));

app.listen(3000);
console.log('El server está escuchando en http//localhost:3000');
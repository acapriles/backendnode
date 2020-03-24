const express = require('express');
const multer = require('multer'); //Gestion de archivos
const response = require('../../network/response'); //Archivo que va a manejar las respuestas
const controller = require('../message/controller'); //Archivo que va a manejar la lógica de negocio
const router = express.Router();  //Manejo de las RUTAS.


const upload = multer({
    dest: 'public/files/',
});


router.get('/', function(req, res){

    const filterMessages = req.query.user || null; //Para buscar un usuario específico
    
    controller.getMessages(filterMessages)
        .then((mesageList) => {
            response.success(req, res, mesageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
    //console.log(req.query); // Lo que viene por la Query (URL) de la petición.
    //console.log(req.headers); // Lo que viene por las cabeceras de la petición.
    
    /* res.header({
        "custom-header": "Nuestro valor personalizado"
    }); */ // Envío de información al cliente por la cabecera de la respuesta.
    
    //res.send('Hola desde el método GET');
    //response.success(req, res, 'Lista de mensajes', 200);
});

router.post('/', upload.single('file'), function(req, res){
    //console.log(req.body); // Lo que viene por el Body de la petición.
    //res.status(201).send({error: '', body: 'Creado correctamente'});
    //res.send('Hola ' + req.body.email  + ' desde el método Post');
    console.log(req.file);
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Información inválida', 400, 'Error en el controllador');
        });
});

router.patch('/:id', function(req, res){
    console.log(req.params.id);

    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', function(req, res){
    console.log(req.params.id);

    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;
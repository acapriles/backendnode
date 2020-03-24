const express = require('express') ;
const response = require('../../network/response'); //Archivo que va a manejar las respuestas
const controller = require('../user/controller'); //Archivo que va a manejar la lógica de negocio
const router = express.Router();  //Manejo de las RUTAS.

router.get('/', function(req, res){

    const filterUsers = req.query.name || null; //Para buscar un usuario específico
    
    controller.getUsers(filterUsers)
        .then((userList) => {
            response.success(req, res, userList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', function(req, res){

    controller.addUser(req.body.name)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Información inválida', 400, 'Error en el controllador');
        });
});

module.exports = router;
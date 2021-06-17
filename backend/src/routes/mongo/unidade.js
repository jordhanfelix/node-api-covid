const { Router } = require('express');

const routes = Router();
const unidadecontroller = require('../../controllers/mongo/unidadecontroller');

//Unidade
routes.get('/unidade', unidadecontroller.list);//todos
routes.get('/unidade/:id', unidadecontroller.show);//busca por id
routes.put('/unidade/:id', unidadecontroller.update);//atualiza
routes.post('/create', unidadecontroller.create);//cadastra
routes.delete('/unidade/:id', unidadecontroller.delete);//deleta

module.exports = routes;
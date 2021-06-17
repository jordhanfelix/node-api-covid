const { Router } = require('express');

const routes = Router();
const agendamentoController = require('../../controllers/mongo/agendamentoController');

//Agendamento
routes.get('/', agendamentoController.list);//todos
routes.get('/:id', agendamentoController.show);//busca por id
routes.put('/:id', agendamentoController.update);//atualiza
routes.post('/create', agendamentoController.create);//cadastra
routes.delete('/:id', agendamentoController.delete);//deleta

module.exports = routes;
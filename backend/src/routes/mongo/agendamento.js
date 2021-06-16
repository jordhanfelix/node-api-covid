const { Router } = require('express');

const routes = Router();
const agendamentoController = require('../../controllers/agendamentoController');

//Agendamento
routes.get('/agendamento', agendamentoController.list);//todos
routes.get('/agendamento/:id', agendamentoController.show);//busca por id
routes.put('/agendamento/:id', agendamentoController.update);//atualiza
routes.post('/agendamento', agendamentoController.create);//cadastra
routes.delete('/agendamento/:id', agendamentoController.delete);//deleta

module.exports = routes;
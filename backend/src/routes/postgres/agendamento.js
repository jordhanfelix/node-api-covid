const { Router } = require('express');

const routes = Router();

const AgendamentoController = require('../../controllers/postgres/AgendamentoController');

routes.post('/store', AgendamentoController.store);
routes.get('/', AgendamentoController.getAll);
routes.get('/:id', AgendamentoController.getById);
routes.put('/:id', AgendamentoController.update);
routes.delete('/:id', AgendamentoController.delete);

module.exports = routes;
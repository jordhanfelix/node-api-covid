const { Router } = require('express');

const routes = Router();

const UnidadeSaudeController = require('../../controllers/postgres/UnidadeSaudeController');

routes.post('/store', UnidadeSaudeController.store);
routes.get('/', UnidadeSaudeController.getAll);
routes.get('/:id', UnidadeSaudeController.getById);
routes.put('/:id', UnidadeSaudeController.update);
routes.delete('/:id', UnidadeSaudeController.delete);

module.exports = routes;
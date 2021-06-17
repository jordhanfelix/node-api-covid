const { Router } = require('express');

const routes = Router();

const PessoaController = require('../../controllers/postgres/PessoaController');

routes.post('/create', PessoaController.store);
routes.get('/', PessoaController.getAll);
routes.get('/:id', PessoaController.getById);
routes.put('/:id', PessoaController.update);
routes.delete('/:id', PessoaController.delete);

module.exports = routes;
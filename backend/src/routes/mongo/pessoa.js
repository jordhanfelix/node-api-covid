const { Router } = require('express');

const routes = Router();
const pessoaController = require('../../controllers/mongo/pessoaController');

//Pessoa
routes.get('/', pessoaController.list);//todos
routes.get('/:id', pessoaController.show);//busca por id
routes.put('/:id', pessoaController.update);//atualiza
routes.post('/create', pessoaController.create);//cadastra
routes.delete('/:id', pessoaController.delete);//deleta

module.exports = routes;
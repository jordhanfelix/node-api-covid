const {Router} = require('express');
const routes = Router();

const agendamentoController = require('../controllers/agendamentoController');
const pessoaController = require('../controllers/pessoaController');
const unidadecontroller = require('../controllers/unidadecontroller');
 
//Agendamento
routes.get('/agendamento', agendamentoController.list);//todos
routes.get('/agendamento/:id', agendamentoController.show);//busca por id
routes.put('/agendamento/:id', agendamentoController.update);//atualiza
routes.post('/agendamento', agendamentoController.create);//cadastra
routes.delete('/agendamento/:id', agendamentoController.delete);//deleta

//Pessoa
routes.get('/pessoa', pessoaController.list);//todos
routes.get('/pessoa/:id', pessoaController.show);//busca por id
routes.put('/pessoa/:id', pessoaController.update);//atualiza
routes.post('/pessoa', pessoaController.create);//cadastra
routes.delete('/pessoa/:id', pessoaController.delete);//deleta

//Unidade
routes.get('/unidade', unidadecontroller.list);//todos
routes.get('/unidade/:id', unidadecontroller.show);//busca por id
routes.put('/unidade/:id', unidadecontroller.update);//atualiza
routes.post('/unidade', unidadecontroller.create);//cadastra
routes.delete('/unidade/:id', unidadecontroller.delete);//deleta


module.exports = routes;
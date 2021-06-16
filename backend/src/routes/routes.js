const {Router} = require('express');
const routes = Router();


const pessoaMongo = require('./mongo/pessoa');
const agendamentoMongo = require('./mongo/agendamento');
const unidadeMongo = require('./mongo/unidade');

const pessoaPostgres = require('./postgres/pessoa');
const agendamentoPostgres = require('./postgres/agendamento');
const unidadePostgres = require('./postgres/unidade');

//mongo
routes.use('/api/mg-pessoa', pessoaMongo);
routes.use('/api/mg-agendamento', agendamentoMongo);
routes.use('/api/mg-unidadeSaude', unidadeMongo);

//postgress 
routes.use('/api/pg-pessoa', pessoaPostgres);
routes.use('/api/pg-agendamento', agendamentoPostgres);
routes.use('/api/pg-unidadeSaude', unidadePostgres);


module.exports = routes;
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Unidade = require('../models/postgres/UnidadeSaude');
const Pessoa = require('../models/postgres/Pessoa');
const Agendamento = require('../models/postgres/Agendamento');

const connection = new Sequelize(dbConfig);

Unidade.init(connection);
Pessoa.init(connection);
Agendamento.init(connection);

Unidade.associate(connection.models);
Pessoa.associate(connection.models);
Agendamento.associate(connection.models);

module.exports = connection;
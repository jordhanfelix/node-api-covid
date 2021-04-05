const mongoose = require('mongoose');

const UnidadeSchema = mongoose.Schema({
    nome_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricao_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    latlong_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
});

let Unidade = module.exports = mongoose.model('unidade', UnidadeSchema);

module.exports.get = function(callback, limit){
    Unidade.find(callback).limit(limit);
}
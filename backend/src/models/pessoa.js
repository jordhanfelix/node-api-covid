const mongoose = require('mongoose');

const pessoaSchema = mongoose.Schema({
    nome: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cpf_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    data_nascimento: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grupo_prioritario: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    endereco_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        lowercase: true
    },
    unidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unidade',
        required: true
    }
});

let Pessoa = module.exports = mongoose.model('pessoa', pessoaSchema);

module.exports.get = function (callback, limit) {
    Pessoa.find(callback).limit(limit);
}
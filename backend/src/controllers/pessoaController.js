const pessoaModel = require('../models/pessoa');
const Unidade = require('../models/unidade');

module.exports = {

    // Adicionar uma nova pessoa
    async create(request, response) {

        const {
            nome,
            cpf_pessoa,
            data_nascimento,
            telefone_pessoa,
            grupo_prioritario,
            endereco_pessoa,
            email_pessoa,
            unidade
        } = request.body;

        const {
            _id,
            nome_unidade,
            descricao_unidade,
            endereco_unidade,
            telefone_unidade,
            email_unidade,
            latlong_unidade
        } = await Unidade.findById(unidade);
        // Recuperar todas as pessoas cadastradas no banco
        pessoaModel.find((err, pessoas) => {
            if (err) {
                console.log("Erro ao recuperars pessoas!");
                response.json({
                    status: "erro",
                    message: "Erro ao recuperars pessoas e portanto inserir uma nova pessoa!"
                });
            }

            // Verificar se ja existe uma pessoa cadastrada com o mesmo cpf
            pessoas.map(item => {
                if (cpf_pessoa === item.cpf_pessoa) {
                    response.json({
                        status: "erro",
                        message: `A pessoa ${nome} já está cadastrada com o cpf ${cpf_pessoa}`
                    });
                    return;
                }
            });

            // Cadastrar pessoa
            let pessoa = new pessoaModel({
                nome,
                cpf_pessoa,
                data_nascimento,
                telefone_pessoa,
                grupo_prioritario,
                endereco_pessoa,
                email_pessoa,
                unidade: {
                    _id,
                    nome_unidade,
                    descricao_unidade,
                    endereco_unidade,
                    telefone_unidade,
                    email_unidade,
                    latlong_unidade
                }
            });

            
            console.log(pessoa)

            pessoa.save((erro) => {
                if (erro) {
                    response.send({
                        status: "erro",
                        message: `Não foi possível inserir pessoa. ${erro}`
                    });
                } else {
                    response.send({
                        status: "ok",
                        message: `Pessoa ${nome} inserida com sucesso!`
                    });
                }
            });
        });
    },

    // Listar pessoas
    async list(request, response) {


        try {
            const pessoas = await pessoaModel.find().populate(['unidade']);

            return response.send({ pessoas });

        } catch (err) {
            return response.status(400).send({ error: 'Erro ao listar Pessoa(s)!' });
        }

    },

    // Obter pessoa por id
    async show(request, response) {
       
        try {
            const pessoa = await pessoaModel.findById(request.params.id).populate(['unidade']);
      
            return response.send({ pessoa });
      
          } catch (err) {
            return response.status(400).send({ error: 'Erro ao listar pessoa!' });
          }
    },

    // Editar uma pessoa
    async update(request, response) {
        const { id } = request.params;

        pessoaModel.findById(id, (erro, pessoa) => {
            if (erro || !pessoa) {
                console.log("Erro ao recuperar pessoa!");
                response.json({
                    status: "erro",
                    message: `Erro ao recuperar pessoa de id ${id} para atualização`
                });
            } else {

                const {
                    nome,
                    cpf_pessoa,
                    data_nascimento,
                    telefone_pessoa,
                    grupo_prioritario,
                    endereco_pessoa,
                    email_pessoa,
                } = request.body;

                pessoa.nome = nome;
                pessoa.cpf_pessoa = cpf_pessoa;
                pessoa.data_nascimento = data_nascimento;
                pessoa.telefone_pessoa = telefone_pessoa;
                pessoa.grupo_prioritario = grupo_prioritario;
                pessoa.endereco_pessoa = endereco_pessoa;
                pessoa.email_pessoa = email_pessoa;

                console.log(pessoa);

                pessoa.save((err => {
                    if (err) {
                        response.json({
                            status: "erro",
                            message: err
                        });
                    } else {
                        response.json({
                            status: "ok",
                            message: `Pessoa ${pessoa.nome} atualizada com sucesso!`,
                            novaPessoa: pessoa
                        });
                    }
                }));
            }
        });
    },

    // Remover pessoa
    async delete(request, response) {
        const { id } = request.params;

        pessoaModel.deleteOne({
            _id: id
        }, (err) => {
            if (err) {
                response.json({
                    status: "erro",
                    message: "Erro ao deletar pessoa"
                });
            } else {
                response.json({
                    status: "ok",
                    message: `Pessoa deletada com sucesso!`
                });
            }
        });
    }
}
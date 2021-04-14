const agendamentoModel = require('../models/agendamento');
const Unidade = require('../models/unidade');
const Pessoa = require('../models/pessoa');
module.exports = {

    // Adicionar um novo agendamento
    async create(request, response) {

        const {
            data_hora_agendamento,
            necessidades_especiais,
            observacoes_agendamento,
            pessoa,
            unidade,
        } = request.body;

        const pessoaRecuperada = Pessoa.findById(pessoa);
        const unidadeRecuperada = Unidade.findById(unidade);
        // busca agendamento
        agendamentoModel.find((err, agendamentos) => {
            if (err) {
                console.log("Erro ao recuperar agendamento");
                response.json({
                    status: "erro",
                    message: "Erro ao recuperar agendamento"
                });
            }
            if (!pessoaRecuperada || !unidadeRecuperada) {
                response.json({
                    status: "erro",
                    message: `Não foi possivel encontrar Pessoa ou Unidade informada`
                });
                return;
            }

            // Procura por agendamento no memso usuario
            agendamentos.map(item => {
                if (pessoa === item.pessoa) {
                    response.json({
                        status: "erro",
                        message: `Pessoa já possui um agendamento cadastrado`
                    });
                    return;
                }
            });

            var data = new Date(data_hora_agendamento);

            // Cria novo agendamento
            let agendamento = new agendamentoModel({
                data_hora_agendamento: data,
                necessidades_especiais,
                observacoes_agendamento,
                pessoa,
                unidade
            });

            agendamento.save((erro) => {
                if (erro) {
                    response.send({
                        status: "erro",
                        message: erro
                    });
                } else {
                    response.send({
                        status: "ok",
                        message: `Agendamento cadastrado com sucesso!`
                    });
                }
            });
        });
    },

    // Listar agendamentos
    async list(request, response) {


        try {
            const agendamentos = await agendamentoModel.find().populate(['pessoa', 'unidade']);

            return response.send({ agendamentos });

        } catch (err) {
            return response.status(400).send({ error: 'Erro ao listar Agendamentos(s)!' });
        }
    },

    // Obter agendamento por id
    async show(request, response) {
        const { id } = request.params;

        agendamentoModel.findById(id, function (err, agendamento) {
            if (err || !agendamento) {
                console.log(`Erro ao recuperar agendamento de id: ${id}`);
                response.json({
                    status: "erro",
                    message: `Erro ao recuperar agendamento de id: ${id}`
                });
            } else {

                const pessoaRecuperada = Pessoa.findById(agendamento.pessoa);
                const unidadeRecuperada = Unidade.findById(agendamento.unidade);

                agendamento.pessoa = pessoaRecuperada;
                agendamento.unidade = unidadeRecuperada;

                response.json({
                    agendamento: agendamento
                });
            }

        });
    },

    // Editar um agendamento
    async update(request, response) {
        const { id } = request.params;

        agendamentoModel.findById(id, (erro, agendamento) => {
            if (erro || !agendamento) {
                console.log("Erro ao recuperar agendamento!");
                response.json({
                    status: "erro",
                    message: `Erro ao recuperar agendamento de id ${id} para atualização`
                });
            } else {

                const {
                    data_hora_agendamento,
                    necessidades_especiais,
                    observacoes_agendamento,
                    pessoa,
                    unidade,
                } = request.body;

                agendamento.data_hora_agendamento = data_hora_agendamento;
                agendamento.necessidades_especiais = necessidades_especiais;
                agendamento.observacoes_agendamento = observacoes_agendamento;
                agendamento.telefone_agendamento = telefone_agendamento;
                agendamento.pessoa = pessoa;
                agendamento.unidade = unidade;

                agendamento.save((err => {
                    if (err) {
                        response.json({
                            status: "erro",
                            message: err
                        });
                    } else {
                        response.json({
                            status: "ok",
                            message: `agendamento ${agendamento.nome} atualizado com sucesso!`,
                            novoagendamento: agendamento
                        });
                    }
                }));
            }
        });
    },

    // Remover agendamento
    async delete(request, response) {
        const { id } = request.params;

        const agendamento = await agendamentoModel.findById(id);

        //Se encontrar agendamento deleta unidade e pessoa;
        if (agendamento) {
            const pessoaRecuperada = await Pessoa.findById(agendamentoModel.pessoa);
            const unidadeRecuperada = await Unidade.findById(agendamentoModel.unidade);

            await pessoaRecuperada.deleteOne({ _id: agendamento.pessoa });
            await unidadeRecuperada.deleteOne({ _id: agendamento.unidade_saude });
        }

        //Por ultimo deleta agendamento
        agendamentoModel.deleteOne({
            _id: id
        }, (err) => {
            if (err) {
                response.json({
                    status: "erro",
                    message: "Erro ao deletar agendamento"
                });
            } else {
                response.json({
                    status: "ok",
                    message: `Agendamento deletado com sucesso!`
                });
            }
        });
    }
}
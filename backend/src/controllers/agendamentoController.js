const agendamentoModel = require('../models/agendamento');

module.exports = {

    // Adicionar um novo agendamento
    async create(request, response) {

        const {
            data_hora_agendamento,
            necessidades_especiais,
            observacoes_agendamento,
            pessoa,
            unidae,
        } = request.body;

        // busca agendamento
        agendamentoModel.find((err, agendamentos) => {
            if (err) {
                console.log("Erro ao recuperar agendamento");
                response.json({
                    status: "erro",
                    message: "Erro ao recuperar agendamento"
                });
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
        agendamentoModel.find(function (err, agendamentos) {
            if (err) {
                console.log("Erro ao recuperar os agendamentos!");
                response.json({
                    status: "erro",
                    message: "Erro ao recuperar os agendamentos!"
                });
            } else {
                response.json({
                    status: "ok",
                    agendamentos: agendamentos
                });
            }

        }).populate('pessoa');
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
                response.json({
                    status: "ok",
                    agendamento: agendamento
                });
            }

        }).populate('pessoa');
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
                } = request.body;

                agendamento.data_hora_agendamento = data_hora_agendamento;
                agendamento.necessidades_especiais = necessidades_especiais;
                agendamento.observacoes_agendamento = observacoes_agendamento;
                agendamento.telefone_agendamento = telefone_agendamento;
                agendamento.pessoa = pessoa;

                console.log(agendamento);

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
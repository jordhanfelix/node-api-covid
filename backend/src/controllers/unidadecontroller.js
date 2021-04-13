const unidadeModel = require('../models/unidade');
const Pessoa = require('../models/pessoa');

module.exports = {

  // Adicionar um novo unidade
  async create(request, response) {

    try {

      const {
        nome_unidade,
        descricao_unidade,
        endereco_unidade,
        telefone_unidade,
        email_unidade,
        latlong_unidade,
        pessoas
      } = request.body;

      const unidade = await unidadeModel.create({
        nome_unidade,
        descricao_unidade,
        endereco_unidade,
        telefone_unidade,
        email_unidade,
        latlong_unidade,
      });

      if (pessoas) {
        await Promise.all(pessoas.map(async pessoa => {

          const pessoaUnidade = new Pessoa({ ...pessoa, unidade: unidade._id });

          await pessoaUnidade.save();

          unidade.pessoas.push(pessoaUnidade);
        }));
      }

      await unidade.save();

      return response.send({ unidade });

    } catch (err) {
      return response.status(400).send({ error: `Erro ao criar unidade! ${err}` });
    }
  },

  // Listar unidades
  async list(request, response) {

    try {
      const unidades = await unidadeModel.find().populate(['unidade', 'pessoas']);

      return response.send({ unidades });

    } catch (err) {
      return response.status(400).send({ error: 'Erro ao listar unidade(s)!' });
    }
  },

  // Obter unidade por id
  async show(request, response) {
    try {
      const unidade = await unidadeModel.findById(request.params.id).populate(['unidade', 'pessoas']);

      return response.send({ unidade });

    } catch (err) {
      return response.status(400).send({ error: 'Erro ao listar unidade!' });
    }
  },

  // Editar um unidade
  async update(request, response) {

    try {

      const {
        nome_unidade,
        descricao_unidade,
        endereco_unidade,
        telefone_unidade,
        email_unidade,
        latlong_unidade,
        pessoas
      } = request.body;

      const unidade = await unidadeModel.findByIdAndUpdate(request.params.id, {
        nome_unidade,
        descricao_unidade,
        endereco_unidade,
        telefone_unidade,
        email_unidade,
        latlong_unidade
      }, { new: true });

      //Primeiro deletar todas as pessoas associadas a unidade
      unidade.pessoas = [];

      await Pessoa.remove({ unidade: unidade._id });
      //depois criar novamente
      await Promise.all(pessoas.map(async pessoa => {
        const pessoaUnidade = new Pessoa({ ...pessoa, unidade: unidade._id });

        await pessoaUnidade.save();

        unidade.pessoas.push(pessoaUnidade);
      }));

      await unidade.save();

      return response.send({ unidade });

    } catch (err) {
      return response.status(400).send({ error: `Erro ao atualizar unidade! ${err}` });
    }
  },

  // Remover unidade
  async delete(request, response) {
    try {
      await unidadeModel.findByIdAndRemove(request.params.id);
      return response.send();
    } catch (err) {
      return response.status(400).send({ error: 'Erro ao remover unidade!' });
    }
  }
}
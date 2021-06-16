const Agendamento = require('../../models/postgres/Agendamento');
const Pessoa = require('../../models/postgres/Pessoa');
const UnidadeSaude = require('../../models/postgres/UnidadeSaude');

module.exports = {

  async getAll(req, res) {

    try {

      const agendamentos = await Agendamento.findAll({
        include: { all: true }
      });

      return res.json(agendamentos);

    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async store(req, res) {

    const { data_hora, necessidades_especiais, observacoes, unidade_saude_id, pessoa_id } = req.body;

    const unidade = await UnidadeSaude.findByPk(unidade_saude_id);
    const pessoa = await Pessoa.findByPk(pessoa_id);

    if (!unidade) {
      return res.status(400).json({ erro: 'Erro ao localizar Uniade de saúde' })
    }

    if (!pessoa) {
      return res.status(400).json({ erro: 'Erro ao localizar Pessoa' })
    }

    try {

      const agendamento = await Agendamento.create({
        data_hora,
        necessidades_especiais,
        observacoes,
        pessoa_id,
        unidade_saude_id
      });

      return res.json(agendamento);

    } catch (error) {

      return res.status(400).json(error);
    }

  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const agendamento = await Agendamento.findByPk(id);

      if (agendamento)
        return res.json(agendamento);
      else
        return res.status(404).json({ error: 'Erro ao localizar agendamento' });

    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async update(req, res) {
    const { id } = req.params;

    try {
      const { data_hora, necessidades_especiais, observacoes, unidade_saude_id, pessoa_id } = req.body;

      const agendamento = await Agendamento.findByPk(id);
      const unidadeSaude = await UnidadeSaude.findByPk(unidade_saude_id);
      const pessoa = await Pessoa.findByPk(pessoa_id);

      if (!unidadeSaude)
        return res.status(400).json({ erro: 'Unidade de saúde não encontrada' });

      if (!pessoa)
        return res.status(400).json({ erro: 'Pessoa não encontrada' });

      if (agendamento) {

        agendamento.update({
          data_hora,
          necessidades_especiais,
          observacoes,
          pessoa_id,
          unidade_saude_id
        }, {
          where: { id: id }
        });

        return res.json(agendamento);

      } else
        return res.status(404).json({ error: 'Agendamento não encontrado' });

    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Agendamento.destroy({
        where: {
          id: id
        }
      }).then(count => {
        if (!count)
          return res.status(404).json({ error: 'Agendamento não encontrado' });

        res.status(204).json();
      });

    } catch (error) {
      return res.status(400).json(error);
    }

  },
}
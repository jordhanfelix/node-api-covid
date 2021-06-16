const Pessoa = require('../../models/postgres/Pessoa');
const UnidadeSaude = require('../../models/postgres/UnidadeSaude');

module.exports = {

  async getAll(req, res) {
    try {

      const pessoas = await Pessoa.findAll({
        include: { all: true }
      });

      return res.json(pessoas);

    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async store(req, res) {
    const {
      nome,
      cpf,
      data_nascimento,
      telefone,
      grupo_prioritario,
      endereco,
      email,
      unidade_saude_id } = req.body;

    if (unidade_saude_id) {
      const unidadeSaude = await UnidadeSaude.findByPk(unidade_saude_id);

      if (!unidadeSaude) {
        return res.status(400).json({ erro: 'Erro ao localizar unidade de saúde' })
      }
    } else {
      return response.status(404).json({ erro: 'Unidade de saúde não informada' });
    }

    try {
      const pessoa = await Pessoa.create({

        cpf,
        data_nascimento,
        nome,
        email,
        grupo_prioritario,
        endereco,
        telefone,
        unidade_saude_id
      });

      return res.json(pessoa);

    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async getById(req, res) {

    const { id } = req.params;

    try {
      const pessoa = await Pessoa.findByPk(id);

      if (pessoa)
        return res.json(pessoa);
      else
        return res.status(404).json({ error: 'Pessoa não encontrada' });

    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async update(req, res) {
    const { id } = req.params;

    try {

      const pessoa = await Pessoa.findByPk(id);

      if (unidade_saude_id) {
        const unidadeSaude = await UnidadeSaude.findByPk(unidade_saude_id);

        if (!unidadeSaude) {
          return res.status(400).json({ erro: 'Erro ao localizar unidade de saúde' })
        }
      }

      if (pessoa) {

        pessoa.update({
          cpf,
          data_nascimento,
          nome,
          email,
          grupo_prioritario,
          endereco,
          telefone,
          unidade_saude_id
        },
          { where: { id: id } });

        return res.json(pessoa);

      } else {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }
    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Pessoa.destroy({
        where: {
          id: id
        }
      }).then(count => {
        if (!count) {
          return res.status(404).json({ error: 'Pessoa não encontrado' });
        }
        res.status(204).json();
      });

    } catch (error) {
      return res.status(400).json(error);
    }

  },
}
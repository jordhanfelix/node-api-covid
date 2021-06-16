const UnidadeSaude = require('../../models/postgres/UnidadeSaude');

module.exports = {
  async getAll(req, res) {
    try {
      const unidades = await UnidadeSaude.findAll({
        include: { association: 'pessoas' }
      });

      return res.json(unidades);
    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async store(req, res) {

    const {
      descricao,
      email,
      endereco,
      latlong,
      nome,
      telefone
    } = req.body;

    try {
      const unidade = await UnidadeSaude.create({ descricao, email, endereco, latlong, nome, telefone });

      return res.json(unidade);
    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const unidade = await UnidadeSaude.findByPk(id);

      if (unidade)
        return res.json(unidade);
      else
        return res.status(404).json({ error: 'Unidade de saúde não encontrada' });

    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async update(req, res) {
    const { id } = req.params;

    try {

      const {
        descricao,
        email,
        endereco,
        latlong,
        nome,
        telefone
      } = req.body;

      const unidade = await UnidadeSaude.findByPk(id);

      if (unidade) {
        unidade.update({
          descricao,
          email,
          endereco,
          latlong,
          nome,
          telefone
        }, {
          where: { id: id }
        });

        return res.json(unidade);
      } else {
        return res.status(404).json({ error: 'Unidade de saúde não encontrada' });
      }
    } catch (error) {
      return res.status(400).json(error);
    }

  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await UnidadeSaude.destroy({
        where: {
          id: id
        }
      }).then(count => {
        if (!count) {
          return res.status(404).json({ error: 'Unidade de saúde não  encontrada' });
        }
        res.status(204).json();
      });

    } catch (error) {
      return res.status(400).json(error);
    }

  },
}
const db = require('../config/database');

const controller = {
  index: async (req, res) => {
    let incidents = null;
    let count = 0;

    const { page = 1, perPage = 15 } = req.query;

    if (req.query.ong_id) {
      incidents = await db('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .options({ nestTables: true })
        .limit(perPage)
        .offset((page - 1) * perPage)
        .select([
          'incidents.*',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.city',
          'ongs.uf'
        ])
        .where({ ong_id: req.query.ong_id });

      count = await db('incidents')
        .count()
        .where({ ong_id: req.query.ong_id });
    } else {
      incidents = await db('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(perPage)
        .offset((page - 1) * perPage)
        .select([
          'incidents.*',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.city',
          'ongs.uf'
        ]);

      count = await db('incidents').count();
    }

    numCount = count[0]['count(*)'];

    res.header('X-Total-Count', numCount);
    res.header('X-Current-Page', page);
    res.header('X-Per-Page', perPage);
    res.header('X-Total-Pages', Math.ceil(numCount / perPage));

    res.json(incidents);
  },

  create: async (req, res) => {
    const { title, description, value } = req.body;
    const { authorization: ongId } = req.headers;

    const [id] = await db('incidents').insert({
      title,
      description,
      value,
      ong_id: ongId
    });

    res.json({ id });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const { authorization: ong_id } = req.headers;

    const incident = await db('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (!incident) {
      return res
        .status(404)
        .json({ error: true, status: 404, message: 'not found' });
    }

    if (incident.ong_id !== ong_id) {
      return res
        .status(401)
        .json({ error: true, status: 401, message: 'unauthorized' });
    }

    await db('incidents')
      .where('id', id)
      .delete();

    res.status(200).json({ success: true, message: 'deleted' });
  }
};

module.exports = controller;

const db = require('../config/database');

const controller = {
  create: async (req, res) => {
    const { id } = req.body;
    const ong = await db('ongs')
      .where('id', id)
      .select('*')
      .first();

    if (!ong)
      return res
        .status(404)
        .json({ error: true, code: 404, message: 'not found' });
    else res.json(ong);
  }
};

module.exports = controller;

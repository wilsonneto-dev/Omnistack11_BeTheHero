const crypto = require('crypto');
const db = require('../config/database');

const controller = {
  // list
  index: async (req, res) => {
    const ongs = await db('ongs').select('*');
    res.json(ongs);
  },

  create: async (req, res) => {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await db('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
};

module.exports = controller;

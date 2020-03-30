const express = require('express');
const routes = express.Router();

const ongController = require('./controllers/ong');
const incidentController = require('./controllers/incident');
const sessionController = require('./controllers/session');

routes.get('/', (req, res) => {
  res.send({ message: 'Running...' });
});

// ongs
routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

// incidents
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

// session
routes.post('/sessions', sessionController.create);

module.exports = routes;

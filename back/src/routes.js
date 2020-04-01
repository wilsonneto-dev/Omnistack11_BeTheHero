const express = require('express');
const routes = express.Router();

const ongController = require('./controllers/ong');
const ongValidations = require('./validators/ongsValidation');
const incidentController = require('./controllers/incident');
const sessionController = require('./controllers/session');
const sessionValidation = require('./validators/sessionValidation');

routes.get('/', (req, res) => {
  res.send({ message: 'Running...' });
});

// ongs
routes.get('/ongs', ongController.index);
routes.post('/ongs', ongValidations.create, ongController.create);

// incidents
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

// session
routes.post('/sessions', sessionValidation.create, sessionController.create);

module.exports = routes;

const express = require('express');
const { errors } = require('celebrate');

const routes = require('./routes');
const middlewares = require('./middlewares');
const cors = require('cors');

const app = express();
app.use(cors(/* { origin: 'http://meuapp.com' } */));
app.use(express.json());

app.use(middlewares.log);

app.use(routes);

app.use(errors());

app.listen(3333, () => {
  console.log('listening');
});

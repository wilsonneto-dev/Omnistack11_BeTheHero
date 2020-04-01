const { celebrate, Joi, errors, Segments } = require('celebrate');

/* apenas exemplo de validação de header */
module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  })
};

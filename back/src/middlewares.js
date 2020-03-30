const middlewares = {
  log: (req, res, next) => {
    console.log(
      `request: ${req.method} --> query: ${JSON.stringify(req.query)} - ` +
        `route: ${JSON.stringify(req.params)} -` +
        `{body: ${JSON.stringify(req.body)}`
    );
    next();
  }
};

module.exports = middlewares;

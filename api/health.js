const express = require('express');
const healthRouter = express.Router();

healthRouter.get('/', (req, res, next) => {
  res.send({
    message: "Website is healthy"
  });
});

module.exports = healthRouter;
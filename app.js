const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Joi = require('joi');

const expressJoi = require('express-joi-validator');

const { show, store } = require('./controllers/metric');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const schema = {
  body: {
    ttfb: Joi.number().required(),
    fcp: Joi.number().required(),
    dom_load: Joi.number().required(),
    window_load: Joi.number().required(),
  },
};

app.get('/metrics', show);
app.post('/metrics', expressJoi(schema), store);

// error handler
app.use((err, req, res) => {
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
});

module.exports = app;

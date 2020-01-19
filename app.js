const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { show, store } = require('./controllers/metric');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// fastify.register(require('fastify-cors'), {
//   origin: ['http://localhost:3001'],
// });

app.get('/metrics', show);
app.post('/metrics', store);


module.exports = app;

const mongoose = require('mongoose');
const fastify = require('fastify')({ logger: true });
const metricController = require('./controllers/metric');

const DB_CONNECTION = 'mongodb://root:root@localhost:27017/analytic?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256&3t.uriVersion=3&3t.connection.name=Mongo';
const mongoDB = DB_CONNECTION || process.env.MONGODB_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


fastify.get('/metrics', metricController.show);
fastify.post('/metrics', metricController.store);


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

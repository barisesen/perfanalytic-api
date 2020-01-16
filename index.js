const fastify = require('fastify')({ logger: true });
const metricController = require('./controllers/metric');

fastify.get('/', metricController.show);
fastify.post('/', metricController.store);

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

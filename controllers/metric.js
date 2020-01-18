const Metric = require('../models/metric');

module.exports.show = (request, reply) => {
  return reply.code(200).send(
    [
      {
        ttfb: 123123,
        fcp: 6463,
        dom_load: 32783,
        window_load: 87775,
        created_at: new Date(),
      },
      {
        ttfb: 326623,
        fcp: 3112,
        dom_load: 3233,
        window_load: 213,
        created_at: new Date(new Date() - 1000),
      },
      {
        ttfb: 12313,
        fcp: 4123,
        dom_load: 1234,
        window_load: 3124123,
        created_at: new Date(new Date() - 2000),
      },
      {
        ttfb: 7266,
        fcp: 23678,
        dom_load: 171273,
        window_load: 48382,
        created_at: new Date(new Date() - 3000),
      },
    ],
  );
};

module.exports.store = (request, reply) => {
  console.log(request.headers);
  const metric = new Metric(
    {
      host: request.hostname,
      path: '/',
      ttfb: request.body.ttfb,
      fcp: request.body.fcp,
      dom_load: request.body.dom_load,
      window_load: request.body.window_load,
    },
  );

  metric.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  return reply.code(200).send();
};

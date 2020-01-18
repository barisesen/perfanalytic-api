const dayjs = require('dayjs');
const Metric = require('../models/metric');

module.exports.show = async (request, reply) => {
  const lastThirtyMin = dayjs().subtract(30, 'minute').valueOf();

  let query = {
    created_at: { $gte: lastThirtyMin },
  };

  if (request.query.start_date && request.query.end_date) {
    query = {
      created_at: { $gte: request.query.start_date, $lte: request.query.end_date },
    };
  }

  await Metric.find(query, (err, doc) => {
    if (err) {
      console.error(err);
      return reply.code(500).send();
    }

    return reply.code(200).send(doc);
  });
};

module.exports.store = (request, reply) => {
  console.log(request);
  let params = request.body;
  if (typeof request.body === 'string') {
    params = JSON.parse(request.body);
  }

  const metric = new Metric(
    {
      host: request.hostname,
      referer: request.headers.referer,
      ttfb: params.ttfb,
      fcp: params.fcp,
      dom_load: params.dom_load,
      window_load: params.window_load,
      created_at: dayjs().valueOf(),
    },
  );

  metric.save((err) => {
    if (err) {
      // console.log(err);
    }
  });
  return reply.code(200).send();
};

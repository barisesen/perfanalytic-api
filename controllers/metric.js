const dayjs = require('dayjs');

const Metric = require('../models/metric');
const q = require('../queues/metric');

module.exports.show = (request, res) => {
  const lastThirtyMin = dayjs().subtract(30, 'minute').valueOf();
  const { start_date: startDate, end_date: endDate } = request.query;

  let query = {
    created_at: { $gte: lastThirtyMin },
  };

  if (startDate && endDate) {
    query = {
      created_at: { $gte: startDate, $lte: endDate },
    };
  }

  Metric.find(query, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send(doc);
  });
};

module.exports.store = (request, res) => {
  const { body } = request;
  const data = {
    ttfb: body.ttfb,
    fcp: body.fcp,
    domLoad: body.dom_load,
    windowLoad: body.window_load,
    host: request.hostname,
    referer: (request.headers.referer || request.hostname),
  };

  q.create('metric-store', data).events(false).save((err) => {
    if (err) res.status(400);
  });

  res.status(200).send();
};

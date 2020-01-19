const dayjs = require('dayjs');
const Metric = require('../models/metric');

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
  const {
    ttfb, fcp, dom_load: domLoad, window_load: windowLoad,
  } = request.body;

  const metric = new Metric(
    {
      host: request.hostname,
      referer: request.headers.referer || request.hostname,
      ttfb,
      fcp,
      dom_load: domLoad,
      window_load: windowLoad,
      created_at: dayjs().valueOf(),
    },
  );

  metric.save((err) => {
    if (err) {
      res.status(400);
    }
  });

  res.status(200).send();
};

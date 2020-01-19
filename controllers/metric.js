const dayjs = require('dayjs');

const Metric = require('../models/metric');
const q = require('../queues/metric');

module.exports.show = (req, res) => {
  const lastThirtyMin = dayjs().subtract(30, 'minute').valueOf();
  const { start_date: startDate, end_date: endDate } = req.query;

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

module.exports.store = (req, res) => {
  const { body } = req;
  const data = {
    ttfb: body.ttfb,
    fcp: body.fcp,
    domLoad: body.dom_load,
    windowLoad: body.window_load,
    host: req.hostname,
    referer: (req.headers.referer || req.hostname),
  };

  q.create('metric-store', data).events(false).save((err) => {
    if (err) res.status(400);
  });

  res.status(200).send();
};

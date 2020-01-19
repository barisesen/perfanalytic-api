const kue = require('kue');
const dayjs = require('dayjs');

const Metric = require('../models/metric');

let q = null;
if (process.env.NODE_ENV === 'test') {
  q = kue.createQueue();
} else {
  q = kue.createQueue({
    prefix: 'q',
    redis: {
      port: 6379,
      host: 'redis',
    },
  });
}


const create = (data, done) => {
  const {
    ttfb, fcp, domLoad, windowLoad, host, referer,
  } = data;
  console.log(ttfb);
  const metric = new Metric(
    {
      host,
      referer,
      ttfb,
      fcp,
      dom_load: domLoad,
      window_load: windowLoad,
      created_at: dayjs().valueOf(),
    },
  );

  metric.save((doc, err) => {
    console.log(doc, err);
  });
  done();
};

q.process('metric-store', (job, done) => {
  create(job.data, done);
});

module.exports = q;

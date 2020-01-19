process.env.NODE_ENV = 'test';

const chai = require('chai');
const request = require('supertest');
const dayjs = require('dayjs');

const app = require('./../../app.js');
const conn = require('./../../db/index.js');
const Metric = require('./../../models/metric');

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

const { expect, assert } = chai;

const metric = {
  ttfb: 1,
  fcp: 1,
  dom_load: 1,
  window_load: 1,
};

describe('GET /metrics', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('OK, getting metrics has no metrics', (done) => {
    request(app).get('/metrics')
      .then((res) => {
        const { body } = res;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, getting metrics has 1 metric', (done) => {
    request(app).post('/metrics')
      .send(metric)
      .then(() => {
        request(app).get('/metrics')
          .then((res) => {
            const { body } = res;
            expect(body.length).to.equal(1);
            done();
          });
      })
      .catch((err) => done(err));
  });

  it('OK, metrics must include the metric parameters', (done) => {
    request(app).post('/metrics')
      .send(metric)
      .then(() => {
        request(app).get('/metrics')
          .then((res) => {
            const { body } = res;
            expect(body).to.be.an('array').that.contains.something.like(metric);
            done();
          });
      })
      .catch((err) => done(err));
  });

  it('OK, If there is no filter, list the last 30 minutes of metrics.', (done) => {
    const yesterday = dayjs().subtract(1, 'day').valueOf();
    const mockMetric = new Metric(
      {
        host: 'https://test.test',
        referer: 'https://test.test/test',
        ttfb: 10,
        fcp: 10,
        dom_load: 10,
        window_load: 10,
        created_at: yesterday,
      },
    );

    mockMetric.save((error) => {
      if (error) {
        done(error);
      }

      request(app).get('/metrics')
        .then((res) => {
          const { body } = res;
          const lastThirtyMin = dayjs().subtract(30, 'minute').valueOf();
          body.map(x => assert.isAtLeast(x.created_at, lastThirtyMin, 'Created At greater or equal lastThirtyMin'));
          done();
        })
        .catch((err) => done(err));
    });
  });

  it('OK, If there is a filter, the results between the given dates should be listed.', (done) => {
    const tenDaysAgo = dayjs().subtract(10, 'day').valueOf();
    const fiveDaysAgo = dayjs().subtract(5, 'day').valueOf();
    const threeDaysAgo = dayjs().subtract(3, 'day').valueOf();

    const mockMetric = new Metric(
      {
        host: 'https://test.test',
        referer: 'https://test.test/test',
        ttfb: 10,
        fcp: 10,
        dom_load: 10,
        window_load: 10,
        created_at: fiveDaysAgo,
      },
    );

    mockMetric.save((error) => {
      if (error) {
        done(error);
      }

      request(app).get('/metrics')
        .query({ start_date: tenDaysAgo, end_date: threeDaysAgo })
        .then((res) => {
          const { body } = res;
          body.map(x => {
            assert.isAtLeast(x.created_at, tenDaysAgo, 'Created At greater than or equal tenDaysAgo');
            assert.isAtMost(x.created_at, threeDaysAgo, 'Created At less than or equal threeDaysAgo');
          });
          done();
        })
        .catch((err) => done(err));
    });
  });

  it('OK, Metric requires params', (done) => {
    request(app).post('/metrics')
      .send({})
      .then(() => {
        assert.fail('Metric requires metric parameters');
        done();
      })
      .catch(() => {
        assert.isOk('everything', 'everything is ok');
        done();
      });
  });

  it('OK, Start date and End date must be a number', (done) => {
    request(app).get('/metrics')
      .query({ start_date: 'test', end_date: 'test' })
      .then(() => {
        assert.fail('query should return an error');
        done();
      })
      .catch(() => {
        assert.isOk('everything', 'everything is ok');
        done();
      });
  });
});

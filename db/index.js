const mongoose = require('mongoose');

const DB_URI = 'mongodb://root:root@localhost:27017/analytic?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256&3t.uriVersion=3&3t.connection.name=Mongo';

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const { Mockgoose } = require('mockgoose');
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URI,
            { useNewUrlParser: true, useCreateIndex: true })
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            });
        });
    } else {
      mongoose.connect(DB_URI,
        { useNewUrlParser: true, useCreateIndex: true })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };

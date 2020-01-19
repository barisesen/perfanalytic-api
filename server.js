const app = require('./app.js');
const db = require('./db/index.js');

const PORT = process.env.PORT || 3000;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  });

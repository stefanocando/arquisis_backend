const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const db = require('./models');

db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    );
  })
  .catch((err) => console.error('Unable to connect to the database:', err));

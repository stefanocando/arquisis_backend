const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();

const eventsRoutes = require('./routes/events-routes');
const requestRoutes = require('./routes/request-routes');
const validationsRoutes = require('./routes/validation-routes');
const userRoutes = require('./routes/user-routes');


const PORT = process.env.PORT || 5000;
// const PORT = 8080;

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE'
  );
  next();
});

app.use(bodyParser.json());

app.use('/request', requestRoutes);
app.use('/events', eventsRoutes);
app.use('/validations', validationsRoutes);
app.use('/user', userRoutes);


app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error ocurred!' });
});


app.get('/', (req, res) => res.send('Bienvenido! Para ver los mensajes del broker ingresa a /events. Por por default se mostarán 25 mensajes. Para ver más mensajes, se debe realizar un queryParam de la siguiente manera \
/events?page=<número página>&size=<número de cantidad de mensajes a mostrar>`. Por ejemplo: https://www.legitcities.ml/events?pages=1&size=25'))

const server = app.listen(PORT, () => {
  console.log(`Serving running on port ${PORT}`);
});

module.exports = { app, server };

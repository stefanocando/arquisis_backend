const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');

const connectUrl = `mqtt://passline.iic2173.net:9000`;
const client = mqtt.connect(connectUrl, {
    clientId: '',
    clean: true,
    connectTimeout: 4000,
    username: 'students',
    password: 'iic2173-2023-1-students',
    reconnectPeriod: 1000,
  });

client.on('connect', () => {
    console.log('Connected');
    client.subscribe('events/validation', () => {
      console.log(`Subscribed to validations`);
    });
  });


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Mehtods',
      'GET',
      'POST',
      'PATCH',
      'DELETE'
    );
    next();
  });

app.use(bodyParser.json());

app.post("/requests", (req, res) => {
    const {request_id, group_id, event_id, deposit_token, quantity, seller} = req.body;
    //const data = JSON.stringify(req.body);
    const data = JSON.stringify(req.body.request_data);
    console.log(data);

    const responsePromise = new Promise((resolve, reject) => {

      client.on('message', (topic, payload) => {
      if (request_id === JSON.parse(payload).request_id) {
        const response = JSON.parse(payload);
        resolve(response);
      }
      console.log(JSON.parse(payload));
    });

  });

  client.publish('events/requests', data, () => {
    console.log("Request enviada correctamente");
  });
  responsePromise
    .then(response => res.send(response))
    .catch(error => res.status(500).send(error.message));
});

app.listen(9000, () => {
  console.log('Server running on port 9000');
});
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
    client.publish('events/requests', req.data, () => {
        console.log("Request enviada correctamente");
    });
    client.on('message', async (topic, payload) => {
        let validations = JSON.parse(payload);
        if (validations.id == req.data.id){
            res.send(validations);
            client.end();
        }
    })

});

app.listen(9000, () => {
  console.log('Server running on port 9000');
});
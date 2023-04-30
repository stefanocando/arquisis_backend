const mqtt = require('mqtt');
const axios = require('axios');
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://passline.iic2173.net:9000`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'students',
  password: 'iic2173-2023-1-students',
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('Connected to the broker');
  client.subscribe('events/validation', () => {
    console.log(`Subscribed to topic validations`);
  });
});

client.on('message', async (topic, payload) => {
  try {
    let info = JSON.parse(payload);
    console.log("Validation in correct format")
    try {
      const response = await axios.post(
        'http://Server:8080/validations',
        {
          info,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {console.log(res.data.message);});
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log("Validation in wrong format");
  }
});